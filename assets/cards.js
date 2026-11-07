(function () {
  const body = document.body;
  const chapterId = body.dataset.chapter;
  const dataVar = body.dataset.data;
  const host = document.getElementById("cards-body");
  if (!chapterId || !dataVar || !host) return;

  const bank = window[dataVar];
  const metaEl = document.getElementById("cards-meta");
  if (!bank || !Array.isArray(bank.cards) || bank.cards.length === 0) {
    host.innerHTML = '<div class="empty">Không tải được dữ liệu flashcard của chương này.</div>';
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const reviewOnly = params.get("review") === "1";
  let deck = bank.cards.slice();
  if (reviewOnly) {
    const due = deck.filter((card) => window.GT.srs.isDue(card.id));
    deck = due.length ? due : [];
  }
  let index = 0;
  let revealed = false;
  let correctCount = 0;

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function renderEmpty() {
    host.innerHTML = '<div class="empty">Không có thẻ nào đến hạn. ' +
      '<button class="btn small" type="button" id="cards-all">Học toàn bộ thẻ của chương</button></div>';
    document.getElementById("cards-all").addEventListener("click", () => {
      deck = shuffle(bank.cards);
      index = 0;
      correctCount = 0;
      render();
    });
  }

  function render() {
    if (deck.length === 0) {
      renderEmpty();
      return;
    }
    if (index >= deck.length) {
      renderDone();
      return;
    }
    revealed = false;
    const card = deck[index];
    if (metaEl) metaEl.textContent = (index + 1) + "/" + deck.length;
    host.innerHTML = '<div class="card-face">' +
      '<div class="hint">' + (reviewOnly ? "Ôn tập" : "Thẻ " + (index + 1)) + "</div>" +
      "<div>" + card.front + "</div>" +
      '<button class="btn ghost small" type="button" id="card-hint">Gợi ý</button>' +
      '<div class="hint" id="card-hint-text" hidden>' + (card.hint || "") + "</div>" +
      "</div>" +
      '<div class="quiz-foot"><span class="read-note">Bấm Space để lật thẻ.</span>' +
      '<span class="spacer"></span><button class="btn primary" type="button" id="card-reveal">Lật thẻ</button></div>';
    document.getElementById("card-reveal").addEventListener("click", reveal);
    const hintBtn = document.getElementById("card-hint");
    if (card.hint) {
      hintBtn.addEventListener("click", () => {
        const node = document.getElementById("card-hint-text");
        node.hidden = !node.hidden;
      });
    } else {
      hintBtn.hidden = true;
    }
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    const card = deck[index];
    host.innerHTML = '<div class="card-face">' +
      '<div class="hint">' + card.front + "</div>" +
      '<div class="answer">' + card.back + "</div>" +
      "</div>" +
      '<div class="rate-row">' +
      '<button class="btn rate-again" type="button" data-rate="again">Again · 10 phút</button>' +
      '<button class="btn rate-hard" type="button" data-rate="hard">Hard · 1 ngày</button>' +
      '<button class="btn rate-good" type="button" data-rate="good">Good · 3 ngày</button>' +
      "</div>";
    Array.from(host.querySelectorAll("[data-rate]")).forEach((btn) => {
      btn.addEventListener("click", () => rate(btn.dataset.rate));
    });
  }

  function rate(rating) {
    const card = deck[index];
    window.GT.srs.rate(card.id, rating);
    if (rating !== "again") correctCount += 1;
    else deck.push(card);
    index += 1;
    render();
  }

  function renderDone() {
    if (metaEl) metaEl.textContent = "Xong";
    host.innerHTML = '<div class="result">' +
      '<div class="score">' + correctCount + '<small> thẻ nhớ</small></div>' +
      '<p>Đã xử lý ' + (index) + " lượt thẻ. Thẻ ở mức Again sẽ quay lại sau 10 phút.</p>" +
      '<div class="quiz-foot"><span class="spacer"></span><button class="btn" type="button" id="cards-restart">Làm lại</button></div>' +
      "</div>";
    document.getElementById("cards-restart").addEventListener("click", () => {
      deck = shuffle(bank.cards);
      index = 0;
      correctCount = 0;
      render();
    });
  }

  document.addEventListener("keydown", (ev) => {
    const tag = (ev.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    if (ev.key === " " && !revealed && index < deck.length) {
      ev.preventDefault();
      reveal();
    }
    if (revealed && ["1", "2", "3"].includes(ev.key)) {
      const rating = { "1": "again", "2": "hard", "3": "good" }[ev.key];
      rate(rating);
    }
  });

  deck = shuffle(deck);
  if (reviewOnly && deck.length === 0) renderEmpty();
  else render();
})();
