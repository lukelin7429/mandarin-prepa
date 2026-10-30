import { h, zh, speakBtn, seg, shuffle } from '../ui.js';
import { S, save } from '../store.js';
import { speak } from '../speech.js';
import { dueList, newList, grade, preview, deckStats } from '../srs.js';

const DECKS = [
  ['all', 'Tout'],
  ['gaokao', '高考'],
  ['peterpan', 'Peter Pan'],
  ['colles', 'Colles'],
  ['theme', 'Thèmes'],
];

export default function cards(el, { content }) {
  let deck = 'all';
  const settings = S().settings;

  const inDeck = (v) => deck === 'all' ? true
    : deck === 'colles' ? v.src.some((s) => content.colles.some((c) => c.id === s))
    : v.src.includes(deck);

  function start() {
    const vocab = content.vocab.filter(inDeck);
    const queue = [...dueList(vocab), ...newList(vocab)];
    const stats = deckStats(vocab);
    el.replaceChildren(
      h('div.card',
        h('div.row.spread', seg(DECKS, deck, (d) => { deck = d; start(); })),
        h('div.stats', { style: { marginTop: '14px' } },
          h('div', h('b', stats.due), h('span', 'à revoir')),
          h('div', h('b', stats.fresh), h('span', 'nouvelles')),
          h('div', h('b', stats.mature), h('span', 'maîtrisées'))),
        h('div.row', { style: { marginTop: '14px' } },
          h('span.small.muted', 'Sens :'),
          seg([['zh', '中 → FR'], ['fr', 'FR → 中'], ['audio', '🔊 → sens']], settings.cardMode, (m) => { settings.cardMode = m; save(); }))),
      queue.length
        ? h('button.btn.primary.block', { onclick: () => session(queue) }, `Commencer (${queue.length} cartes)`)
        : h('div.card', h('p', 'Rien à réviser pour l’instant 🎉'),
            h('p.small.muted', `Nouvelles cartes par jour : ${settings.newPerDay} (modifiable dans Progrès). Reviens demain, ou entraîne-toi librement :`),
            h('button.btn', { onclick: () => session(shuffle(vocab).slice(0, 15), true) }, 'Entraînement libre (15 cartes)')),
      h('details.card', h('summary', `Liste des mots (${vocab.length})`),
        h('table.simple', vocab.map((v) => h('tr',
          h('td', zh(v.h)), h('td.pin', v.p), h('td', v.fr),
          h('td', speakBtn(v.h)))))),
    );
  }

  function session(queue, practice = false) {
    queue = queue.slice();
    let done = 0;
    const total = queue.length;
    const show = () => {
      const v = queue.shift();
      if (!v) {
        el.replaceChildren(h('div.card', { style: { textAlign: 'center' } },
          h('div.big-hz', '太棒了！'), h('p', `${done} cartes révisées.`),
          h('button.btn.primary', { onclick: start }, 'Terminer')));
        return;
      }
      const mode = settings.cardMode;
      let revealed = false;
      const front = mode === 'fr'
        ? h('div.fr', v.fr)
        : mode === 'audio' ? h('div', h('div.muted', 'Écoute et retrouve le sens'), h('div', { style: { fontSize: '48px' } }, '🔊'))
        : zh(v.h);
      const back = h('div', { hidden: true },
        mode !== 'zh' ? zh(v.h) : null,
        h('div.pin', v.p),
        mode !== 'fr' ? h('div.fr', v.fr) : null,
        h('div.row', { style: { justifyContent: 'center' } }, speakBtn(v.h, '🔊 Écouter')));
      const iv = preview(v.id);
      const rate = h('div.rate', { hidden: true },
        [['Encore', 'again'], ['Difficile', ''], ['Bien', 'good'], ['Facile', '']].map(([label, cls], g) =>
          h(`button.btn${cls ? '.' + cls : ''}`, {
            onclick: () => {
              if (!practice) grade(v.id, g);
              done++;
              if (g === 0) queue.splice(Math.min(3, queue.length), 0, v);
              show();
            },
          }, label, practice ? null : h('small', iv[g])))
      );
      const revealBtn = h('button.btn.primary.block', {
        onclick: () => {
          revealed = true;
          back.hidden = false; rate.hidden = false; revealBtn.hidden = true;
          if (mode !== 'audio') speak(v.h);
        },
      }, 'Afficher la réponse');
      el.replaceChildren(
        h('div.row.spread.small.muted', h('span', `${done} / ${total}`), h('span', practice ? 'Entraînement libre' : `${queue.length + 1} restantes`)),
        h('div.bar', { style: { margin: '8px 0 14px' } }, h('i', { style: { width: `${Math.min(100, (done / total) * 100)}%` } })),
        h('div.card.flash', { onclick: () => { if (!revealed) revealBtn.click(); } }, front, back),
        revealBtn, rate,
      );
      if (mode === 'audio') speak(v.h);
    };
    show();
  }

  start();
}
