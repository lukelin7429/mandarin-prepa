import { h, seg, tokText, renderTokens, toast } from '../ui.js';
import { speak } from '../speech.js';
import { S, save, log } from '../store.js';

const KINDS = {
  resume: ['Résumé', 'BCE · 250 caractères, 30 % de la note', 'Compare les documents sans donner ton avis et sans recopier. Une phrase de résumé, puis les ressemblances et les différences.'],
  essai: ['Essai', 'BCE · 350 caractères, 50 % de la note', 'Donne ton avis. Plan simple : ta position, deux arguments, des exemples du monde sinophone, une conclusion.'],
  theme: ['Thème', 'BCE et Ecricome · français → chinois', 'Traduis le sens, pas mot à mot. Puis compare avec le modèle.'],
  version: ['Version', 'Ecricome · chinois → français', 'Écris un français naturel. Puis compare avec le modèle.'],
};
const CONNECT = '首先 · 其次 · 然而 · 因此 · 另外 · 一方面…另一方面… · 总之 · 在我看来';

const countHan = (t) => [...t].filter((c) => /[㐀-鿿]/.test(c)).length;

export default function writing(el, { content, params, setTitle }) {
  let kind = 'theme';
  const item = params[0] && content.writing.find((w) => w.id === params[0]);
  if (item) return exercise(item);
  list();

  function list() {
    const [name, info, tip] = KINDS[kind];
    const done = S().writing || {};
    el.replaceChildren(
      h('div.card',
        seg(Object.entries(KINDS).map(([k, v]) => [k, v[0]]), kind, (k) => { kind = k; list(); }),
        h('h2', { style: { marginTop: '12px' } }, name),
        h('p.small.muted', info),
        h('p', tip)),
      h('div.card', content.writing.filter((w) => w.kind === kind).map((w, i) =>
        h('a.row.spread', { href: `#/ecrit/${w.id}`, style: { padding: '10px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit' } },
          h('div', { style: { flex: 1 } }, w.q ? h('div.hz', { lang: 'zh-CN' }, tokText(w.q)) : w.zh ? h('div.hz', { lang: 'zh-CN' }, `${tokText(w.zh).slice(0, 26)}…`) : `${w.src.slice(0, 60)}…`),
          h('span.chip', done[w.id]?.text ? 'commencé' : `n° ${i + 1}`)))),
    );
  }

  function exercise(w) {
    setTitle(KINDS[w.kind][0]);
    const store = (S().writing ||= {});
    const area = h('textarea', { lang: w.kind === 'version' ? 'fr' : 'zh-CN', placeholder: w.kind === 'version' ? 'Ta traduction…' : '在这里写…', style: { minHeight: '180px' } });
    area.value = store[w.id]?.text || '';
    const counter = h('div.small');
    const update = () => {
      if (!w.target) return;
      const n = countHan(area.value);
      const lo = Math.round(w.target * 0.9), hi = Math.round(w.target * 1.1);
      counter.replaceChildren(`${n} caractères — objectif ${lo} à ${hi} `,
        h(`span.chip.${n < lo ? 'warn' : n > hi ? 'bad' : 'ok'}`, n < lo ? 'trop court' : n > hi ? 'trop long' : 'bien'));
    };
    area.addEventListener('input', () => { store[w.id] = { text: area.value }; save(); update(); });
    update();

    const docs = (w.docs || []).map((id) => [...content.texts, ...content.colles].find((d) => d.id === id)).filter(Boolean);
    const model = w.model ? h('div.stack', { hidden: true },
      Array.isArray(w.model)
        ? h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: '19px' } }, renderTokens(w.model, { mode: 'on' }))
        : h('p', w.model),
      Array.isArray(w.model) ? h('button.btn.small', { onclick: () => speak(tokText(w.model)) }, '🔊 Écouter') : null) : null;

    el.replaceChildren(
      h('div.card.stack',
        w.q ? [h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: '19px' } }, renderTokens(w.q, { mode: 'on' })), h('p.small.muted', w.fr)] : null,
        w.src ? h('p', w.src) : null,
        w.zh ? h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: '19px' } }, renderTokens(w.zh, { mode: 'on' })) : null,
        docs.map((d) => h('a.btn.small', { href: `#/lecture/${d.id}` }, `Lire : ${d.title_fr}`))),
      h('div.card.stack', area, w.target ? counter : null,
        w.target ? h('p.small.muted', 'Mots de liaison : ', h('span.hz', { lang: 'zh-CN' }, CONNECT)) : null,
        w.target ? h('p.small.muted', 'Pas de correction automatique pour l’instant : copie ton texte pour ton professeur.') : null,
        h('div.row',
          model ? h('button.btn.primary', { onclick: () => { model.hidden = false; log('writing'); } }, 'Voir le modèle') : null,
          h('button.btn', {
            onclick: async () => {
              log('writing');
              try { await navigator.clipboard.writeText(area.value); toast('Texte copié'); } catch { toast('Copie impossible'); }
            },
          }, 'Copier mon texte')),
        model),
    );
  }
}
