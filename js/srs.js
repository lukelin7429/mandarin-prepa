// Spaced repetition (simplified SM-2). Grades: 0 again, 1 hard, 2 good, 3 easy.
import { S, save, log, dayKey } from './store.js';

const DAY = 86400000;
const MIN = 60000;

export const isNew = (id) => !S().cards[id];

export function dueList(vocab, now = Date.now()) {
  const cards = S().cards;
  return vocab.filter((v) => cards[v.id] && cards[v.id].due <= now)
    .sort((a, b) => cards[a.id].due - cards[b.id].due);
}

export function newToday() {
  return (S().days[dayKey()] || {}).newCards || 0;
}

export function newList(vocab) {
  const left = Math.max(0, S().settings.newPerDay - newToday());
  return vocab.filter((v) => isNew(v.id)).slice(0, left);
}

function next(c, grade, now) {
  c = { ef: 2.5, iv: 0, reps: 0, lapses: 0, ...c };
  if (grade === 0) {
    return { ...c, reps: 0, lapses: c.lapses + 1, iv: 0, ef: Math.max(1.3, c.ef - 0.2), due: now + 10 * MIN };
  }
  let iv;
  if (c.reps === 0) iv = [0, 1, 1, 4][grade];
  else if (c.reps === 1) iv = [0, 2, 3, 6][grade];
  else iv = Math.round(c.iv * [0, 1.2, c.ef, c.ef * 1.3][grade]);
  iv = Math.max(1, iv);
  const ef = Math.max(1.3, c.ef + [0, -0.15, 0, 0.15][grade]);
  return { ...c, reps: c.reps + 1, iv, ef, due: now + iv * DAY - 3 * 3600000 };
}

/** Human label of the next interval for each grade (shown on buttons). */
export function preview(id) {
  const now = Date.now();
  const c = S().cards[id];
  return [0, 1, 2, 3].map((g) => {
    const n = next(c, g, now);
    return g === 0 ? '10 min' : n.iv === 1 ? '1 j' : n.iv < 31 ? `${n.iv} j` : `${Math.round(n.iv / 30)} mois`;
  });
}

export function grade(id, g) {
  const cards = S().cards;
  const wasNew = !cards[id];
  cards[id] = next(cards[id], g, Date.now());
  if (wasNew) log('newCards');
  log('reviews');
  save();
  return cards[id];
}

export function deckStats(vocab) {
  const cards = S().cards;
  let fresh = 0, learning = 0, mature = 0, due = 0;
  const now = Date.now();
  for (const v of vocab) {
    const c = cards[v.id];
    if (!c) fresh++;
    else {
      if (c.iv >= 21) mature++; else learning++;
      if (c.due <= now) due++;
    }
  }
  return { fresh, learning, mature, due };
}
