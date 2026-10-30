import { h, zh, seg, shuffle, pick, tokText, renderTokens, fmtTime } from '../ui.js';
import { speak, makeRecorder, canRecord } from '../speech.js';
import { practiceControls } from '../practice.js';
import { sentences } from '../sentences.js';
import { log } from '../store.js';

const STAGE_FR = { intro: 'Introduction', synthese: 'Synthèse', commentaire: 'Commentaire', conclusion: 'Conclusion', entretien: 'Entretien' };

export default function oral(el, { content }) {
  let mode = 'phrases';
  let cleanups = [];
  const clean = () => { cleanups.forEach((f) => f()); cleanups = []; };

  const lists = {
    phrases: () => content.phrases.map((p) => ({ tokens: p.zh, fr: p.fr, tag: STAGE_FR[p.stage] })),
    mots: () => shuffle(content.vocab).slice(0, 30).map((v) => ({ tokens: [{ w: v.h, p: v.p }], fr: v.fr })),
    textes: () => shuffle(sentences(content, { max: 30 })).slice(0, 30).map((s) => ({ tokens: s.tokens, fr: null, tag: s.title_fr })),
  };

  function top() {
    return h('div.card',
      h('p.small.muted', 'Pour gagner en assurance : écoute le modèle, répète à voix haute, puis enregistre-toi. Parle fort, même si tu te trompes.'),
      seg([['phrases', 'Phrases de colle'], ['mots', 'Mots'], ['textes', 'Phrases des textes'], ['minute', 'Une minute pour répondre']], mode,
        (m) => { mode = m; draw(); }));
  }

  function draw() {
    clean();
    if (mode === 'minute') return minute();
    const items = lists[mode]();
    let i = 0;
    const box = h('div');
    const show = () => {
      clean();
      const it = items[i];
      const text = tokText(it.tokens);
      const pc = practiceControls(text);
      cleanups.push(pc.cleanup);
      box.replaceChildren(h('div.card.stack',
        h('div.row.spread.small.muted', h('span', it.tag || ''), h('span', `${i + 1} / ${items.length}`)),
        h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: it.tokens.length === 1 ? '40px' : '22px' } }, renderTokens(it.tokens, { mode: 'on' })),
        it.fr ? h('p', it.fr) : null,
        pc,
        h('div.row.spread',
          h('button.btn.small', { disabled: i === 0, onclick: () => { i--; show(); } }, '← Précédent'),
          h('button.btn.small', { disabled: i === items.length - 1, onclick: () => { i++; show(); } }, 'Suivant →'))));
    };
    el.replaceChildren(top(), box);
    show();
  }

  // Answer a jury question for one minute (confidence building).
  function minute() {
    const all = content.colles.flatMap((c) => c.questions.map((q) => ({ ...q, title_fr: c.title_fr })));
    const q = pick(all, 1)[0];
    const qText = tokText(q.zh);
    const timerEl = h('div.timer', '1:00');
    const player = h('audio', { controls: true, hidden: true, style: { width: '100%' } });
    const shownQ = h('div', { hidden: true },
      h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: '20px' } }, renderTokens(q.zh, { mode: 'on' })),
      h('p.small', q.fr));
    let rec = null, t0 = 0, tick = null;
    const stop = async () => {
      clearInterval(tick);
      if (!rec) return;
      const blob = await rec.stop();
      rec = null;
      player.src = URL.createObjectURL(blob);
      player.hidden = false;
      btn.textContent = 'Recommencer';
      btn.classList.remove('rec');
      log('oral');
    };
    const btn = h('button.btn.primary', {
      onclick: async () => {
        if (rec) return stop();
        if (btn.textContent === 'Recommencer') return minute();
        try { rec = canRecord ? await makeRecorder() : null; } catch { rec = null; }
        rec && rec.start();
        t0 = Date.now();
        btn.textContent = '■ J’ai fini';
        btn.classList.add('rec');
        tick = setInterval(() => {
          const left = 60 - (Date.now() - t0) / 1000;
          timerEl.textContent = fmtTime(left);
          timerEl.classList.toggle('late', left < 0);
          if (left <= -30) stop();
        }, 250);
      },
    }, '▶ Commencer (1 min)');
    cleanups.push(() => { clearInterval(tick); rec && rec.release(); });
    el.replaceChildren(top(), h('div.card.stack',
      h('p.small.muted', `Sujet : ${q.title_fr}`),
      h('div.row', h('button.btn', { onclick: () => speak(qText) }, '🔊 Écouter la question'),
        h('button.btn.small', { onclick: () => { shownQ.hidden = !shownQ.hidden; } }, 'Afficher / masquer')),
      shownQ,
      h('p.small', 'Réponds en chinois pendant une minute, sans t’arrêter. Si un mot te manque, contourne-le avec des mots simples.'),
      timerEl, btn, player,
      h('button.btn.small', { onclick: minute }, 'Autre question')));
    speak(qText);
  }

  draw();
  return clean;
}
