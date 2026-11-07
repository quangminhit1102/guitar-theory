window.CH12 = {
  quiz: [
    {
      id: "c12q1", type: "mcq",
      q: "Harmonic minor khác natural minor ở điểm nào?",
      options: ["Nâng bậc 7 lên major 7th", "Hạ bậc 6 xuống b6", "Nâng bậc 3 lên trưởng", "Hạ bậc 2 xuống b2"],
      answer: 0,
      explain: "Harmonic minor giữ nguyên thang thứ tự nhiên nhưng nâng bậc 7, tạo quãng 2 tăng giữa b6 và 7.",
      ref: "#ghi-chu-thang-thu"
    },
    {
      id: "c12q2", type: "mcq",
      q: "Phrygian dominant là mode thứ mấy của harmonic minor?",
      options: ["Thứ 2", "Thứ 4", "Thứ 5", "Thứ 7"],
      answer: 2,
      explain: "Phrygian dominant là mode 5 của harmonic minor, gần Phrygian nhưng có bậc 3 trưởng.",
      ref: "#ghi-chu-thang-thu"
    },
    {
      id: "c12q3", type: "fill",
      q: "A Phrygian dominant gồm A–B♭–___–D–E–F–G.",
      answer: ["c#", "db", "c♯", "d♭", "c sharp", "d flat"],
      explain: "Bậc 3 của A Phrygian dominant là C♯ (enharmonic D♭), tạo quãng 3 trưởng trên A.",
      ref: "#ghi-chu-thang-thu"
    },
    {
      id: "c12q4", type: "fill",
      q: "Mode thứ 4 của melodic minor tên là ___ (Lydian ...).",
      answer: ["lydian dominant", "lydian b7", "lydian ♭7", "lydian dom", "lydian dominant scale"],
      explain: "Lydian dominant (Lydian b7) là mode 4 của melodic minor, dùng trên dom7#11.",
      ref: "#ghi-chu-thang-thu"
    },
    {
      id: "c12q5", type: "mcq",
      q: "Altered scale còn được gọi là gì?",
      options: ["Super Locrian", "Lydian augmented", "Locrian #2", "Phrygian dominant"],
      answer: 0,
      explain: "Altered còn gọi là Super Locrian, mode 7 của melodic minor, dùng trên át biến đổi chức năng.",
      ref: "#ghi-chu-thang-thu"
    },
    {
      id: "c12q6", type: "mcq",
      q: "Altered scale chứa những biến đổi nào?",
      options: ["b9, #9, b5, #5", "b9, #11, b13", "#4, b7, b9", "b2, b6, b7"],
      answer: 0,
      explain: "Altered có đủ b9, #9, b5 và #5, cộng b3/3 trưởng và b7, nên là lựa chọn chuẩn trên át biến đổi.",
      ref: "#ghi-chu-thang-thu"
    },
    {
      id: "c12q7", type: "mcq",
      q: "Diminished (whole–half) có bao nhiêu nốt và lặp lại sau mỗi mấy phím?",
      options: ["7 nốt, 2 phím", "8 nốt, 3 phím", "8 nốt, 2 phím", "6 nốt, 12 phím"],
      answer: 1,
      explain: "Thang diminished whole–half có tám nốt và đối xứng nên mẫu lặp lại sau mỗi ba phím.",
      ref: "#ghi-chu-thang-doi-xung"
    },
    {
      id: "c12q8", type: "mcq",
      q: "Whole tone scale có bao nhiêu nốt?",
      options: ["5", "6", "7", "8"],
      answer: 1,
      explain: "Whole tone chỉ gồm sáu nốt, toàn cung, nên khi viết trên khuông phải bỏ một tên chữ cái.",
      ref: "#ghi-chu-thang-doi-xung"
    },
    {
      id: "c12q9", type: "mcq",
      q: "Theo bảng chord/scale, Cm7b5 hợp với thang nào?",
      options: ["C Locrian hoặc C Locrian #2", "C Lydian", "C whole tone", "C harmonic minor"],
      answer: 0,
      explain: "Nhóm thứ biến đổi gán Cm7b5 cho Locrian và Locrian #2.",
      ref: "#ghi-chu-chord-scale"
    },
    {
      id: "c12q10", type: "fill",
      q: "Theo bảng chord/scale, C7#11 dùng thang C ___.",
      answer: ["lydian dominant", "lydian b7", "lydian ♭7", "lydian dom"],
      explain: "Hợp âm dom7#11 khớp với Lydian dominant, mode 4 của melodic minor.",
      ref: "#ghi-chu-chord-scale"
    },
    {
      id: "c12q11", type: "fret",
      q: "Đánh dấu bốn nốt của arpeggio Am7 ở vị trí 5: A (6/5), C (6/8), E (5/7), G (4/5).",
      answer: [[6, 5], [6, 8], [5, 7], [4, 5]],
      explain: "Am7 gồm A–C–E–G; bốn vị trí này cho đủ bốn nốt trong vùng phím 5.",
      ref: "#ghi-chu-arpeggio"
    },
    {
      id: "c12q12", type: "fret",
      q: "Đánh dấu bốn nốt đầu của A Phrygian dominant trên dây 5: A, B♭, C♯, D.",
      answer: [[5, 0], [5, 1], [5, 4], [5, 5]],
      explain: "Dây 5 buông là A; phím 1 là B♭ (b2), phím 4 là C♯ (3 trưởng), phím 5 là D (4).",
      ref: "#ghi-chu-thang-thu"
    }
  ],
  cards: [
    { id: "c12f1", front: "Công thức harmonic minor?", back: "1–2–b3–4–5–b6–7", hint: "Nâng bậc 7 của natural minor" },
    { id: "c12f2", front: "Bậc nào bị nâng trong harmonic minor?", back: "Bậc 7 (major 7th)", hint: "Tạo quãng 2 tăng với b6" },
    { id: "c12f3", front: "Quãng đặc trưng giữa b6 và 7 của harmonic minor?", back: "Quãng 2 tăng (augmented 2nd)", hint: "Nghe lạ nhưng hút về chủ âm" },
    { id: "c12f4", front: "Harmonic minor hợp với hợp âm nào?", back: "minor; m(maj7)", hint: "Ví dụ Am(maj7)" },
    { id: "c12f5", front: "Công thức Phrygian dominant?", back: "1–b2–3–4–5–b6–b7", hint: "Mode 5 của harmonic minor" },
    { id: "c12f6", front: "Phrygian dominant là mode thứ mấy?", back: "Thứ 5 của harmonic minor", hint: "Bắt đầu từ bậc 5" },
    { id: "c12f7", front: "A Phrygian dominant gồm những nốt nào?", back: "A B♭ C♯ D E F G", hint: "Có b2 và 3 trưởng" },
    { id: "c12f8", front: "Công thức melodic minor?", back: "1–2–b3–4–5–6–7", hint: "Thang trưởng hạ bậc 3" },
    { id: "c12f9", front: "Melodic minor gần mode nào nhất khi áp dụng?", back: "Dorian nâng bậc 7", hint: "Không phải Aeolian" },
    { id: "c12f10", front: "Công thức Lydian dominant?", back: "1–2–3–#4–5–6–b7", hint: "Lydian hạ bậc 7" },
    { id: "c12f11", front: "Lydian dominant là mode thứ mấy của melodic minor?", back: "Thứ 4", hint: "Hợp âm dom7#11" },
    { id: "c12f12", front: "Lydian augmented hợp với hợp âm nào?", back: "maj7#5", hint: "Lydian nâng bậc 5" },
    { id: "c12f13", front: "Công thức Locrian #2?", back: "1–2–b3–4–b5–b6–b7", hint: "Locrian nâng bậc 2" },
    { id: "c12f14", front: "Locrian #2 dùng trên hợp âm nào?", back: "m7b5", hint: "Cùng nhóm với Locrian" },
    { id: "c12f15", front: "Hai tên của mode 7 melodic minor?", back: "Altered / Super Locrian", hint: "Đủ mọi biến đổi" },
    { id: "c12f16", front: "Altered scale chứa những biến đổi nào?", back: "b9, #9, b5, #5", hint: "Đọc thêm b3 và 3 trưởng" },
    { id: "c12f17", front: "Cấu tạo diminished whole–half?", back: "W–H lặp lại, 8 nốt", hint: "Lặp mỗi 3 phím" },
    { id: "c12f18", front: "Công thức dominant diminished (half–whole)?", back: "1–b2–b3–3–#4–5–6–b7", hint: "Mode 2 của diminished W–H" },
    { id: "c12f19", front: "Whole tone có bao nhiêu nốt?", back: "6 nốt, toàn cung", hint: "Hợp âm augmented" },
    { id: "c12f20", front: "Cmaj7 arpeggio gồm những nốt nào?", back: "C E G B", hint: "Bốn nốt của hợp âm bảy trưởng" },
    { id: "c12f21", front: "Bốn loại arpeggio bảy cơ bản?", back: "maj7, m7, dom7, m7b5", hint: "Tương ứng bốn hợp âm bảy" },
    { id: "c12f22", front: "Muốn có arpeggio triad thứ, bỏ gì khỏi minor pentatonic?", back: "Bỏ bậc 4 và b7", hint: "Còn 1–b3–5" }
  ]
};
