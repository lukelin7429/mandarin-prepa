import { h, zh, shuffle, pick, tokText, fmtTime } from '../ui.js';
import { speak } from '../speech.js';
import { S, save, log } from '../store.js';
import { sentences } from '../sentences.js';

const GAMES = [
  ['tons', '声', 'Chasse aux tons', 'Écoute une syllabe et trouve son ton.'],
  ['paires', '对', 'Paires', 'Associe chaque mot à sa traduction, le plus vite possible.'],
  ['phrase', '句', 'Phrase en désordre', 'Remets les mots dans le bon ordre.'],
  ['eclair', '快', 'Éclair', '60 secondes : un maximum de bonnes réponses.'],
];
const TONE_MARK = ['', 'ā  (1er ton, haut)', 'á  (2e, montant)', 'ǎ  (3e, descendant-montant)', 'à  (4e, descendant)'];

export default function games(el, { content, params }) {
  let timers = [];
  const clean = () => { timers.forEach(clearInterval); timers = []; };
  const g = params[0];
  if (g === 'tons') tones();
  else if (g === 'paires') pairs();
  else if (g === 'phrase') order();
  else if (g === 'eclair') rush();
  else menu();
  return clean;

  function best(id, score, higherIsBetter = true) {
    const b = S().games[id];
    const better = b == null || (higherIsBetter ? score > b : score < b);
    if (better) { S().games[id] = score; save(); }
    log('games');
    return better;
  }

  function menu() {
    el.replaceChildren(h('div.grid', GAMES.map(([id, ico, name, desc]) =>
      h('a.tile', { href: `#/jeux/${id}` }, h('div.big', ico), h('b', name), h('span', desc),
        S().games[id] != null ? h('div.small', { style: { marginTop: '6px' } }, `Record : ${id === 'paires' ? fmtTime(S().games[id]) : S().games[id]}`) : null))));
  }

  function end(title, line, again) {
    el.replaceChildren(h('div.card', { style: { textAlign: 'center' } },
      h('div.big-hz', title), h('p', line),
      h('div.row', { style: { justifyContent: 'center' } },
        h('button.btn.primary', { onclick: again }, 'Rejouer'),
        h('a.btn', { href: '#/jeux' }, 'Autres jeux'))));
  }

  // --- Tones -------------------------------------------------------------
  function tones() {
    const N = 12;
    const items = shuffle(content.tones).slice(0, N);
    let i = 0, score = 0;
    const show = () => {
      if (i >= N) {
        const rec = best('tons', score);
        return end(score >= 10 ? '厉害！' : '加油！', `${score} / ${N}${rec ? ' — nouveau record !' : ''}`, tones);
      }
      const it = items[i];
      const info = h('p', { hidden: true, style: { textAlign: 'center' } }, zh(it.h, ''), ' ', h('span', { class: `t${it.t}` }, it.p), ' — ', it.fr);
      const next = h('button.btn.primary.block', { hidden: true, onclick: () => { i++; show(); } }, 'Suivant →');
      const btns = [1, 2, 3, 4].map((t) => h('button.choice', {
        onclick: () => {
          btns.forEach((b, j) => { b.disabled = true; if (j + 1 === it.t) b.classList.add('ok'); });
          if (t !== it.t) btns[t - 1].classList.add('bad'); else score++;
          info.hidden = false; next.hidden = false;
        },
      }, h('b', { class: `t${t}` }, `${t}`), h('div.small', TONE_MARK[t])));
      el.replaceChildren(
        h('div.row.spread.small.muted', h('span', `${i + 1} / ${N}`), h('span', `Score : ${score}`)),
        h('div.card.stack',
          h('div.row', { style: { justifyContent: 'center' } },
            h('button.btn.primary', { onclick: () => speak(it.h, { rate: 0.7 }) }, '🔊 Réécouter')),
          h('div.choices', btns), info),
        next);
      speak(it.h, { rate: 0.7 });
    };
    show();
  }

  // --- Pairs -------------------------------------------------------------
  function pairs() {
    const words = pick(content.vocab.filter((v) => v.fr.length <= 28), 6);
    const cells = shuffle([...words.map((w) => ({ w, side: 'zh' })), ...words.map((w) => ({ w, side: 'fr' }))]);
    let sel = null, found = 0, errors = 0;
    const t0 = Date.now();
    const clock = h('span');
    timers.push(setInterval(() => { clock.textContent = fmtTime((Date.now() - t0) / 1000); }, 250));
    const btns = cells.map((c) => {
      const b = h('button.choice', {
        onclick: () => {
          if (b.classList.contains('done')) return;
          if (c.side === 'zh') speak(c.w.h);
          if (!sel) { sel = { c, b }; b.classList.add('sel'); return; }
          if (sel.b === b) { b.classList.remove('sel'); sel = null; return; }
          if (sel.c.w === c.w && sel.c.side !== c.side) {
            b.classList.add('ok'); sel.b.classList.remove('sel'); sel.b.classList.add('ok');
            const a = sel.b;
            setTimeout(() => { a.classList.add('done'); b.classList.add('done'); }, 350);
            sel = null;
            if (++found === words.length) {
              clean();
              const sec = Math.round((Date.now() - t0) / 1000) + errors * 3;
              const rec = best('paires', sec, false);
              setTimeout(() => end('完成！', `${fmtTime(sec)} (dont ${errors * 3} s de pénalité)${rec ? ' — nouveau record !' : ''}`, pairs), 400);
            }
          } else {
            errors++;
            b.classList.add('bad');
            const a = sel.b;
            setTimeout(() => { b.classList.remove('bad'); a.classList.remove('sel'); }, 400);
            sel = null;
          }
        },
      }, c.side === 'zh' ? zh(c.w.h) : c.w.fr);
      return b;
    });
    el.replaceChildren(h('div.row.spread.small.muted', h('span', 'Associe les paires'), clock), h('div.pairs', btns));
  }

  // --- Word order --------------------------------------------------------
  function order() {
    const pool = [...sentences(content, { min: 6, max: 22 }), ...content.phrases.filter((p) => !p.zh.some((t) => t.w.includes('…'))).map((p) => ({ tokens: p.zh, fr: p.fr }))];
    const N = 5;
    const items = pick(pool, N);
    let i = 0, score = 0;
    const show = () => {
      if (i >= N) { const rec = best('phrase', score); return end('真棒！', `${score} / ${N}${rec ? ' — nouveau record !' : ''}`, order); }
      const it = items[i];
      const words = it.tokens.filter((t) => !t.k);
      const target = words.map((t) => t.w).join('');
      let chosen = [];
      const answer = h('div.tokens');
      const bank = h('div.tokens', { style: { borderStyle: 'solid' } });
      const result = h('div');
      const draw = () => {
        answer.replaceChildren(...chosen.map((t, k) => h('button', { onclick: () => { chosen.splice(k, 1); draw(); } }, t.w)));
        const left = shuffled.filter((t) => !chosen.includes(t));
        bank.replaceChildren(...left.map((t) => h('button', { onclick: () => { chosen.push(t); speak(t.w); draw(); } }, t.w)));
      };
      let shuffled = shuffle(words);
      if (shuffled.map((t) => t.w).join('') === target && words.length > 1) shuffled = shuffled.reverse();
      draw();
      const check = h('button.btn.primary', {
        onclick: () => {
          const ok = chosen.map((t) => t.w).join('') === target;
          if (ok) score++;
          check.hidden = true;
          result.replaceChildren(
            h('p', ok ? '✓ Bravo !' : '✗ Ordre correct :'),
            h('p.hz', { lang: 'zh-CN', style: { fontSize: '20px' } }, tokText(it.tokens)),
            h('p.small.pin', words.map((t) => t.p).join(' ')),
            h('button.btn.primary', { onclick: () => { i++; show(); } }, 'Suivant →'));
          speak(tokText(it.tokens));
        },
      }, 'Vérifier');
      el.replaceChildren(
        h('div.row.spread.small.muted', h('span', `${i + 1} / ${N}`), h('span', `Score : ${score}`)),
        h('div.card.stack',
          it.fr ? h('p', h('span.small.muted', 'Sens : '), it.fr) : h('p.small.muted', it.title_fr || ''),
          answer, bank, h('div.row', check, h('button.btn.small', { onclick: () => { chosen = []; draw(); } }, 'Effacer')), result));
    };
    show();
  }

  // --- 60-second rush ----------------------------------------------------
  function rush() {
    const vocab = content.vocab;
    let score = 0, misses = 0;
    const tEnd = Date.now() + 60000;
    const clock = h('b');
    const box = h('div');
    timers.push(setInterval(() => {
      const left = (tEnd - Date.now()) / 1000;
      clock.textContent = fmtTime(left);
      if (left <= 0) {
        clean();
        const rec = best('eclair', score);
        end('时间到！', `${score} bonnes réponses, ${misses} erreurs${rec ? ' — nouveau record !' : ''}`, rush);
      }
    }, 200));
    const show = () => {
      const t = pick(vocab, 1)[0];
      const opts = shuffle([t, ...pick(vocab.filter((v) => v !== t), 3)]);
      box.replaceChildren(h('div.card.stack',
        h('div.big-hz', { lang: 'zh-CN' }, t.h),
        h('div.stack', opts.map((o) => h('button.choice', {
          onclick: (e) => {
            if (o === t) { score++; show(); }
            else { misses++; e.currentTarget.classList.add('bad'); e.currentTarget.disabled = true; }
          },
        }, o.fr)))));
    };
    el.replaceChildren(h('div.row.spread', h('span', 'Temps : ', clock), h('span.small.muted', 'Choisis la bonne traduction')), box);
    show();
  }
}
