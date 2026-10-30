// Small DOM helpers shared by the views.
import { speak } from './speech.js';
import { S } from './store.js';

/** h('div.card', {onclick}, child, ...) */
export function h(sel, attrs, ...kids) {
  const [tag, ...cls] = sel.split('.');
  const el = document.createElement(tag || 'div');
  if (cls.length) el.className = cls.join(' ');
  if (attrs != null && (typeof attrs !== 'object' || attrs instanceof Node || Array.isArray(attrs))) {
    kids.unshift(attrs);
    attrs = null;
  }
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat(Infinity)) {
    if (k == null || k === false) continue;
    el.append(k instanceof Node ? k : document.createTextNode(String(k)));
  }
  return el;
}

export const zh = (text, cls = '') => h(`span.hz${cls ? '.' + cls : ''}`, { lang: 'zh-CN' }, text);

export function toast(msg, ms = 2200) {
  const t = h('div.toast', msg);
  document.body.append(t);
  setTimeout(() => t.remove(), ms);
}

export function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pick = (a, n) => shuffle(a).slice(0, n);

export const tokText = (tokens) => tokens.map((t) => t.w).join('');
export const parasText = (paras) => paras.map(tokText).join('\n');

export function speakBtn(text, label = '🔊', opts = {}) {
  return h('button.btn.small', {
    type: 'button',
    'aria-label': 'Écouter',
    onclick: (e) => { e.stopPropagation(); speak(typeof text === 'function' ? text() : text, opts); },
  }, label);
}

let sheetEl = null;
export function closeSheet() {
  if (sheetEl) { sheetEl.forEach((e) => e.remove()); sheetEl = null; }
  document.querySelectorAll('.w.sel').forEach((e) => e.classList.remove('sel'));
}
export function openSheet(...content) {
  closeSheet();
  const bg = h('div.sheet-bg', { onclick: closeSheet });
  const sh = h('div.sheet', { role: 'dialog' }, ...content,
    h('div.row', { style: { marginTop: '14px' } }, h('button.btn.ghost.block', { onclick: closeSheet }, 'Fermer')));
  document.body.append(bg, sh);
  sheetEl = [bg, sh];
}

/** Word details sheet. */
export function wordSheet(tok, vocabIndex) {
  const v = vocabIndex?.get(tok.w);
  const fr = tok.g || v?.fr;
  openSheet(
    h('div.row.spread', zh(tok.w), speakBtn(tok.w)),
    h('div.pin', { style: { fontSize: '20px' } }, tok.p || ''),
    fr ? h('div', { style: { fontSize: '18px', marginTop: '6px' } }, fr)
      : h('div.muted.small', 'Pas de traduction pour ce mot (mot courant).'),
    v ? h('div.chip.ok', { style: { marginTop: '10px' } }, S().cards[v.id] ? 'Dans tes cartes ✓' : 'Sera ajouté à tes cartes') : null,
  );
}

const V = 'aeiouüvāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ';
const SYLLABLE = new RegExp(`[bpmfdtnlgkhjqxrzcsyw]?h?[${V}]+(?:ng(?![${V}])|n(?![${V}])|r(?![${V}]))?`, 'gi');

/**
 * Render tokenized Chinese. mode: 'on' (ruby pinyin), 'tap' (pinyin on tap), 'off'.
 * onWord(tok, el) is called when a word is tapped.
 */
export function renderTokens(tokens, { mode = 'tap', onWord } = {}) {
  const frag = document.createDocumentFragment();
  for (const t of tokens) {
    if (t.k) { frag.append(t.w); continue; }
    const cls = 'w' + (t.g ? ' g' : '');
    let el;
    if (mode === 'on' && t.p) {
      // One ruby per character when the syllables line up, so words don't stretch.
      const syl = t.p.match(SYLLABLE) || [];
      const chars = [...t.w].filter((c) => c !== '·');
      el = syl.length === chars.length && chars.length === [...t.w].length
        ? h('span', { class: cls }, chars.map((c, i) => h('ruby', c, h('rt', syl[i]))))
        : h('ruby', { class: cls }, t.w, h('rt', t.p));
    } else {
      el = h('span', { class: cls }, t.w);
    }
    if (onWord) el.addEventListener('click', () => { onWord(t, el); el.classList.add('sel'); });
    frag.append(el);
  }
  return frag;
}

export function fmtTime(sec) {
  const s = Math.max(0, Math.round(Math.abs(sec)));
  return `${sec < 0 ? '+' : ''}${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function seg(options, value, onChange) {
  const wrap = h('div.seg', { role: 'group' });
  const draw = () => {
    wrap.replaceChildren(...options.map(([val, label]) =>
      h('button', { type: 'button', class: val === value ? 'on' : '', onclick: () => { value = val; draw(); onChange(val); } }, label)));
  };
  draw();
  return wrap;
}

export function download(blob, name) {
  const a = h('a', { href: URL.createObjectURL(blob), download: name });
  document.body.append(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
}
