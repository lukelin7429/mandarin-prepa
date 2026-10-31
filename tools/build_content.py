#!/usr/bin/env python3
"""Build content/*.json from tools/content_src.py (adds pinyin with pypinyin).

Usage:  python3 tools/build_content.py [--check]
  --check  print every word with its pinyin so it can be proofread.
"""
import json
import os
import re
import sys

from pypinyin import Style, pinyin, load_phrases_dict

sys.path.insert(0, os.path.dirname(__file__))
import content_src as src  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "content")

# Fixes for words pypinyin gets wrong in our texts.
load_phrases_dict({
    "长大": [["zhǎng"], ["dà"]],
    "背书": [["bèi"], ["shū"]],
    "上学": [["shàng"], ["xué"]],
    "还是": [["hái"], ["shì"]],
    "还有": [["hái"], ["yǒu"]],
    "看不到": [["kàn"], ["bu"], ["dào"]],
    "算不算": [["suàn"], ["bu"], ["suàn"]],
    "解决不了": [["jiě"], ["jué"], ["bù"], ["liǎo"]],
    "不得已": [["bù"], ["dé"], ["yǐ"]],
    "不好意思": [["bù"], ["hǎo"], ["yì"], ["si"]],
    "一点": [["yì"], ["diǎn"]],
    "一些": [["yì"], ["xiē"]],
    "一边": [["yì"], ["biān"]],
    "一致": [["yí"], ["zhì"]],
    "一方面": [["yì"], ["fāng"], ["miàn"]],
    "另一方面": [["lìng"], ["yì"], ["fāng"], ["miàn"]],
    "觉得": [["jué"], ["de"]],
    "落后": [["luò"], ["hòu"]],
    "落": [["luò"]],
    "地": [["de"]],
    "得": [["de"]],
    "着": [["zhe"]],
    "了": [["le"]],
    "为": [["wèi"]],
    "压": [["yā"]],
    "种": [["zhǒng"]],
    "孩子们": [["hái"], ["zi"], ["men"]],
    "看起来": [["kàn"], ["qǐ"], ["lái"]],
    "飞起来": [["fēi"], ["qǐ"], ["lái"]],
    "进来": [["jìn"], ["lái"]],
    "做饭": [["zuò"], ["fàn"]],
    "睡觉": [["shuì"], ["jiào"]],
    "好玩": [["hǎo"], ["wán"]],
    "便": [["biàn"]],
    "累": [["lèi"]],
    "难": [["nán"]],
    "发": [["fā"]],
    "长": [["cháng"]],
    "转": [["zhuǎn"]],
})

CJK = r"㐀-鿿"
PUNCT = "，。、：；？！“”《》—…（）·"
# A token starts with a CJK char, CJK punctuation, an ellipsis, or a number.
STARTER = rf"(?:[{CJK}{PUNCT}]|\d+(?=[\d%]|\s+[{CJK}]|\s*$))"
TOKEN_RE = re.compile(
    rf"(?P<w>(?:[{CJK}·]+|[{PUNCT}]+|\d+%?))"
    rf"(?:@(?P<p>[^=]+?))?"
    rf"(?:=(?P<g>.+?))?"
    rf"(?=\s+{STARTER}|\s*$)",
    re.S,
)


# Final pinyin for words where the dictionary result is not what a textbook
# shows (neutral tones, proper names, word spacing).
FIXED = {
    "时候": "shíhou", "休息": "xiūxi", "名字": "míngzi", "窗户": "chuānghu",
    "衣服": "yīfu", "晚上": "wǎnshang", "明白": "míngbai", "爸爸": "bàba",
    "妈妈": "māma", "星星": "xīngxing", "事情": "shìqing", "身上": "shēnshang",
    "地方": "dìfang", "生意": "shēngyi", "养活": "yǎnghuo", "学生": "xuésheng",
    "部分": "bùfen", "后面": "hòumian", "意思": "yìsi", "家里": "jiāli",
    "哪里": "nǎli", "东西": "dōngxi", "告诉": "gàosu", "喜欢": "xǐhuan",
    "朋友": "péngyou", "知道": "zhīdao", "进来": "jìnlai",
    "看起来": "kàn qǐlái", "飞起来": "fēi qǐlái", "看不到": "kàn bu dào",
    "算不算": "suàn bu suàn", "不好意思": "bù hǎoyìsi", "负责任": "fù zérèn",
    "名牌大学": "míngpái dàxué", "应试教育": "yìngshì jiàoyù",
    "铺张浪费": "pūzhāng làngfèi", "越来越多": "yuè lái yuè duō",
    "越来越": "yuè lái yuè", "通货膨胀": "tōnghuò péngzhàng",
    "环境保护": "huánjìng bǎohù", "人工智能": "réngōng zhìnéng",
    "社交媒体": "shèjiāo méitǐ", "在我看来": "zài wǒ kànlái",
    "举个例子": "jǔ gè lìzi", "值得注意的是": "zhíde zhùyì de shì",
    "一方面": "yì fāngmiàn", "另一方面": "lìng yì fāngmiàn",
    "近年来": "jìnnián lái", "全世界": "quán shìjiè", "总的来说": "zǒng de lái shuō",
    "中国": "Zhōngguó", "北京": "Běijīng", "上海": "Shànghǎi", "云南": "Yúnnán",
    "大理": "Dàlǐ", "海南": "Hǎinán", "法国": "Fǎguó", "伦敦": "Lúndūn",
    "温迪": "Wēndí", "彼得": "Bǐdé", "胡克": "Húkè", "永无岛": "Yǒngwú Dǎo",
    "心理辅导": "xīnlǐ fǔdǎo", "紧急状态": "jǐnjí zhuàngtài", "睡眠不足": "shuìmián bùzú",
    "独生子女": "dúshēng zǐnǚ", "兄弟姐妹": "xiōngdì jiěmèi", "全家人": "quán jiā rén", "上课外班": "shàng kèwàibān",
    "重点中学": "zhòngdiǎn zhōngxué", "虎爸虎妈": "hǔbà hǔmā", "望子成龙": "wàngzǐ chénglóng", "望女成凤": "wàngnǚ chéngfèng",
    "倒闭": "dǎobì", "找不到": "zhǎo bu dào", "受累": "shòulèi", "学生们": "xuéshengmen", "消息": "xiāoxi", "早上": "zǎoshang", "中国人": "Zhōngguórén", "考不上": "kǎo bu shàng", "努力学习": "nǔlì xuéxí", "学习努力": "xuéxí nǔlì", "随时": "suíshí", "不是": "bú shì", "并不是": "bìng bú shì",
    "印第安人": "Yìndì'ānrén",
}
VOWEL_START = re.compile(r"^[aoeāáǎàōóǒòēéěè]")


