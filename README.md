# Thư viện nhạc lý

Web tĩnh để học nhạc lý trên điện thoại: ghi chú, quiz, flashcard, ôn tập ngắt quãng.
Cài được lên màn hình chính (PWA) và dùng offline sau lần mở đầu tiên.

Học online: https://quangminhit1102.github.io/guitar-theory/

## Cấu trúc

```
index.html                 thư viện sách
assets/                    shell dùng chung (CSS, JS, icon, service worker)
music-theory-for-guitarists-kolb/
  index.html               dashboard của sách
  chapters/                13 trang chương
  data/                    book.js, ch01..13.js, glossary.js
docs/adding-a-book.md      cách thêm sách mới
```

## Chạy tại máy

Mở trực tiếp `index.html` bằng trình duyệt, hoặc phục vụ qua HTTP để thử PWA:

```
python -m http.server 8123
```

Sau đó mở `http://127.0.0.1:8123/`.

## Kiểm tra dữ liệu

```
node tools/validate.js
```

Lệnh này kiểm tra cấu trúc thư viện, đường dẫn chương, id quiz/flashcard, `ref` tới mục lý thuyết
và ngưỡng số câu hỏi.

## Triển khai

Push lên nhánh `main`; GitHub Pages tự build. Nhớ tăng `VERSION` trong `sw.js` khi sửa nội dung
để trình duyệt nhận bản mới.
