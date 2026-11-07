window.CH11 = {
  quiz: [
    {
      id: "c11q1", type: "mcq",
      q: "Bảy mode của âm giai trưởng được tạo ra bằng cách nào?",
      options: [
        "Dịch nốt gốc sang một bậc khác của cùng âm giai",
        "Thêm một dấu thăng vào âm giai trưởng",
        "Chơi cùng bộ nốt nhưng tăng tốc độ",
        "Đảo thứ tự các dây đàn"
      ],
      answer: 0,
      explain: "Giữ nguyên bảy nốt và dịch tonal center sang bậc khác sẽ tạo công thức quãng mới, nên nghe như một âm giai trong âm giai.",
      ref: "#ghi-chu-bay-mode"
    },
    {
      id: "c11q2", type: "mcq",
      q: "Công thức quãng của D Dorian là gì?",
      options: [
        "W–H–W–W–W–H–W",
        "W–W–H–W–W–W–H",
        "H–W–W–W–H–W–W",
        "W–W–W–H–W–W–H"
      ],
      answer: 0,
      explain: "D Dorian là mode bậc ii của C major, nên công thức là W–H–W–W–W–H–W.",
      ref: "#ghi-chu-bay-mode"
    },
    {
      id: "c11q3", type: "mcq",
      q: "Nốt đặc trưng của D Dorian so với D Aeolian là nốt nào?",
      options: ["B (natural 6)", "B♭ (♭6)", "F (♭3)", "C (♭7)"],
      answer: 0,
      explain: "Dorian có natural 6 là B; Aeolian có ♭6 là B♭. Chính B làm Dorian sáng hơn Aeolian.",
      ref: "#ghi-chu-bay-mode"
    },
    {
      id: "c11q4", type: "fill",
      q: "Mode bậc V của âm giai trưởng, có công thức 1 2 3 4 5 6 ♭7, là ___.",
      answer: ["mixolydian", "mode mixolydian", "g mixolydian"],
      explain: "Mixolydian là mode bậc V; so với Ionian nó hạ bậc 7, tạo màu dominant.",
      ref: "#ghi-chu-bay-mode"
    },
    {
      id: "c11q5", type: "fill",
      q: "Âm giai mẹ của A Mixolydian là ___ major.",
      answer: ["d", "d major"],
      explain: "A là bậc 5 của D major; Mixolydian là mode bậc 5, nên D major là âm giai mẹ.",
      ref: "#ghi-chu-mode-me"
    },
    {
      id: "c11q6", type: "mcq",
      q: "Trong C major, hợp âm Dm7 ứng với mode nào?",
      options: ["D Dorian", "D Mixolydian", "D Phrygian", "D Locrian"],
      answer: 0,
      explain: "Dm7 là ii7 của C major; mode xây từ bậc ii là Dorian. D Dorian có ♭3 và natural 6.",
      ref: "#ghi-chu-mode-me"
    },
    {
      id: "c11q7", type: "mcq",
      q: "Vamp Dm7–G7 trong ngữ cảnh D Dorian được phân tích là gì?",
      options: ["i7–IV7", "ii7–V7", "i7–♭VII7", "i7–v7"],
      answer: 0,
      explain: "Nếu D là trung tâm, Dm7 là i7 và G7 là IV7. Trong C major, cùng hai hợp âm đó sẽ là ii7–V7.",
      ref: "#ghi-chu-hoa-am-modal"
    },
    {
      id: "c11q8", type: "mcq",
      q: "Mode nào gần cấu trúc với âm giai trưởng nhất, chỉ khác một bậc ♯4?",
      options: ["Lydian", "Ionian", "Mixolydian", "Dorian"],
      answer: 0,
      explain: "Lydian là major với ♯4; Ionian chính là major. Chỉ một nốt khác nhưng tạo cảm giác dreamy.",
      ref: "#ghi-chu-bay-mode"
    },
    {
      id: "c11q9", type: "mcq",
      q: "Khi hòa âm D Dorian thành hợp âm 7, chuỗi bậc nào đúng?",
      options: [
        "i7–ii7–♭IIImaj7–IV7–v7–vi7♭5–♭VIImaj7",
        "i7–ii7–♭IIImaj7–IVmaj7–v7–vi7–♭VII7",
        "i7–ii7♭5–♭IIImaj7–IV7–v7–vi7–♭VIImaj7",
        "i7–ii7–IIImaj7–IV7–v7–vi7♭5–VIImaj7"
      ],
      answer: 0,
      explain: "D Dorian dùng đúng bộ hợp âm của C major nhưng đọc theo gốc D: Dm7 Em7 Fmaj7 G7 Am7 Bm7♭5 Cmaj7.",
      ref: "#ghi-chu-hoa-am-modal"
    },
    {
      id: "c11q10", type: "fill",
      q: "Nốt đặc trưng của E Phrygian là bậc ___ (nhập dạng b2).",
      answer: ["b2", "♭2", "bậc 2 giáng", "2b"],
      explain: "Phrygian hạ bậc 2; E Phrygian có F natural ngay trên E, tạo màu exotic.",
      ref: "#ghi-chu-bay-mode"
    },
    {
      id: "c11q11", type: "fret",
      q: "Trên dây 3, bấm ba nốt làm nên màu D Dorian: gốc D, ♭3 và natural 6.",
      answer: [[3, 7], [3, 10], [3, 4]],
      explain: "Dây 3 (G): B ở phím 4 (natural 6), D ở phím 7 (gốc), F ở phím 10 (♭3). B là nốt phân biệt Dorian với Aeolian.",
      ref: "#ghi-chu-vi-tri"
    },
    {
      id: "c11q12", type: "mcq",
      q: "Mode nào có ♭5, thường dùng trên hợp âm m7♭5 và được gọi là half-diminished mode?",
      options: ["Locrian", "Phrygian", "Aeolian", "Dorian"],
      answer: 0,
      explain: "Locrian có công thức 1 ♭2 ♭3 4 ♭5 ♭6 ♭7; hợp âm i7♭5 của nó khớp với m7♭5.",
      ref: "#ghi-chu-bay-mode"
    }
  ],
  cards: [
    { id: "c11f1", front: "Bảy mode của âm giai trưởng, theo thứ tự bậc 1–7?", back: "Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian", hint: "Đi từ bậc 1 đến bậc 7 của âm giai mẹ" },
    { id: "c11f2", front: "Công thức quãng của C major?", back: "W–W–H–W–W–W–H", hint: "W = một cung, H = nửa cung" },
    { id: "c11f3", front: "Ionian: công thức và họ?", back: "1 2 3 4 5 6 7 · major", hint: "Đây chính là âm giai trưởng" },
    { id: "c11f4", front: "Dorian: công thức và họ?", back: "1 2 ♭3 4 5 6 ♭7 · minor", hint: "Minor có natural 6" },
    { id: "c11f5", front: "Phrygian: công thức và họ?", back: "1 ♭2 ♭3 4 5 ♭6 ♭7 · minor", hint: "Nốt ♭2 nằm ngay trên gốc" },
    { id: "c11f6", front: "Lydian: công thức và họ?", back: "1 2 3 ♯4 5 6 7 · major", hint: "Chỉ khác major ở ♯4" },
    { id: "c11f7", front: "Mixolydian: công thức và họ?", back: "1 2 3 4 5 6 ♭7 · major / dominant", hint: "Major có ♭7" },
    { id: "c11f8", front: "Aeolian: công thức và họ?", back: "1 2 ♭3 4 5 ♭6 ♭7 · minor", hint: "Natural minor" },
    { id: "c11f9", front: "Locrian: công thức và họ?", back: "1 ♭2 ♭3 4 ♭5 ♭6 ♭7 · diminished", hint: "Có cả ♭2 và ♭5" },
    { id: "c11f10", front: "Bậc đặc trưng của Ionian?", back: "Bậc 7", hint: "Nốt dẫn về gốc" },
    { id: "c11f11", front: "Bậc đặc trưng của Dorian?", back: "Natural 6 (bậc 6 tự nhiên)", hint: "Aeolian có ♭6" },
    { id: "c11f12", front: "Bậc đặc trưng của Phrygian?", back: "♭2", hint: "Nốt kế trên gốc bị hạ" },
    { id: "c11f13", front: "Bậc đặc trưng của Lydian?", back: "♯4", hint: "Khác major đúng một nốt" },
    { id: "c11f14", front: "Bậc đặc trưng của Mixolydian?", back: "♭7", hint: "Tạo màu dominant" },
    { id: "c11f15", front: "Bậc đặc trưng của Aeolian?", back: "♭6", hint: "So với Dorian có natural 6" },
    { id: "c11f16", front: "Bậc đặc trưng của Locrian?", back: "♭5", hint: "Tạo hợp âm m7♭5" },
    { id: "c11f17", front: "Âm giai mẹ của A Mixolydian?", back: "D major", hint: "A là bậc 5 của D major" },
    { id: "c11f18", front: "Âm giai mẹ của G Dorian?", back: "F major", hint: "G là bậc 2 của F major" },
    { id: "c11f19", front: "Trong C major, Dm7 ứng với mode nào?", back: "D Dorian", hint: "Dm7 là ii7" },
    { id: "c11f20", front: "Vamp i7–IV7 của D Dorian?", back: "Dm7–G7", hint: "Dm7 là trung tâm, G7 là IV7" },
    { id: "c11f21", front: "Locrian thường gắn với hợp âm nào?", back: "m7♭5 (vii° trong major, ii7♭5 trong minor)", hint: "Bậc ♭5 tạo half-diminished" },
    { id: "c11f22", front: "Dorian khác Aeolian ở nốt nào?", back: "Dorian có natural 6; Aeolian có ♭6", hint: "D Dorian có B, D Aeolian có B♭" }
  ]
};