def syllables(word):
    """Return (marked, tone_number) per syllable."""
    marks = [s[0] for s in pinyin(word, style=Style.TONE, errors="ignore")]
    nums = [s[0] for s in pinyin(word, style=Style.TONE3, neutral_tone_with_five=True, errors="ignore")]
    tones = [int(n[-1]) if n and n[-1].isdigit() else 5 for n in nums]
    return list(zip(marks, tones))


def join_syllables(syls):
    out = ""
    for i, s in enumerate(syls):
        out += ("'" if i and VOWEL_START.match(s) else "") + s
    return out


def auto_pinyin(word):
    if not re.search(rf"[{CJK}]", word):
        return ""
    if word in FIXED:
        return FIXED[word]
    return join_syllables([m for m, _ in syllables(word)])


def apply_sandhi(tokens):
    """Tone changes of 一 and 不 (yí/yì, bú) as shown in textbooks."""
    flat = []  # (token index, syllable index, char, tone)
    for ti, tok in enumerate(tokens):
        if tok.get("k") or tok.get("fixed"):
            flat.append((ti, None, None, None))
            continue
        for si, (m, t) in enumerate(syllables(tok["w"])):
            flat.append((ti, si, tok["w"][si] if si < len(tok["w"]) else "", t))
    changes = {}
    for i, (ti, si, ch, t) in enumerate(flat):
        if ch not in ("一", "不") or i + 1 >= len(flat):
            continue
        nti, nsi, nch, nt = flat[i + 1]
        if nsi is None or nt in (None, 5):
            continue
        prev = flat[i - 1][2] if i else None
        if ch == "一" and prev in ("第", "十", "统", "唯"):
            continue
        if ch == "一":
            new = "yí" if nt == 4 else "yì"
        else:
            new = "bú" if nt == 4 else None
        if new:
            changes.setdefault(ti, {})[si] = new
    for ti, sub in changes.items():
        tok = tokens[ti]
        if tok["w"] in FIXED:
            continue
        syls = [m for m, _ in syllables(tok["w"])]
        for si, new in sub.items():
            syls[si] = new
        tok["p"] = join_syllables(syls)


def is_punct(word):
    return all(c in PUNCT for c in word)


def parse_line(line):
    tokens = []
    pos = 0
    line = re.sub(r"([，。、：；？！“”《》—…（）]+)", r" \1 ", line).strip()
    while pos < len(line):
        m = TOKEN_RE.match(line, pos)
        if not m:
            raise ValueError(f"Cannot parse near: {line[pos:pos + 40]!r}")
        w = m.group("w")
        tok = {"w": w}
        if is_punct(w) or w[0].isdigit():
            tok["k"] = "p" if is_punct(w) else "n"
        else:
            if m.group("p"):
                tok["p"] = m.group("p").strip()
                tok["fixed"] = True
            else:
                tok["p"] = auto_pinyin(w)
            if m.group("g"):
                tok["g"] = m.group("g").strip()
        tokens.append(tok)
        pos = m.end()
        while pos < len(line) and line[pos].isspace():
            pos += 1
    apply_sandhi(tokens)
    for tok in tokens:
        tok.pop("fixed", None)
    return tokens


def parse_body(body):
    paras = [p for p in re.split(r"\n\s*\n", body.strip()) if p.strip()]
    return [parse_line(" ".join(p.split("\n"))) for p in paras]


