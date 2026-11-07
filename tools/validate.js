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

const manifestPath = path.join(root, "assets", "data", "manifest.js");
if (!fs.existsSync(manifestPath)) fail("Thiếu assets/data/manifest.js");
const chapters = loadGlobal(manifestPath).CHAPTERS || [];
if (chapters.length !== 13) fail("Manifest phải có đúng 13 chương, đang có " + chapters.length);

const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const seenIds = new Set();

chapters.forEach((ch, i) => {
  if (ch.num !== i + 1) fail(ch.id + ": số chương không liên tục");
  const htmlPath = path.join(root, ch.file);

  if (!ch.built) {
    notes.push(ch.id + ": chưa có nội dung (bỏ qua kiểm tra quiz/cards)");
    return;
  }

  if (!fs.existsSync(htmlPath)) {
    fail(ch.id + ": thiếu file " + ch.file);
    return;
  }
  const html = fs.readFileSync(htmlPath, "utf8");
  if (!indexHtml.includes("data/manifest.js")) fail("index.html không nạp manifest");

  if (!html.includes('data-chapter="' + ch.id + '"')) fail(ch.id + ": HTML thiếu data-chapter");
  if (!html.includes('data-data="' + ch.data + '"')) fail(ch.id + ": HTML thiếu data-data=" + ch.data);
  if (!html.includes('id="cheat-sheet"')) fail(ch.id + ": thiếu khối #cheat-sheet");
  if (!html.includes('id="quiz-body"')) fail(ch.id + ": thiếu #quiz-body");
  if (!html.includes('id="cards-body"')) fail(ch.id + ": thiếu #cards-body");

  const dataPath = path.join(root, "assets", "data", ch.id + ".js");
  if (!fs.existsSync(dataPath)) {
    fail(ch.id + ": thiếu file dữ liệu " + ch.id + ".js");
    return;
  }
  const win = loadGlobal(dataPath);
  const bank = win[ch.data];
  if (!bank) {
    fail(ch.id + ": file dữ liệu không gán window." + ch.data);
    return;
  }

  const anchors = new Set(Array.from(html.matchAll(/id="([^"]+)"/g)).map((m) => m[1]));

  (bank.quiz || []).forEach((q) => {
    const label = ch.id + "/" + q.id;
    if (!q.id || !q.q || !q.explain) fail(label + ": thiếu id, q hoặc explain");
    if (seenIds.has(q.id)) fail(label + ": id trùng toàn cục");
    seenIds.add(q.id);
    if (!["mcq", "fill", "fret"].includes(q.type)) fail(label + ": type không hợp lệ");
    if (q.type === "mcq") {
      if (!Array.isArray(q.options) || q.options.length < 2) fail(label + ": options không hợp lệ");
      if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length) fail(label + ": answer ngoài phạm vi options");
    }
    if (q.type === "fill") {
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      if (answers.some((a) => typeof a !== "string" || !a.trim())) fail(label + ": đáp án fill rỗng");
    }
    if (q.type === "fret") {
      if (!Array.isArray(q.answer) || q.answer.length === 0) fail(label + ": thiếu toạ độ fret");
      else q.answer.forEach((pair) => {
        if (!Array.isArray(pair) || pair.length !== 2) fail(label + ": toạ độ phải là [dây, phím]");
        else if (pair[0] < 1 || pair[0] > 6 || pair[1] < 0 || pair[1] > 22) fail(label + ": toạ độ ngoài cần đàn");
      });
    }
    if (q.ref) {
      const anchor = q.ref.replace(/^#/, "");
      if (!anchors.has(anchor)) fail(label + ": ref #" + anchor + " không có trong HTML");
    }
  });

  (bank.cards || []).forEach((card) => {
    const label = ch.id + "/" + card.id;
    if (!card.id || !card.front || !card.back) fail(label + ": thiếu id, front hoặc back");
    if (seenIds.has(card.id)) fail(label + ": id trùng toàn cục");
    seenIds.add(card.id);
  });

  if (!bank.quiz || bank.quiz.length < 8) fail(ch.id + ": nên có ít nhất 8 câu quiz");
  if (!bank.cards || bank.cards.length < 15) fail(ch.id + ": nên có ít nhất 15 flashcard");
});

const glossaryPath = path.join(root, "assets", "data", "glossary.js");
if (!fs.existsSync(glossaryPath)) {
  fail("Thiếu assets/data/glossary.js");
} else {
  const glossary = loadGlobal(glossaryPath).GLOSSARY || [];
  const terms = new Set();
  glossary.forEach((entry) => {
    const label = "glossary/" + entry.t;
    if (!entry.t || !entry.vi) fail(label + ": thiếu thuật ngữ hoặc nghĩa");
    if (terms.has(entry.t.toLowerCase())) fail(label + ": thuật ngữ trùng");
    terms.add(String(entry.t).toLowerCase());
    const chapter = chapters.find((ch) => ch.num === entry.c);
    if (!chapter) fail(label + ": chương " + entry.c + " không tồn tại");
    else if (!fs.existsSync(path.join(root, chapter.file))) fail(label + ": file chương " + entry.c + " chưa có");
  });
  if (glossary.length < 100) fail("Glossary nên có ít nhất 100 thuật ngữ, đang có " + glossary.length);
  notes.push("glossary: " + glossary.length + " thuật ngữ");
}

if (!fs.existsSync(path.join(root, "glossary.html"))) fail("Thiếu glossary.html");

notes.forEach((line) => console.log("· " + line));
if (errors.length) {
  console.error("\n" + errors.length + " lỗi:");
  errors.forEach((line) => console.error("  ✗ " + line));
  process.exit(1);
}
console.log("\nOK — " + chapters.length + " chương, " + seenIds.size + " id hợp lệ.");
