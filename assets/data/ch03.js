window.CH03 = {
  quiz: [
    {
      id: "c3q1", type: "mcq",
      q: "Công thức quãng của âm giai trưởng là gì?",
      options: ["W–W–H–W–W–W–H", "W–H–W–W–H–W–W", "H–W–W–W–H–W–W", "W–W–W–H–W–W–H"],
      answer: 0,
      explain: "Âm giai trưởng đi theo W–W–H–W–W–W–H; hai nửa cung rơi vào bậc 3–4 và 7–8.",
      ref: "#ghi-chu-major-scale"
    },
    {
      id: "c3q2", type: "fill",
      q: "Bậc 4 của âm giai C major là nốt ___",
      answer: ["f"],
      explain: "C major gồm C D E F G A B; bậc 4 là F, cách E đúng một nửa cung.",
      ref: "#ghi-chu-major-scale"
    },
    {
      id: "c3q3", type: "fret",
      q: "Bấm tất cả nốt gốc C trong 12 phím đầu, trên cả sáu dây.",
      answer: [[6, 8], [5, 3], [4, 10], [3, 5], [2, 1], [1, 8]],
      explain: "Trong 12 phím đầu, C nằm ở 6/8, 5/3, 4/10, 3/5, 2/1 và 1/8.",
      ref: "#ghi-chu-nam-the"
    },
    {
      id: "c3q4", type: "mcq",
      q: "A major cần bao nhiêu dấu thăng?",
      options: ["2", "3", "4", "5"],
      answer: 1,
      explain: "A major dùng C#, F#, G# — ba dấu thăng.",
      ref: "#ghi-chu-key-signature"
    },
    {
      id: "c3q5", type: "mcq",
      q: "Thứ tự dấu thăng khi viết trên khuông là gì?",
      options: ["F C G D A E B", "B E A D G C F", "G D A E B F# C#", "C F Bb Eb Ab Db Gb"],
      answer: 0,
      explain: "Dấu thăng luôn xuất hiện theo thứ tự F C G D A E B, dù tông có ít hay nhiều dấu.",
      ref: "#ghi-chu-key-signature"
    },
    {
      id: "c3q6", type: "fill",
      q: "Bb major có bao nhiêu dấu giáng? ___",
      answer: ["2", "hai"],
      explain: "Bb major cần hạ B và E, tức hai dấu giáng: Bb và Eb.",
      ref: "#ghi-chu-key-signature"
    },
    {
      id: "c3q7", type: "mcq",
      q: "Relative minor của C major là âm giai nào?",
      options: ["A minor", "E minor", "D minor", "G minor"],
      answer: 0,
      explain: "Bậc 6 của C major là A; A minor dùng đúng bảy nốt của C major.",
      ref: "#ghi-chu-minor-scale"
    },
    {
      id: "c3q8", type: "mcq",
      q: "Công thức quãng của âm giai thứ tự nhiên là gì?",
      options: ["W–H–W–W–H–W–W", "W–W–H–W–W–W–H", "H–W–W–H–W–W–W", "W–W–H–W–W–H–W"],
      answer: 0,
      explain: "Thứ tự nhiên đi theo W–H–W–W–H–W–W, khác trưởng ở vị trí các nửa cung.",
      ref: "#ghi-chu-minor-scale"
    },
    {
      id: "c3q9", type: "mcq",
      q: "C minor gồm những nốt nào?",
      options: ["C D Eb F G Ab Bb", "C D E F G A B", "C D E F G Ab Bb", "C D Eb F G A B"],
      answer: 0,
      explain: "C minor hạ bậc 3, 6, 7 của C major: E thành Eb, A thành Ab, B thành Bb.",
      ref: "#ghi-chu-minor-scale"
    },
    {
      id: "c3q10", type: "fill",
      q: "Relative major của D minor là âm giai ___",
      answer: ["f", "f major"],
      explain: "D minor có relative major là F major; cả hai dùng một dấu giáng Bb.",
      ref: "#ghi-chu-minor-scale"
    },
    {
      id: "c3q11", type: "mcq",
      q: "Trong vòng quãng 5, mỗi bước từ C sang phải (C → G → D) thêm gì?",
      options: ["Một dấu thăng", "Một dấu giáng", "Hai dấu thăng", "Không thêm dấu hóa"],
      answer: 0,
      explain: "Đi sang phải là đi lên quãng 5, mỗi bước thêm một dấu thăng: G có 1, D có 2, A có 3.",
      ref: "#ghi-chu-key-signature"
    },
    {
      id: "c3q12", type: "mcq",
      q: "Đặt thế bấm thứ hai của A minor ở phím 4 tạo ra âm giai nào?",
      options: ["B minor", "C# minor", "C minor", "D minor"],
      answer: 0,
      explain: "Thế bấm là movable; ở phím 4 nốt gốc trở thành B, nên ta được B minor.",
      ref: "#ghi-chu-nam-the"
    }
  ],
  cards: [
    { id: "c3f1", front: "Công thức quãng của âm giai trưởng?", back: "W–W–H–W–W–W–H", hint: "Hai nửa cung ở 3–4 và 7–8" },
    { id: "c3f2", front: "Scale formula của âm giai trưởng?", back: "1–2–3–4–5–6–7", hint: "Bậc 8 là quãng 8, không tính" },
    { id: "c3f3", front: "Bảy nốt của C major?", back: "C D E F G A B", hint: "Toàn nốt tự nhiên" },
    { id: "c3f4", front: "C major nằm ở những phím nào trên dây 5?", back: "3 5 7 8 10 12 14 15", hint: "Bắt đầu C ở phím 3" },
    { id: "c3f5", front: "A major gồm những nốt nào?", back: "A B C# D E F# G#", hint: "Ba dấu thăng" },
    { id: "c3f6", front: "Bb major gồm những nốt nào?", back: "Bb C D Eb F G A", hint: "Hai dấu giáng" },
    { id: "c3f7", front: "Bảy tông thăng theo vòng quãng 5?", back: "G D A E B F# C#", hint: "Bắt đầu một quãng 5 trên C" },
    { id: "c3f8", front: "Thứ tự dấu thăng trên khuông?", back: "F C G D A E B", hint: "Fat Cats Go Down Alley Endings Boldly Fighting" },
    { id: "c3f9", front: "Bảy tông giáng theo vòng quãng 5?", back: "F Bb Eb Ab Db Gb Cb", hint: "Đi ngược vòng từ C" },
    { id: "c3f10", front: "Thứ tự dấu giáng trên khuông?", back: "B E A D G C F", hint: "BEAD Games Come First" },
    { id: "c3f11", front: "Dấu hóa của C major?", back: "0 dấu", hint: "Không thăng, không giáng" },
    { id: "c3f12", front: "Dấu hóa của A major?", back: "3 dấu thăng: C# F# G#", hint: "Đếm trên vòng quãng 5" },
    { id: "c3f13", front: "Dấu hóa của Bb major?", back: "2 dấu giáng: Bb Eb", hint: "F major thêm một giáng" },
    { id: "c3f14", front: "Hai bên của C trên vòng quãng 5?", back: "Phải: tông thăng · Trái: tông giáng", hint: "C ở đỉnh, 0 dấu" },
    { id: "c3f15", front: "Relative minor nằm ở bậc nào?", back: "Bậc 6 của âm giai trưởng", hint: "Cùng bộ nốt, khác tonic" },
    { id: "c3f16", front: "Relative minor của C major?", back: "A minor (A B C D E F G)", hint: "Bậc 6 là A" },
    { id: "c3f17", front: "Công thức âm giai thứ tự nhiên?", back: "W–H–W–W–H–W–W", hint: "Nửa cung ở 2–3 và 5–6" },
    { id: "c3f18", front: "Scale formula của thứ tự nhiên?", back: "1–2–b3–4–5–b6–b7", hint: "Hạ 3, 6, 7" },
    { id: "c3f19", front: "C minor gồm những nốt nào?", back: "C D Eb F G Ab Bb", hint: "Hạ E, A, B của C major" },
    { id: "c3f20", front: "Dấu hóa của D minor?", back: "1 dấu giáng (Bb) — như F major", hint: "Relative major là F" },
    { id: "c3f21", front: "Năm thế bấm của C major?", back: "Mở, 2fr, 5fr, 7fr, 8fr", hint: "Thêm bản 12fr của thế mở" },
    { id: "c3f22", front: "Làm sao dùng một thế bấm cho tông khác?", back: "Dịch hình đến khi nốt gốc trùng tonic", hint: "Thế bấm movable" },
    { id: "c3f23", front: "Đặt thế A minor thứ hai ở phím 4 được gì?", back: "B minor", hint: "Nốt gốc thành B" },
    { id: "c3f24", front: "Chuyển major sang minor tự nhiên?", back: "Hạ bậc 3, 6, 7 xuống nửa cung", hint: "b3, b6, b7" }
  ]
};
