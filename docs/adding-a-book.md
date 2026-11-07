# Thêm một sách mới

Cấu trúc thư viện dùng chung một shell; mỗi sách chỉ cần dữ liệu và nội dung của nó.

## 1. Tạo thư mục

Đặt tên theo `tên-sách-tác-giả`, viết thường, gạch nối. Ví dụ:
`music-theory-for-guitarists-kolb/`

```
<slug>/
  index.html            dashboard của sách (copy từ sách mẫu, sửa tiêu đề)
  glossary.html         tra cứu thuật ngữ (nếu có)
  chapters/
    ch01-....html
  data/
    book.js             window.BOOK
    ch01.js ...         window.CH01 ...
    glossary.js         window.GLOSSARY (tùy chọn)
```

## 2. Khai báo sách trong thư viện

Thêm một entry vào `assets/data/library.js`:

```js
window.LIBRARY = [
  {
    id: "mtg-kolb",
    slug: "music-theory-for-guitarists-kolb",
    code: "MTG",
    title: "Music Theory for Guitarists",
    author: "Tom Kolb",
    chapters: 13,
    built: true,
    keywords: ["guitar", "nhạc lý"]
  }
];
```

`id` là khóa lưu tiến độ (không đổi sau khi đã có người học). `chapters` dùng để tính % khi
chưa mở sách.

## 3. Khai báo sách trong `data/book.js`

```js
window.BOOK = {
  id: "mtg-kolb",
  slug: "music-theory-for-guitarists-kolb",
  title: "Music Theory for Guitarists",
  author: "Tom Kolb",
  chaptersDir: "chapters",
  chapters: [
    {
      id: "ch01",
      num: 1,
      title: "The Fretboard",
      vi: "Bàn phím đàn",
      file: "ch01-fretboard.html",
      data: "CH01",
      pages: "tr.5-7",
      built: true,
      keywords: ["fretboard", "nốt", "lên dây"]
    }
  ]
};
```

## 4. Trang chương

Copy một chương mẫu rồi sửa:

- `<body data-page="chapter" data-book="<id>" data-chapter="ch01" data-data="CH01" data-root="../.." data-book-root="..">`
- CSS: `../../assets/shell.css`
- Scripts theo thứ tự: `../data/book.js`, `../data/chXX.js`, `../../assets/diagrams.js`,
  `../../assets/shell.js`, `../../assets/quiz.js`, `../../assets/cards.js`, `../../assets/pwa.js`
- Cần có `#cheat-sheet`, `#quiz-body`, `#cards-body`.

## 5. Dữ liệu chương

```js
window.CH01 = {
  quiz: [
    { id: "c1q1", type: "mcq", q: "...", options: ["A", "B", "C", "D"], answer: 0, explain: "...", ref: "#ghi-chu-..." }
  ],
  cards: [
    { id: "c1f1", front: "...", back: "...", hint: "..." }
  ]
};
```

Quy ước id: `c<số chương>q<số>` và `c<số chương>f<số>`. `ref` phải trỏ tới `id` có trong HTML.

## 6. PWA

Thêm các file của sách vào `PRECACHE` trong `sw.js`, và tăng `VERSION` mỗi lần deploy
để trình duyệt tải bản mới.

## 7. Kiểm tra

Chạy `node tools/validate.js`, sau đó mở thư viện và sách mới ở 3 kích thước mobile
(375, 390, 430) để chắc không tràn ngang.
