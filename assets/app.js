(function () {
  const body = document.body;
  const root = body.dataset.root || "";
  const P_KEY = "gt.progress.v1";
  const S_KEY = "gt.srs.v1";
  const T_KEY = "gt.theme.v1";

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      const banner = document.getElementById("storage-warning");
      if (banner) banner.hidden = false;
    }
  }

  function todayKey() {
    const now = new Date();
    return now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
  }

  function yesterdayKey() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  const GT = {};
  window.GT = GT;

  GT.progress = {
    all() {
      const data = readJSON(P_KEY, {});
      if (!data.meta) data.meta = { streak: 0, lastActive: "" };
      return data;
    },
    chapter(id) {
      return this.all()[id] || null;
    },
    pct(id) {
      const item = this.chapter(id);
      if (!item) return 0;
      const readPart = item.read ? 50 : 0;
      const quizPart = Math.min(100, item.quizBest || 0) * 0.5;
      return Math.round(readPart + quizPart);
    },
    touch(id) {
      const data = this.all();
      const prev = data[id] || {};
      data[id] = Object.assign({}, prev, { lastVisit: new Date().toISOString() });
      writeJSON(P_KEY, data);
    },
    markRead(id) {
      const data = this.all();
      data[id] = Object.assign({}, data[id] || {}, { read: true, readAt: new Date().toISOString() });
      writeJSON(P_KEY, data);
    },
    saveQuiz(id, score) {
      const data = this.all();
      const prev = data[id] || {};
      data[id] = Object.assign({}, prev, {
        quizBest: Math.max(prev.quizBest || 0, score),
        quizLast: score,
        quizAttempts: (prev.quizAttempts || 0) + 1,
        lastVisit: new Date().toISOString()
      });
      writeJSON(P_KEY, data);
    },
    meta() {
      return this.all().meta;
    },
    bumpStreak() {
      const data = this.all();
      const meta = data.meta;
      const today = todayKey();
      if (meta.lastActive === today) return meta;
      meta.streak = meta.lastActive === yesterdayKey() ? (meta.streak || 0) + 1 : 1;
      meta.lastActive = today;
      writeJSON(P_KEY, data);
      return meta;
    }
  };

  GT.srs = {
    all() {
      return readJSON(S_KEY, {});
    },
    get(id) {
      return this.all()[id] || null;
    },
    isDue(id) {
      const entry = this.get(id);
      if (!entry || !entry.due) return false;
      return new Date(entry.due).getTime() <= Date.now();
    },
    rate(id, rating) {
      const data = this.all();
      const prev = data[id] || { seen: 0, lapses: 0 };
      const now = Date.now();
      const offset = rating === "again" ? 10 * 60 * 1000 : rating === "hard" ? 24 * 60 * 60 * 1000 : 3 * 24 * 60 * 60 * 1000;
      data[id] = {
        lastRating: rating,
        due: new Date(now + offset).toISOString(),
        seen: (prev.seen || 0) + 1,
        lapses: (prev.lapses || 0) + (rating === "again" ? 1 : 0)
      };
      writeJSON(S_KEY, data);
      return data[id];
    },
    remembered(id) {
      const entry = this.get(id);
      return !!entry && entry.seen >= 2 && entry.lastRating !== "again";
    }
  };

  GT.url = function (file) {
    return root ? root + "/" + file : file;
  };

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    writeJSON(T_KEY, theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "light" ? "Tối" : "Sáng";
  }

  function initTheme() {
    const theme = readJSON(T_KEY, null) || "dark";
    applyTheme(theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
      });
    }
  }

  function renderNav() {
    const host = document.getElementById("sidebar");
    if (!host || !window.CHAPTERS) return;
    const active = body.dataset.chapter || "";
    const html = ['<a class="brand" href="' + GT.url("index.html") + '">',
      '<span class="brand-mark">GT</span>',
      '<span class="brand-name">Guitar Theory<span class="brand-sub">Tom Kolb · sổ tay học</span></span>',
      "</a>", '<div class="nav-label">13 chương</div>'];
    window.CHAPTERS.forEach((ch) => {
      const pct = GT.progress.pct(ch.id);
      const cls = ["nav-item"];
      if (ch.id === active) cls.push("active");
      if (!ch.built) cls.push("disabled");
      html.push('<a class="' + cls.join(" ") + '" href="' + GT.url(ch.file) + '">');
      html.push('<span class="nav-num">' + String(ch.num).padStart(2, "0") + "</span>");
      html.push('<span class="nav-title">' + ch.vi + '<span class="nav-bar"><span style="width:' + pct + '%"></span></span></span>');
      html.push("</a>");
    });
    const glossaryClass = body.dataset.page === "glossary" ? "nav-item active" : "nav-item";
    html.push('<div class="nav-label">Tham khảo</div>');
    html.push('<a class="' + glossaryClass + '" href="' + GT.url("glossary.html") + '">');
    html.push('<span class="nav-num">A–Z</span>');
    html.push('<span class="nav-title">Tra cứu thuật ngữ</span>');
    html.push("</a>");
    host.innerHTML = html.join("");
  }

  function initNavToggle() {
    const btn = document.getElementById("menu-toggle");
    const backdrop = document.querySelector(".backdrop");
    if (!btn) return;
    btn.addEventListener("click", () => body.classList.toggle("nav-open"));
    if (backdrop) backdrop.addEventListener("click", () => body.classList.remove("nav-open"));
  }

  function initPrint() {
    const btn = document.getElementById("print-cheat");
    if (!btn) return;
    btn.addEventListener("click", () => {
      body.classList.add("print-cheat");
      window.print();
      window.setTimeout(() => body.classList.remove("print-cheat"), 300);
    });
  }

  function initMarkRead() {
    const btn = document.getElementById("mark-read");
    const id = body.dataset.chapter;
    if (!btn || !id) return;
    const chapter = GT.progress.chapter(id);
    const label = document.getElementById("read-note");
    function refresh() {
      const current = GT.progress.chapter(id);
      if (current && current.read) {
        btn.disabled = true;
        btn.textContent = "Đã đọc";
        if (label) label.textContent = "Tiến độ chương đã được ghi nhận.";
      }
    }
    btn.addEventListener("click", () => {
      GT.progress.markRead(id);
      refresh();
    });
    if (chapter) refresh();
  }

  function dueCards(chapter) {
    const bank = window[chapter.data];
    if (!bank || !bank.cards) return [];
    return bank.cards.filter((card) => GT.srs.isDue(card.id));
  }

  function initDashboard() {
    const overallBar = document.querySelector("#overall-bar span");
    const overallPct = document.getElementById("overall-pct");
    const overallMeta = document.getElementById("overall-meta");
    const grid = document.getElementById("chapter-grid");
    const search = document.getElementById("chapter-search");
    const reviewCount = document.getElementById("review-count");
    const reviewBtn = document.getElementById("review-btn");
    const continueBtn = document.getElementById("continue-btn");
    const streak = document.getElementById("streak");
    if (!grid || !window.CHAPTERS) return;

    const built = window.CHAPTERS.filter((ch) => ch.built);
    const totalPct = Math.round(window.CHAPTERS.reduce((sum, ch) => sum + GT.progress.pct(ch.id), 0) / window.CHAPTERS.length);

    if (overallBar) overallBar.style.width = totalPct + "%";
    if (overallPct) overallPct.textContent = totalPct + "%";

    let reviewed = 0;
    let totalCards = 0;
    built.forEach((ch) => {
      const bank = window[ch.data];
      if (!bank || !bank.cards) return;
      bank.cards.forEach((card) => {
        totalCards += 1;
        if (GT.srs.get(card.id)) reviewed += 1;
      });
    });
    if (overallMeta) overallMeta.textContent = "Đã ôn " + reviewed + "/" + totalCards + " thẻ";

    const meta = GT.progress.meta();
    if (streak) streak.textContent = (meta.streak || 0) + " ngày";

    const dueTotal = built.reduce((sum, ch) => sum + dueCards(ch).length, 0);
    if (reviewCount) reviewCount.innerHTML = dueTotal + ' <small>thẻ đến hạn</small>';
    if (reviewBtn) {
      if (dueTotal === 0) {
        reviewBtn.hidden = true;
      } else {
        const target = built.map((ch) => ({ ch, n: dueCards(ch).length })).sort((a, b) => b.n - a.n)[0];
        reviewBtn.href = GT.url(target.ch.file) + "?review=1";
      }
    }

    if (continueBtn) {
      const inProgress = built.find((ch) => GT.progress.pct(ch.id) > 0 && GT.progress.pct(ch.id) < 100);
      const unread = built.find((ch) => !GT.progress.chapter(ch.id) || !GT.progress.chapter(ch.id).read);
      const target = inProgress || unread || built[0];
      if (target) continueBtn.href = GT.url(target.file);
    }

    function card(ch) {
      const pct = GT.progress.pct(ch.id);
      const item = GT.progress.chapter(ch.id) || {};
      const cls = ["ch-card"];
      if (!ch.built) cls.push("pending");
      const badge = !ch.built
        ? '<span class="badge">Chưa có nội dung</span>'
        : item.quizBest !== undefined
          ? '<span class="badge">Quiz tốt nhất ' + item.quizBest + '%</span>'
          : '<span class="badge">Chưa làm quiz</span>';
      return '<a class="' + cls.join(" ") + '" href="' + GT.url(ch.file) + '" data-search="' +
        (ch.title + " " + ch.vi + " " + ch.keywords.join(" ")).toLowerCase() + '">' +
        '<div class="ch-card-head"><span class="ch-card-num">' + String(ch.num).padStart(2, "0") + "</span>" +
        '<span class="ch-card-title">' + ch.title + "</span></div>" +
        '<div class="ch-card-vi">' + ch.vi + " · " + ch.pages + "</div>" +
        badge +
        '<div class="ch-card-foot"><span>' + pct + '%</span><span class="ch-card-bar"><span style="width:' + pct + '%"></span></span></div>' +
        "</a>";
    }

    grid.innerHTML = window.CHAPTERS.map(card).join("");

    if (search) {
      search.addEventListener("input", () => {
        const term = search.value.trim().toLowerCase();
        Array.from(grid.children).forEach((node) => {
          node.hidden = term.length > 0 && !node.dataset.search.includes(term);
        });
      });
    }
  }

  function init() {
    initTheme();
    GT.progress.bumpStreak();
    renderNav();
    initNavToggle();
    initPrint();
    initMarkRead();
    if (body.dataset.page === "dashboard") initDashboard();
    const id = body.dataset.chapter;
    if (id) GT.progress.touch(id);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