def plain(tokens_or_paras):
    if tokens_or_paras and isinstance(tokens_or_paras[0], list):
        return "\n".join(plain(p) for p in tokens_or_paras)
    return "".join(t["w"] for t in tokens_or_paras)


def main():
    check = "--check" in sys.argv
    vocab = {}

    def add_vocab(tok, source):
        if "g" not in tok or tok["p"][:1].isupper():  # proper names stay out of the deck
            return
        w = tok["w"]
        if w in vocab:
            vocab[w]["src"] = sorted(set(vocab[w]["src"]) | {source})
            return
        vocab[w] = {"id": w, "h": w, "p": tok["p"], "fr": tok["g"], "src": [source]}

    texts = []
    for t in src.TEXTS:
        paras = parse_body(t["body"])
        for p in paras:
            for tok in p:
                add_vocab(tok, t["id"])
        texts.append({
            "id": t["id"],
            "title": parse_line(t["title"]),
            "title_fr": t["title_fr"],
            "note_fr": t.get("note_fr", ""),
            "paras": paras,
            "quiz": t.get("quiz", []),
        })

    colles = []
    for c in src.COLLES:
        if c.get("from_text"):
            paras = next(t["paras"] for t in texts if t["id"] == c["from_text"])
        else:
            paras = parse_body(c["body"])
        for p in paras:
            for tok in p:
                add_vocab(tok, c["id"])
        colles.append({
            "id": c["id"],
            "from_text": c.get("from_text"),
            "title": parse_line(c["title"]),
            "title_fr": c["title_fr"],
            "paras": paras,
            "chars": sum(1 for ch in plain(paras) if re.match(rf"[{CJK}]", ch)),
            "questions": [{"zh": parse_line(q["zh"]), "fr": q["fr"]} for q in c["questions"]],
        })

    for h, p, fr in src.EXTRA_VOCAB:
        if h not in vocab:
            vocab[h] = {"id": h, "h": h, "p": p or auto_pinyin(h), "fr": fr, "src": ["theme"]}

    phrases = [{"stage": st, "zh": parse_line(zh), "fr": fr} for st, zh, fr in src.PHRASES]

    tones = []
    seen = set()
    for h, fr in src.TONE_WORDS:
        if h in seen:
            continue
        seen.add(h)
        num = pinyin(h, style=Style.TONE3)[0][0]
        tones.append({"h": h, "p": auto_pinyin(h), "t": int(num[-1]) if num[-1].isdigit() else 5, "fr": fr})

    drills = [{"w": w, "p": auto_pinyin(w), "fr": fr, "ex": parse_line(ex)} for w, fr, ex in src.DRILLS]
    usage = []
    for q, a, wrong, why in src.USAGE:
        usage.append({"q": q.replace(" ", ""), "a": a, "wrong": wrong, "why": why,
                      "full": parse_line(q.replace("＿", a))})
    writing = []
    for w in src.WRITING:
        item = dict(w)
        for k in ("q", "zh"):
            if k in item:
                item[k] = parse_line(item[k])
        if item["kind"] == "theme":
            item["model"] = parse_line(item["model"])
        writing.append(item)

    os.makedirs(OUT, exist_ok=True)
    data = {
        "drills": drills,
        "usage": usage,
        "writing": writing,
        "version": 1,
        "texts": texts,
        "colles": colles,
        "vocab": list(vocab.values()),
        "phrases": phrases,
        "tones": tones,
    }
    with open(os.path.join(OUT, "content.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))

    # Character -> readings map (tone numbers) for pronunciation feedback.
    chars = set()
    for hi in range(0xB0, 0xF8):
        for lo in range(0xA1, 0xFF):
            try:
                chars.add(bytes([hi, lo]).decode("gb2312"))
            except UnicodeDecodeError:
                pass
    raw = json.dumps(data, ensure_ascii=False)
    chars |= {ch for ch in raw if re.match(rf"[{CJK}]", ch)}
    pmap = {}
    for ch in sorted(chars):
        r = pinyin(ch, style=Style.TONE3, heteronym=True, neutral_tone_with_five=True, errors="ignore")
        if r and r[0]:
            pmap[ch] = "|".join(dict.fromkeys(x.replace("ü", "v") for x in r[0]))
    with open(os.path.join(OUT, "pinyin-map.json"), "w", encoding="utf-8") as f:
        json.dump(pmap, f, ensure_ascii=False, separators=(",", ":"))

    print(f"pinyin-map={len(pmap)}")
    print(f"texts={len(texts)} colles={len(colles)} vocab={len(vocab)} phrases={len(phrases)} tones={len(tones)}")
    for c in colles:
        print(f"  colle {c['id']}: {c['chars']} caractères")
    if check:
        for coll in (texts, colles):
            for t in coll:
                print("\n==", t["id"])
                for p in t["paras"]:
                    print(" ".join(f"{x['w']}[{x.get('p', '')}]" for x in p if x.get("k") is None))
        print("\n== vocab")
        for v in vocab.values():
            print(f"{v['h']}\t{v['p']}\t{v['fr']}")
        print("\n== tones")
        print(" ".join(f"{t['h']}{t['p']}{t['t']}" for t in tones))


if __name__ == "__main__":
    main()
