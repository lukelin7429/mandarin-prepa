import { h, zh, seg, renderTokens, tokText, wordSheet, shuffle } from '../ui.js';
import { speak, stopSpeaking } from '../speech.js';
import { S, save, log, dayKey } from '../store.js';

export default function reading(el, { content, params, vocabIndex, setTitle }) {
  const docs = [...content.texts.map((t) => ({ ...t, kind: 'Texte' })), ...content.colles.filter((c) => !c.from_text).map((c) => ({ ...c, kind: 'Document de colle' }))];
  const doc = params[0] && docs.find((d) => d.id === params[0]);
  if (!doc) return list();
  setTitle(doc.title_fr);
  return reader(doc);

  function list() {
    el.replaceChildren(
      h('p.small.muted', 'Touche un mot pour voir son pinyin et sa traduction. Les mots soulignés en pointillé font partie de tes cartes.'),
      ...['Texte', 'Document de colle'].map((kind) => h('div.card',
        h('h2', kind === 'Texte' ? 'Textes' : 'Documents de colle'),
        docs.filter((d) => d.kind === kind).map((d) => h('a.row.spread', {
          href: `#/lecture/${d.id}`,
          style: { padding: '10px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit' },
        }, h('div', zh(tokText(d.title)), h('div.small.muted', d.title_fr)),
          h('span.chip', S().read[d.id] ? 'lu ✓' : 'à lire'))))),
    );
  }

  function reader(d) {
    let mode = S().settings.pinyin;
    const box = h('div.text-zh', { lang: 'zh-CN' });
    const draw = () => {
      box.className = 'text-zh' + (mode === 'on' ? ' pinyin-on' : '');
      box.replaceChildren(...d.paras.map((p) => [
        h('p', renderTokens(p, { mode, onWord: (t) => { speak(t.w); wordSheet(t, vocabIndex); } })),
        h('div.para-tools', h('button.btn.small.ghost', { onclick: () => speak(tokText(p)) }, '🔊 paragraphe'))]).flat());
    };
    draw();
    const glossary = d.paras.flat().filter((t) => t.g);
    const uniq = [...new Map(glossary.map((t) => [t.w, t])).values()];

    el.replaceChildren(
      h('div.card',
        h('div.small.muted', d.kind),
        h('h2', zh(tokText(d.title))),
        d.note_fr ? h('p.small.muted', d.note_fr) : null,
        h('div.row.spread',
          seg([['on', 'Pinyin'], ['tap', 'Au toucher'], ['off', 'Sans']], mode, (m) => { mode = m; S().settings.pinyin = m; save(); draw(); }),
          h('div.row',
            h('button.btn.small', { onclick: () => speak(d.paras.map(tokText).join('')) }, '🔊 Tout lire'),
            h('button.btn.small', { onclick: () => speak(d.paras.map(tokText).join(''), { rate: 0.65 }) }, '🐢'),
            h('button.btn.small', { onclick: stopSpeaking }, '■')))),
      h('div.card', box),
      h('details.card', h('summary', `Lexique (${uniq.length} mots)`),
        h('table.simple', uniq.map((t) => h('tr', h('td', zh(t.w)), h('td.pin', t.p), h('td', t.g))))),
      d.quiz && d.quiz.length ? quiz(d) : null,
      d.questions ? h('div.card', h('h2', 'Questions possibles du jury'),
        d.questions.map((q) => h('div.phrase', h('div.hz', { lang: 'zh-CN' }, tokText(q.zh)), h('div.small.muted', q.fr))),
        h('a.btn.primary', { href: `#/colle/${d.id}`, style: { marginTop: '10px' } }, 'Faire la colle sur ce texte')) : null,
      h('button.btn.block', {
        onclick: () => { S().read[d.id] = { ...(S().read[d.id] || {}), done: dayKey() }; save(); log('read'); location.hash = '#/lecture'; },
      }, 'Marquer comme lu ✓'),
    );
  }

  function quiz(d) {
    const card = h('div.card.stack', h('h2', 'Compréhension'));
    let score = 0, answered = 0;
    const result = h('p');
    d.quiz.forEach((q, i) => {
      const opts = shuffle([q.a, ...q.wrong]);
      const btns = opts.map((o) => h('button.choice', {
        style: { textAlign: 'left' },
        onclick: () => {
          btns.forEach((b, j) => { b.disabled = true; if (opts[j] === q.a) b.classList.add('ok'); });
          if (o !== q.a) btns[opts.indexOf(o)].classList.add('bad'); else score++;
          if (++answered === d.quiz.length) {
            result.textContent = `Score : ${score} / ${d.quiz.length}`;
            S().read[d.id] = { ...(S().read[d.id] || {}), quiz: score };
            save();
          }
        },
      }, o));
      card.append(h('p', h('b', `${i + 1}. `), q.q), h('div.stack', btns));
    });
    card.append(result);
    return card;
  }
}
