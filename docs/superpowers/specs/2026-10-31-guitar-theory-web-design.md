# Guitar Theory Web — Thiết kế

Ngày: 2026-10-31
Nguồn nội dung: *Music Theory for Guitarists* — Tom Kolb, Hal Leonard Guitar Method (PDF scan 103 trang).
Đích: `D:\guitar-theory`

## 1. Mục tiêu

Chuyển toàn bộ nội dung cần nhớ của sách thành một web tĩnh học offline: mỗi chương một trang
ghi chú có sơ đồ, kèm quiz và flashcard, có theo dõi tiến độ và ôn tập ngắt quãng.

Tiêu chí thành công:

- Mở được bằng double-click `index.html`, không cần server, không cần mạng.
- Mỗi khái niệm trong sách có mặt trong ghi chú; mọi hình vẽ cần thiết được dựng lại bằng SVG.
- Một chương đọc trọn trong một phiên ngồi, chia được thành nhiều lần ôn ngắn; không có lịch cố định.
- Dùng được như sổ tay tra cứu khi đang chơi đàn, không chỉ để đọc tuần tự.
- Người học biết chính xác hôm nay cần ôn gì (không phải tự nhớ).

## 2. Người dùng & bối cảnh

Một người học guitar tự học, đọc sách giấy/PDF, gõ máy tính, cần tra cứu nhanh và ôn tập
đều đặn. Không có nhu cầu nhiều tài khoản, không chia sẻ, không cần backend.

## 3. Phạm vi

Trong phạm vi: 13 chương của sách, trang chủ dashboard, ôn tập, lộ trình, in cheat sheet.

Ngoài phạm vi: audio/CD tracks (bản scan không có file âm thanh), nhận dạng nốt bằng micro,
tài khoản/đồng bộ đám mây, soạn nội dung từ PDF trực tiếp trên web.

## 4. Kiến trúc

Web tĩnh thuần HTML/CSS/JS, không build step, không thư viện ngoài.

```
D:\guitar-theory\
  index.html                  Dashboard + Ôn hôm nay + gợi ý chương tiếp theo
  glossary.html               Tra cứu thuật ngữ (từ Index of Musical Terms, tr.94-95)
  chapters\
    ch01-fretboard.html
    ch02-theory-basics.html
    ch03-scales-key-signatures.html
    ch04-intervals.html
    ch05-triads.html
    ch06-harmonizing-major-scale.html
    ch07-chord-construction.html
    ch08-harmonizing-minor-scale.html
    ch09-key-centers.html
    ch10-blues-pentatonic.html
    ch11-modes-modal-harmony.html
    ch12-other-scales-arpeggios.html
    ch13-substitution-reharmonization.html
  assets\
    styles.css                Theme tối/sáng, layout đọc, print CSS
    app.js                    Shell: nav, theme, progress, review queue, keyboard
    quiz.js                   Quiz engine (mcq / fill / fret)
    cards.js                  Flashcard engine + SRS
    diagrams.js               Sinh SVG: fretboard, scale pattern, chord box, circle of fifths, tab
    data\
      ch01.js ... ch13.js     window.CH01 = { quiz: [...], cards: [...] }
  tools\
    validate.js               Kiểm tra dữ liệu quiz/cards bằng Node
  docs\
    superpowers\specs\        Tài liệu thiết kế (file này)
```

Ràng buộc:

- Mọi dữ liệu nạp bằng `<script src="...">`; **không** dùng `fetch()` vì `file://` chặn CORS.
- Không CDN, không webfont; font hệ thống (`system-ui`, `Georgia` cho serif).
- Mỗi trang chương độc lập về nội dung; chỉ dùng chung asset.

## 5. Cấu trúc một trang chương

Thứ tự cố định, thiết kế để bắt buộc truy xuất trước khi đọc:

1. **Bức tranh lớn** — một câu: chương này giải quyết vấn đề gì.
2. **5 điều bắt buộc nhớ** — dạng card gập; câu hỏi hiện trước, đáp án mở sau.
3. **Ghi chú sâu** — giải thích tiếng Việt, giữ thuật ngữ tiếng Anh trong ngoặc hoặc in nghiêng.
   Có sơ đồ SVG và ví dụ tab lấy từ sách.
4. **Áp lên đàn** — 2-4 bài tập ngắn, mỗi bài nêu rõ dây/phím/tiêu chí đạt.
5. **Cheat sheet** — khối tóm tắt in được 1 trang; nút "In cheat sheet" chỉ in phần này.
6. **Quiz** — 8-12 câu.
7. **Flashcards** — 15-25 thẻ.

