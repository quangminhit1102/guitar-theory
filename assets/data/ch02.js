window.CH02 = {
  quiz: [
    {
      id: "c2q1", type: "mcq",
      q: "Guitar được ghi trên khóa nhạc nào?",
      options: ["Khóa Sol (treble clef / G clef)", "Khóa Fa (bass clef)", "Khóa Đô (alto clef)", "Không dùng khóa"],
      answer: 0,
      explain: "Nhạc guitar dùng khóa Sol, còn gọi là G clef vì vòng xoắn ôm quanh dòng G.",
      ref: "#ghi-chu-khuong-nhac"
    },
    {
      id: "c2q2", type: "fill",
      q: "Tên các dòng khuông nhạc từ dưới lên: E G B D ___",
      answer: ["f"],
      explain: "Câu nhớ: Every Good Boy Deserves Favor → E G B D F.",
      ref: "#ghi-chu-khuong-nhac"
    },
    {
      id: "c2q3", type: "mcq",
      q: "Tên các khoảng trống khuông nhạc từ dưới lên?",
      options: ["F A C E", "E G B D", "A C E G", "F A D G"],
      answer: 0,
      explain: "Bốn khoảng trống đọc thành F-A-C-E, đúng là chữ \"face\".",
      ref: "#ghi-chu-khuong-nhac"
    },
    {
      id: "c2q4", type: "mcq",
      q: "Số chỉ nhịp 3/4 nghĩa là gì?",
      options: ["3 phách mỗi ô nhịp, nốt đen = 1 phách", "4 phách mỗi ô, nốt đen = 3 phách", "3 nốt trong mỗi ô nhịp", "Nhịp 3, đếm 4 lần"],
      answer: 0,
      explain: "Số trên = số phách mỗi ô; số dưới = loại nốt nhận 1 phách (4 = nốt đen).",
      ref: "#ghi-chu-nhip"
    },
    {
      id: "c2q5", type: "mcq",
      q: "Nốt tròn (whole note) dài bao nhiêu phách?",
      options: ["4 phách", "2 phách", "1 phách", "1/2 phách"],
      answer: 0,
      explain: "Tròn 4 · trắng 2 · đen 1 · móc đơn 1/2 · móc kép 1/4.",
      ref: "#ghi-chu-nhip"
    },
    {
      id: "c2q6", type: "fill",
      q: "Dấu chấm sau nốt làm tăng thêm ___ giá trị gốc.",
      answer: ["1/2", "một nửa", "nửa"],
      explain: "Dotted note = giá trị gốc + một nửa giá trị gốc (nốt đen chấm = 1,5 phách).",
      ref: "#ghi-chu-truong-do"
    },
    {
      id: "c2q7", type: "mcq",
      q: "Triplet là gì?",
      options: ["3 nốt chiếm thời gian của 2 nốt cùng loại", "3 nốt cùng cao độ", "3 ô nhịp liên tiếp", "Nốt có 3 dấu chấm"],
      answer: 0,
      explain: "Triplet chia khoảng thời gian của 2 nốt thành 3 phần bằng nhau.",
      ref: "#ghi-chu-truong-do"
    },
    {
      id: "c2q8", type: "mcq",
      q: "Dấu nối (tie) dùng để nối hai nốt thế nào?",
      options: ["Cùng cao độ, cộng dồn trường độ", "Khác cao độ, chơi liền mạch", "Cùng ô nhịp, nhấn mạnh", "Khác trường độ, đổi nhịp"],
      answer: 0,
      explain: "Tie nối hai nốt cùng cao độ thành một âm dài hơn. Slur nối nốt khác cao độ để chơi liền.",
      ref: "#ghi-chu-truong-do"
    },
    {
      id: "c2q9", type: "mcq",
      q: "Trong tab, dòng dưới cùng đại diện dây nào?",
      options: ["Dây 6 (E trầm)", "Dây 1 (E cao)", "Dây 5 (A)", "Tùy bài"],
      answer: 0,
      explain: "Tab xếp dây 6 ở dưới cùng, dây 1 trên cùng; số là phím cần bấm, 0 là dây buông.",
      ref: "#ghi-chu-hop-am"
    },
    {
      id: "c2q10", type: "mcq",
      q: "D.C. al Coda nghĩa là gì?",
      options: ["Về đầu, chơi tới chỗ To Coda rồi nhảy tới Coda", "Chơi lại đoạn vừa rồi 2 lần", "Nhảy tới dấu Segno", "Kết thúc ngay tại đó"],
      answer: 0,
      explain: "D.C. = Da Capo (về đầu). Chơi tới ký hiệu To Coda thì nhảy tới đoạn Coda.",
      ref: "#ghi-chu-ky-hieu"
    },
    {
      id: "c2q11", type: "mcq",
      q: "Trong chord frame, dấu x nghĩa là gì?",
      options: ["Dây bị tắt tiếng (muted)", "Dây buông", "Bấm ở phím 1", "Dây không dùng ngón nào"],
      answer: 0,
      explain: "x = tắt dây, o = dây buông, chấm đặc = bấm phím. Số dưới frame là ngón tay (1 trỏ … 4 út).",
      ref: "#ghi-chu-hop-am"
    },
    {
      id: "c2q12", type: "mcq",
      q: "Ký hiệu 8va trên khuông nhạc nghĩa là gì?",
      options: ["Chơi cao hơn một quãng 8", "Chơi to hơn", "Chơi chậm lại", "Chơi lặp 8 lần"],
      answer: 0,
      explain: "8va = ottava: chơi cao hơn một quãng tám so với vị trí ghi.",
      ref: "#ghi-chu-ky-hieu"
    }
  ],
  cards: [
    { id: "c2f1", front: "Khóa nhạc của guitar?", back: "Khóa Sol (treble clef / G clef)", hint: "Vòng xoắn ôm dòng G" },
    { id: "c2f2", front: "5 dòng khuông nhạc (dưới → trên)?", back: "E G B D F", hint: "Every Good Boy Deserves Favor" },
    { id: "c2f3", front: "4 khoảng trống (dưới → trên)?", back: "F A C E", hint: "Đọc là \"face\"" },
    { id: "c2f4", front: "Bảng chữ cái âm nhạc?", back: "A B C D E F G", hint: "7 chữ, sau G quay lại A" },
    { id: "c2f5", front: "Dấu thăng (♯) làm gì?", back: "Tăng nửa cung (1 phím)", hint: "Ngược lại là dấu giáng" },
    { id: "c2f6", front: "Dấu bình (natural) làm gì?", back: "Huỷ thăng/giáng, trả về nốt tự nhiên", hint: "Dùng trong cùng ô nhịp" },
    { id: "c2f7", front: "Nốt tròn / trắng / đen?", back: "4 / 2 / 1 phách", hint: "Mỗi bậc chia đôi" },
    { id: "c2f8", front: "Móc đơn / móc kép?", back: "1/2 / 1/4 phách", hint: "Có 1 hoặc 2 gạch nối" },
    { id: "c2f9", front: "4/4 còn gọi là?", back: "Common time, ký hiệu C", hint: "4 phách, nốt đen = 1" },
    { id: "c2f10", front: "6/8 nghĩa là?", back: "6 phách mỗi ô, nốt móc đơn = 1 phách", hint: "Số dưới 8 = móc đơn" },
    { id: "c2f11", front: "Dấu chấm sau nốt?", back: "+1/2 giá trị gốc", hint: "Đen chấm = 1,5 phách" },
    { id: "c2f12", front: "Triplet?", back: "3 nốt trong thời gian của 2", hint: "Có số 3 trên nhóm" },
    { id: "c2f13", front: "Tie khác slur thế nào?", back: "Tie: cùng cao độ, cộng dồn. Slur: khác cao độ, chơi liền", hint: "Nhìn hình cong" },
    { id: "c2f14", front: "Dấu lặp (repeat)?", back: "Chơi lại đoạn giữa hai dấu", hint: "Hai chấm + vạch đôi" },
    { id: "c2f15", front: "First / second ending?", back: "Lần 1 chơi ending 1, lặp lại bỏ qua, chơi ending 2", hint: "Khung số 1 và 2" },
    { id: "c2f16", front: "D.C. và D.S.?", back: "Da Capo về đầu · Dal Segno về dấu 𝄋", hint: "C = capo (đầu)" },
    { id: "c2f17", front: "Coda là gì?", back: "Đoạn kết, nhảy tới khi gặp To Coda", hint: "Ký hiệu chữ thập tròn" },
    { id: "c2f18", front: "f / p / mf / mp?", back: "to / nhỏ / vừa to / vừa nhỏ", hint: "forte, piano, mezzo" },
    { id: "c2f19", front: "crescendo / decrescendo?", back: "To dần / nhỏ dần", hint: "Hình nêm mở / khép" },
    { id: "c2f20", front: "Chord frame: o, x, chấm đặc?", back: "Dây buông · dây tắt · bấm phím", hint: "Số dưới = ngón tay" },
    { id: "c2f21", front: "Tab: số 0 nghĩa là?", back: "Dây buông", hint: "Không bấm phím nào" },
    { id: "c2f22", front: "Ba cách ghi hòa âm trên giấy?", back: "Chord stack · tên hợp âm · chord frame", hint: "Nốt chồng, chữ, sơ đồ" }
  ]
};
