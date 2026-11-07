const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const errors = [];
const notes = [];

function fail(message) {
  errors.push(message);
}

function loadGlobal(file) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
  return sandbox.window;
}

function checkFile(rel, label) {
  if (!fs.existsSync(path.join(root, rel))) fail(label + ": thiếu " + rel);
}

checkFile("index.html", "library");
checkFile("manifest.webmanifest", "pwa");
checkFile("sw.js", "pwa");
checkFile("assets/shell.css", "shell");
checkFile("assets/shell.js", "shell");
checkFile("assets/quiz.js", "shell");
checkFile("assets/cards.js", "shell");
checkFile("assets/diagrams.js", "shell");
checkFile("assets/pwa.js", "shell");

const libraryPath = path.join(root, "assets", "data", "library.js");
if (!fs.existsSync(libraryPath)) fail("Thiếu assets/data/library.js");
const library = fs.existsSync(libraryPath) ? loadGlobal(libraryPath).LIBRARY || [] : [];
if (!Array.isArray(library) || library.length === 0) fail("Library rỗng hoặc sai định dạng");

const seenIds = new Set();
let bookCount = 0;
let chapterCount = 0;

library.forEach((entry) => {
  const label = "book/" + entry.id;
  if (!entry.id || !entry.slug || !entry.title) fail(label + ": thiếu id/slug/title");
  const bookDir = path.join(root, entry.slug);
  if (!fs.existsSync(bookDir)) fail(label + ": thiếu thư mục " + entry.slug);
  checkFile(entry.slug + "/index.html", label);
  checkFile(entry.slug + "/data/book.js", label);
  if (!entry.built) {
    notes.push(label + ": chưa có nội dung");
    return;
  }
  bookCount += 1;

  const win = loadGlobal(path.join(root, entry.slug, "data", "book.js"));
  const book = win.BOOK;
  if (!book) {
    fail(label + ": data/book.js không gán window.BOOK");
    return;
  }
  if (book.id !== entry.id) fail(label + ": BOOK.id khác library.id");
  if (!Array.isArray(book.chapters) || book.chapters.length === 0) fail(label + ": BOOK.chapters rỗng");
  if (entry.chapters && book.chapters.length !== entry.chapters) fail(label + ": số chương không khớp library");

  const bookIndex = fs.readFileSync(path.join(root, entry.slug, "index.html"), "utf8");
  if (!bookIndex.includes('data-book="' + book.id + '"')) fail(label + ": book index thiếu data-book");
  if (!bookIndex.includes("data/book.js")) fail(label + ": book index không nạp data/book.js");

  book.chapters.forEach((ch, i) => {
    const chLabel = label + "/" + ch.id;
    if (ch.num !== i + 1) fail(chLabel + ": số chương không liên tục");
    const htmlPath = path.join(root, entry.slug, book.chaptersDir || "chapters", ch.file);
    if (!fs.existsSync(htmlPath)) {
      fail(chLabel + ": thiếu file " + ch.file);
      return;
    }
    chapterCount += 1;
    const html = fs.readFileSync(htmlPath, "utf8");
    if (!html.includes('data-page="chapter"')) fail(chLabel + ": thiếu data-page=chapter");
    if (!html.includes('data-book="' + book.id + '"')) fail(chLabel + ": thiếu data-book");
    if (!html.includes('data-chapter="' + ch.id + '"')) fail(chLabel + ": thiếu data-chapter");
    if (!html.includes('data-data="' + ch.data + '"')) fail(chLabel + ": thiếu data-data=" + ch.data);
    if (!html.includes('id="cheat-sheet"')) fail(chLabel + ": thiếu #cheat-sheet");
    if (!html.includes('id="quiz-body"')) fail(chLabel + ": thiếu #quiz-body");
    if (!html.includes('id="cards-body"')) fail(chLabel + ": thiếu #cards-body");
    if (!html.includes("../../assets/shell.js")) fail(chLabel + ": không nạp shell.js đúng đường dẫn");
    if (!html.includes("../../assets/pwa.js")) fail(chLabel + ": không nạp pwa.js");

    const dataPath = path.join(root, entry.slug, "data", ch.id + ".js");
    if (!fs.existsSync(dataPath)) {
      fail(chLabel + ": thiếu file dữ liệu " + ch.id + ".js");
      return;
    }
    const bank = loadGlobal(dataPath)[ch.data];
    if (!bank) {
      fail(chLabel + ": file dữ liệu không gán window." + ch.data);
      return;
    }

    const anchors = new Set(Array.from(html.matchAll(/id="([^"]+)"/g)).map((m) => m[1]));

    (bank.quiz || []).forEach((q) => {
      const qLabel = chLabel + "/" + q.id;
      if (!q.id || !q.q || !q.explain) fail(qLabel + ": thiếu id, q hoặc explain");
      if (seenIds.has(q.id)) fail(qLabel + ": id trùng toàn cục");
      seenIds.add(q.id);
      if (!["mcq", "fill", "fret"].includes(q.type)) fail(qLabel + ": type không hợp lệ");
      if (q.type === "mcq") {
        if (!Array.isArray(q.options) || q.options.length < 2) fail(qLabel + ": options không hợp lệ");
        if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length) fail(qLabel + ": answer ngoài phạm vi options");
      }
      if (q.type === "fill") {
        const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
        if (answers.some((a) => typeof a !== "string" || !a.trim())) fail(qLabel + ": đáp án fill rỗng");
      }
      if (q.type === "fret") {
        if (!Array.isArray(q.answer) || q.answer.length === 0) fail(qLabel + ": thiếu toạ độ fret");
        else q.answer.forEach((pair) => {
          if (!Array.isArray(pair) || pair.length !== 2) fail(qLabel + ": toạ độ phải là [dây, phím]");
          else if (pair[0] < 1 || pair[0] > 6 || pair[1] < 0 || pair[1] > 12) fail(qLabel + ": toạ độ ngoài vùng bấm được (0-12)");
        });
      }
      if (q.ref) {
        const anchor = q.ref.replace(/^#/, "");
        if (!anchors.has(anchor)) fail(qLabel + ": ref #" + anchor + " không có trong HTML");
      }
    });

    (bank.cards || []).forEach((card) => {
      const cLabel = chLabel + "/" + card.id;
      if (!card.id || !card.front || !card.back) fail(cLabel + ": thiếu id, front hoặc back");
      if (seenIds.has(card.id)) fail(cLabel + ": id trùng toàn cục");
      seenIds.add(card.id);
    });

    if (!bank.quiz || bank.quiz.length < 14) fail(chLabel + ": cần ít nhất 14 câu quiz (đã gồm thực chiến)");
    if (!bank.cards || bank.cards.length < 15) fail(chLabel + ": nên có ít nhất 15 flashcard");
  });
});

const glossaryPath = path.join(root, "music-theory-for-guitarists-kolb", "data", "glossary.js");
if (!fs.existsSync(glossaryPath)) {
  fail("Thiếu glossary.js của sách");
} else {
  const glossary = loadGlobal(glossaryPath).GLOSSARY || [];
  const terms = new Set();
  glossary.forEach((item) => {
    if (!item.t || !item.vi) fail("glossary/" + item.t + ": thiếu thuật ngữ hoặc nghĩa");
    if (terms.has(String(item.t).toLowerCase())) fail("glossary/" + item.t + ": trùng");
    terms.add(String(item.t).toLowerCase());
    if (item.c < 1 || item.c > 13) fail("glossary/" + item.t + ": chương không hợp lệ");
  });
  if (glossary.length < 100) fail("Glossary nên có ít nhất 100 thuật ngữ");
  notes.push("glossary: " + glossary.length + " thuật ngữ");
}

notes.forEach((line) => console.log("· " + line));
if (errors.length) {
  console.error("\n" + errors.length + " lỗi:");
  errors.forEach((line) => console.error("  ✗ " + line));
  process.exit(1);
}
console.log("\nOK — " + bookCount + " sách, " + chapterCount + " chương, " + seenIds.size + " id hợp lệ.");
