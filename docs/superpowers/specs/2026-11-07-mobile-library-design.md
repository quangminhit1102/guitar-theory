# Thư viện nhiều sách + tối ưu mobile — Thiết kế

Ngày: 2026-11-07
Repo: `guitar-theory` (giữ tên), triển khai GitHub Pages.

## 1. Mục tiêu

- Học chủ yếu trên điện thoại: đọc, làm quiz, lật thẻ đều thuận một tay, không tràn ngang,
  cài lên màn hình chính và dùng offline.
- Chuẩn bị cho nhiều sách: thêm sách mới không phải copy code hay sửa từng trang của sách cũ.
- Thêm câu quiz khó/thực tế trong từng chương.

## 2. Cấu trúc

```
/
  index.html                       Thư viện: card sách, % tiến độ, tìm kiếm
  assets/
    styles.css  shell.js           shell dùng chung (nav, theme, progress, TOC, bottom bar)
    quiz.js  cards.js  diagrams.js
    pwa.js  sw.js  favicon.svg
    icons/icon-192.png, icon-512.png
    data/library.js                window.LIBRARY
  music-theory-for-guitarists-kolb/
    index.html                     dashboard của sách
    glossary.html
    chapters/ch01..ch13.html
    data/book.js                   window.BOOK = {id, slug, title, author, chapters}
    data/ch01..ch13.js
    data/glossary.js
  docs/
    adding-a-book.md
  404.html                         chuyển hướng URL cũ
  manifest.webmanifest
```

Quy ước:
- `assets/` chỉ chứa thứ dùng chung; dữ liệu riêng của sách nằm trong `<book>/data/`.
- Trang chương khai báo `data-page="chapter" data-book="mtg-kolb" data-chapter="ch01" data-data="CH01" data-root="../.."`.
- Đường dẫn asset tính tương đối để chạy cả `file://` và Pages.
- Thêm sách: tạo thư mục theo slug `<tên-sách>-<tác-giả>`, thêm `data/book.js`, dữ liệu chương,
  thêm một entry vào `assets/data/library.js`. Không sửa code shell.

## 3. Tiến độ & dữ liệu

- `gt.progress.v2.<bookId>` và `gt.srs.v2.<bookId>` (id sách: `mtg-kolb`).
- Đọc dữ liệu v1 cũ một lần để migrate sang v2, sau đó ghi v2.
- Thư viện tính % mỗi sách = trung bình % các chương.
- `meta.lastChapter` lưu chương gần nhất để nút "Học tiếp".
- Thẻ id vẫn `c<ch>f<số>`, câu hỏi `c<ch>q<số>`; câu thực chiến đánh số tiếp.

## 4. Mobile UX

Breakpoint chính `max-width: 767px`; tablet 768–1023 giữ sidebar thu gọn; desktop như hiện tại.

- Header: nút menu, tên chương 1 dòng, vòng % tiến độ, nút theme dạng icon.
- Bottom tab bar 4 mục: Sách · Mục lục · Quiz · Thẻ; `padding-bottom: env(safe-area-inset-bottom)`.
- Mục lục: bottom sheet liệt kê `h2[id]` của chương, chạm để cuộn tới, đóng sau khi chọn.
- Đọc: 17px/1.75; figure full-bleed cuộn ngang; bảng bọc `.table-scroll` cuộn ngang.
- Touch target ≥48px; `touch-action: manipulation`; bỏ tap highlight; input ≥16px.
- Quiz: mỗi câu một khối, thanh hành động dính đáy; option ≥52px; cần đàn tương tác ô 48px,
  chấm 11px, cuộn ngang; ẩn gợi ý phím 1-4 trên thiết bị cảm ứng.
- Flashcard: thẻ cao ~55vh, chạm để lật; 3 nút chấm dính đáy, cao 52px; đếm tiến độ phiên.
- "Học tiếp" ở thư viện và book index lấy `lastChapter`.

## 5. PWA

- `manifest.webmanifest`: standalone, theme tối, icon 192/512. Link manifest được `pwa.js` chèn lúc chạy (chỉ trên https/localhost) để bản mở bằng file:// không bị lỗi CORS.
- `sw.js`: precache shell + 13 chương + data + glossary; cache-first cho file tĩnh; version cache;
  xoá cache cũ khi activate.
- Đăng ký trên `https:` hoặc localhost; hiện banner "Có bản mới" khi SW mới active.
- Gợi ý cài lên màn hình chính ở footer thư viện (kèm hướng dẫn iOS).

## 6. Quiz thực chiến

- Thêm 4-6 câu/chương (tổng ~65): phân tích tiến trình, tìm nốt gần nhất, chọn thay thế,
  xác định tông, chọn scale; ít nhất một câu `fret` bấm trên cần đàn.
- Mọi câu có `explain` và `ref` trỏ tới mục lý thuyết tồn tại.
- Không thêm chế độ luyện tập riêng.

## 7. Kiểm thử

- `node tools/validate.js`: 13 chương, id không trùng, ref hợp lệ, mỗi chương ≥14 câu quiz.
- Puppeteer: 375×667, 390×844, 430×932 — không tràn ngang, tap target ≥44px, quiz/cards chạy.
- Offline: load lần đầu rồi `Network.emulateNetworkConditions offline=true`, mở chương khác.
- 100% câu quiz trả lời đúng bằng automation.
- Sau deploy: kiểm URL online, SW đăng ký, manifest hợp lệ.

## 8. Chuyển đổi URL cũ

`404.html` map:
- `/chapters/<file>` → `/<slug>/chapters/<file>`
- `/glossary.html` → `/<slug>/glossary.html`
- `/index.html` → `/` (thư viện)
giữ query và hash; hiển thị link dự phòng nếu không tự chuyển được.
