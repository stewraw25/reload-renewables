(function () {
  var KEY = "reload-cookie-ack";
  var notice = document.getElementById("cookie-notice");

  function hideNotice() {
    if (notice) notice.hidden = true;
    document.body.classList.remove("has-cookie-notice");
  }

  try {
    if (window.localStorage && localStorage.getItem(KEY) === "1") hideNotice();
  } catch (err) {}

  var accept = document.getElementById("cookie-accept");
  if (accept) {
    accept.addEventListener("click", function () {
      try {
        localStorage.setItem(KEY, "1");
      } catch (err) {}
      hideNotice();
    });
  }

  var skip = document.querySelector(".skip-link");
  if (skip) {
    skip.addEventListener("click", function () {
      var main = document.getElementById("main");
      if (main) main.focus();
    });
  }

  var video = document.getElementById("hero-video");
  if (!video) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    if (connection.saveData) return;
    var effective = connection.effectiveType || "";
    if (effective === "slow-2g" || effective === "2g") return;
    if (typeof connection.downlink === "number" && connection.downlink > 0 && connection.downlink < 1) return;
  }

  function start() {
    if (video.getAttribute("data-loaded") === "1") return;
    video.setAttribute("data-loaded", "1");
    var webm = document.createElement("source");
    webm.src = "assets/videos/hero-background.webm";
    webm.type = "video/webm";
    var mp4 = document.createElement("source");
    mp4.src = "assets/videos/hero-background.mp4";
    mp4.type = "video/mp4";
    video.appendChild(webm);
    video.appendChild(mp4);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.addEventListener("playing", function () {
      video.classList.add("is-ready");
    });
    var playPromise = video.play();
    if (playPromise && playPromise.catch) playPromise.catch(function () {});
  }

  window.addEventListener("load", function () {
    if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 2000 });
    else setTimeout(start, 400);
  });
})();
