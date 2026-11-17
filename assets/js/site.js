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
      + '<a class="quote-choice" data-quote-go="solar" href="contact.html?enquiry=solar#quote"><strong>Solar</strong><span>Open the quotation form</span></a>'
      + '<a class="quote-choice" data-quote-go="battery" href="contact.html?enquiry=battery#quote"><strong>Battery</strong><span>Open the quotation form</span></a>'
      + '<a class="quote-choice" data-quote-go="solar-battery" href="contact.html?enquiry=solar,battery#quote"><strong>Solar + battery</strong><span>Open the quotation form</span></a>'
      + '<a class="quote-choice" data-quote-go="ac" href="ac.html?enquiry=ac#ac-video"><strong>Air conditioning</strong><span>Guide price from a room video</span></a>'
      + '<a class="quote-choice" data-quote-go="heat" href="heat-pumps.html?enquiry=heat"><strong>Heat pump</strong><span>Coming soon</span></a>'
      + '<button type="button" class="quote-choice" data-quote-go="service"><strong>Servicing</strong><span>Call or email</span></button>'
      + '<button type="button" class="quote-choice" data-quote-go="several"><strong>Several services</strong><span>Tick two or more</span></button>'
      + '</div>'
      + '<div class="quote-picker-several" hidden>'
      + '<fieldset class="service-ticks">'
      + '<legend>Which services? Tick two or more.</legend>'
      + '<label><input type="checkbox" value="solar"> Solar</label>'
      + '<label><input type="checkbox" value="battery"> Battery</label>'
      + '<label><input type="checkbox" value="ac"> Air conditioning</label>'
      + '<label><input type="checkbox" value="heat"> Heat pump (coming soon)</label>'
      + '<label><input type="checkbox" value="servicing"> Servicing</label>'
      + '<p class="quote-several-error" hidden role="status"></p>'
      + '</fieldset>'
      + '<button type="button" class="quote-picker-back" data-quote-several-continue>Continue</button>'
      + '<button type="button" class="quote-picker-back" data-quote-back>Other quote options</button>'
      + '</div>'
      + '<div class="quote-picker-soon" hidden>'
      + '<p data-soon="heat">Heat pumps are coming soon. This is not a booking. The <a href="heat-pumps.html?enquiry=heat">heat pump page</a> opens an email with the subject “Enquiry: Heat pump (coming soon)”. Nothing is sent until you send that email. Call <a href="tel:01978809500">(01978) 809 500</a>.</p>'
      + '<p data-soon="service" hidden>Nothing has been sent. For servicing, call <a href="tel:01978809500">(01978) 809 500</a> or email <a class="enquiry-mail" href="mailto:hello@reloadrenewables.com?subject=Enquiry%3A%20Servicing">hello@reloadrenewables.com</a>. The subject is “Enquiry: Servicing”. The <a href="services.html">servicing page</a> lists what we cover.</p>'
      + '<button type="button" class="quote-picker-back" data-quote-back>Other quote options</button>'
      + '</div>'
      + '</div>';
    document.body.appendChild(root);
    return root;
  }

  function focusable(dialog) {
    var nodes = dialog.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])");
    return Array.prototype.filter.call(nodes, function (el) {
      if (el.closest("[hidden]")) return false;
      return el.getClientRects().length > 0;
    });
  }

  function motion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  }

  function scrollTo(el, block) {
    if (!el) return;
    el.scrollIntoView({ behavior: motion(), block: block || "start" });
  }

  function closeChat() {
    var chat = document.getElementById("chat-modal");
    if (!chat) return;
    chat.classList.add("hidden");
    chat.classList.remove("flex");
    chat.style.display = "";
    var chatButton = document.getElementById("chat-button");
    if (chatButton) chatButton.setAttribute("aria-expanded", "false");
  }

  function openPicker(mode, trigger) {
    var root = ensurePicker();
    if (trigger && trigger.closest && trigger.closest("#chat-modal")) {
      trigger = document.getElementById("chat-button") || trigger;
    }
    lastFocus = trigger || document.activeElement;
    closeChat();
    var choices = root.querySelector(".quote-picker-choices");
    var soon = root.querySelector(".quote-picker-soon");
    var several = root.querySelector(".quote-picker-several");
    if (several) {
      several.hidden = true;
      Array.prototype.forEach.call(several.querySelectorAll("input"), function (box) { box.checked = false; });
    }
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

  var SERVICE_NAMES = {
    solar: "Solar",
    battery: "Battery",
    ac: "Air conditioning",
    heat: "Heat pump (coming soon)",
    servicing: "Servicing",
    other: "Something else"
  };

  function knownKeys(list) {
    return list.filter(function (key) { return SERVICE_NAMES[key]; });
  }

  function enquiryLabel(keys) {
    return keys.map(function (key) { return SERVICE_NAMES[key]; }).join(", ");
  }

  function enquirySubject(keys) {
    return "Enquiry: " + enquiryLabel(keys);
  }

  function mailtoEnquiry(keys) {
    return "mailto:hello@reloadrenewables.com?subject=" + encodeURIComponent(enquirySubject(keys));
  }

  function readEnquiry() {
    var raw = new URLSearchParams(location.search).get("enquiry") || "";
    if (!raw) return [];
    return knownKeys(raw.split(",").map(function (part) { return part.trim(); }));
  }

  function hasInstall(keys) {
    return keys.indexOf("solar") !== -1 || keys.indexOf("battery") !== -1;
  }

  function fillOpenSolarNotes(keys) {
    var notes = document.getElementById("widget-notes-os");
    if (!notes || notes.value) return;
    notes.value = enquirySubject(keys);
  }

  function showRouteNote(html, focusNote) {
    var note = document.getElementById("service-route-note");
    if (!note) return;
    note.innerHTML = html;
    note.hidden = false;
    if (focusNote) note.focus();
  }

  function installNote(keys) {
    var extra = "";
    if (keys.indexOf("ac") !== -1) {
      extra += " Air conditioning can also start from a <a href=\"ac.html?enquiry=ac#ac-video\">room video</a>.";
    }
    if (keys.indexOf("heat") !== -1) {
      extra += " Heat pumps are coming soon. This is not a booking.";
    }
    if (keys.indexOf("servicing") !== -1) {
      extra += " Servicing is arranged by phone or email, not by the quotation form.";
    }
    return "The quotation form is below. Nothing has been sent. Chosen services: " + enquiryLabel(keys) + "."
      + extra
      + " If you email instead, the subject is “" + enquirySubject(keys) + "”: <a href=\"" + mailtoEnquiry(keys) + "\">hello@reloadrenewables.com</a>.";
  }

  function emailNote(keys) {
    var extra = "";
    if (keys.indexOf("ac") !== -1) {
      extra += " For air conditioning, a room video is on the <a href=\"ac.html?enquiry=ac#ac-video\">air conditioning page</a>.";
    }
    if (keys.indexOf("heat") !== -1) {
      extra += " Heat pumps are coming soon. This is not a booking.";
    }
    return "Nothing has been sent. Chosen services: " + enquiryLabel(keys) + "."
      + extra
      + " This link opens an email in your own mail app. The subject is “" + enquirySubject(keys) + "”. <a href=\"" + mailtoEnquiry(keys) + "\">Open an email</a>.";
  }

  function selectValueFor(keys) {
    if (keys.length === 1) return keys[0];
    if (keys.length === 2 && keys.indexOf("solar") !== -1 && keys.indexOf("battery") !== -1) return "solar-battery";
    return "several";
  }

  function setContactControls(keys) {
    var choice = document.getElementById("service-choice");
    var box = document.getElementById("service-several");
    if (!choice || !box) return;
    choice.value = selectValueFor(keys);
    box.hidden = choice.value !== "several";
    Array.prototype.forEach.call(box.querySelectorAll("input"), function (input) {
      input.checked = keys.indexOf(input.value) !== -1;
    });
    box.removeAttribute("aria-invalid");
    var error = document.getElementById("service-several-error");
    if (error) error.hidden = true;
  }

  function keysFromContactForm() {
    var choice = document.getElementById("service-choice");
    var value = choice ? choice.value : "solar";
    if (value === "solar-battery") return ["solar", "battery"];
    if (value === "several") {
      var box = document.getElementById("service-several");
      if (!box) return [];
      return knownKeys(Array.prototype.map.call(box.querySelectorAll("input:checked"), function (input) {
        return input.value;
      }));
    }
    return knownKeys([value]);
  }

  function applyAcSubject(keys) {
    var link = document.querySelector("#ac-video-form-note a[href^=\"mailto:\"]");
    if (!link) return;
    var subjectKeys = keys && keys.length ? keys : ["ac"];
    link.href = mailtoEnquiry(subjectKeys);
  }

  function applyHeatSubject(keys) {
    var form = document.getElementById("heat-interest");
    if (!form) return;
    var subjectKeys = keys && keys.length ? keys : ["heat"];
    form.setAttribute("action", mailtoEnquiry(subjectKeys));
  }

  function rememberEnquiry(keys) {
    var next = "?enquiry=" + encodeURIComponent(keys.join(",")) + "#quote";
    history.replaceState(null, "", next);
  }

  function showContactEnquiry(keys, focusNote) {
    setContactControls(keys);
    rememberEnquiry(keys);
    if (hasInstall(keys)) {
      showRouteNote(installNote(keys), focusNote);
      fillOpenSolarNotes(keys);
      var tries = 0;
      var timer = window.setInterval(function () {
        fillOpenSolarNotes(keys);
        tries += 1;
        if (document.getElementById("widget-notes-os") || tries >= 24) window.clearInterval(timer);
      }, 500);
      scrollTo(document.getElementById("quote"));
      return;
    }
    showRouteNote(emailNote(keys), focusNote);
    scrollTo(document.getElementById("service-route-note"));
  }

  function routeEnquiry(keys) {
    if (!keys.length) return;
    var page = pageName();
    var onlyAc = keys.length === 1 && keys[0] === "ac";
    var onlyHeat = keys.length === 1 && keys[0] === "heat";
    var query = "enquiry=" + encodeURIComponent(keys.join(","));
    closePicker();
    if (hasInstall(keys)) {
      if (page === "contact.html" && document.getElementById("service-choice")) {
        showContactEnquiry(keys, true);
        return;
      }
      location.href = "contact.html?" + query + "#quote";
      return;
    }
    if (onlyAc) {
      if (page === "ac.html" && document.getElementById("ac-video")) {
        applyAcSubject(keys);
        history.pushState(null, "", "?" + query + "#ac-video");
        scrollTo(document.getElementById("ac-video"));
        return;
      }
      location.href = "ac.html?" + query + "#ac-video";
      return;
    }
    if (onlyHeat) {
      if (page === "heat-pumps.html" && document.getElementById("heat-interest")) {
        applyHeatSubject(keys);
        history.pushState(null, "", "?" + query);
        scrollTo(document.getElementById("heat-interest"));
        return;
      }
      location.href = "heat-pumps.html?" + query;
      return;
    }
    if (page === "contact.html" && document.getElementById("service-choice")) {
      showContactEnquiry(keys, true);
      return;
    }
    location.href = "contact.html?" + query + "#quote";
  }

  function goQuote(dest) {
    if (dest === "solar-battery") {
      routeEnquiry(["solar", "battery"]);
      return;
    }
    if (dest === "solar" || dest === "battery" || dest === "ac" || dest === "heat" || dest === "servicing") {
      routeEnquiry([dest === "servicing" ? "servicing" : dest]);
      return;
    }
    routeEnquiry(["solar"]);
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
      root.querySelector(".quote-picker-several").hidden = true;
      var first = root.querySelector(".quote-choice");
      if (first) first.focus();
      return;
    }
    var severalContinue = event.target.closest("[data-quote-several-continue]");
    if (severalContinue) {
      event.preventDefault();
      var panel = document.querySelector("#quote-picker .quote-picker-several");
      var picked = knownKeys(Array.prototype.map.call(panel.querySelectorAll("input:checked"), function (input) {
        return input.value;
      }));
      var field = panel.querySelector("fieldset");
      var error = panel.querySelector(".quote-several-error");
      if (picked.length < 2) {
        if (field) field.setAttribute("aria-invalid", "true");
        if (error) {
          error.hidden = false;
          error.textContent = "Tick at least two services, or go back and choose one service.";
        }
        var box = panel.querySelector("input");
        if (box) box.focus();
        return;
      }
      if (field) field.removeAttribute("aria-invalid");
      if (error) error.hidden = true;
      routeEnquiry(picked);
      return;
    }
    var choice = event.target.closest("[data-quote-go]");
    if (choice && choice.closest("#quote-picker")) {
      var dest = choice.getAttribute("data-quote-go");
      event.preventDefault();
      if (dest === "several") {
        var picker = document.getElementById("quote-picker");
        picker.querySelector(".quote-picker-choices").hidden = true;
        picker.querySelector(".quote-picker-soon").hidden = true;
        picker.querySelector(".quote-picker-several").hidden = false;
        var firstBox = picker.querySelector(".quote-picker-several input");
        if (firstBox) firstBox.focus();
        return;
      }
      if (dest === "service") {
        var servicePicker = document.getElementById("quote-picker");
        servicePicker.querySelector(".quote-picker-choices").hidden = true;
        servicePicker.querySelector(".quote-picker-several").hidden = true;
        servicePicker.querySelector(".quote-picker-soon").hidden = false;
        var notes = servicePicker.querySelectorAll("[data-soon]");
        Array.prototype.forEach.call(notes, function (note) {
          note.hidden = note.getAttribute("data-soon") !== dest;
        });
        var phone = servicePicker.querySelector(".quote-picker-soon [data-soon=\"" + dest + "\"] a");
        if (phone) phone.focus();
        return;
      }
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
    scrollTo(target);
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

  var arrival = readEnquiry();
  if (pageName() === "ac.html") applyAcSubject(arrival.length ? arrival : ["ac"]);
  if (pageName() === "heat-pumps.html") applyHeatSubject(arrival.length ? arrival : ["heat"]);
  if (pageName() === "contact.html" && arrival.length && document.getElementById("service-choice")) {
    showContactEnquiry(arrival, false);
  }

  var serviceChoice = document.getElementById("service-choice");
  if (serviceChoice) {
    serviceChoice.addEventListener("change", function () {
      var box = document.getElementById("service-several");
      if (!box) return;
      var show = serviceChoice.value === "several";
      box.hidden = !show;
      if (!show) {
        box.removeAttribute("aria-invalid");
        var error = document.getElementById("service-several-error");
        if (error) error.hidden = true;
        return;
      }
      var firstBox = box.querySelector("input");
      if (firstBox) firstBox.focus();
    });
  }

  var serviceRoute = document.getElementById("service-route");
  if (serviceRoute) {
    serviceRoute.addEventListener("submit", function (event) {
      event.preventDefault();
      var keys = keysFromContactForm();
      var box = document.getElementById("service-several");
      var error = document.getElementById("service-several-error");
      if (serviceChoice && serviceChoice.value === "several" && keys.length < 2) {
        if (box) box.setAttribute("aria-invalid", "true");
        if (error) {
          error.hidden = false;
          error.textContent = "Tick at least two services, or choose one service in the list above.";
        }
        var firstBox = box && box.querySelector("input");
        if (firstBox) firstBox.focus();
        return;
      }
      if (box) box.removeAttribute("aria-invalid");
      if (error) error.hidden = true;
      routeEnquiry(keys);
    });
  }

  if (location.hash === "#quote" || location.hash === "#ac-video") {
    window.addEventListener("load", function () {
      var target = document.querySelector(location.hash);
      if (target) scrollTo(target);
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

  var heatInterest = document.getElementById("heat-interest");
  if (heatInterest) {
    heatInterest.addEventListener("submit", function () {
      var note = document.getElementById("heat-interest-note");
      if (note) note.hidden = false;
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
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || menu.classList.contains("hidden")) return;
      menu.classList.add("hidden");
      var icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
      syncMenu();
      menuBtn.focus();
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
    webm.setAttribute("fetchpriority", "low");
    mp4.setAttribute("fetchpriority", "low");
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
