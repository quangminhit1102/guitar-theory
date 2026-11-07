(function () {
  const body = document.body;
  const chapterId = body.dataset.chapter;
  const dataVar = body.dataset.data;
  const host = document.getElementById("quiz-body");
  if (!chapterId || !dataVar || !host) return;

  const bank = window[dataVar];
  const metaEl = document.getElementById("quiz-meta");
  if (!bank || !Array.isArray(bank.quiz) || bank.quiz.length === 0) {
    host.innerHTML = '<div class="empty">Không tải được dữ liệu luyện tập của chương này.</div>';
    return;
  }

  const questions = bank.quiz;
  let index = 0;
  let results = [];
  let answered = false;
  let board = null;
  let currentAnswer = null;

  function normalize(value) {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/\u266f/g, "#")
      .replace(/\u266d/g, "b")
      .replace(/\s+/g, " ");
  }

  function isCorrect(question, answer) {
    if (question.type === "mcq") return answer === question.answer;
    if (question.type === "fill") {
      const accepted = Array.isArray(question.answer) ? question.answer : [question.answer];
      return accepted.some((item) => normalize(item) === normalize(answer));
    }
    if (question.type === "fret") {
      const expected = question.answer.map((pair) => pair[0] + ":" + pair[1]).sort().join("|");
      const actual = (answer || []).map((pair) => pair[0] + ":" + pair[1]).sort().join("|");
      return expected === actual;
    }
    return false;
  }

  function progressBar() {
    return '<div class="q-progress">' + questions.map((_, i) => {
      const item = results[i];
      const cls = item ? (item.correct ? "done" : "bad") : "";
      return '<i class="' + cls + '"></i>';
    }).join("") + "</div>";
  }

  function refLink(question) {
    if (!question.ref) return "";
    return ' <a href="' + question.ref + '">Xem lại lý thuyết</a>';
  }

  function showFeedback(question, correct) {
    const box = document.getElementById("q-feedback");
    if (!box) return;
    box.className = "feedback " + (correct ? "ok" : "no");
    box.innerHTML = "<strong>" + (correct ? "Đúng." : "Chưa đúng.") + "</strong> " +
      '<span class="explain">' + question.explain + "</span>" + refLink(question);
    box.hidden = false;
  }

  function markAnswer(correct) {
    if (answered) return;
    answered = true;
    results[index] = { correct: correct, question: questions[index] };
    showFeedback(questions[index], correct);
    const next = document.getElementById("q-next");
    if (next) {
      next.hidden = false;
      next.textContent = index === questions.length - 1 ? "Xem kết quả" : "Câu tiếp";
      next.focus();
    }
  }

  function renderMcq(question) {
    const wrap = document.createElement("div");
    wrap.innerHTML = '<p class="q-text">' + question.q + "</p>";
    const opts = document.createElement("div");
    opts.className = "opts";
    question.options.forEach((option, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "opt";
      btn.innerHTML = '<span class="key">' + (i + 1) + "</span><span>" + option + "</span>";
      btn.addEventListener("click", () => {
        if (answered) return;
        const correct = i === question.answer;
        if (correct) btn.classList.add("correct");
        else {
          btn.classList.add("wrong");
          opts.children[question.answer].classList.add("correct");
        }
        Array.from(opts.children).forEach((node) => { node.disabled = true; });
        markAnswer(correct);
      });
      opts.appendChild(btn);
    });
    wrap.appendChild(opts);
    host.innerHTML = progressBar();
    host.appendChild(wrap);
  }

  function renderFill(question) {
    const wrap = document.createElement("div");
    wrap.innerHTML = '<p class="q-text">' + question.q + "</p>" +
      '<div class="fill-row"><input id="q-fill" type="text" autocomplete="off" spellcheck="false" placeholder="Nhập đáp án...">' +
      '<button class="btn primary" type="button" id="q-check">Kiểm tra</button></div>';
    host.innerHTML = progressBar();
    host.appendChild(wrap);
    const input = document.getElementById("q-fill");
    const check = document.getElementById("q-check");
    function submit() {
      const correct = isCorrect(question, input.value);
      input.disabled = true;
      check.hidden = true;
      markAnswer(correct);
    }
    check.addEventListener("click", submit);
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") submit();
    });
    input.focus();
  }

  function renderFret(question) {
    const wrap = document.createElement("div");
    wrap.innerHTML = '<p class="q-text">' + question.q + "</p>" +
      '<div class="fret-board"></div>' +
      '<div class="quiz-foot"><span class="read-note">Bấm vào dây/phím để đánh dấu, bấm lại để bỏ.</span>' +
      '<span class="spacer"></span><button class="btn ghost small" type="button" id="q-clear">Xoá hết</button>' +
      '<button class="btn primary" type="button" id="q-check">Kiểm tra</button></div>';
    host.innerHTML = progressBar();
    host.appendChild(wrap);
    board = window.Diagrams.interactiveFretboard(wrap.querySelector(".fret-board"), { frets: 12 });
    document.getElementById("q-clear").addEventListener("click", () => board.clear());
    document.getElementById("q-check").addEventListener("click", () => {
      const correct = isCorrect(question, board.getMarks());
      markAnswer(correct);
    });
  }

  function render() {
    answered = false;
    board = null;
    const question = questions[index];
    const meta = document.getElementById("quiz-meta");
    if (meta) meta.textContent = "Câu " + (index + 1) + "/" + questions.length;
    if (question.type === "fill") renderFill(question);
    else if (question.type === "fret") renderFret(question);
    else renderMcq(question);

    const foot = document.createElement("div");
    foot.className = "quiz-foot";
    foot.innerHTML = '<span class="read-note" id="q-hint">' + (question.type === "mcq" ? "Chọn đáp án hoặc bấm phím 1-4." : "") + "</span>" +
      '<span class="spacer"></span>' +
      '<div id="q-feedback" class="feedback" hidden></div>' +
      '<button class="btn primary" type="button" id="q-next" hidden>Câu tiếp</button>';
    host.appendChild(foot);

    document.getElementById("q-next").addEventListener("click", () => {
      index += 1;
      if (index < questions.length) render();
      else finish();
    });
  }

  function finish() {
    const total = questions.length;
    const right = results.filter((item) => item && item.correct).length;
    const pct = Math.round((right / total) * 100);
    const wrong = results.filter((item) => item && !item.correct);
    window.GT.progress.saveQuiz(chapterId, pct);

    let verdict = "Cần ôn lại chương này.";
    if (pct === 100) verdict = "Hoàn hảo. Chuyển sang flashcard để giữ kiến thức.";
    else if (pct >= 80) verdict = "Tốt. Xem lại các câu sai rồi học tiếp.";
    else if (pct >= 60) verdict = "Tạm ổn. Đọc lại phần lý thuyết liên quan.";

    host.innerHTML = '<div class="result">' +
      '<div class="score">' + pct + '<small>%</small></div>' +
      '<p><strong>' + right + "/" + total + " câu đúng.</strong> " + verdict + "</p>" +
      '<div class="quiz-foot"><span class="spacer"></span><button class="btn primary" type="button" id="q-retry">Làm lại</button></div>' +
      "</div>" +
      (wrong.length ? '<div class="wrong-list"><h3>Câu cần xem lại</h3>' + wrong.map((item) =>
        '<details><summary>' + item.question.q + '</summary><div class="feedback no" style="margin-top:8px">' +
        item.question.explain + refLink(item.question) + "</div></details>").join("") + "</div>" : "");

    const meta = document.getElementById("quiz-meta");
    if (meta) meta.textContent = "Kết quả";
    document.getElementById("q-retry").addEventListener("click", () => {
      index = 0;
      results = [];
      render();
    });
  }

  document.addEventListener("keydown", (ev) => {
    if (document.getElementById("q-retry")) return;
    const tag = (ev.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    const question = questions[index];
    if (!answered && question && question.type === "mcq" && /^[1-4]$/.test(ev.key)) {
      const btn = host.querySelectorAll(".opt")[Number(ev.key) - 1];
      if (btn) btn.click();
    }
    if (ev.key === "Enter") {
      const next = document.getElementById("q-next");
      if (next && !next.hidden) {
        ev.preventDefault();
        next.click();
      }
    }
  });

  render();
})();
