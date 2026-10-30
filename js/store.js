// Progress lives only in this browser (localStorage). No account, no server.
const KEY = 'mandarin-prepa:v1';

const defaults = () => ({
  cards: {},      // word id -> SRS state
  days: {},       // 'YYYY-MM-DD' -> { reviews, newCards, oral, colle, read, games, listen }
  colles: [],     // colle history (no audio)
  read: {},       // text id -> { done: date, quiz: score }
  games: {},      // game id -> best score
  settings: { rate: 0.85, voice: '', newPerDay: 10, pinyin: 'tap', theme: 'auto', cardMode: 'zh' },
  created: Date.now(),
});

let state = defaults();

export function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    state = { ...defaults(), ...raw, settings: { ...defaults().settings, ...(raw.settings || {}) } };
  } catch {
    state = defaults();
  }
  try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch {}
  return state;
}

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
}

export const S = () => state;

export function dayKey(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function log(kind, n = 1) {
  const d = (state.days[dayKey()] ||= {});
  d[kind] = (d[kind] || 0) + n;
  save();
}

export function dayTotal(key) {
  const d = state.days[key];
  if (!d) return 0;
  return Object.values(d).reduce((a, b) => a + b, 0);
}

export function streak() {
  let n = 0;
  const d = new Date();
  if (!dayTotal(dayKey(d))) d.setDate(d.getDate() - 1); // today not started yet
  while (dayTotal(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

export function exportData() {
  return JSON.stringify({ app: 'mandarin-prepa', exported: new Date().toISOString(), state }, null, 1);
}

export function importData(text) {
  const obj = JSON.parse(text);
  if (!obj || obj.app !== 'mandarin-prepa' || !obj.state) throw new Error('Fichier non reconnu');
  state = { ...defaults(), ...obj.state, settings: { ...defaults().settings, ...(obj.state.settings || {}) } };
  save();
}

export function reset() {
  state = defaults();
  save();
}
