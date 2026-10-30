// Text-to-speech, speech recognition and recording, all with built-in browser APIs.
import { S } from './store.js';

export const canSpeak = 'speechSynthesis' in window;
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const canRecognize = !!SR;
export const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

let voicesCache = [];
function refreshVoices() {
  if (!canSpeak) return [];
  voicesCache = speechSynthesis.getVoices();
  return voicesCache;
}
if (canSpeak) {
  refreshVoices();
  speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);
}

/** Mandarin voices, mainland ones first. */
export function zhVoices() {
  const all = voicesCache.length ? voicesCache : refreshVoices();
  const zh = all.filter((v) => /^zh|^cmn/i.test(v.lang));
  // Mainland first, then the more natural voices (Enhanced/Premium/Natural/Google/Online).
  const rank = (v) => (/CN|Hans|cmn/i.test(v.lang) ? 0 : /TW/i.test(v.lang) ? 10 : 20)
    - (/premium|enhanced|natural|neural|online|google/i.test(v.name) ? 5 : 0);
  return zh.sort((a, b) => rank(a) - rank(b));
}

function pickVoice() {
  const list = zhVoices();
  const want = S().settings.voice;
  return list.find((v) => v.voiceURI === want) || list.find((v) => /CN/i.test(v.lang)) || list[0] || null;
}

// Chrome cuts long utterances, so long texts are split at punctuation.
function chunks(text) {
  const parts = text.replace(/\s+/g, '').split(/(?<=[。！？；!?;])/);
  const out = [];
  for (const p of parts) {
    if (p.length <= 70) { if (p) out.push(p); continue; }
    let buf = '';
    for (const piece of p.split(/(?<=[，、：,])/)) {
      if ((buf + piece).length > 70 && buf) { out.push(buf); buf = ''; }
      buf += piece;
    }
    if (buf) out.push(buf);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Natural recordings (tools/gen_audio.py, neural voices) are played first;
// the browser's own voice, which sounds robotic, is only a fallback.
// ---------------------------------------------------------------------------
const norm = (t) => t.replace(/[^\u3400-\u9fff0-9A-Za-z%]/g, '');
let audioIndex = null;
export async function loadAudioIndex() {
  if (audioIndex) return audioIndex;
  try { audioIndex = await (await fetch('audio/index.json')).json(); } catch { audioIndex = {}; }
  return audioIndex;
}
export const audioFiles = () => Object.values(audioIndex || {}).map((f) => `audio/${f}`);

/** Recording files for a text: whole text, or every sentence of it. */
function recordingsFor(text) {
  if (!audioIndex) return null;
  const whole = audioIndex[norm(text)];
  if (whole) return [whole];
  const parts = text.replace(/\s+/g, '').split(/(?<=[。！？])/).filter((s) => norm(s));
  const files = parts.map((s) => audioIndex[norm(s)]);
  return files.length && files.every(Boolean) ? files : null;
}

const player = new Audio();
player.preload = 'auto';

let speakToken = 0;
export function stopSpeaking() {
  speakToken++;
  player.pause();
  if (canSpeak) speechSynthesis.cancel();
}

/** Speak Chinese text. Resolves when finished (or stopped). */
export function speak(text, { rate } = {}) {
  if (!text) return Promise.resolve();
  stopSpeaking();
  const my = speakToken;
  const files = recordingsFor(text);
  if (files) {
    // Recordings are made at natural speed; settings.rate 0.85 = normal.
    const speed = Math.min(1.5, Math.max(0.5, (rate ?? S().settings.rate) / 0.85));
    return new Promise((resolve) => {
      let i = 0;
      const next = () => {
        if (my !== speakToken || i >= files.length) return resolve();
        player.src = `audio/${files[i++]}`;
        player.playbackRate = speed;
        player.preservesPitch = true;
        player.onended = next;
        player.onerror = next;
        player.play().catch(() => resolve());
      };
      next();
    });
  }
  if (!canSpeak) return Promise.resolve();
  const voice = pickVoice();
  const r = rate ?? S().settings.rate;
  const list = chunks(text);
  return new Promise((resolve) => {
    let i = 0;
    const next = () => {
      if (my !== speakToken || i >= list.length) return resolve();
      const u = new SpeechSynthesisUtterance(list[i++]);
      u.lang = voice ? voice.lang : 'zh-CN';
      if (voice) u.voice = voice;
      u.rate = r;
      u.onend = next;
      u.onerror = next;
      speechSynthesis.speak(u);
    };
    next();
  });
}

/**
 * Listen once in Mandarin. Returns { done: Promise<string[]>, stop() }.
 * The promise resolves with the recognized alternatives (best first).
 */
export function recognize({ onInterim } = {}) {
  if (!SR) return { done: Promise.reject(new Error('unsupported')), stop() {} };
  stopSpeaking();
  const rec = new SR();
  rec.lang = 'zh-CN';
  rec.interimResults = true;
  rec.maxAlternatives = 3;
  rec.continuous = false;
  let finals = [];
  const done = new Promise((resolve, reject) => {
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) finals = Array.from(res).map((a) => a.transcript);
        else interim += res[0].transcript;
      }
      onInterim && onInterim(finals[0] || interim);
    };
    rec.onerror = (e) => reject(new Error(e.error || 'error'));
    rec.onend = () => resolve(finals);
  });
  try { rec.start(); } catch (e) { return { done: Promise.reject(e), stop() {} }; }
  return { done, stop: () => { try { rec.stop(); } catch {} } };
}

