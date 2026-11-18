(function () {
  const L = document.documentElement.lang === "vi"
    ? {
        notConfigured: "Chưa cấu hình đồng bộ (thiếu firebaseConfig).",
        signedOut: "Đăng nhập để đồng bộ tiến độ giữa các thiết bị.",
        signedInAs: "Đã đăng nhập: ",
        syncing: "Đang đồng bộ…",
        synced: "Đã đồng bộ ✓",
        syncError: "Đồng bộ lỗi. Kiểm tra kết nối.",
        signIn: "Tiếp tục với Google",
        signOut: "Đăng xuất",
        syncNow: "Đồng bộ ngay"
      }
    : {
        notConfigured: "Sync not configured (missing firebaseConfig).",
        signedOut: "Sign in to sync progress across devices.",
        signedInAs: "Signed in as ",
        syncing: "Syncing…",
        synced: "Synced ✓",
        syncError: "Sync failed. Check your connection.",
        signIn: "Continue with Google",
        signOut: "Sign out",
        syncNow: "Sync now"
      };

  const SDK = "https://www.gstatic.com/firebasejs/10.12.0/";
  let statusEl = null;
  let signinBtn = null;
  let signoutBtn = null;
  let syncBtn = null;
  let accountBtn = null;
  let accountEl = null;

  const cfg = window.FIREBASE_CONFIG || {};
  const configured = !!(cfg && cfg.projectId);

  const GOOGLE_G = '<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';

  const USER_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5"/></svg>';

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function openSettings() {
    const modal = document.getElementById("settings-modal");
    if (modal) {
      modal.hidden = false;
      document.body.classList.add("modal-open");
    }
  }

  function renderButtons(signedIn) {
    if (signinBtn) {
      signinBtn.hidden = !configured || !ready || signedIn;
      signinBtn.className = "btn google-btn";
      signinBtn.innerHTML = GOOGLE_G + "<span>" + L.signIn + "</span>";
    }
    if (signoutBtn) {
      signoutBtn.hidden = !configured || !signedIn;
      signoutBtn.textContent = L.signOut;
    }
    if (syncBtn) {
      syncBtn.hidden = !configured || !signedIn;
      syncBtn.textContent = L.syncNow;
    }
    if (accountEl) {
      accountEl.hidden = !configured || !signedIn;
    }
  }

  function renderAccount(user) {
    if (!accountBtn) return;
    if (user) {
      const name = user.displayName || user.email || "?";
      accountBtn.classList.add("signed-in");
      accountBtn.innerHTML = '<span class="avatar">' + name.charAt(0).toUpperCase() + "</span>";
      accountBtn.title = name;
      accountBtn.setAttribute("aria-label", name);
    } else {
      accountBtn.classList.remove("signed-in");
      accountBtn.innerHTML = USER_ICON;
      accountBtn.title = L.signIn;
      accountBtn.setAttribute("aria-label", L.signIn);
    }
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

  let currentUser = null;
  let ready = false;

  async function ensureFirebase() {
    if (!configured) return false;
    if (window.firebase) return true;
    try {
      await loadScript(SDK + "firebase-app-compat.js");
      await loadScript(SDK + "firebase-auth-compat.js");
      await loadScript(SDK + "firebase-firestore-compat.js");
      if (!window.firebase) return false;
      window.firebase.initializeApp(cfg);
      return true;
    } catch (err) {
      return false;
    }
  }

  async function sync() {
    if (!configured || !currentUser || !window.firebase) return;
    setStatus(L.syncing);
    const db = window.firebase.firestore();
    const ref = db.collection("users").doc(currentUser.uid).collection("data").doc("progress");
    try {
      const local = readLocal();
      let remote = {};
      const snap = await ref.get();
      if (snap.exists && snap.data().blob) {
        try { remote = JSON.parse(snap.data().blob) || {}; } catch (err) { remote = {}; }
      }
      const merged = mergeObject(remote, local);
      const changed = JSON.stringify(local) !== JSON.stringify(merged);
      writeLocal(merged);
      await ref.set({ blob: JSON.stringify(merged), updated: Date.now() }, { merge: true });
      setStatus(L.synced);
      if (changed) document.dispatchEvent(new CustomEvent("gt:synced"));
    } catch (err) {
      setStatus(L.syncError);
    }
  }

  let debounceTimer = null;
  function scheduleSync() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(sync, 1200);
  }

  function signIn() {
    if (!window.firebase) {
      setStatus(L.syncError + " (not ready)");
      ensureFirebase().then((ok) => {
        if (ok) {
          ready = true;
          renderButtons(!!currentUser);
          signIn();
        } else {
          setStatus(L.syncError + " (could not load)");
        }
      });
      return;
    }
    const provider = new window.firebase.auth.GoogleAuthProvider();
    window.firebase.auth().signInWithPopup(provider).catch((err) => {
      if (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request" || err.code === "auth/popup-closed-by-user") {
        setStatus(L.syncError + " (" + err.code + ")");
        window.firebase.auth().signInWithRedirect(provider).catch((err2) => {
          setStatus(L.syncError + " (" + err2.code + ")");
        });
        return;
      }
      setStatus(L.syncError + " (" + err.code + ")");
    });
  }

  async function init() {
    statusEl = document.getElementById("sync-status");
    signinBtn = document.getElementById("sync-signin");
    signoutBtn = document.getElementById("sync-signout");
    syncBtn = document.getElementById("sync-now");
    accountBtn = document.getElementById("account-btn");
    accountEl = document.getElementById("sync-account");

    if (!configured) {
      setStatus(L.notConfigured);
      renderButtons(false);
      return;
    }
    const loaded = await ensureFirebase();
    if (!loaded) {
      setStatus(L.syncError + " (could not load Firebase)");
      renderButtons(false);
      return;
    }
    ready = true;
    renderButtons(false);

    if (accountBtn) {
      accountBtn.addEventListener("click", () => {
        if (currentUser) openSettings();
        else signIn();
      });
    }
    if (signinBtn) signinBtn.addEventListener("click", signIn);
    if (signoutBtn) signoutBtn.addEventListener("click", () => window.firebase.auth().signOut());
    if (syncBtn) syncBtn.addEventListener("click", sync);

    window.firebase.auth().onAuthStateChanged((user) => {
      currentUser = user;
      renderAccount(user);
      renderButtons(!!user);
      if (user) {
        const name = user.displayName || user.email;
        if (accountEl) accountEl.textContent = L.signedInAs + name;
        setStatus(L.syncing);
        sync();
      } else {
        if (accountEl) accountEl.textContent = "";
        setStatus(L.signedOut);
        if (document.body.dataset.page === "library" && !localStorage.getItem("gt.signinPrompt.v1")) {
          localStorage.setItem("gt.signinPrompt.v1", "1");
          openSettings();
        }
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
