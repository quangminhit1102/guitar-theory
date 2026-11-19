(function () {
  const secure = location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (!secure) return;

  const root = document.body.dataset.root || "";
  const swUrl = (root ? root + "/" : "") + "sw.js";
  const scope = (root ? root + "/" : "./");

  if (!document.querySelector('link[rel="manifest"]')) {
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = (root ? root + "/" : "") + "manifest.webmanifest";
    document.head.appendChild(link);
  }

  function showUpdate(worker) {
    if (document.querySelector(".update-banner")) return;
    const banner = document.createElement("div");
    banner.className = "update-banner";
    banner.innerHTML = '<span>Có bản mới của thư viện.</span><button class="btn small primary" type="button">Tải lại</button>';
    banner.querySelector("button").addEventListener("click", () => {
      worker.postMessage("SKIP_WAITING");
    });
    document.body.appendChild(banner);
  }

  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    const btn = document.getElementById("install-app");
    if (btn) btn.hidden = false;
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    const btn = document.getElementById("install-app");
    if (btn) btn.hidden = true;
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest || !event.target.closest("#install-app")) return;
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      const btn = document.getElementById("install-app");
      if (btn) btn.hidden = true;
    });
  });

  navigator.serviceWorker.register(swUrl, { scope: scope, updateViaCache: "none" }).then((registration) => {
    if (registration.waiting) showUpdate(registration.waiting);
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed") {
          if (navigator.serviceWorker.controller) showUpdate(worker);
          else if (registration.waiting) showUpdate(registration.waiting);
        }
      });
    });
    registration.update().catch(() => {});

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }).catch(() => {});
})();
