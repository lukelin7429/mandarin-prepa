// Three-step welcome tour, shown once on first launch.
import { h } from './ui.js';
import { S, save } from './store.js';

const STEPS = [
  ['你好！', 'Bienvenue', 'Cette application t’aide à préparer le chinois LV2 des concours : vocabulaire, écoute, oral et colles, avec des voix naturelles.'],
  ['📱', 'Installe-la', 'Sur iPhone : Safari › Partager › « Sur l’écran d’accueil ». Sur Android : Chrome › ⋮ › « Installer l’application ». Elle marche aussi hors ligne.'],
  ['🎙', 'Autorise le micro', 'Pour les exercices d’oral et les colles, accepte quand le navigateur demande le micro. Tes enregistrements restent sur ton appareil.'],
  ['⏱', '15 minutes par jour', 'Cartes, un peu d’oral, un peu d’écoute. Et une colle par semaine. Le mode d’emploi complet est toujours sur l’écran d’accueil.'],
];

export function maybeShowTour() {
  if (S().settings.seenTour) return;
  showTour();
}

export function showTour() {
  let i = 0;
  const bg = h('div.sheet-bg');
  const box = h('div.sheet.tour', { role: 'dialog', 'aria-modal': 'true' });
  const close = (toGuide) => {
    S().settings.seenTour = true;
    save();
    bg.remove();
    box.remove();
    if (toGuide) location.hash = '#/guide';
  };
  const draw = () => {
    const [ico, title, text] = STEPS[i];
    const last = i === STEPS.length - 1;
    box.replaceChildren(
      h('div.tour-ico', { lang: 'zh-CN' }, ico),
      h('h2', title),
      h('p', text),
      h('div.tour-dots', STEPS.map((_, j) => h('i', { class: j === i ? 'on' : '' }))),
      h('div.row.spread',
        h('button.btn.ghost.small', { onclick: () => close(false) }, 'Passer'),
        last
          ? h('div.row',
              h('button.btn.small', { onclick: () => close(true) }, 'Mode d’emploi'),
              h('button.btn.primary', { onclick: () => close(false) }, 'C’est parti !'))
          : h('button.btn.primary', { onclick: () => { i++; draw(); } }, 'Suivant →')),
    );
  };
  draw();
  document.body.append(bg, box);
}
