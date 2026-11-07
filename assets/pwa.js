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

  navigator.serviceWorker.register(swUrl, { scope: scope }).then((registration) => {
    registration.addEventListener("updatefound", () => {
      const worker = registration.installing;
      if (!worker) return;
      worker.addEventListener("statechange", () => {
        if (worker.state === "installed" && navigator.serviceWorker.controller) showUpdate(worker);
      });
    });

    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  }).catch(() => {});
})();
