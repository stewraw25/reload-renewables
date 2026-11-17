(function () {
  var PHRASE = "RELOAD Gold Care Standard: quality products · 6-year warranty · aftercare";
  var lastFocus = null;

  function pageName() {
    var name = (location.pathname || "").split("/").pop();
    return name || "index.html";
  }

  function quoteKind(link) {
    var set = link.getAttribute("data-quote");
    if (set === "picker" || set === "solar" || set === "ac" || set === "heat") return set;
    var text = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
    if (!text || text.length > 32) return "";
    var page = pageName();
    if (text === "get ac quote") return "ac";
    if (page === "ac.html" && (text === "get domestic quote" || text === "get commercial quote")) return "ac";
    if (text === "get free solar quote" || text === "get battery quote") return "solar";
    if (text === "get heat pump quote" || text === "heat pump quote") return "heat";
    if (page === "domestic.html" && text === "get domestic quote") return "solar";
    var inChrome = !!link.closest("nav, #chat-modal, #call-bar");
    if (page === "solar.html" && !inChrome && (text === "get free quote" || text === "get quote")) return "solar";
    if (text === "get quote" || text === "get free quote") return "picker";
    return "";
  }

  function marksHtml() {
    return ''
      + '<div class="care-marks">'
      + '<div class="care-lockup badge-slot">'
      + '<img class="care-seal" src="assets/images/gold-care-standard.svg" alt="RELOAD Gold Care Standard: quality products · 6-year warranty · aftercare" width="320" height="340">'
      + '<div class="care-lockup-copy">'
      + '<div class="care-lockup-title">RELOAD Gold Care Standard</div>'
      + '<div class="care-lockup-sub">quality products · 6-year warranty · aftercare</div>'
      + '</div></div>'
      + '<div class="trustmark-mark badge-slot">'
      + '<img src="assets/images/accreditations/trustmark.png" alt="TrustMark Registered" width="144" height="72">'
      + '<span>TrustMark Registered</span>'
      + '</div>'
      + '<!-- TRUSTMARK LICENCE: registration number goes here when Stewart supplies it. Do not invent a number. -->'
      + '<!-- TRUSTMARK PROFILE: the TrustMark find-a-tradesperson profile URL goes here when Stewart supplies it. -->'
      + '<!-- NICEIC badge: enable once registration confirmed -->'
      + '</div>';
  }

  function ensurePicker() {
    var root = document.getElementById("quote-picker");
    if (root) return root;
    root = document.createElement("div");
    root.id = "quote-picker";
    root.className = "quote-picker";
    root.hidden = true;
    root.innerHTML = ''
      + '<div class="quote-picker-backdrop" data-quote-close></div>'
      + '<div class="quote-picker-dialog" role="dialog" aria-modal="true" aria-labelledby="quote-picker-title">'
      + '<button type="button" class="quote-picker-x" data-quote-close aria-label="Close">&times;</button>'
      + '<h2 id="quote-picker-title">What would you like a quote for?</h2>'
      + marksHtml()
      + '<div class="quote-picker-choices">'
      + '<a class="quote-choice" data-quote-go="solar" href="contact.html#quote"><strong>Solar</strong><span>Open the quotation form</span></a>'
      + '<a class="quote-choice" data-quote-go="solar" href="contact.html#quote"><strong>Battery</strong><span>Open the quotation form</span></a>'
      + '<a class="quote-choice" data-quote-go="ac" href="ac.html#ac-video"><strong>Air conditioning</strong><span>Guide price from a room video</span></a>'
      + '<a class="quote-choice" data-quote-go="heat" href="heat-pumps.html"><strong>Heat pump</strong><span>Coming soon</span></a>'
      + '<button type="button" class="quote-choice" data-quote-go="service"><strong>Servicing</strong><span>Call or email</span></button>'
      + '</div>'
      + '<div class="quote-picker-soon" hidden>'
      + '<p data-soon="heat">Heat pumps are coming soon. The <a href="heat-pumps.html">heat pump page</a> explains air source heat pumps and how to register interest. Call <a href="tel:01978809500">(01978) 809 500</a> or email <a href="mailto:hello@reloadrenewables.com">hello@reloadrenewables.com</a>.</p>'
      + '<p data-soon="service" hidden>For servicing, call <a href="tel:01978809500">(01978) 809 500</a> or email <a href="mailto:hello@reloadrenewables.com">hello@reloadrenewables.com</a>. The <a href="services.html">servicing page</a> lists what we cover.</p>'
      + '<button type="button" class="quote-picker-back" data-quote-back>Other quote options</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(root);
    return root;
  }

  function focusable(dialog) {
    var nodes = dialog.querySelectorAll("a[href], button:not([disabled])");
    return Array.prototype.filter.call(nodes, function (el) {
      if (el.closest("[hidden]")) return false;
      return el.getClientRects().length > 0;
    });
  }

  function closeChat() {
    var chat = document.getElementById("chat-modal");
    if (!chat) return;
    chat.classList.add("hidden");
    chat.classList.remove("flex");
    chat.style.display = "";
  }

  function openPicker(mode, trigger) {
    var root = ensurePicker();
    lastFocus = trigger || document.activeElement;
    closeChat();
    var choices = root.querySelector(".quote-picker-choices");
    var soon = root.querySelector(".quote-picker-soon");
    var direct = mode === "heat" || mode === "service" ? mode : "";
    choices.hidden = !!direct;
    soon.hidden = !direct;
    var notes = root.querySelectorAll("[data-soon]");
    Array.prototype.forEach.call(notes, function (note) {
      note.hidden = note.getAttribute("data-soon") !== (direct || "heat");
    });
    root.hidden = false;
    document.body.classList.add("quote-picker-open");
    var dialog = root.querySelector(".quote-picker-dialog");
    var items = focusable(dialog);
    if (items.length) items[0].focus();
  }

  function closePicker() {
    var root = document.getElementById("quote-picker");
    if (!root || root.hidden) return;
    root.hidden = true;
    document.body.classList.remove("quote-picker-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  function applyAcType(type) {
    if (type !== "domestic" && type !== "commercial") return;
    var select = document.getElementById("ac-video-type");
    if (select) select.value = type;
  }

  function acTypeFrom(link) {
    var set = link.getAttribute("data-ac-type");
    if (set === "domestic" || set === "commercial") return set;
    try {
      var fromQuery = new URL(link.href, location.href).searchParams.get("type");
      if (fromQuery === "domestic" || fromQuery === "commercial") return fromQuery;
    } catch (err) {}
    return "";
  }

  function goQuote(dest) {
    var page = pageName();
    closePicker();
    if (dest === "solar") {
      if (page === "contact.html" && document.getElementById("quote")) {
        history.pushState(null, "", "#quote");
        document.getElementById("quote").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      location.href = "contact.html#quote";
      return;
    }
    if (dest === "ac") {
      if (page === "ac.html" && document.getElementById("ac-video")) {
        history.pushState(null, "", "#ac-video");
        document.getElementById("ac-video").scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      location.href = "ac.html#ac-video";
    }
  }

  document.addEventListener("click", function (event) {
    var closer = event.target.closest("[data-quote-close]");
    if (closer && closer.closest("#quote-picker")) {
      event.preventDefault();
      closePicker();
      return;
    }
    var back = event.target.closest("[data-quote-back]");
    if (back) {
      event.preventDefault();
      var root = document.getElementById("quote-picker");
      if (!root) return;
      root.querySelector(".quote-picker-choices").hidden = false;
      root.querySelector(".quote-picker-soon").hidden = true;
      var first = root.querySelector(".quote-choice");
      if (first) first.focus();
      return;
    }
    var choice = event.target.closest("[data-quote-go]");
    if (choice && choice.closest("#quote-picker")) {
      var dest = choice.getAttribute("data-quote-go");
      if (dest === "heat") {
        event.preventDefault();
        location.href = "heat-pumps.html";
        return;
      }
      if (dest === "service") {
        event.preventDefault();
        var picker = document.getElementById("quote-picker");
        picker.querySelector(".quote-picker-choices").hidden = true;
        picker.querySelector(".quote-picker-soon").hidden = false;
        var notes = picker.querySelectorAll("[data-soon]");
        Array.prototype.forEach.call(notes, function (note) {
          note.hidden = note.getAttribute("data-soon") !== dest;
        });
        var phone = picker.querySelector(".quote-picker-soon [data-soon=\"" + dest + "\"] a");
        if (phone) phone.focus();
        return;
      }
      event.preventDefault();
      goQuote(dest);
      return;
    }
    var link = event.target.closest("a");
    if (!link || !link.getAttribute("href")) return;
    if (link.closest("#quote-picker")) return;
    var kind = quoteKind(link);
    if (kind === "heat") {
      event.preventDefault();
      location.href = "heat-pumps.html";
      return;
    }
    if (kind === "picker") {
      event.preventDefault();
      openPicker("choices", link);
      return;
    }
    if (kind !== "solar" && kind !== "ac") return;
    var url;
    try { url = new URL(link.href, location.href); } catch (err) { return; }
    if (url.pathname !== location.pathname) return;
    if (url.hash !== "#quote" && url.hash !== "#ac-video") return;
    var target = document.querySelector(url.hash);
    if (!target) return;
    event.preventDefault();
    var acType = kind === "ac" ? acTypeFrom(link) : "";
    var next = (acType ? "?type=" + encodeURIComponent(acType) : "") + url.hash;
    history.pushState(null, "", next);
    if (acType) applyAcType(acType);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.addEventListener("keydown", function (event) {
    var root = document.getElementById("quote-picker");
    if (!root || root.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closePicker();
      return;
    }
    if (event.key !== "Tab") return;
    var dialog = root.querySelector(".quote-picker-dialog");
    var items = focusable(dialog);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  applyAcType(new URLSearchParams(location.search).get("type") || "");

  if (location.hash === "#quote" || location.hash === "#ac-video") {
    window.addEventListener("load", function () {
      var target = document.querySelector(location.hash);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
})();

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

  var serviceRoute = document.getElementById("service-route");
  if (serviceRoute) {
    serviceRoute.addEventListener("submit", function (event) {
      event.preventDefault();
      var choice = document.getElementById("service-choice");
      var note = document.getElementById("service-route-note");
      var value = choice ? choice.value : "solar";
      if (value === "ac") {
        location.href = "ac.html#ac-video";
        return;
      }
      if (value === "solar" || value === "battery") {
        if (note) note.hidden = true;
        var quote = document.getElementById("quote");
        if (quote) quote.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      if (!note) return;
      var phone = '<a href="tel:01978809500">(01978) 809 500</a>';
      var email = '<a href="mailto:hello@reloadrenewables.com">hello@reloadrenewables.com</a>';
      if (value === "heat") {
        location.href = "heat-pumps.html";
        return;
      } else if (value === "servicing") {
        note.innerHTML = "For servicing, call " + phone + " or email " + email + ". The <a href=\"services.html\">servicing page</a> lists what we cover.";
      } else {
        note.innerHTML = "Call " + phone + " or email " + email + " and tell us what you need. Solar and battery quotes use the form on this page. Air conditioning quotes start from a room video.";
      }
      note.hidden = false;
    });
  }

  var skip = document.querySelector(".skip-link");
  if (skip) {
    skip.addEventListener("click", function () {
      var main = document.getElementById("main");
      if (main) main.focus();
    });
  }

  var menuBtn = document.getElementById("mobile-menu-btn");
  var menu = document.getElementById("mobile-menu");
  if (menuBtn && menu) {
    menuBtn.setAttribute("aria-controls", "mobile-menu");
    function syncMenu() {
      var open = !menu.classList.contains("hidden");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    syncMenu();
    document.addEventListener("click", function () {
      syncMenu();
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
