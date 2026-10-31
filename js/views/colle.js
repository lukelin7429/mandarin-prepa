import { h, zh, seg, renderTokens, tokText, parasText, fmtTime, toast, download, wordSheet, speakBtn, pick } from '../ui.js';
import { speak, stopSpeaking, makeRecorder, canRecord } from '../speech.js';
import { S, save, log } from '../store.js';

// Timings: HEC jury reports 2023-2025 (oral ELVi) and the usual class colle.
const FORMATS = {
  concours: {
    label: 'Concours (HEC/ESCP)', prep: 20,
    parts: [['synthese', 'Synthèse', 2, 3], ['commentaire', 'Commentaire', 4, 5], ['entretien', 'Entretien', 6, 7]],
  },
  classe: {
    label: 'Colle en classe', prep: 20,
    parts: [['synthese', 'Synthèse', 3, 5], ['commentaire', 'Commentaire', 5, 7], ['entretien', 'Entretien', 8, 10]],
  },
};

// Grid used for class colles.
const CRITERIA_CLASSE = [
  ['prononciation', 'Prononciation (tons, syllabes)'],
  ['syntaxe', 'Syntaxe (ordre des mots, phrases complètes)'],
  ['lexique', 'Richesse lexicale (le mot juste)'],
  ['contenu', 'Contenu et cohérence'],
];

const CRITERIA = [
  ['synthese', 'Capacité de synthèse (pas de paraphrase)'],
  ['commentaire', 'Pertinence du commentaire (lien avec le texte)'],
  ['entretien', 'Qualité de l’échange avec le jury'],
  ['langue', 'Qualité de la langue (tons, registre, fluidité)'],
];

