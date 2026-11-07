(function () {
  const body = document.body;
  const root = body.dataset.root || "";
  const page = body.dataset.page || "";
  const bookId = body.dataset.book || "";
  const bookRoot = body.dataset.bookRoot || ".";
  const isChapter = page === "chapter";
  const BOOK = window.BOOK || null;
  const LIBRARY = window.LIBRARY || null;
  const T_KEY = "gt.theme.v1";
  const P_PREFIX = "gt.progress.v2.";
  const S_PREFIX = "gt.srs.v2.";

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

  function migrateLegacy(scope) {
    const map = [
      [P_PREFIX + scope, "gt.progress.v1"],
      [S_PREFIX + scope, "gt.srs.v1"]
    ];
    map.forEach(([next, old]) => {
      try {
        if (!localStorage.getItem(next)) {
          const legacy = localStorage.getItem(old);
          if (legacy) localStorage.setItem(next, legacy);
        }
      } catch (err) {
        /* storage unavailable */
      }
    });
  }

  if (bookId) migrateLegacy(bookId);

  const GT = {};
  window.GT = GT;

  function pctOf(item) {
    if (!item) return 0;
    const readPart = item.read ? 50 : 0;
    const quizPart = Math.min(100, item.quizBest || 0) * 0.5;
    return Math.round(readPart + quizPart);
  }

  function makeProgress(scope) {
    const key = P_PREFIX + scope;
    return {
      scope: scope,
      key: key,
      all() {
        const data = readJSON(key, {});
        if (!data.meta) data.meta = { streak: 0, lastActive: "", lastChapter: "" };
        return data;
      },
      chapter(id) {
        return this.all()[id] || null;
      },
      pct(id) {
        return pctOf(this.chapter(id));
      },
      touch(id) {
        const data = this.all();
        const prev = data[id] || {};
        data[id] = Object.assign({}, prev, { lastVisit: new Date().toISOString() });
        data.meta.lastChapter = id;
        writeJSON(key, data);
      },
      markRead(id) {
        const data = this.all();
        data[id] = Object.assign({}, data[id] || {}, { read: true, readAt: new Date().toISOString() });
        writeJSON(key, data);
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
        writeJSON(key, data);
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
        writeJSON(key, data);
        return meta;
      }
    };
  }

  function makeSrs(scope) {
    const key = S_PREFIX + scope;
    return {
      key: key,
      all() {
        return readJSON(key, {});
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
        writeJSON(key, data);
        return data[id];
      }
    };
  }

  GT.progress = makeProgress(bookId || "library");
  GT.srs = makeSrs(bookId || "library");
  GT.bookProgress = function (id) {
    return makeProgress(id);
  };
  GT.bookSrs = function (id) {
    return makeSrs(id);
  };

  GT.url = function (file) {
    return root ? root + "/" + file : file;
  };

  GT.bookPct = function (book) {
    const data = readJSON(P_PREFIX + book.id, {});
    const ids = Object.keys(data).filter((key) => key !== "meta");
    let total = 0;
    ids.forEach((id) => {
      total += pctOf(data[id]);
    });
    return Math.min(100, Math.round(total / Math.max(1, book.chapters || ids.length || 1)));
  };

  GT.bookLastChapter = function (book) {
    const data = readJSON(P_PREFIX + book.id, {});
    return (data.meta && data.meta.lastChapter) || "";
  };

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    writeJSON(T_KEY, theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      const label = btn.querySelector(".theme-label");
      if (label) label.textContent = theme === "light" ? "Tối" : "Sáng";
      else btn.textContent = theme === "light" ? "Tối" : "Sáng";
    }
  }

  function initTheme() {
    applyTheme(readJSON(T_KEY, null) || "dark");
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        applyTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
      });
    }
  }

  function bookHomeHref() {
    return bookRoot === "." ? "index.html" : bookRoot + "/index.html";
  }

  function chapterHref(ch) {
    return isChapter ? ch.file : (BOOK.chaptersDir || "chapters") + "/" + ch.file;
  }

  function glossaryHref() {
    return isChapter ? "../glossary.html" : "glossary.html";
  }

  function libraryHref() {
    return GT.url("index.html");
  }

  function renderNav() {
    const host = document.getElementById("sidebar");
    if (!host) return;
    const html = [];
    if (BOOK) {
      html.push('<a class="brand" href="' + bookHomeHref() + '">');
      html.push('<span class="brand-mark">GT</span>');
      html.push('<span class="brand-name">' + (BOOK.shortTitle || BOOK.title) + '<span class="brand-sub">' + BOOK.author + " · sổ tay học</span></span>");
      html.push("</a>");
      html.push('<div class="nav-label">' + BOOK.chapters.length + " chương</div>");
      BOOK.chapters.forEach((ch) => {
        const pct = GT.progress.pct(ch.id);
        const cls = ["nav-item"];
        if (ch.id === body.dataset.chapter) cls.push("active");
        if (ch.built === false) cls.push("disabled");
        html.push('<a class="' + cls.join(" ") + '" href="' + chapterHref(ch) + '">');
        html.push('<span class="nav-num">' + String(ch.num).padStart(2, "0") + "</span>");
        html.push('<span class="nav-title">' + ch.vi + '<span class="nav-bar"><span style="width:' + pct + '%"></span></span></span>');
        html.push("</a>");
      });
      html.push('<div class="nav-label">Tham khảo</div>');
      const glossaryClass = page === "glossary" ? "nav-item active" : "nav-item";
      html.push('<a class="' + glossaryClass + '" href="' + glossaryHref() + '">');
      html.push('<span class="nav-num">A–Z</span>');
      html.push('<span class="nav-title">Tra cứu thuật ngữ</span>');
      html.push("</a>");
      html.push('<div class="nav-label">Thư viện</div>');
      html.push('<a class="nav-item" href="' + libraryHref() + '">');
      html.push('<span class="nav-num">↩</span>');
      html.push('<span class="nav-title">Tất cả sách</span>');
      html.push("</a>");
    } else if (LIBRARY) {
      html.push('<a class="brand" href="index.html">');
      html.push('<span class="brand-mark">ML</span>');
      html.push('<span class="brand-name">Thư viện nhạc lý<span class="brand-sub">Học offline trên điện thoại</span></span>');
      html.push("</a>");
      html.push('<div class="nav-label">' + LIBRARY.length + " sách</div>");
      LIBRARY.forEach((bk) => {
        const cls = ["nav-item"];
        if (bk.id === bookId) cls.push("active");
        if (bk.built === false) cls.push("disabled");
        html.push('<a class="' + cls.join(" ") + '" href="' + bk.slug + '/index.html">');
        html.push('<span class="nav-num">' + (bk.code || "BK") + "</span>");
        html.push('<span class="nav-title">' + bk.title + '<span class="nav-bar"><span style="width:' + GT.bookPct(bk) + '%"></span></span></span>');
        html.push("</a>");
      });
    }
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
      refreshProgressUI();
    });
    refresh();
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
    if (!grid || !BOOK) return;

    const built = BOOK.chapters.filter((ch) => ch.built !== false);
    const totalPct = Math.round(BOOK.chapters.reduce((sum, ch) => sum + GT.progress.pct(ch.id), 0) / BOOK.chapters.length);

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
        reviewBtn.href = chapterHref(target.ch) + "?review=1";
      }
    }

    if (continueBtn) {
      const last = BOOK.chapters.find((ch) => ch.id === meta.lastChapter && ch.built !== false);
      const inProgress = built.find((ch) => GT.progress.pct(ch.id) > 0 && GT.progress.pct(ch.id) < 100);
      const unread = built.find((ch) => !GT.progress.chapter(ch.id) || !GT.progress.chapter(ch.id).read);
      const target = (last && GT.progress.pct(last.id) < 100 ? last : null) || inProgress || unread || built[0];
      if (target) continueBtn.href = chapterHref(target);
    }

    function card(ch) {
      const pct = GT.progress.pct(ch.id);
      const item = GT.progress.chapter(ch.id) || {};
      const cls = ["ch-card"];
      if (ch.built === false) cls.push("pending");
      const badge = ch.built === false
        ? '<span class="badge">Chưa có nội dung</span>'
        : item.quizBest !== undefined
          ? '<span class="badge">Quiz tốt nhất ' + item.quizBest + '%</span>'
          : '<span class="badge">Chưa làm quiz</span>';
      return '<a class="' + cls.join(" ") + '" href="' + chapterHref(ch) + '" data-search="' +
        (ch.title + " " + ch.vi + " " + ch.keywords.join(" ")).toLowerCase() + '">' +
        '<div class="ch-card-head"><span class="ch-card-num">' + String(ch.num).padStart(2, "0") + "</span>" +
        '<span class="ch-card-title">' + ch.title + "</span></div>" +
        '<div class="ch-card-vi">' + ch.vi + " · " + ch.pages + "</div>" +
        badge +
        '<div class="ch-card-foot"><span>' + pct + '%</span><span class="ch-card-bar"><span style="width:' + pct + '%"></span></span></div>' +
        "</a>";
    }

    grid.innerHTML = BOOK.chapters.map(card).join("");

    if (search) {
      search.addEventListener("input", () => {
        const term = search.value.trim().toLowerCase();
        Array.from(grid.children).forEach((node) => {
          node.hidden = term.length > 0 && !node.dataset.search.includes(term);
        });
      });
    }
  }

  function initLibrary() {
    const grid = document.getElementById("book-grid");
    const search = document.getElementById("book-search");
    const count = document.getElementById("book-count");
    if (count) count.textContent = String(LIBRARY.length);
    if (!grid || !LIBRARY) return;

    function card(bk) {
      const pct = GT.bookPct(bk);
      const action = pct > 0 ? "Học tiếp" : "Bắt đầu";
      const initials = (bk.code || "BK");
      return '<a class="book-card" href="' + bk.slug + '/index.html" data-search="' +
        (bk.title + " " + bk.author + " " + (bk.keywords || []).join(" ")).toLowerCase() + '">' +
        '<span class="book-cover">' + initials + "</span>" +
        '<div class="book-body"><div class="book-title">' + bk.title + "</div>" +
        '<div class="book-author">' + bk.author + " · " + bk.chapters + " chương</div>" +
        '<div class="book-foot"><span>' + pct + '%</span><span class="ch-card-bar"><span style="width:' + pct + '%"></span></span></div>' +
        '<span class="badge">' + action + (pct > 0 && pct < 100 ? " · " + pct + "%" : "") + "</span></div></a>";
    }

    grid.innerHTML = LIBRARY.map(card).join("");
    if (search) {
      search.addEventListener("input", () => {
        const term = search.value.trim().toLowerCase();
        Array.from(grid.children).forEach((node) => {
          node.hidden = term.length > 0 && !node.dataset.search.includes(term);
        });
      });
    }
  }

  function refreshProgressUI() {
    const pctEl = document.getElementById("chapter-pct");
    if (pctEl && body.dataset.chapter) pctEl.textContent = GT.progress.pct(body.dataset.chapter) + "%";
    const navBars = document.querySelectorAll(".nav-item .nav-bar span");
    if (BOOK) {
      BOOK.chapters.forEach((ch, i) => {
        if (navBars[i]) navBars[i].style.width = GT.progress.pct(ch.id) + "%";
      });
    }
  }

  function initChapterChrome() {
    if (!isChapter) return;
    const chapterId = body.dataset.chapter;
    const topbar = document.querySelector(".topbar");
    if (topbar && !document.getElementById("chapter-pct")) {
      const pct = document.createElement("span");
      pct.className = "badge chapter-pct";
      pct.id = "chapter-pct";
      pct.textContent = GT.progress.pct(chapterId) + "%";
      const themeBtn = document.getElementById("theme-toggle");
      topbar.insertBefore(pct, themeBtn || null);
    }

    document.querySelectorAll(".chapter table").forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains("table-scroll")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-scroll";
      table.parentElement.insertBefore(wrap, table);
      wrap.appendChild(table);
    });

    const article = document.querySelector(".chapter");
    const sections = Array.from(document.querySelectorAll(".chapter section")).filter((sec) => {
      const h2 = sec.querySelector("h2");
      return h2 && !sec.classList.contains("quiz") && !sec.classList.contains("cards");
    });

    function slugify(text) {
      return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
    }

    const used = new Set(Array.from(document.querySelectorAll("[id]")).map((node) => node.id));
    const toc = sections.map((sec, i) => {
      const h2 = sec.querySelector("h2");
      const clone = h2.cloneNode(true);
      const kicker = clone.querySelector(".kicker");
      if (kicker) kicker.remove();
      const label = clone.textContent.trim() || ("Mục " + (i + 1));
      if (!sec.id) {
        let base = "muc-" + (slugify(label) || i);
        let id = base;
        let n = 2;
        while (used.has(id)) {
          id = base + "-" + n;
          n += 1;
        }
        sec.id = id;
        used.add(id);
      }
      return { id: sec.id, label: label };
    });

    const tabbar = document.createElement("nav");
    tabbar.className = "tabbar";
    tabbar.setAttribute("aria-label", "Điều hướng nhanh");
    tabbar.innerHTML =
      '<a href="' + bookHomeHref() + '"><span class="tab-icon">▤</span><span>Sách</span></a>' +
      '<button type="button" id="tab-toc"><span class="tab-icon">☰</span><span>Mục lục</span></button>' +
      '<a href="#quiz"><span class="tab-icon">?</span><span>Quiz</span></a>' +
      '<a href="#flashcards"><span class="tab-icon">◧</span><span>Thẻ</span></a>';
    document.body.appendChild(tabbar);

    const sheet = document.createElement("div");
    sheet.className = "sheet";
    sheet.id = "toc-sheet";
    sheet.innerHTML = '<div class="sheet-backdrop" data-close="1"></div>' +
      '<div class="sheet-panel" role="dialog" aria-modal="true" aria-label="Mục lục chương">' +
      '<div class="sheet-head"><strong>Mục lục</strong><button type="button" class="btn ghost small" data-close="1">Đóng</button></div>' +
      '<div class="sheet-body"><ol class="toc-list">' +
      toc.map((item) => '<li><a href="#' + item.id + '">' + item.label + "</a></li>").join("") +
      "</ol></div></div>";
    document.body.appendChild(sheet);

    function openSheet() {
      sheet.classList.add("open");
      body.classList.add("sheet-open");
    }
    function closeSheet() {
      sheet.classList.remove("open");
      body.classList.remove("sheet-open");
    }
    document.getElementById("tab-toc").addEventListener("click", openSheet);
    sheet.addEventListener("click", (ev) => {
      if (ev.target.dataset.close) closeSheet();
      else if (ev.target.tagName === "A") closeSheet();
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") closeSheet();
    });

    if (article) article.classList.add("with-tabbar");
  }

  function initPwaHint() {
    const host = document.getElementById("install-hint");
    if (!host) return;
    const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (standalone) {
      host.hidden = true;
      return;
    }
    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    host.textContent = isIos
      ? "Cài lên màn hình chính: Safari → nút Chia sẻ → Thêm vào MH chính để học offline."
      : "Mở menu trình duyệt → Cài đặt / Thêm vào màn hình chính để dùng offline.";
    host.hidden = false;
  }

  function init() {
    initTheme();
    if (bookId) GT.progress.bumpStreak();
    renderNav();
    initNavToggle();
    initPrint();
    if (page === "dashboard") initDashboard();
    if (page === "library") initLibrary();
    if (isChapter) {
      GT.progress.touch(body.dataset.chapter);
      initMarkRead();
      initChapterChrome();
    }
    initPwaHint();
  }

  document.addEventListener("gt:progress", refreshProgressUI);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