Điều hướng: sidebar danh sách 13 chương + thanh tiến độ từng chương; nút chương trước/sau;
phím tắt `1-4` chọn đáp án, `Enter` kiểm tra/tiếp, `Esc` đóng.

## 6. Mô hình dữ liệu

Tiến độ — `localStorage["gt.progress.v1"]`:

```js
{
  ch01: { read: true, quizBest: 80, quizAttempts: 3, lastVisit: "2026-10-31T10:00:00Z" },
  meta: { streak: 4, lastActive: "2026-10-31" }
}
```

Ôn tập — `localStorage["gt.srs.v1"]`:

```js
{
  "c1f3": { lastRating: "good", due: "2026-11-03", seen: 4, lapses: 1 }
}
```

Ba mức đánh giá: `again` → hẹn 10 phút; `hard` → 1 ngày; `good` → 3 ngày. Thẻ quên
(`again`) bị đẩy về cuối hàng đợi phiên hiện tại. Không dùng SM-2.

Dữ liệu luyện tập — `assets/data/chNN.js`:

```js
window.CH01 = {
  quiz: [
    { id: "c1q1", type: "mcq", q: "Nốt ở dây 5 phím 3 là gì?",
      options: ["C", "D", "E", "G"], answer: 0,
      explain: "Dây A phím 3 = C.", ref: "#ghi-chu-vi-tri-not" },
    { id: "c1q2", type: "fill", q: "Dây 4 buông là nốt ___", answer: ["D"],
      explain: "E-A-D-G-B-E." },
    { id: "c1q3", type: "fret", q: "Bấm các nốt E trên 3 dây trầm",
      answer: [[6,0],[6,12],[5,7],[4,2]], explain: "E cách nhau quãng 8." }
  ],
  cards: [
    { id: "c1f1", front: "Dây 2 buông là nốt gì?", back: "B",
      hint: "G lên B là quãng 3 trưởng" }
  ]
};
```

Quy ước id: `c<chương>q<số>` cho quiz, `c<chương>f<số>` cho flashcard.
Mỗi mục ghi chú có `id` dạng `ghi-chu-<slug>` (ví dụ `ghi-chu-vi-tri-not`) để `ref` trỏ tới.

## 7. Sơ đồ SVG

`diagrams.js` sinh hình từ dữ liệu, không vẽ tay:

- `fretboard({ frets: 15, marks: [{string: 5, fret: 3, label: "C"}] })` — cần đàn ngang,
  dây 6 ở dưới, dây buông bên trái, chấm đánh dấu phím 3/5/7/9/12.
- `scalePattern({ root: "C", scale: "major", position: 1 })` — 5 vị trí ngũ cung/thất cung.
- `chordBox({ frets: [x,3,2,0,1,0], name: "C" })` — hợp âm dạng lược.
- `circleOfFifths({ highlight: ["C","G"] })`.
- `tab({ notes: [[5,3],[4,2]] })` — tab đơn giản cho ví dụ.

Màu: nốt gốc (root) khác màu nốt khác; dùng biến CSS để đổi theme.

## 8. Phân bổ nội dung theo chương

Số trang là trang sách = trang PDF (đã đối chiếu: trang 5 in số 5).

| Ch | Tên | Trang | Trọng tâm ghi chú |
|----|-----|-------|-------------------|
| 1 | The Fretboard | 5-7 | Layout dây/phím, nửa cung, quãng 8 ở phím 12, bài tập tìm nốt |
| 2 | Theory Basics | 8-15 | Nốt, khuông nhạc, khóa, nhịp, dấu hóa, cung/thứ |
| 3 | Scales and Key Signatures | 16-23 | 5 pattern C major, vòng quãng 5, 15 dấu hóa |
| 4 | Intervals | 24-29 | 12 quãng, đảo quãng, quãng trên cần đàn |
| 5 | Triads | 30-34 | 4 loại triad, đảo, voicing trên 3 dây |
| 6 | Harmonizing the Major Scale | 35-39 | 7 hợp âm, I-IV-V, chức năng |
| 7 | Chord Construction | 40-48 | 7th chords, extensions, sus, add, 6/9 |
| 8 | Harmonizing the Minor Scale | 49-52 | 3 dạng thứ, hợp âm tự nhiên/hòa thanh |
| 9 | Determining Key Centers | 53-60 | Tìm key từ hợp âm, phân tích bài |
| 10 | Blues Harmony and Pentatonic | 61-66 | 12-bar, blues scale, 5 vị trí pentatonic |
| 11 | Modes and Modal Harmony | 67-78 | 7 mode, đặc trưng, vamp modal |
| 12 | Other Scales/Modes, Chord-Scale, Arpeggios | 79-87 | Harmonic/melodic minor, exotic, arpeggio |
| 13 | Chord Substitution and Reharmonization | 88-93 | Tritone sub, diatonic sub, reharmonize |

