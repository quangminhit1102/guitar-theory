window.CH04 = {
  quiz: [
    {
      id: "c4q1", type: "mcq",
      q: "Quãng (interval) là gì?",
      options: [
        "Khoảng cách cao độ giữa hai nốt",
        "Số phím trên cần đàn",
        "Tên của một hợp âm",
        "Chu kỳ 12 nốt"
      ],
      answer: 0,
      explain: "Quãng đo khoảng cách cao độ giữa hai nốt, không phải khoảng cách vật lý trên cần đàn.",
      ref: "#ghi-chu-ten-quang"
    },
    {
      id: "c4q2", type: "mcq",
      q: "Quãng nhỏ nhất trong âm nhạc phương Tây là gì?",
      options: ["Nửa cung", "Một cung", "Quãng 3 thứ", "Quãng 4 đúng"],
      answer: 0,
      explain: "Nửa cung (half step) là đơn vị nhỏ nhất, tương ứng một phím trên guitar.",
      ref: "#ghi-chu-ten-quang"
    },
    {
      id: "c4q3", type: "mcq",
      q: "Quãng 3 trưởng có bao nhiêu nửa cung?",
      options: ["3", "4", "5", "7"],
      answer: 1,
      explain: "Quãng 3 trưởng (major 3rd) gồm 4 nửa cung, ví dụ C đến E.",
      ref: "#ghi-chu-ten-quang"
    },
    {
      id: "c4q4", type: "fill",
      q: "Quãng 5 đúng có ___ nửa cung.",
      answer: ["7", "bảy", "seven"],
      explain: "Quãng 5 đúng (perfect 5th) gồm 7 nửa cung, ví dụ C đến G.",
      ref: "#ghi-chu-ten-quang"
    },
    {
      id: "c4q5", type: "mcq",
      q: "Quãng nào thuộc họ đúng (perfect family)?",
      options: ["Quãng 4 đúng", "Quãng 3 trưởng", "Quãng 6 thứ", "Quãng 7 trưởng"],
      answer: 0,
      explain: "Họ đúng gồm quãng 1, 4, 5, 8. Các quãng 2, 3, 6, 7 thuộc họ trưởng/thứ.",
      ref: "#ghi-chu-gia-dinh"
    },
    {
      id: "c4q6", type: "mcq",
      q: "Nâng quãng 5 đúng lên nửa cung được quãng gì?",
      options: ["Quãng 5 giảm", "Quãng 5 tăng", "Quãng 5 thứ", "Quãng 6 trưởng"],
      answer: 1,
      explain: "Quãng đúng nâng nửa cung thành quãng tăng (augmented), ví dụ C–G thành C–G♯.",
      ref: "#ghi-chu-gia-dinh"
    },
    {
      id: "c4q7", type: "fill",
      q: "Hạ quãng 3 trưởng xuống nửa cung, phẩm chất mới là ___ (major → ?).",
      answer: ["minor", "thứ", "minor 3rd", "quãng 3 thứ"],
      explain: "Quãng trưởng hạ nửa cung thành quãng thứ: C–E thành C–E♭.",
      ref: "#ghi-chu-gia-dinh"
    },
    {
      id: "c4q8", type: "mcq",
      q: "Quãng 9 trưởng bằng quãng 8 cộng với quãng nào?",
      options: ["Quãng 2 trưởng", "Quãng 2 thứ", "Quãng 3 trưởng", "Quãng 4 đúng"],
      answer: 0,
      explain: "Quãng 9 trưởng = quãng 8 + quãng 2 trưởng = 12 + 2 = 14 nửa cung.",
      ref: "#ghi-chu-gia-dinh"
    },
    {
      id: "c4q9", type: "fill",
      q: "Quãng 8 cộng quãng 5 đúng bằng quãng ___ đúng.",
      answer: ["12", "12th", "perfect 12th", "quãng 12", "quãng 12 đúng"],
      explain: "Quãng 12 đúng = 12 + 7 = 19 nửa cung.",
      ref: "#ghi-chu-gia-dinh"
    },
    {
      id: "c4q10", type: "mcq",
      q: "Vì sao hình dạng quãng dịch một phím khi bắc qua dây G và B?",
      options: [
        "Vì G–B cách 4 nửa cung, không phải 5",
        "Vì dây B cao hơn dây G một quãng 8",
        "Vì dây G là dây buông",
        "Vì phím 12 lặp lại tên nốt"
      ],
      answer: 0,
      explain: "Các dây cách nhau quãng 4 đúng (5 nửa cung), riêng G–B là quãng 3 trưởng (4 nửa cung).",
      ref: "#ghi-chu-hinh-dang"
    },
    {
      id: "c4q11", type: "fret",
      q: "Đánh dấu quãng 5 đúng tính từ C ở dây 5 phím 3: bấm nốt gốc C và nốt G.",
      answer: [[5, 3], [4, 5]],
      explain: "C ở 5/3; G ở dây 4 phím 5 (dây 4 buông D, cộng 5 nửa cung = G).",
      ref: "#ghi-chu-hinh-dang"
    },
    {
      id: "c4q12", type: "fret",
      q: "Đánh dấu quãng 8 tính từ G ở dây 6 phím 3: bấm nốt gốc G và nốt G cao hơn.",
      answer: [[6, 3], [5, 10]],
      explain: "G ở 6/3; quãng 8 cùng tên nằm ở dây 5 phím 10.",
      ref: "#ghi-chu-hinh-dang"
    },
    {
      id: "c4q13", type: "mcq",
      q: "Bạn bấm G ở dây 6 phím 3 và E ở dây 4 phím 2. Quãng giữa hai nốt là gì?",
      options: ["Quãng 6 trưởng", "Quãng 6 thứ", "Quãng 5 đúng", "Quãng 7 thứ"],
      answer: 0,
      explain: "G ở 6/3 và E ở 4/2 cách nhau 9 nửa cung, tức quãng 6 trưởng.",
      ref: "#ghi-chu-hinh-dang"
    },
    {
      id: "c4q14", type: "fill",
      q: "Đảo hai nốt của quãng 3 trưởng C–E (chơi E–C) ta được quãng ___.",
      answer: ["6 thứ", "minor 6th", "quãng 6 thứ"],
      explain: "Đảo quãng: 9 − 3 = 6, trưởng đổi thành thứ, nên E–C là quãng 6 thứ.",
      ref: "#ghi-chu-hinh-dang"
    },
    {
      id: "c4q15", type: "fill",
      q: "Quãng 11 đúng bằng quãng 8 cộng quãng 4 đúng, tức ___ nửa cung.",
      answer: ["17", "mười bảy"],
      explain: "12 nửa cung của quãng 8 cộng 5 nửa cung của quãng 4 đúng bằng 17.",
      ref: "#ghi-chu-gia-dinh"
    },
    {
      id: "c4q16", type: "fret",
      q: "Từ A ở dây 3 phím 2, bấm thêm quãng 5 đúng trên dây 2. Đánh dấu cả hai nốt.",
      answer: [[3, 2], [2, 5]],
      explain: "A lên quãng 5 đúng là E; E nằm ở dây 2 phím 5, và cặp G–B làm hình dịch một phím.",
      ref: "#ghi-chu-hinh-dang"
    },
    {
      id: "c4q17", type: "mcq",
      q: "Bạn bấm B ở dây 3 phím 4 và F ở dây 2 phím 6. Quãng giữa hai nốt là gì?",
      options: ["Quãng 5 giảm", "Quãng 5 đúng", "Quãng 4 đúng", "Quãng 6 thứ"],
      answer: 0,
      explain: "B đến F là 6 nửa cung, đúng bằng tritone nên gọi là quãng 5 giảm.",
      ref: "#ghi-chu-ten-quang"
    }
  ],
  cards: [
    { id: "c4f1", front: "Quãng (interval) là gì?", back: "Khoảng cách cao độ giữa hai nốt", hint: "Đo bằng nửa cung" },
    { id: "c4f2", front: "Quãng nhỏ nhất trong âm nhạc phương Tây?", back: "Nửa cung (half step) = 1 phím", hint: "Đơn vị nhỏ nhất trên cần đàn" },
    { id: "c4f3", front: "Số bậc (quantity) của quãng là gì?", back: "Số bước âm giai từ nốt dưới đến nốt trên", hint: "2, 3, 4…" },
    { id: "c4f4", front: "Phẩm chất (quality) của quãng là gì?", back: "Trưởng, thứ, đúng, tăng, giảm; xác định bằng số nửa cung", hint: "Major, minor, perfect…" },
    { id: "c4f5", front: "Quãng 2 thứ = bao nhiêu nửa cung?", back: "1 nửa cung", hint: "C đến D♭" },
    { id: "c4f6", front: "Quãng 2 trưởng = bao nhiêu nửa cung?", back: "2 nửa cung", hint: "C đến D" },
    { id: "c4f7", front: "Quãng 3 thứ = bao nhiêu nửa cung?", back: "3 nửa cung", hint: "C đến E♭" },
    { id: "c4f8", front: "Quãng 3 trưởng = bao nhiêu nửa cung?", back: "4 nửa cung", hint: "C đến E" },
    { id: "c4f9", front: "Quãng 4 đúng = bao nhiêu nửa cung?", back: "5 nửa cung", hint: "C đến F" },
    { id: "c4f10", front: "Quãng 5 giảm / 4 tăng = bao nhiêu nửa cung?", back: "6 nửa cung (tritone)", hint: "C đến G♭ hoặc F♯" },
    { id: "c4f11", front: "Quãng 5 đúng = bao nhiêu nửa cung?", back: "7 nửa cung", hint: "C đến G" },
    { id: "c4f12", front: "Quãng 6 thứ = bao nhiêu nửa cung?", back: "8 nửa cung", hint: "C đến A♭" },
    { id: "c4f13", front: "Quãng 6 trưởng = bao nhiêu nửa cung?", back: "9 nửa cung", hint: "C đến A" },
    { id: "c4f14", front: "Quãng 7 thứ = bao nhiêu nửa cung?", back: "10 nửa cung", hint: "C đến B♭" },
    { id: "c4f15", front: "Quãng 7 trưởng = bao nhiêu nửa cung?", back: "11 nửa cung", hint: "C đến B" },
    { id: "c4f16", front: "Quãng 8 đúng = bao nhiêu nửa cung?", back: "12 nửa cung", hint: "C đến C cao hơn" },
    { id: "c4f17", front: "Họ trưởng/thứ gồm các quãng nào?", back: "Quãng 2, 3, 6, 7", hint: "Bốn số bậc" },
    { id: "c4f18", front: "Họ đúng (perfect) gồm các quãng nào?", back: "Quãng 1, 4, 5, 8", hint: "Bốn số bậc còn lại" },
    { id: "c4f19", front: "Nâng quãng trưởng hoặc quãng đúng lên nửa cung được gì?", back: "Quãng tăng (augmented)", hint: "Raised by a half step" },
    { id: "c4f20", front: "Hạ quãng trưởng xuống nửa cung được gì?", back: "Quãng thứ (minor)", hint: "Major → ?" },
    { id: "c4f21", front: "Hạ quãng đúng xuống nửa cung được gì?", back: "Quãng giảm (diminished)", hint: "Perfect → ?" },
    { id: "c4f22", front: "Vì sao hình quãng dịch ở cặp dây G–B?", back: "G–B cách 4 nửa cung thay vì 5", hint: "Quãng 3 trưởng thay vì quãng 4 đúng" },
    { id: "c4f23", front: "Melodic và harmonic interval khác nhau thế nào?", back: "Melodic: hai nốt chơi lần lượt; harmonic: chơi cùng lúc", hint: "Dyad, double stop" },
    { id: "c4f24", front: "Quãng 9 trưởng và quãng 12 đúng có bao nhiêu nửa cung?", back: "Quãng 9 trưởng = 14; quãng 12 đúng = 19", hint: "8 + 2 và 8 + 5" }
  ]
};
