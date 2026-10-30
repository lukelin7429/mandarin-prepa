// Split tokenized paragraphs into sentences (token arrays).
export function sentences(content, { min = 6, max = 40 } = {}) {
  const out = [];
  const docs = [...content.texts, ...content.colles];
  for (const d of docs) {
    for (const p of d.paras) {
      let cur = [];
      for (const t of p) {
        cur.push(t);
        if (t.k === 'p' && /[。！？]/.test(t.w)) { push(cur, d); cur = []; }
      }
      push(cur, d);
    }
  }
  function push(tokens, d) {
    while (tokens.length && tokens[0].k === 'p' && !/[“《]/.test(tokens[0].w)) tokens = tokens.slice(1);
    const len = tokens.filter((t) => !t.k).reduce((a, t) => a + t.w.length, 0);
    if (len >= min && len <= max) out.push({ tokens, doc: d.id, title_fr: d.title_fr });
  }
  return out;
}
