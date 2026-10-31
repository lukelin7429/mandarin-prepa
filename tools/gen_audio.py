#!/usr/bin/env python3
"""Pre-record natural (neural) audio for every word and sentence in content.json.

The browser's built-in voices sound robotic, so the app plays these MP3s first
and only falls back to speechSynthesis for text that has no recording.

Needs edge-tts. Run with the patched copy (see README):
  PYTHONPATH=~/Developer/twrses-twhist-tools/tts \
    ~/.local/pipx/venvs/edge-tts/bin/python tools/gen_audio.py

Existing files are kept, so re-running after a content change only records
what is new. Output: audio/<hash>.mp3 and audio/index.json (normalized text -> file).
"""
import asyncio
import hashlib
import json
import os
import re

import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "audio")
NARRATOR = "zh-CN-XiaoxiaoNeural"
JURY = "zh-CN-YunxiNeural"


def norm(text):
    """Same normalization as js/audio.js: keep only CJK, letters and digits."""
    return re.sub(r"[^㐀-鿿0-9A-Za-z%]", "", text)


def split_sentences(text):
    return [s for s in re.split(r"(?<=[。！？])", re.sub(r"\s+", "", text)) if norm(s)]


def tok_text(tokens):
    return "".join(t["w"] for t in tokens)


def main():
    with open(os.path.join(ROOT, "content", "content.json"), encoding="utf-8") as f:
        c = json.load(f)
    items = {}  # norm -> (spoken text, voice)

    def add(text, voice=NARRATOR):
        spoken = text.replace("…", "，").replace("《，》", "").strip("，")
        key = norm(spoken)
        if key and key not in items:
            items[key] = (spoken, voice)

    for doc in c["texts"] + c["colles"]:
        add(tok_text(doc["title"]))
        for p in doc["paras"]:
            for s in split_sentences(tok_text(p)):
                add(s)
            for t in p:
                if not t.get("k"):
                    add(t["w"])
        for q in doc.get("questions", []):
            add(tok_text(q["zh"]), JURY)
    for v in c["vocab"]:
        add(v["h"])
    for p in c["phrases"]:
        add(tok_text(p["zh"]))
    for t in c["tones"]:
        add(t["h"])
    for d in c["drills"]:
        add(d["w"])
        add(tok_text(d["ex"]))
    for u in c["usage"]:
        add(tok_text(u["full"]))
    for w in c["writing"]:
        for k in ("q", "zh", "model"):
            if isinstance(w.get(k), list):
                add(tok_text(w[k]))
    for extra in ["你好，我们开始吧！", "高考是中国最重要的考试之一。"]:
        add(extra)

    os.makedirs(OUT, exist_ok=True)
    index = {}
    todo = []
    for key, (spoken, voice) in items.items():
        name = hashlib.sha1(f"{voice}|{spoken}".encode()).hexdigest()[:12] + ".mp3"
        index[key] = name
        if not os.path.exists(os.path.join(OUT, name)):
            todo.append((spoken, voice, name))

    async def run():
        sem = asyncio.Semaphore(6)

        async def one(spoken, voice, name):
            async with sem:
                for attempt in range(3):
                    try:
                        # Single syllables are read a little slower so the tone is clear.
                        rate = "-15%" if len(norm(spoken)) == 1 else "-5%"
                        await edge_tts.Communicate(spoken, voice, rate=rate).save(os.path.join(OUT, name))
                        return
                    except Exception as e:  # noqa: BLE001
                        if attempt == 2:
                            print("FAILED", spoken, e)
                        await asyncio.sleep(2)

        await asyncio.gather(*(one(*t) for t in todo))

    print(f"{len(items)} items, {len(todo)} to record")
    asyncio.run(run())
    index = {k: v for k, v in index.items() if os.path.exists(os.path.join(OUT, v))}
    with open(os.path.join(OUT, "index.json"), "w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, separators=(",", ":"))
    used = set(index.values())
    for fn in os.listdir(OUT):
        if fn.endswith(".mp3") and fn not in used:
            os.remove(os.path.join(OUT, fn))
    print(f"index: {len(index)} recordings")


if __name__ == "__main__":
    main()