## 9. Trang chủ

Không có lịch cố định (không "4 tuần", không deadline). Học theo nhu cầu và theo mức nhớ.

- 13 card chương: % hoàn thành (đọc + điểm quiz tốt nhất), số thẻ đến hạn, lần ghé cuối.
  Bấm vào card là học tiếp, không có chương nào bị khóa.
- "Học tiếp": gợi ý chương dựa trên trạng thái thực tế — ưu tiên chương đang dở, rồi chương
  có điểm quiz thấp nhất, rồi chương chưa đọc. Không ép thứ tự.
- "Ôn hôm nay": thẻ đến hạn + quiz ngắn của chương yếu nhất; nếu không có gì đến hạn thì
  hiện "Không có gì cần ôn" và gợi ý 5 thẻ cũ nhất.
- Streak: số ngày liên tiếp có hoạt động (ghi trong `gt.progress.v1`), chỉ để xem, không phạt.
- Thanh tiến độ tổng = số mục đã nhớ / tổng số mục, tính từ SRS (`seen >= 2`, không còn `again`).
- Ô tìm kiếm lọc theo tên chương, từ khóa, và thuật ngữ; kết quả trỏ thẳng tới mục ghi chú.
- Nút "Tra cứu" mở `glossary.html`: danh sách thuật ngữ A-Z kèm chương liên quan, để dùng
  như sổ tay khi đang chơi đàn chứ không phải học tuần tự.

## 10. Xử lý lỗi & trạng thái

- Thiếu file dữ liệu chương → nội dung vẫn hiển thị, khu quiz hiện "Không tải được dữ liệu luyện tập".
- `localStorage` bị chặn → chạy ở chế độ không lưu, hiện banner nhắc.
- Trả lời sai → hiện `explain` + link về đúng mục lý thuyết (`ref`).
- Dữ liệu SRS hỏng → bỏ qua entry lỗi, không crash.
- Không có thẻ đến hạn / chưa có dữ liệu → dashboard hiện trạng thái rỗng, không lỗi.

## 11. Kiểm thử

Tự động (`node tools/validate.js`):

- Mọi chương 1-13 có file dữ liệu và được link trong `index.html`.
- `id` không trùng trong một chương; `mcq` có `answer` là index hợp lệ; `fill` có đáp án;
  `fret` có toạ độ dạng `[dây, phím]`; mọi item có `explain`.

Tay (checklist trước khi coi là xong):

- Mở `file:///D:/guitar-theory/index.html`: 13 link hoạt động, không lỗi console.
- Làm quiz, reload → điểm và tiến độ còn nguyên.
- Đánh giá thẻ Again/Hard/Good → `due` đúng; nút "Ôn hôm nay" lấy đúng thẻ.
- In cheat sheet: chỉ nội dung cheat sheet xuất hiện.
- Tìm kiếm trên dashboard trả kết quả đúng; `glossary.html` lọc theo chữ cái và trỏ đúng chương.
- Thu 375px: sidebar thu gọn, bảng không tràn.
- DevTools Network: không có request ngoài `file://`.

## 12. Thứ tự triển khai

1. Khung: `index.html`, `styles.css`, `app.js`, 13 trang rỗng + dữ liệu rỗng.
2. `diagrams.js` + trang Ch1 hoàn chỉnh làm mẫu.
3. Engine quiz + flashcard + SRS, gắn vào Ch1, kiểm thử tay.
4. Trích nội dung từng chương từ PDF (đọc ảnh trang), viết 12 trang còn lại theo mẫu Ch1.
5. Dashboard (gợi ý chương, ôn hôm nay, tìm kiếm), `glossary.html`, print CSS.
6. Chạy `validate.js`, checklist tay, sửa lỗi.

Mỗi bước 4 (một chương) là một đơn vị công việc độc lập, có thể làm song song.