/** Microphone recorder. start() then stop() -> Blob. */
export async function makeRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const types = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm', ''];
  const mimeType = types.find((t) => !t || MediaRecorder.isTypeSupported?.(t)) || '';
  const mr = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  const parts = [];
  mr.ondataavailable = (e) => e.data && e.data.size && parts.push(e.data);
  return {
    start() { mr.start(1000); },
    stop() {
      return new Promise((resolve) => {
        mr.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          resolve(new Blob(parts, { type: mr.mimeType || 'audio/webm' }));
        };
        if (mr.state !== 'inactive') mr.stop(); else mr.onstop();
      });
    },
    get recording() { return mr.state === 'recording'; },
    release() { try { if (mr.state !== 'inactive') mr.stop(); } catch {} stream.getTracks().forEach((t) => t.stop()); },
  };
}

// ---------------------------------------------------------------------------
// Pronunciation feedback: align target and recognized characters by syllable.
// ---------------------------------------------------------------------------
let pmap = null;
export async function loadPinyinMap() {
  if (pmap) return pmap;
  try { pmap = await (await fetch('content/pinyin-map.json')).json(); } catch { pmap = {}; }
  return pmap;
}

const isHan = (c) => /[㐀-鿿]/.test(c);
const readings = (c) => (pmap && pmap[c] ? pmap[c].split('|') : []);
const toneless = (r) => r.replace(/\d$/, '');

/**
 * Compare target text with what was heard.
 * Returns { chars: [{ch, st: 'ok'|'tone'|'miss'}], score: 0..100 }.
 * 'ok' also counts homophones (same syllable and tone) as correct pronunciation,
 * unless strict (dictation), where a wrong character is only half right.
 */
export function compare(target, heard, { strict = false } = {}) {
  const T = [...target].filter(isHan);
  const H = [...heard].filter(isHan);
  const same = (a, b) => {
    if (a === b) return 2;
    const ra = readings(a), rb = readings(b);
    if (ra.some((x) => rb.includes(x))) return strict ? 1 : 2;
    if (ra.some((x) => rb.some((y) => toneless(x) === toneless(y)))) return 1;
    return 0;
  };
  // Needleman-Wunsch style alignment, maximizing matches.
  const n = T.length, m = H.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const s = same(T[i - 1], H[j - 1]);
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1], s ? dp[i - 1][j - 1] + s : -1);
    }
  }
  const res = new Array(n);
  let i = n, j = m;
  while (i > 0) {
    const s = j > 0 ? same(T[i - 1], H[j - 1]) : 0;
    if (j > 0 && s && dp[i][j] === dp[i - 1][j - 1] + s) {
      res[i - 1] = { ch: T[i - 1], st: s === 2 ? 'ok' : 'tone' }; i--; j--;
    } else if (j > 0 && dp[i][j] === dp[i][j - 1]) {
      j--;
    } else {
      res[i - 1] = { ch: T[i - 1], st: 'miss' }; i--;
    }
  }
  const pts = res.reduce((a, r) => a + (r.st === 'ok' ? 1 : r.st === 'tone' ? 0.5 : 0), 0);
  return { chars: res, score: n ? Math.round((pts / n) * 100) : 0 };
}
