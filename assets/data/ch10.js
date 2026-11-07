window.CH10 = {
  quiz: [
    {
      id: "c10q1", type: "mcq",
      q: "Trong 12 ô blues, ba hợp âm I, IV và V thường mang chất lượng nào?",
      options: [
        "Cả ba đều là hợp âm bảy át (dominant 7)",
        "Cả ba đều là hợp âm bảy trưởng (maj7)",
        "I và IV là maj7, V là dominant 7",
        "I là minor 7, IV và V là dominant 7"
      ],
      answer: 0,
      explain: "Blues gắn dominant 7 cho cả I, IV lẫn V, không chỉ riêng V như hòa âm diatonic.",
      ref: "#ghi-chu-blues-12-o"
    },
    {
      id: "c10q2", type: "mcq",
      q: "Quick change trong 12 ô blues xảy ra ở đâu?",
      options: [
        "Ô 2, đổi sang IV",
        "Ô 6, đổi sang V",
        "Ô 9, đổi sang V",
        "Hai ô cuối, đổi sang bVI"
      ],
      answer: 0,
      explain: "Quick change chen IV vào ô 2, phá vỡ bốn ô I đầu tiên; phần còn lại giữ nguyên.",
      ref: "#ghi-chu-blues-12-o"
    },
    {
      id: "c10q3", type: "mcq",
      q: "Turnaround nằm ở đâu và thường gồm chuỗi hợp âm nào?",
      options: [
        "Hai ô cuối; I–bVI–V",
        "Bốn ô đầu; I–IV–V",
        "Ô 5–6; IV–I",
        "Ô 9–10; V–IV"
      ],
      answer: 0,
      explain: "Turnaround chiếm hai ô cuối, thường là I–bVI–V; trong A là A7–F7–E7.",
      ref: "#ghi-chu-blues-12-o"
    },
    {
      id: "c10q4", type: "fill",
      q: "Công thức bậc của thang ngũ cung thứ (minor pentatonic) là ___",
      answer: ["1 b3 4 5 b7", "1-b3-4-5-b7", "1, b3, 4, 5, b7", "1 b3 4 5 b7 (a c d e g)"],
      explain: "Minor pentatonic lấy 1–b3–4–5–b7; với A là A–C–D–E–G.",
      ref: "#ghi-chu-ngu-giac-thu"
    },
    {
      id: "c10q5", type: "mcq",
      q: "Minor pentatonic bỏ đi hai bậc nào của thang thứ tự nhiên?",
      options: [
        "Bậc 2 và bậc b6",
        "Bậc 2 và bậc 7",
        "Bậc 4 và bậc 6",
        "Bậc 3 và bậc 7"
      ],
      answer: 0,
      explain: "Bỏ 2 và b6 để xóa hai nửa cung 2–b3 và 5–b6, tạo các khoảng 3 thứ dễ bấm.",
      ref: "#ghi-chu-ngu-giac-thu"
    },
    {
      id: "c10q6", type: "fill",
      q: "Công thức bậc của thang ngũ cung trưởng (major pentatonic) là ___",
      answer: ["1 2 3 5 6", "1-2-3-5-6", "1, 2, 3, 5, 6", "1 2 3 5 6 (c d e g a)"],
      explain: "Major pentatonic lấy 1–2–3–5–6; với C là C–D–E–G–A.",
      ref: "#ghi-chu-ngu-giac-truong"
    },
    {
      id: "c10q7", type: "mcq",
      q: "Blues scale có bao nhiêu nốt và thêm bậc nào so với minor pentatonic?",
      options: [
        "6 nốt; thêm b5",
        "5 nốt; thêm b7",
        "7 nốt; thêm 2",
        "6 nốt; thêm 6"
      ],
      answer: 0,
      explain: "Blues scale = minor pentatonic + b5, thành 1–b3–4–b5–5–b7.",
      ref: "#ghi-chu-ngu-giac-thu"
    },
    {
      id: "c10q8", type: "mcq",
      q: "Nốt b5 của A blues scale (E♭) tạo ra gì khi chơi trên hợp âm IV (D7)?",
      options: [
        "Bậc 9 giảm (b9)",
        "Bậc 5 giảm (b5)",
        "Bậc 7 trưởng (maj7)",
        "Bậc 3 trưởng (3)"
      ],
      answer: 0,
      explain: "E♭ là b9 của D, b5 của A và maj7 của E; cùng một nốt nhưng ba chức năng.",
      ref: "#ghi-chu-ngu-giac-thu"
    },
    {
      id: "c10q9", type: "mcq",
      q: "A minor pentatonic có quan hệ relative với thang ngũ cung trưởng nào?",
      options: [
        "C major pentatonic",
        "A major pentatonic",
        "E major pentatonic",
        "G major pentatonic"
      ],
      answer: 0,
      explain: "A minor pentatonic và C major pentatonic dùng cùng tập nốt, chỉ khác nốt gốc.",
      ref: "#ghi-chu-ngu-giac-truong"
    },
    {
      id: "c10q10", type: "mcq",
      q: "A minor pentatonic có quan hệ parallel với thang nào?",
      options: [
        "A major pentatonic",
        "C major pentatonic",
        "E major pentatonic",
        "D major pentatonic"
      ],
      answer: 0,
      explain: "Parallel nghĩa là cùng nốt gốc nhưng khác tập nốt: A minor pent và A major pent.",
      ref: "#ghi-chu-ngu-giac-truong"
    },
    {
      id: "c10q11", type: "fret",
      q: "Đánh dấu toàn bộ nốt của A minor pentatonic ở vị trí 5 (các phím 5–8).",
      answer: [
        [6, 5], [6, 8],
        [5, 5], [5, 7],
        [4, 5], [4, 7],
        [3, 5], [3, 7],
        [2, 5], [2, 8],
        [1, 5], [1, 8]
      ],
      explain: "Thế 5 gồm A–C trên dây 6, D–E dây 5, G–A dây 4, C–D dây 3, E–G dây 2, A–C dây 1.",
      ref: "#ghi-chu-ngu-giac-thu"
    },
    {
      id: "c10q12", type: "mcq",
      q: "Eighth-note shuffle được tạo ra bằng cách nào?",
      options: [
        "Nối hai nốt đầu của nhóm triplet nốt đơn thứ tám, giữ nguyên nốt thứ ba",
        "Đảo trật tự ba nốt của triplet",
        "Chơi mỗi phách thành hai nốt hoàn toàn bằng nhau",
        "Bỏ nốt thứ ba của triplet"
      ],
      answer: 0,
      explain: "Nối hai nốt đầu của triplet tạo cảm giác dài–ngắn đung đưa đặc trưng của shuffle.",
      ref: "#ghi-chu-blues-12-o"
    }
  ],
  cards: [
    { id: "c10f1", front: "12 ô blues chia thành mấy phần?", back: "Ba phần, mỗi phần 4 ô.", hint: "4 + 4 + 4" },
    { id: "c10f2", front: "Bốn ô đầu của 12 ô blues?", back: "Chỉ I7, dùng để khẳng định tông.", hint: "Trừ khi có quick change" },
    { id: "c10f3", front: "Ô 5–6 và 7–8 của 12 ô blues?", back: "IV7 rồi về I7.", hint: "Nửa sau chuyển sang IV" },
    { id: "c10f4", front: "Ô 9–12 của 12 ô blues?", back: "V7 → IV7 → I7, rồi turnaround ở hai ô cuối.", hint: "Đi xuống V–IV–I" },
    { id: "c10f5", front: "Turnaround của 12 ô blues?", back: "Hai ô cuối, I–bVI–V (A7–F7–E7).", hint: "Đưa vòng quay lại đầu" },
    { id: "c10f6", front: "Quick change là gì?", back: "Ô 2 đổi sang IV; các ô còn lại giữ nguyên.", hint: "Chỉ một ô bị thay" },
    { id: "c10f7", front: "Kết thúc tiêu chuẩn thay cho turnaround?", back: "I7 → bII7 → I7 (A7–B♭7–A7).", hint: "B♭ là bII của A" },
    { id: "c10f8", front: "Nhịp eighth-note shuffle?", back: "Nối hai nốt đầu của triplet nốt đơn thứ tám, giữ nốt thứ ba.", hint: "Cặp dài–ngắn" },
    { id: "c10f9", front: "8-bar blues là gì?", back: "I–IV–V gói trong 8 ô, nhiều thứ tự khác nhau; ví dụ ở E là E7–A7–B7.", hint: "Vẫn là I–IV–V" },
    { id: "c10f10", front: "16-bar blues là gì?", back: "I–IV–V kéo dài 16 ô, ví dụ trong C dùng C7–F7–G7.", hint: "Dài gấp đôi 8 ô" },
    { id: "c10f11", front: "Minor blues dùng những hợp âm nào?", back: "i7–iv7, có thể thêm bVImaj7 và V7 biến đổi; cách bấm (voicing) bảy thứ được dùng nhiều.", hint: "Cm7–Fm7–A♭maj7–G7alt" },
    { id: "c10f12", front: "Công thức minor pentatonic?", back: "1–b3–4–5–b7", hint: "Năm nốt, không có 2 và b6" },
    { id: "c10f13", front: "A minor pentatonic gồm những nốt nào?", back: "A–C–D–E–G", hint: "1 b3 4 5 b7 của A" },
    { id: "c10f14", front: "Vì sao minor pentatonic dễ bấm?", back: "Bỏ 2 và b6 nên không còn nửa cung; còn quãng 3 thứ giữa nốt gốc–b3 và 5–b7.", hint: "Hai nốt mỗi dây" },
    { id: "c10f15", front: "Năm thế bấm của A minor pentatonic?", back: "Mở, 2fr, 5fr, 7fr, 9fr; 12fr là thế mở cộng một quãng 8.", hint: "Sáu hình, năm thế khác nhau" },
    { id: "c10f16", front: "Công thức blues scale?", back: "1–b3–4–b5–5–b7", hint: "Minor pent + b5" },
    { id: "c10f17", front: "A blues scale gồm những nốt nào?", back: "A–C–D–E♭–E–G", hint: "Thêm E♭ vào A minor pent" },
    { id: "c10f18", front: "Blue note b5 nằm giữa hai bậc nào?", back: "Giữa 4 và 5, tạo đoạn chromatic nửa cung.", hint: "Trong A: D–E♭–E" },
    { id: "c10f19", front: "E♭ (b5 của A blues) trên A7, D7, E7?", back: "b5 trên A7, b9 trên D7, maj7 trên E7.", hint: "Cùng nốt, ba chức năng" },
    { id: "c10f20", front: "Công thức major pentatonic?", back: "1–2–3–5–6", hint: "Bỏ 4 và 7" },
    { id: "c10f21", front: "C major pentatonic gồm những nốt nào?", back: "C–D–E–G–A", hint: "1 2 3 5 6 của C" },
    { id: "c10f22", front: "Relative của A minor pentatonic?", back: "C major pentatonic — cùng nốt, khác gốc.", hint: "Cùng tập nốt" },
    { id: "c10f23", front: "Parallel của A minor pentatonic?", back: "A major pentatonic — cùng gốc, khác nốt.", hint: "A–B–C♯–E–F♯" },
    { id: "c10f24", front: "Ghép A minor pent với A major pent được gì?", back: "Thang tám nốt A–B–C–C♯–D–E–F♯–G; thường dùng trên hợp âm I.", hint: "Hai nốt trùng: A và E" }
  ]
};
