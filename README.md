# Mandarin Prépa

為法國 ECG 經濟商科 prépa 學生（華語 LV2）做的華語學習 PWA。
介面法文，中文簡體字＋拼音，字體用系統內建 PingFang SC。

## 功能

- **Cartes**：單字卡，間隔重複（簡化 SM-2），三種方向（中→法、法→中、聽→義）
- **Écoute**：聽音選字、聽句填空、聽寫（瀏覽器內建語音合成）
- **Oral**：跟讀、語音辨識打分（逐字標出聲調錯誤）、自己錄音對照、一分鐘回答評審問題
- **Colle**：抽題 → 20 分鐘準備倒數 → 綜述／評論／評審問答分段計時、全程錄音 → 依 HEC 四項標準自評
- **Lecture**：文章附拼音（逐字 ruby）與生詞注釋、整段朗讀、理解測驗
- **Jeux**：聲調、配對、句子重組、60 秒快答
- **Le concours**：BCE／ELVi、Ecricome 筆試與 HEC 口試題型摘要（附來源）
- 進度只存在瀏覽器（localStorage），可匯出／匯入 JSON；不需登入；可離線

## 換教材

所有內容在 `tools/content_src.py`（文章用空格斷詞，`詞=法文注釋`、`詞@拼音=注釋`）。改完執行：

```bash
python3 tools/build_content.py --check
```

會重新產生 `content/content.json`（自動加拼音、一／不變調）和 `content/pinyin-map.json`，`--check` 會列出每個詞的拼音供校對。

接著重錄語音（只錄新增的部分）：

```bash
PYTHONPATH=$HOME/Developer/twrses-twhist-tools/tts ~/.local/pipx/venvs/edge-tts/bin/python tools/gen_audio.py
```

課文與單字用微軟神經語音 zh-CN-XiaoxiaoNeural，口試評審問題用 zh-CN-YunxiNeural，存成 `audio/*.mp3`。app 優先播放錄音，沒有錄音的字句才退回瀏覽器內建語音（聽起來像機器人）。edge-tts 2026-10 起要用改過 WSS_URL 的副本，見 vault 記憶 edge-tts-403-fix。

## 本機預覽

```bash
python3 -m http.server 4300
```

## 個資

學生的成績、考卷、課本照片放 `private/`（已在 `.gitignore`），**不可進公開 repo**。
