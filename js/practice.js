// Shared speaking controls: model audio, pronunciation check, self-recording.
import { h } from './ui.js';
import { speak, recognize, compare, makeRecorder, canRecognize, canRecord, stopSpeaking } from './speech.js';
import { log } from './store.js';

export function practiceControls(text, { onScore } = {}) {
  const out = h('div.stack');
  const feedback = h('div');
  let recorder = null;
  let audioUrl = null;

  const srBtn = h('button.btn.primary', {
    disabled: !canRecognize,
    onclick: async () => {
      srBtn.disabled = true;
      srBtn.textContent = '🎙 Je t’écoute…';
      feedback.replaceChildren(h('p.muted.small', 'Parle maintenant, clairement.'));
      const live = h('p.hz', { lang: 'zh-CN', style: { fontSize: '20px' } });
      feedback.append(live);
      try {
        const alts = await recognize({ onInterim: (t) => { live.textContent = t; } }).done;
        if (!alts.length) {
          feedback.replaceChildren(h('p.notice', 'Je n’ai rien entendu. Rapproche-toi du micro et réessaie.'));
        } else {
          const best = alts.map((a) => ({ a, r: compare(text, a) })).sort((x, y) => y.r.score - x.r.score)[0];
          log('oral');
          onScore && onScore(best.r.score);
          const msg = best.r.score >= 90 ? 'Excellent ! 太好了！' : best.r.score >= 70 ? 'Bien ! Encore un petit effort sur les caractères en orange/rouge.' : 'Courage ! Réécoute le modèle, puis réessaie plus lentement.';
          feedback.replaceChildren(
            h('div.feedback-chars', { lang: 'zh-CN' }, best.r.chars.map((c) => h('span', { class: c.st }, c.ch))),
            h('p', h('b', `${best.r.score} %`), ' — ', msg),
            h('p.small.muted', 'Entendu : ', h('span.hz', { lang: 'zh-CN' }, best.a)),
            h('p.small.muted', 'Vert : bien prononcé · orange : bonne syllabe, ton à vérifier · rouge : pas reconnu.'));
        }
      } catch (e) {
        const m = String(e.message || e);
        feedback.replaceChildren(h('p.notice',
          m.includes('not-allowed') || m.includes('service-not-allowed')
            ? 'Le micro ou la reconnaissance vocale est bloqué. Autorise le micro pour ce site dans les réglages du navigateur.'
            : m.includes('network') ? 'La reconnaissance vocale a besoin d’Internet sur ce navigateur.'
            : `La reconnaissance n’a pas fonctionné (${m}). Réessaie.`));
      }
      srBtn.disabled = false;
      srBtn.textContent = '🎙 Prononcer';
    },
  }, '🎙 Prononcer');

  const player = h('audio', { controls: true, hidden: true, style: { width: '100%' } });
  const recBtn = h('button.btn', {
    disabled: !canRecord,
    onclick: async () => {
      if (recorder && recorder.recording) {
        const blob = await recorder.stop();
        recorder = null;
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        audioUrl = URL.createObjectURL(blob);
        player.src = audioUrl;
        player.hidden = false;
        recBtn.classList.remove('rec');
        recBtn.textContent = '● M’enregistrer';
        cmpBtn.hidden = false;
        log('oral');
        return;
      }
      try {
        stopSpeaking();
        recorder = await makeRecorder();
        recorder.start();
        recBtn.classList.add('rec');
        recBtn.textContent = '■ Arrêter';
      } catch {
        feedback.replaceChildren(h('p.notice', 'Impossible d’accéder au micro. Autorise-le dans les réglages du navigateur.'));
      }
    },
  }, '● M’enregistrer');

  const cmpBtn = h('button.btn.small', {
    hidden: true,
    onclick: async () => { await speak(text); player.currentTime = 0; player.play(); },
  }, 'Modèle puis ma voix');

  out.append(...[
    h('div.row',
      h('button.btn', { onclick: () => speak(text) }, '🔊 Modèle'),
      h('button.btn', { onclick: () => speak(text, { rate: 0.6 }) }, '🐢 Lent'),
      srBtn, recBtn, cmpBtn),
    !canRecognize ? h('p.small.muted', 'La reconnaissance vocale n’est pas disponible sur ce navigateur (essaie Chrome ou Safari). Tu peux quand même t’enregistrer et comparer.') : null,
    player, feedback,
  ].filter(Boolean));
  out.cleanup = () => { recorder && recorder.release(); if (audioUrl) URL.revokeObjectURL(audioUrl); };
  return out;
}
