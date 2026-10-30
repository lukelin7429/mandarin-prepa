import { h, zh, seg, pick, shuffle, tokText, renderTokens } from '../ui.js';
import { speak, compare, canSpeak } from '../speech.js';
import { S, log } from '../store.js';
import { sentences } from '../sentences.js';

export default function listen(el, { content }) {
  let mode = 'word';
  const ROUNDS = 10;

  function menu() {
    el.replaceChildren(
      !canSpeak ? h('p.notice', 'Ce navigateur ne propose pas de synthèse vocale. Essaie Safari ou Chrome.') : null,
      h('div.card',
        h('p.small.muted', 'Les phrases sont lues par la voix chinoise de ton appareil. Le bouton 🐢 relit plus lentement.'),
        seg([['word', 'Quel mot ?'], ['gap', 'Phrase à trous'], ['dict', 'Dictée']], mode, (m) => { mode = m; menu(); }),
        h('p', { style: { marginTop: '12px' } }, {
          word: 'Écoute un mot et choisis les bons caractères parmi quatre.',
          gap: 'Écoute une phrase des textes et retrouve le mot manquant.',
          dict: 'Écoute une phrase et écris-la (clavier chinois pinyin). Compare ensuite caractère par caractère.',
        }[mode]),
        h('button.btn.primary', { onclick: () => run(0, 0) }, 'Commencer')),
    );
  }

  const vocab = content.vocab.filter((v) => v.h.length <= 4);
  const sents = sentences(content);

  function replayRow(text) {
    return h('div.row', { style: { justifyContent: 'center' } },
      h('button.btn.primary', { onclick: () => speak(text) }, '🔊 Réécouter'),
      h('button.btn', { onclick: () => speak(text, { rate: 0.6 }) }, '🐢 Lentement'));
  }

  function run(i, score) {
    if (i >= ROUNDS) {
      log('listen', ROUNDS);
      const best = S().games['listen-' + mode] || 0;
      if (score > best) S().games['listen-' + mode] = score;
      el.replaceChildren(h('div.card', { style: { textAlign: 'center' } },
        h('div.big-hz', score >= 8 ? '很好！' : score >= 5 ? '不错！' : '加油！'),
        h('p', `${score} / ${ROUNDS}`),
        h('div.row', { style: { justifyContent: 'center' } },
          h('button.btn.primary', { onclick: () => run(0, 0) }, 'Rejouer'),
          h('button.btn', { onclick: menu }, 'Changer d’exercice'))));
      return;
    }
    const head = h('div.row.spread.small.muted', h('span', `Question ${i + 1} / ${ROUNDS}`), h('span', `Score : ${score}`));
    const nextBtn = h('button.btn.primary.block', { hidden: true, onclick: () => run(i + 1, score) }, 'Suivant →');
    const answerWith = (ok, btn, all, right) => {
      all.forEach((b) => { b.disabled = true; if (b === right) b.classList.add('ok'); });
      if (!ok) btn.classList.add('bad'); else score++;
      nextBtn.hidden = false;
    };

    if (mode === 'word') {
      const target = pick(vocab, 1)[0];
      const opts = shuffle([target, ...pick(vocab.filter((v) => v.h !== target.h && v.h.length === target.h.length), 3)]);
      const info = h('p.small', { hidden: true }, `${target.h} · ${target.p} · ${target.fr}`);
      let right;
      const btns = opts.map((o) => {
        const b = h('button.choice', { onclick: () => { answerWith(o === target, b, btns, right); info.hidden = false; } }, zh(o.h));
        if (o === target) right = b;
        return b;
      });
      el.replaceChildren(head, h('div.card.stack', replayRow(target.h), h('div.choices', btns), info), nextBtn);
      speak(target.h);
    } else if (mode === 'gap') {
      // Gap candidates: glossed words that appear only once in their sentence.
      const once = (s) => s.tokens.filter((t) => t.g && s.tokens.filter((x) => x.w === t.w).length === 1);
      const s = pick(sents.filter((x) => once(x).length), 1)[0];
      const gapTok = pick(once(s), 1)[0];
      const text = tokText(s.tokens);
      const shown = s.tokens.map((t) => t === gapTok ? { w: '＿'.repeat(t.w.length), k: 'p' } : t);
      const opts = shuffle([gapTok.w, ...pick(content.vocab.filter((v) => v.h !== gapTok.w), 3).map((v) => v.h)]);
      let right;
      const btns = opts.map((o) => {
        const b = h('button.choice', { onclick: () => { answerWith(o === gapTok.w, b, btns, right); full.hidden = false; } }, zh(o));
        if (o === gapTok.w) right = b;
        return b;
      });
      const full = h('p.small', { hidden: true }, zh(text), ' — ', gapTok.p, ' : ', gapTok.g);
      el.replaceChildren(head, h('div.card.stack', replayRow(text),
        h('div.text-zh', { lang: 'zh-CN', style: { fontSize: '19px' } }, renderTokens(shown, { mode: 'off' })),
        h('div.choices', btns), full), nextBtn);
      speak(text);
    } else {
      const s = pick(sents.filter((x) => tokText(x.tokens).length <= 24), 1)[0];
      const text = tokText(s.tokens);
      const input = h('textarea', { lang: 'zh-CN', placeholder: 'Écris ici en caractères…', style: { minHeight: '80px' } });
      const result = h('div', { hidden: true });
      const check = h('button.btn.primary', {
        onclick: () => {
          const r = compare(text, input.value, { strict: true });
          if (r.score >= 80) score++;
          result.hidden = false; check.hidden = true; nextBtn.hidden = false;
          result.replaceChildren(
            h('div.feedback-chars', { lang: 'zh-CN' }, r.chars.map((c) => h('span', { class: c.st }, c.ch))),
            h('p.small', `${r.score} % · `, h('span.pin', s.tokens.filter((t) => !t.k).map((t) => t.p).join(' '))),
            h('p.small.muted', 'Vert : correct · orange : bonne syllabe, mais autre caractère ou autre ton · rouge : manquant.'));
        },
      }, 'Vérifier');
      el.replaceChildren(head, h('div.card.stack', replayRow(text), input, check, result), nextBtn);
      speak(text);
    }
  }

  menu();
}
