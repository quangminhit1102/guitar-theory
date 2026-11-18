(function () {
  const L = document.documentElement.lang === "vi"
    ? {
        notConfigured: "Chưa cấu hình đồng bộ (thiếu firebaseConfig).",
        signedOut: "Đăng nhập để đồng bộ tiến độ giữa các thiết bị.",
        signedIn: "Đã đăng nhập: ",
        syncing: "Đang đồng bộ…",
        synced: "Đã đồng bộ ✓",
        syncError: "Đồng bộ lỗi. Kiểm tra kết nối.",
        signIn: "Đăng nhập Google",
        signOut: "Đăng xuất",
        syncNow: "Đồng bộ ngay"
      }
    : {
        notConfigured: "Sync not configured (missing firebaseConfig).",
        signedOut: "Sign in to sync progress across devices.",
        signedIn: "Signed in as ",
        syncing: "Syncing…",
        synced: "Synced ✓",
        syncError: "Sync failed. Check your connection.",
        signIn: "Sign in with Google",
        signOut: "Sign out",
        syncNow: "Sync now"
      };

  const SDK = "https://www.gstatic.com/firebasejs/10.12.0/";
  const statusEl = document.getElementById("sync-status");
  const signinBtn = document.getElementById("sync-signin");
  const signoutBtn = document.getElementById("sync-signout");
  const syncBtn = document.getElementById("sync-now");

  const cfg = window.FIREBASE_CONFIG || {};
  const configured = !!(cfg && cfg.projectId);

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function renderButtons(signedIn) {
    if (signinBtn) { signinBtn.hidden = !configured || signedIn; signinBtn.textContent = L.signIn; }
    if (signoutBtn) { signoutBtn.hidden = !configured || !signedIn; signoutBtn.textContent = L.signOut; }
    if (syncBtn) { syncBtn.hidden = !configured || !signedIn; syncBtn.textContent = L.syncNow; }
  }

  function readLocal() {
    const out = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.indexOf("gt.") === 0 && key !== "gt.theme.v1") {
        try { out[key] = JSON.parse(localStorage.getItem(key)); } catch (err) { /* skip */ }
      }
    }
    return out;
  }

  function writeLocal(blob) {
    Object.keys(blob).forEach((key) => {
      try { localStorage.setItem(key, JSON.stringify(blob[key])); } catch (err) { /* skip */ }
    });
  }

  function isDate(value) {
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value);
  }

  function mergeArray(a, b) {
    const map = new Map();
    (a || []).concat(b || []).forEach((entry) => {
      const id = entry && entry.id ? entry.id : JSON.stringify(entry);
      map.set(id, entry);
    });
    return Array.from(map.values());
  }

  function mergeObject(base, incoming) {
    const out = Object.assign({}, base);
    Object.keys(incoming || {}).forEach((key) => {
      const av = base ? base[key] : undefined;
      const bv = incoming[key];
      if (av === undefined) { out[key] = bv; return; }
      if (key === "read" && typeof av === "boolean" && typeof bv === "boolean") out[key] = av || bv;
      else if (typeof av === "number" && typeof bv === "number") out[key] = Math.max(av, bv);
      else if (isDate(av) && isDate(bv)) out[key] = av > bv ? av : bv;
      else if (Array.isArray(av) && Array.isArray(bv)) out[key] = mergeArray(av, bv);
      else if (av && bv && typeof av === "object" && typeof bv === "object") out[key] = mergeObject(av, bv);
      else out[key] = bv;
    });
    return out;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  let app = null;
  let db = null;
  let auth = null;
  let currentUser = null;

  async function ensureFirebase() {
    if (!configured) return false;
    if (window.firebase) return true;
    try {
      await loadScript(SDK + "firebase-app-compat.js");
      await loadScript(SDK + "firebase-auth-compat.js");
      await loadScript(SDK + "firebase-firestore-compat.js");
      if (!window.firebase) return false;
      app = window.firebase.initializeApp(cfg);
      auth = window.firebase.auth();
      db = window.firebase.firestore();
      return true;
    } catch (err) {
      return false;
    }
  }

  async function sync() {
    if (!configured || !currentUser || !db) return;
    setStatus(L.syncing);
    const ref = db.collection("users").doc(currentUser.uid).collection("data").doc("progress");
    try {
      const local = readLocal();
      let remote = {};
      const snap = await ref.get();
      if (snap.exists && snap.data().blob) {
        try { remote = JSON.parse(snap.data().blob) || {}; } catch (err) { remote = {}; }
      }
      const merged = mergeObject(remote, local);
      writeLocal(merged);
      await ref.set({ blob: JSON.stringify(merged), updated: Date.now() }, { merge: true });
      setStatus(L.synced);
    } catch (err) {
      setStatus(L.syncError);
    }
  }

  let debounceTimer = null;
  function scheduleSync() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(sync, 1200);
  }

  async function init() {
    if (!configured) {
      setStatus(L.notConfigured);
      renderButtons(false);
      return;
    }
    const ready = await ensureFirebase();
    if (!ready) {
      setStatus(L.syncError);
      renderButtons(false);
      return;
    }
    renderButtons(false);

    if (signinBtn) {
      signinBtn.addEventListener("click", () => {
        const provider = new window.firebase.auth.GoogleAuthProvider();
        window.firebase.auth().signInWithPopup(provider).catch(() => {
          window.firebase.auth().signInWithRedirect(provider).catch(() => {});
        });
      });
    }
    if (signoutBtn) {
      signoutBtn.addEventListener("click", () => window.firebase.auth().signOut());
    }
    if (syncBtn) {
      syncBtn.addEventListener("click", sync);
    }

    window.firebase.auth().onAuthStateChanged((user) => {
      currentUser = user;
      renderButtons(!!user);
      if (user) {
        setStatus(L.signedIn + (user.displayName || user.email));
        sync();
      } else {
        setStatus(L.signedOut);
      }
    });

    document.addEventListener("gt:progress", scheduleSync);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") sync();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
