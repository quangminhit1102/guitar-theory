window.CH01 = {
  quiz: [
    {
      id: "c1q1", type: "mcq",
      q: "Thứ tự dây buông từ dây 6 (dày nhất) đến dây 1 (mỏng nhất)?",
      options: ["E A D G B E", "E B G D A E", "A D G C E A", "E A D G B D"],
      answer: 0,
      explain: "Chuẩn tuning: E2 A2 D3 G3 B3 E4. Đọc từ dây dày xuống dây mỏng.",
      ref: "#ghi-chu-bo-cuc"
    },
    {
      id: "c1q2", type: "mcq",
      q: "Mỗi phím trên cần đàn tương ứng với khoảng cách nào?",
      options: ["Nửa cung (half step)", "Một cung (whole step)", "Một quãng 3", "Một quãng 4"],
      answer: 0,
      explain: "Mỗi phím = 1 nửa cung = 1 semitone. Hai phím = 1 cung.",
      ref: "#ghi-chu-nua-cung"
    },
    {
      id: "c1q3", type: "mcq",
      q: "Phím 12 của một dây so với dây buông?",
      options: ["Cùng tên nốt, cao hơn một quãng 8", "Cao hơn nửa cung", "Thấp hơn một quãng 8", "Là nốt át của dây đó"],
      answer: 0,
      explain: "12 phím = 12 nửa cung = 1 quãng 8, tên nốt lặp lại và chu kỳ bắt đầu lại.",
      ref: "#ghi-chu-nua-cung"
    },
    {
      id: "c1q4", type: "fill",
      q: "Nốt ở dây 5, phím 3 là nốt ___",
      answer: ["c"],
      explain: "Dây 5 buông là A; A → A# → B → C. Vậy phím 3 là C.",
      ref: "#ghi-chu-not-trung"
    },
    {
      id: "c1q5", type: "fill",
      q: "Nốt ở dây 4, phím 2 là nốt ___",
      answer: ["e"],
      explain: "Dây 4 buông là D; D → D# → E. Phím 2 là E.",
      ref: "#ghi-chu-not-trung"
    },
    {
      id: "c1q6", type: "mcq",
      q: "Cặp dây nào KHÔNG cách nhau một quãng 4 đúng?",
      options: ["G và B", "E và A", "A và D", "D và G"],
      answer: 0,
      explain: "G → B là quãng 3 trưởng (4 nửa cung), các cặp còn lại là quãng 4 đúng (5 nửa cung).",
      ref: "#ghi-chu-len-day"
    },
    {
      id: "c1q7", type: "mcq",
      q: "Nốt ở dây 3, phím 5 là nốt nào?",
      options: ["C", "D", "E", "G"],
      answer: 0,
      explain: "Dây 3 buông là G; phím 5 = G + 5 nửa cung = C. Đây cũng là nốt gốc của thế bấm C ở vị trí 3.",
      ref: "#ghi-chu-bo-cuc"
    },
    {
      id: "c1q8", type: "fret",
      q: "Bấm tất cả nốt E trên ba dây trầm (dây 6, 5, 4) trong 12 phím đầu.",
      answer: [[6, 0], [6, 12], [5, 7], [4, 2]],
      explain: "Dây 6 buông là E, phím 12 lặp lại E; dây 5 phím 7 là E; dây 4 phím 2 là E.",
      ref: "#ghi-chu-not-trung"
    },
    {
      id: "c1q9", type: "mcq",
      q: "Ngoài dây 5 buông, nốt A còn nằm ở dây 3 phím mấy?",
      options: ["2", "3", "5", "7"],
      answer: 0,
      explain: "Dây 3 buông G, phím 2 = A. Nốt A có mặt ở 5/0, 3/2, 2/10, 1/5.",
      ref: "#ghi-chu-not-trung"
    },
    {
      id: "c1q10", type: "mcq",
      q: "Khi lên dây bằng hài âm, hài âm phím 5 của dây 6 khớp với gì?",
      options: ["Hài âm phím 7 của dây 5", "Dây 5 buông", "Hài âm phím 12 của dây 5", "Dây 4 buông"],
      answer: 0,
      explain: "Hệ 5/7: hài âm phím 5 dây dưới khớp hài âm phím 7 dây trên (cùng cao độ).",
      ref: "#ghi-chu-hai-am"
    }
  ],
  cards: [
    { id: "c1f1", front: "6 dây buông, từ dây 6 đến dây 1?", back: "E A D G B E", hint: "Câu nhớ: Eddie Ate Dynamite, Good Bye Eddie" },
    { id: "c1f2", front: "Mỗi phím = ?", back: "1 nửa cung (semitone)", hint: "Nửa cung là đơn vị nhỏ nhất trên cần đàn" },
    { id: "c1f3", front: "Phím 12 = ?", back: "Quãng 8 · tên nốt lặp lại", hint: "12 nửa cung" },
    { id: "c1f4", front: "Dây 5 phím 3?", back: "C", hint: "A → A# → B → C" },
    { id: "c1f5", front: "Dây 4 phím 2?", back: "E", hint: "D → D# → E" },
    { id: "c1f6", front: "Dây 4 phím 5?", back: "G", hint: "D + 5 nửa cung" },
    { id: "c1f7", front: "Dây 3 phím 4?", back: "B", hint: "G → G# → A → A# → B" },
    { id: "c1f8", front: "Dây 2 phím 1?", back: "C", hint: "Dây 2 buông là B" },
    { id: "c1f9", front: "Dây 1 phím 3?", back: "G", hint: "E → F → F# → G" },
    { id: "c1f10", front: "Dây 6 phím 5?", back: "A", hint: "Trùng dây 5 buông" },
    { id: "c1f11", front: "Dây 6 phím 8?", back: "C", hint: "Phím 7 là B" },
    { id: "c1f12", front: "Nốt E nằm ở dây 5 phím?", back: "7", hint: "A + 5 nửa cung = D, +2 = E" },
    { id: "c1f13", front: "Nốt G nằm ở dây 6 phím?", back: "3", hint: "E → F → F# → G" },
    { id: "c1f14", front: "Nốt B nằm ở dây 6 phím?", back: "7", hint: "E → F# → G# → A → B" },
    { id: "c1f15", front: "Nốt D nằm ở dây 5 phím?", back: "5", hint: "A → B → C → D" },
    { id: "c1f16", front: "Cặp dây ngoại lệ của hệ quãng 4", back: "G → B (quãng 3 trưởng)", hint: "4 nửa cung thay vì 5" },
    { id: "c1f17", front: "Hài âm phím 12 = ?", back: "Cao độ dây buông + 1 quãng 8", hint: "Chia đôi dây" },
    { id: "c1f18", front: "Intonation chỉnh ở bộ phận nào?", back: "Yên ngựa (bridge saddle)", hint: "So hài âm phím 12 với nốt bấm phím 12" }
  ]
};
