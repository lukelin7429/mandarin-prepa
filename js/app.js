import { load, S } from './store.js';
import { stopSpeaking, loadPinyinMap, loadAudioIndex } from './speech.js';
import { closeSheet, h } from './ui.js';
import home from './views/home.js';
import cards from './views/cards.js';
import listen from './views/listen.js';
import oral from './views/oral.js';
import colle from './views/colle.js';
import reading from './views/reading.js';
import games from './views/games.js';
import exam from './views/exam.js';
import progress from './views/progress.js';
import guide from './views/guide.js';
import { maybeShowTour } from './tour.js';

const routes = {
  '': [home, 'Mandarin Prépa', 'home'],
  cartes: [cards, 'Cartes mémoire', 'cartes'],
  ecoute: [listen, 'Écoute', 'home'],
  oral: [oral, 'Expression orale', 'oral'],
  colle: [colle, 'Simulateur de colle', 'colle'],
  lecture: [reading, 'Lecture', 'lecture'],
  jeux: [games, 'Jeux', 'home'],
  examen: [exam, 'Le concours', 'home'],
  progres: [progress, 'Progrès et réglages', 'home'],
  guide: [guide, 'Mode d’emploi', 'home'],
};

const app = { content: null, vocabIndex: new Map() };
let cleanup = null;

async function boot() {
  load();
  applyTheme();
  try {
    app.content = await (await fetch('content/content.json')).json();
  } catch {
    document.getElementById('view').replaceChildren(h('p.notice', 'Impossible de charger le contenu. Vérifie ta connexion puis recharge la page.'));
    return;
  }
  for (const v of app.content.vocab) app.vocabIndex.set(v.h, v);
  loadPinyinMap();
  await loadAudioIndex();
  window.addEventListener('hashchange', route);
  document.getElementById('back').addEventListener('click', () => history.length > 1 ? history.back() : (location.hash = '#/'));
  route();
  maybeShowTour();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

export function applyTheme() {
  const t = S().settings.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
}

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const [name = '', ...params] = parts;
  const [view, title, tab] = routes[name] || routes[''];
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
  stopSpeaking();
  closeSheet();
  const el = document.getElementById('view');
  el.replaceChildren();
  // Views pass optional parts as `cond ? node : null`; skip the nulls.
  const ok = (k) => k.flat(Infinity).filter((x) => x != null && x !== false);
  el.append = (...k) => Element.prototype.append.apply(el, ok(k));
  el.replaceChildren = (...k) => Element.prototype.replaceChildren.apply(el, ok(k));
  document.getElementById('title').textContent = title;
  document.getElementById('back').hidden = !name;
  document.querySelectorAll('#tabbar a').forEach((a) => a.classList.toggle('on', a.dataset.tab === tab));
  window.scrollTo(0, 0);
  const setTitle = (t) => { document.getElementById('title').textContent = t; };
  cleanup = view(el, { ...app, params, setTitle }) || null;
}

boot();
