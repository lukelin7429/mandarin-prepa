import { h, toast, download, seg } from '../ui.js';
import { S, save, streak, dayKey, dayTotal, exportData, importData, reset } from '../store.js';
import { zhVoices, speak, canSpeak, canRecognize, canRecord, audioFiles } from '../speech.js';
import { deckStats } from '../srs.js';
import { applyTheme } from '../app.js';

export default function progress(el, { content }) {
  const st = deckStats(content.vocab);
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({ key: dayKey(d), label: d.getDate(), n: dayTotal(dayKey(d)) });
  }
  const max = Math.max(1, ...days.map((d) => d.n));
  const tot = Object.values(S().days).reduce((acc, d) => {
    for (const [k, v] of Object.entries(d)) acc[k] = (acc[k] || 0) + v;
    return acc;
  }, {});
  const s = S().settings;

  const voiceSel = h('select', { onchange: (e) => { s.voice = e.target.value; save(); speak('你好，我们开始吧！'); } });
  const fillVoices = () => {
    const list = zhVoices();
    voiceSel.replaceChildren(h('option', { value: '' }, 'Automatique'),
      ...list.map((v) => h('option', { value: v.voiceURI, selected: v.voiceURI === s.voice }, `${v.name} (${v.lang})`)));
  };
  fillVoices();
  if (canSpeak) speechSynthesis.addEventListener?.('voiceschanged', fillVoices);

  const rateOut = h('b', `${s.rate.toFixed(2)}×`);
  const fileIn = h('input', {
    type: 'file', accept: 'application/json', hidden: true,
    onchange: async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try { importData(await f.text()); toast('Progrès importés'); location.reload(); } catch (err) { toast(`Import impossible : ${err.message}`); }
    },
  });

  el.append(
    h('div.card',
      h('div.stats',
        h('div', h('b', streak()), h('span', 'jours de suite')),
        h('div', h('b', tot.reviews || 0), h('span', 'cartes révisées')),
        h('div', h('b', S().colles.length), h('span', 'colles'))),
      h('div.stats', { style: { marginTop: '12px' } },
        h('div', h('b', st.mature), h('span', 'mots maîtrisés')),
        h('div', h('b', st.learning), h('span', 'en cours')),
        h('div', h('b', tot.oral || 0), h('span', 'exercices oraux'))),
      h('h3', 'Activité des 14 derniers jours'),
      h('div.chart', days.map((d) => h('div', { title: `${d.key} : ${d.n}`, style: { height: `${(d.n / max) * 100}%` } }))),
      h('div.chart-labels', days.map((d) => h('span', d.label)))),
    h('div.card.stack',
      h('h2', 'Réglages'),
      h('p.small.muted', 'Les textes, les mots et les questions du jury sont lus par des voix enregistrées naturelles. La voix ci-dessous ne sert que pour les rares phrases sans enregistrement.'),
      h('label.field', 'Voix de secours (navigateur)', voiceSel),
      h('label.field', 'Vitesse de lecture ', rateOut,
        h('input', { type: 'range', min: 0.5, max: 1.2, step: 0.05, value: s.rate, oninput: (e) => { s.rate = +e.target.value; rateOut.textContent = `${s.rate.toFixed(2)}×`; save(); } })),
      h('button.btn.small', { onclick: () => speak('高考是中国最重要的考试之一。') }, '🔊 Tester la voix'),
      h('label.field', 'Nouvelles cartes par jour',
        h('select', { onchange: (e) => { s.newPerDay = +e.target.value; save(); } },
          [5, 10, 15, 20, 30].map((n) => h('option', { value: n, selected: n === s.newPerDay }, n)))),
      h('div', h('div.small.muted', 'Thème'), seg([['auto', 'Auto'], ['light', 'Clair'], ['dark', 'Sombre']], s.theme, (t) => { s.theme = t; save(); applyTheme(); }))),
    h('div.card.stack',
      h('h2', 'Mes données'),
      h('p.small.muted', 'Tes progrès sont enregistrés uniquement dans ce navigateur, sur cet appareil. Pas de compte, rien n’est envoyé sur Internet. Pour changer d’appareil, exporte puis importe le fichier.'),
      h('div.row',
        h('button.btn', { onclick: () => download(new Blob([exportData()], { type: 'application/json' }), `mandarin-prepa-${dayKey()}.json`) }, '⬇ Exporter'),
        h('button.btn', { onclick: () => fileIn.click() }, '⬆ Importer'), fileIn,
        h('button.btn', {
          onclick: async (e) => {
            const b = e.currentTarget, files = audioFiles();
            b.disabled = true;
            const cache = await caches.open('mp-audio');
            let n = 0;
            for (let i = 0; i < files.length; i += 8) {
              await Promise.all(files.slice(i, i + 8).map((f) => cache.match(f).then((hit) => hit || cache.add(f)).catch(() => {})));
              n = Math.min(files.length, i + 8);
              b.textContent = `Téléchargement… ${n}/${files.length}`;
            }
            b.textContent = 'Voix disponibles hors ligne ✓';
          },
        }, '⬇ Voix pour le hors-ligne'),
        h('button.btn.ghost', { onclick: () => { if (confirm('Effacer tous les progrès sur cet appareil ?')) { reset(); location.reload(); } } }, 'Tout effacer'))),
    h('div.card',
      h('h2', 'Cet appareil'),
      h('table.simple',
        h('tr', h('td', 'Synthèse vocale'), h('td', canSpeak ? (zhVoices().length ? `oui (${zhVoices().length} voix chinoises)` : 'oui, mais aucune voix chinoise trouvée') : 'non')),
        h('tr', h('td', 'Reconnaissance vocale'), h('td', canRecognize ? 'oui' : 'non (essaie Chrome ou Safari)')),
        h('tr', h('td', 'Enregistrement'), h('td', canRecord ? 'oui' : 'non'))),
      h('p.small.muted', 'Astuce : sur iPhone, ouvre l’app dans Safari puis « Partager › Sur l’écran d’accueil » pour l’installer. Sur Android : menu ⋮ › « Installer l’application ». Pour une voix plus naturelle sur iPhone : Réglages › Accessibilité › Contenu énoncé › Voix › Chinois.')),
  );
}
