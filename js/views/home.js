import { h, zh } from '../ui.js';
import { S, streak } from '../store.js';
import { dueList, newList } from '../srs.js';

const MODULES = [
  ['#/cartes', '卡', 'Cartes mémoire', 'Vocabulaire en répétition espacée'],
  ['#/ecoute', '听', 'Écoute', 'Comprendre la langue parlée'],
  ['#/oral', '说', 'Oral', 'Prononcer, s’enregistrer, gagner en assurance'],
  ['#/colle', '考', 'Colle', '20 min de préparation, puis l’oral'],
  ['#/lecture', '读', 'Lecture', 'Textes avec pinyin et lexique'],
  ['#/jeux', '玩', 'Jeux', 'Tons, paires, phrases en désordre'],
  ['#/examen', '试', 'Le concours', 'Format des épreuves ECG (LV2)'],
  ['#/progres', '进', 'Progrès', 'Statistiques et réglages'],
  ['#/guide', '？', 'Mode d’emploi', 'Comment utiliser l’application'],
];

export default function home(el, { content }) {
  const vocab = content.vocab;
  const due = dueList(vocab).length;
  const fresh = newList(vocab).length;
  const st = streak();
  const lastColle = S().colles.at(-1);
  const colle = content.colles[Math.floor(Math.random() * content.colles.length)];
  const hour = new Date().getHours();
  const hello = hour < 11 ? '早上好！' : hour < 18 ? '你好！' : '晚上好！';

  el.append(
    h('div.card',
      h('div.row.spread',
        h('div', h('div', { style: { fontSize: '24px', fontWeight: 600 } }, zh(hello)), h('div.muted.small', 'Un peu chaque jour : c’est la régularité qui fait progresser.')),
        h('div', { style: { textAlign: 'center' } }, h('b', { style: { fontSize: '26px' } }, st), h('div.small.muted', st > 1 ? 'jours de suite' : 'jour de suite'))),
      h('div.row', { style: { marginTop: '12px' } },
        h('a.btn.primary', { href: '#/cartes' }, due + fresh ? `Réviser (${due} à revoir · ${fresh} nouvelles)` : 'Cartes à jour ✓'),
        h('a.btn', { href: `#/colle/${colle.id}` }, 'Colle du jour'),
        h('a.btn.ghost', { href: '#/guide' }, '❓ Mode d’emploi')),
    ),
    h('div.grid', MODULES.map(([href, ico, name, desc]) =>
      h('a.tile', { href }, h('div.big', ico), h('b', name), h('span', desc)))),
    lastColle ? h('p.small.muted', { style: { marginTop: '14px' } },
      `Dernière colle : « ${lastColle.title_fr} » le ${new Date(lastColle.date).toLocaleDateString('fr-FR')}.`) : null,
    h('p.small.muted', { style: { marginTop: '14px' } },
      'Contenu de démonstration. Les textes du cours remplaceront ces exemples dès qu’ils seront disponibles.'),
  );
}
