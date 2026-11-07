window.CH08 = {
  quiz: [
    {
      id: "c8q1", type: "mcq",
      q: "Công thức hợp âm ba của âm giai thứ tự nhiên?",
      options: [
        "i–ii°–♭III–iv–v–♭VI–♭VII",
        "i–ii–III–iv–V–vi–vii°",
        "I–ii–iii–IV–V–vi–vii°",
        "i–ii°–III–iv–V–♭VI–♭VII"
      ],
      answer: 0,
      explain: "Thứ tự nhiên cho thứ, giảm, trưởng, thứ, thứ, trưởng, trưởng. Ba bậc ♭III, ♭VI, ♭VII đứng trên các bậc hạ của âm giai.",
      ref: "#ghi-chu-hop-am-ba"
    },
    {
      id: "c8q2", type: "mcq",
      q: "Hợp âm bậc v (triad) trong A minor tự nhiên là hợp âm nào?",
      options: ["Em", "E", "E7", "E°"],
      answer: 0,
      explain: "Âm giai A minor tự nhiên có G, không có G♯, nên hợp âm trên bậc 5 là Em (E–G–B). E trưởng cần G♯.",
      ref: "#ghi-chu-hop-am-ba"
    },
    {
      id: "c8q3", type: "fill",
      q: "Hợp âm bậc ♭VII (triad) trong A minor là ___",
      answer: ["g"],
      explain: "Bậc ♭VII của A minor là G, hợp âm ba trưởng G–B–D.",
      ref: "#ghi-chu-hop-am-ba"
    },
    {
      id: "c8q4", type: "mcq",
      q: "Âm giai trưởng tương quan của A minor là gì?",
      options: ["C major", "G major", "E major", "F major"],
      answer: 0,
      explain: "A minor và C major dùng chung bảy nốt A B C D E F G và cùng bộ hợp âm.",
      ref: "#ghi-chu-tuong-quan"
    },
    {
      id: "c8q5", type: "fill",
      q: "Hợp âm bậc ♭VI (triad) trong D minor là ___",
      answer: ["bb"],
      explain: "D minor có B♭ ở bậc 6; hợp âm bậc ♭VI là B♭ (B♭–D–F).",
      ref: "#ghi-chu-tuong-quan"
    },
    {
      id: "c8q6", type: "mcq",
      q: "Hợp âm bảy trên bậc ♭VII của A minor là gì?",
      options: ["G7", "Gmaj7", "Gm7", "Gm7♭5"],
      answer: 0,
      explain: "G–B–D–F là hợp âm ba trưởng cộng quãng 7 thứ, tức G7 (dominant seventh).",
      ref: "#ghi-chu-hop-am-bay"
    },
    {
      id: "c8q7", type: "fill",
      q: "Hợp âm bậc ii7 trong A minor là ___",
      answer: ["bm7b5"],
      explain: "Bậc 2 là B; xếp B–D–F–A được Bm7♭5, hợp âm nửa giảm.",
      ref: "#ghi-chu-hop-am-bay"
    },
    {
      id: "c8q8", type: "mcq",
      q: "Trong hòa âm thứ tự nhiên, hợp âm ba nào bị giảm?",
      options: ["ii° (B°)", "iii (C)", "v (Em)", "♭VII (G)"],
      answer: 0,
      explain: "Chỉ bậc ii° là giảm, ví dụ B–D–F trong A minor. Các bậc còn lại là thứ hoặc trưởng.",
      ref: "#ghi-chu-hop-am-ba"
    },
    {
      id: "c8q9", type: "mcq",
      q: "Trong A harmonic minor, nốt nào được nâng để tạo leading tone?",
      options: ["G → G♯", "F → F♯", "C → C♯", "D → D♯"],
      answer: 0,
      explain: "Thứ hòa thanh nâng bậc 7 lên nửa cung, biến G thành G♯ và cho hợp âm V trưởng E.",
      ref: "#ghi-chu-ba-dang-thu"
    },
    {
      id: "c8q10", type: "fret",
      q: "Đánh dấu 5 nốt của thế bấm Am mở: A–E–A–C–E, bỏ dây 6.",
      answer: [[5, 0], [4, 2], [3, 2], [2, 1], [1, 0]],
      explain: "Thế Am mở là x02210: dây 5 buông A, dây 4 phím 2 E, dây 3 phím 2 A, dây 2 phím 1 C, dây 1 buông E.",
      ref: "#ghi-chu-hop-am-ba"
    },
    {
      id: "c8q11", type: "mcq",
      q: "Âm giai trưởng tương quan của B minor là gì?",
      options: ["D major", "A major", "E major", "G major"],
      answer: 0,
      explain: "B minor và D major dùng chung các nốt D E F♯ G A B C♯, nên cùng bộ hợp âm.",
      ref: "#ghi-chu-tuong-quan"
    },
    {
      id: "c8q12", type: "fill",
      q: "Hợp âm bậc v (triad) trong G minor là ___",
      answer: ["dm"],
      explain: "G minor tự nhiên có F, không có F♯; hợp âm bậc 5 là Dm (D–F–A), không phải D trưởng.",
      ref: "#ghi-chu-hop-am-ba"
    }
  ],
  cards: [
    { id: "c8f1", front: "A natural minor gồm những nốt nào?", back: "A B C D E F G", hint: "Bắt đầu từ A, dùng các bậc 1 2 ♭3 4 5 ♭6 ♭7" },
    { id: "c8f2", front: "Các bậc của âm giai thứ tự nhiên?", back: "1 2 ♭3 4 5 ♭6 ♭7", hint: "So với trưởng: hạ 3, 6, 7" },
    { id: "c8f3", front: "Công thức triad của thứ tự nhiên?", back: "i ii° ♭III iv v ♭VI ♭VII", hint: "thứ, giảm, trưởng, thứ, thứ, trưởng, trưởng" },
    { id: "c8f4", front: "Công thức seventh của thứ tự nhiên?", back: "i7 ii7♭5 ♭IIImaj7 iv7 v7 ♭VImaj7 ♭VII7", hint: "Thêm một quãng 3 diatonic vào mỗi triad" },
    { id: "c8f5", front: "Triads của A minor?", back: "Am B° C Dm Em F G", hint: "Bắt đầu i–ii°–♭III" },
    { id: "c8f6", front: "Sevenths của A minor?", back: "Am7 Bm7♭5 Cmaj7 Dm7 Em7 Fmaj7 G7", hint: "Bậc ii là nửa giảm, bậc ♭VII là bảy át" },
    { id: "c8f7", front: "Âm giai trưởng tương quan của A minor?", back: "C major", hint: "Cùng dấu hóa, cùng bộ hợp âm" },
    { id: "c8f8", front: "Âm giai thứ tương quan của C major?", back: "A minor", hint: "Nốt thứ 6 của C trưởng" },
    { id: "c8f9", front: "Hợp âm bậc ♭III của A minor?", back: "C", hint: "Bậc 3 của A minor là C" },
    { id: "c8f10", front: "Hợp âm bậc ♭VI của A minor?", back: "F", hint: "Bậc 6 là F" },
    { id: "c8f11", front: "Hợp âm bậc ♭VII của A minor?", back: "G", hint: "Bậc 7 là G" },
    { id: "c8f12", front: "Vì sao v của A minor là Em?", back: "Âm giai tự nhiên có G, không có G♯", hint: "v là hợp âm thứ" },
    { id: "c8f13", front: "Muốn có V trưởng trong A minor?", back: "Nâng G thành G♯, được E trưởng", hint: "Dùng harmonic minor" },
    { id: "c8f14", front: "Harmonic minor nâng nốt nào?", back: "Bậc 7 lên nửa cung", hint: "A harmonic minor: G → G♯" },
    { id: "c8f15", front: "Melodic minor nâng nốt nào khi đi lên?", back: "Bậc 6 và bậc 7", hint: "Trong A: F → F♯ và G → G♯" },
    { id: "c8f16", front: "Triads của A harmonic minor?", back: "Am B° Caug Dm E F G♯°", hint: "V trưởng, vii° trên G♯" },
    { id: "c8f17", front: "Triads của A melodic minor khi đi lên?", back: "Am Bm Caug D E F♯° G♯°", hint: "IV trưởng, vi°" },
    { id: "c8f18", front: "Tiến trình i–iv–v trong A minor?", back: "Am – Dm – Em", hint: "Cả ba đều là hợp âm thứ" },
    { id: "c8f19", front: "Tiến trình i–♭VI–v trong A minor?", back: "Am – F – Em", hint: "F trưởng xen giữa hai hợp âm thứ" },
    { id: "c8f20", front: "Tiến trình i–♭VI–♭III–♭VII trong A minor?", back: "Am – F – C – G", hint: "Vòng hợp âm phổ biến trong rock" },
    { id: "c8f21", front: "Hợp âm bảy trên ♭VII của A minor?", back: "G7 (dominant seventh)", hint: "G–B–D–F" },
    { id: "c8f22", front: "Hợp âm ii7 của A minor?", back: "Bm7♭5 (nửa giảm)", hint: "B–D–F–A" },
    { id: "c8f23", front: "Triads của E minor?", back: "Em F♯° G Am Bm C D", hint: "Tương quan với G major" },
    { id: "c8f24", front: "Sevenths của E minor?", back: "Em7 F♯m7♭5 Gmaj7 Am7 Bm7 Cmaj7 D7", hint: "Bậc ♭VII là D7" }
  ]
};