export default function colle(el, { content, params, vocabIndex }) {
  let cleanup = [];
  const clean = () => { cleanup.forEach((f) => { try { f(); } catch {} }); cleanup = []; };
  let wake = null;
  const keepAwake = async () => { try { wake = await navigator.wakeLock?.request('screen'); } catch {} };
  cleanup.push(() => wake && wake.release && wake.release());

  const settings = S().settings;
  settings.colleFormat ||= 'concours';

  const doc = params[0] && content.colles.find((c) => c.id === params[0]);
  if (doc) intro(doc); else list();

  function list() {
    const hist = S().colles;
    el.replaceChildren(
      h('div.card',
        h('h2', 'Comment ça marche'),
        h('p', 'On tire un document, tu as 20 minutes pour le préparer, puis tu présentes à voix haute : synthèse, commentaire, puis questions du jury lues par l’application. Tu es enregistrée pour pouvoir t’écouter ensuite.'),
        h('button.btn.primary', { onclick: () => { location.hash = `#/colle/${pick(content.colles, 1)[0].id}`; } }, '🎲 Tirer un sujet au hasard')),
      h('div.card', h('h2', 'Choisir un sujet'),
        content.colles.map((c) => h('a.row.spread', { href: `#/colle/${c.id}`, style: { padding: '10px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit' } },
          h('div', zh(tokText(c.title)), h('div.small.muted', c.title_fr)),
          h('span.chip', hist.some((x) => x.id === c.id) ? 'fait ✓' : `${c.chars} car.`)))),
      hist.length ? h('div.card', h('h2', 'Mes colles'),
        h('table.simple', h('tr', h('th', 'Date'), h('th', 'Sujet'), h('th', 'Durée'), h('th', 'Auto-éval.')),
          hist.slice().reverse().map((x) => h('tr',
            h('td', new Date(x.date).toLocaleDateString('fr-FR')),
            h('td', x.title_fr),
            h('td', fmtTime(x.total)),
            h('td', x.self ? `${Object.values(x.self).reduce((a, b) => a + b, 0)}/20` : '—'))))) : null,
    );
  }

  function intro(c) {
    const fmt = FORMATS[settings.colleFormat];
    el.replaceChildren(
      h('div.card.stack',
        h('div.small.muted', 'Sujet tiré'),
        h('h2', zh(tokText(c.title))),
        h('p.muted', c.title_fr),
        h('div', h('span.small.muted', 'Format : '),
          seg(Object.entries(FORMATS).map(([k, f]) => [k, f.label]), settings.colleFormat, (k) => { settings.colleFormat = k; save(); intro(c); })),
        h('table.simple',
          h('tr', h('td', 'Préparation'), h('td', `${fmt.prep} min`)),
          fmt.parts.map(([, name, a, b]) => h('tr', h('td', name), h('td', `${a} à ${b} min`)))),
        h('p.small.muted', 'Pendant la préparation, le pinyin est masqué comme le jour du concours. Tu peux toucher un mot pour voir sa traduction (l’aide est comptée).'),
        h('button.btn.primary.block', { onclick: () => prep(c) }, `▶ Commencer les ${fmt.prep} minutes de préparation`)),
    );
  }

  function prep(c) {
    clean();
    keepAwake();
    const fmt = FORMATS[settings.colleFormat];
    const state = { c, fmt, helps: 0, notes: '', durations: {} };
    const end = Date.now() + fmt.prep * 60000;
    let pinMode = 'off';
    const timer = h('div.timer', { style: { fontSize: '30px', textAlign: 'left' } });
    const textBox = h('div.text-zh', { lang: 'zh-CN' });
    const drawText = () => {
      textBox.className = 'text-zh' + (pinMode === 'on' ? ' pinyin-on' : '');
      textBox.replaceChildren(...c.paras.map((p) => h('p', renderTokens(p, {
        mode: pinMode,
        onWord: (t) => { state.helps++; wordSheet(t, vocabIndex); },
      }))));
    };
    drawText();
    const notes = h('textarea', { lang: 'zh-CN', placeholder: 'Plan, mots-clés, idées… (en chinois ou en français)', oninput: (e) => { state.notes = e.target.value; } });
    let warned = false;
    const tick = setInterval(() => {
      const left = (end - Date.now()) / 1000;
      timer.textContent = fmtTime(left);
      timer.classList.toggle('late', left < 0);
      if (left <= 0 && !warned) {
        warned = true;
        navigator.vibrate?.(400);
        toast('Temps de préparation écoulé : passe à l’oral !', 4000);
      }
    }, 250);
    cleanup.push(() => clearInterval(tick));

    el.replaceChildren(
      h('div.card.sticky-timer', { style: { padding: '8px 16px' } },
        h('div.row.spread', h('div', h('div.small.muted', 'Préparation'), timer),
          h('button.btn.primary.small', { onclick: () => expose(state) }, 'Passer à l’oral →'))),
      h('div.card',
        h('div.row.spread', h('h2', zh(tokText(c.title))),
          seg([['off', 'Sans pinyin'], ['on', 'Pinyin']], pinMode, (m) => { if (m === 'on') state.helps++; pinMode = m; drawText(); })),
        textBox),
      h('div.card', h('h2', 'Mes notes'), notes),
      method(),
      phraseBank(),
    );
  }

  function method() {
    return h('details.card',
      h('summary', 'Méthode (conseils des rapports du jury HEC)'),
      h('h3', '1. Synthèse (2 à 3 min)'),
      h('p.small', 'Commence par une phrase qui résume tout (这篇文章说的是…), puis ne suis pas l’ordre du texte. Présente le titre, la source et le thème. Dégage l’idée principale et 2 ou 3 axes. Reformule avec tes mots : le jury pénalise la paraphrase et les plans scolaires du type « la première partie dit que… ». Cite les chiffres exacts du texte, sans en inventer.'),
      h('h3', '2. Commentaire (4 à 5 min)'),
      h('p.small', 'Pose une problématique liée directement à l’article. Deux arguments, des exemples (Chine, Taïwan, France). Si tu réutilises un sujet vu en cours, ajoute des phrases de transition qui le relient au texte.'),
      h('h3', '3. Entretien (6 à 7 min)'),
      h('p.small', 'Écoute bien, reformule si besoin, réponds en phrases complètes. Garde un registre soutenu : évite les tics comme « 就… » en début de phrase.'),
    );
  }

  function phraseBank() {
    const stages = [['intro', 'Introduction'], ['synthese', 'Synthèse'], ['commentaire', 'Commentaire'], ['conclusion', 'Conclusion'], ['entretien', 'Entretien']];
    return h('details.card',
      h('summary', 'Phrases utiles'),
      stages.map(([st, name]) => [h('h3', name),
        content.phrases.filter((p) => p.stage === st).map((p) => h('div.phrase.row.spread',
          h('div', h('div.hz', { lang: 'zh-CN' }, tokText(p.zh)), h('div.small.pin', p.zh.filter((t) => !t.k).map((t) => t.p).join(' ')), h('div.small.muted', p.fr)),
          speakBtn(tokText(p.zh))))]));
  }

  function expose(state) {
    clean();
    keepAwake();
    stopSpeaking();
    const { c, fmt } = state;
    // Start recording in the background so a pending mic prompt never blocks the oral.
    let rec = null, alive = true, micMsg = canRecord ? 'micro : en attente d’autorisation' : 'sans enregistrement';
    if (canRecord) {
      makeRecorder().then((r) => {
        if (!alive) return r.release();
        rec = state.rec = r;
        r.start();
      }).catch(() => { micMsg = 'micro refusé : pas d’enregistrement'; });
    }
    cleanup.push(() => { alive = false; rec && rec.release(); });
    let part = 0;
    let partStart = Date.now();
    const t0 = Date.now();
    const timer = h('div.timer');
    const totalEl = h('div.small.muted', { style: { textAlign: 'center' } });
    const phases = h('div.phases');
    const hint = h('p.small.muted', { style: { textAlign: 'center' } });
    const body = h('div');
    const drawPhases = () => phases.replaceChildren(...fmt.parts.map(([, name], i) =>
      h('div', { class: i < part ? 'done' : i === part ? 'on' : '' }, name)));
    const tick = setInterval(() => {
      const [, , a, b] = fmt.parts[part];
      const sec = (Date.now() - partStart) / 1000;
      timer.textContent = fmtTime(sec);
      timer.classList.toggle('late', sec > b * 60);
      hint.textContent = sec < a * 60 ? `Objectif : ${a} à ${b} min` : sec <= b * 60 ? 'Bon timing — tu peux conclure cette partie.' : 'Temps dépassé : passe à la suite.';
      totalEl.textContent = `Total : ${fmtTime((Date.now() - t0) / 1000)} · ${rec ? '● enregistrement en cours' : micMsg}`;
    }, 250);
    cleanup.push(() => clearInterval(tick));

    const nextPart = () => {
      state.durations[fmt.parts[part][0]] = (Date.now() - partStart) / 1000;
      part++;
      partStart = Date.now();
      if (part >= fmt.parts.length) return finish(state, (Date.now() - t0) / 1000);
      drawPhases();
      drawBody();
    };

    const refDoc = () => h('details.card', h('summary', 'Document et notes'),
      h('div.text-zh', { lang: 'zh-CN', style: { fontSize: '18px' } }, c.paras.map((p) => h('p', renderTokens(p, { mode: 'off' })))),
      state.notes ? h('pre', { style: { whiteSpace: 'pre-wrap', fontFamily: 'var(--zh)' } }, state.notes) : null);

    let qi = 0;
    const drawBody = () => {
      const key = fmt.parts[part][0];
      if (key === 'synthese') {
        body.replaceChildren(h('div.card', h('p', 'Commence : présente le document et résume ses idées principales.'),
          h('button.btn.primary.block', { onclick: nextPart }, 'Passer au commentaire →')), refDoc());
      } else if (key === 'commentaire') {
        body.replaceChildren(h('div.card', h('p', 'Donne ton point de vue : problématique, arguments, exemples.'),
          h('button.btn.primary.block', { onclick: nextPart }, 'Passer à l’entretien →')), refDoc());
      } else {
        const qs = c.questions;
        const q = qs[qi];
        const qText = tokText(q.zh);
        const shown = h('div', { hidden: true },
          h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: '19px' } }, renderTokens(q.zh, { mode: 'on' })),
          h('p.small.muted', q.fr));
        body.replaceChildren(h('div.card.stack',
          h('div.small.muted', `Question du jury ${qi + 1} / ${qs.length}`),
          h('div.row', h('button.btn', { onclick: () => speak(qText) }, '🔊 Réécouter'),
            h('button.btn.small', { onclick: () => { shown.hidden = !shown.hidden; if (!shown.hidden) state.helps++; } }, 'Afficher la question (aide)')),
          shown,
          qi < qs.length - 1
            ? h('button.btn.primary.block', { onclick: () => { qi++; drawBody(); } }, 'Question suivante →')
            : h('button.btn.primary.block', { onclick: nextPart }, 'Terminer la colle ✓')), refDoc());
        setTimeout(() => speak(qText), 300);
      }
    };

    el.replaceChildren(h('div.card.sticky-timer.stack', phases, timer, hint, totalEl), body);
    drawPhases();
    drawBody();
  }

  async function finish(state, total) {
    const blob = state.rec && state.rec.recording ? await state.rec.stop() : null;
    state.rec = null;
    clean();
    stopSpeaking();
    log('colle');
    const { c, fmt } = state;
    const entry = { id: c.id, title_fr: c.title_fr, date: Date.now(), total: Math.round(total), durations: state.durations, helps: state.helps, format: settings.colleFormat };
    S().colles.push(entry);
    save();
    const url = blob ? URL.createObjectURL(blob) : null;
    cleanup.push(() => url && URL.revokeObjectURL(url));
    const self = {};
    const sliders = (settings.colleFormat === 'classe' ? CRITERIA_CLASSE : CRITERIA).map(([k, label]) => {
      self[k] = 3;
      const out = h('b', '3/5');
      return h('label.field', label, ' ', out,
        h('input', { type: 'range', min: 1, max: 5, value: 3, oninput: (e) => { self[k] = +e.target.value; out.textContent = `${e.target.value}/5`; } }));
    });
    el.replaceChildren(
      h('div.card', h('h2', 'Bilan de la colle'),
        h('table.simple', fmt.parts.map(([k, name, a, b]) => {
          const d = state.durations[k] || 0;
          const st = d < a * 60 ? ['warn', 'trop court'] : d > b * 60 ? ['bad', 'trop long'] : ['ok', 'bien'];
          return h('tr', h('td', name), h('td', fmtTime(d)), h('td', `${a}–${b} min`), h('td', h(`span.chip.${st[0]}`, st[1])));
        }), h('tr', h('td', h('b', 'Total')), h('td', h('b', fmtTime(total))), h('td', ''), h('td', ''))),
        h('p.small.muted', `Aides utilisées : ${state.helps}`)),
      url ? h('div.card.stack', h('h2', 'Ton enregistrement'),
        h('audio', { controls: true, src: url, style: { width: '100%' } }),
        h('p.small.muted', 'L’enregistrement n’est gardé que sur cet appareil. Télécharge-le si tu veux le garder ou l’envoyer à ton professeur.'),
        h('button.btn', { onclick: () => download(blob, `colle-${c.id}-${new Date().toISOString().slice(0, 10)}.${blob.type.includes('mp4') ? 'm4a' : 'webm'}`) }, '⬇ Télécharger')) : null,
      h('div.card.stack', h('h2', 'Auto-évaluation'),
        h('p.small.muted', 'Réécoute-toi avant de noter.'),
        sliders,
        h('button.btn.primary', { onclick: () => { entry.self = { ...self }; save(); toast('Auto-évaluation enregistrée'); location.hash = '#/colle'; } }, 'Enregistrer')),
      h('div.card', h('h2', 'Le document'),
        h('div.text-zh.pinyin-on', { lang: 'zh-CN', style: { fontSize: '18px' } }, c.paras.map((p) => h('p', renderTokens(p, { mode: 'on', onWord: (t) => wordSheet(t, vocabIndex) })))),
        h('button.btn.small', { onclick: () => speak(parasText(c.paras)) }, '🔊 Écouter le texte')),
    );
  }

  return clean;
}
