// Reload Renewables & AC — on-site answers. Quote hand-off goes to the contact page embed.
(function () {
  const knowledgeBase = [
    { keywords: ["area", "cover", "wrexham", "chester", "mold", "oswestry", "north wales", "where", "serve"], answer: "We cover Wrexham, Chester, Mold, Oswestry, Flint, Deeside, Flintshire, Denbighshire and North Wales. If you are not sure, send your postcode with the quotation form." },
    { keywords: ["finance", "0%", "zero", "interest", "payment", "pay monthly"], answer: "Three ways to pay, on the Gold from £10,000 package: pay in full; 0% via an authorised broker (subject to status; illustration if approved with no deposit 120 × £83 — Reload is not the lender); or a separate representative example at 9.9% APR, 120 months, £10,000, no deposit, 120 × £132, total amount payable £15,840. Do not mix 0% and 9.9% — they are different products." },
    { keywords: ["warranty", "guarantee", "how long"], answer: "We provide 10-year workmanship warranties on all installations. Panels typically come with 25–30 year performance warranties, and batteries (BYD/Tesla) usually have 10-year warranties." },
    { keywords: ["battery only", "no solar", "just battery", "arbitrage", "off peak", "octopus go"], answer: "Absolutely. Many customers install battery storage only, especially on tariffs like Octopus Go. You can charge overnight at cheap rates and use the power during the day." },
    { keywords: ["heat pump", "grant", "bus", "air source"], answer: "Yes, we install air source heat pumps and can help with the Boiler Upgrade Scheme (BUS) grant of up to £7,500 on qualifying jobs." },
    { keywords: ["air conditioning", "ac", "cooling", "mitsubishi", "daikin"], answer: "We install high-quality air conditioning systems from Mitsubishi, Daikin, and LG for both homes and commercial properties. We're F-Gas certified." },
    { keywords: ["accredited", "accreditation", "certified", "certificate"], answer: "Work is installed to a high standard by qualified electricians. F-Gas is held for air-conditioning and heat-pump refrigerant work." },
    { keywords: ["servicing", "maintenance", "service", "annual", "repair"], answer: "We offer annual servicing and maintenance plans for solar PV, batteries, heat pumps and air conditioning across Wrexham, Chester and North Wales. Keeps systems efficient and protects your warranties. F-Gas certified for AC." },
    { keywords: ["cost", "price", "how much", "expensive"], answer: "Our popular packages start from £8,000 for Silver (3.6kWp + 5.1kWh battery). Prices vary depending on your property — we always provide a free, no-obligation site survey and quote." },
    { keywords: ["payback", "return", "save", "bill reduction"], answer: "Savings depend on your usage, tariff and the system we specify. Use the estimator on the homepage for a modelled figure, or call (01978) 809 500 for a site survey. We use ~980 kWh/kWp for this area." },
    { keywords: ["tesla", "powerwall", "byd"], answer: "We install both BYD batteries (excellent value) and Tesla Powerwall 3. The Platinum package includes the Tesla Powerwall 3 + Gateway." },
    { keywords: ["commercial", "business", "office", "chester", "wrexham business"], answer: "We design and install solar, battery storage, heat pumps and air conditioning for homes and businesses in Wrexham, Chester and North Wales." },
    { keywords: ["time", "how long", "installation", "install"], answer: "A typical domestic solar + battery install takes 1–3 days. We handle scaffolding and DNO applications. The work is installed to a high standard by qualified electricians." },
    { keywords: ["solar installers", "solar wrexham", "solar chester", "best solar", "recommended solar", "solar installers wrexham", "solar installers chester"], answer: "We are local solar installers based in Wrexham. We fit quality products to a high installation standard, with a calm service from the first visit to switch-on, for homes and businesses in Wrexham, Chester, Mold, Oswestry and North Wales. Free site survey, and no pressure to go ahead." },
    { keywords: ["solar cost", "how much solar", "solar price", "solar wrexham cost", "solar chester price"], answer: "Our Silver package starts from £8,000 (3.6kWp solar + 5.1kWh battery). Most 4-6kWp systems with battery land between £9k-£14k after 0% VAT. We always do a free site survey for an accurate fixed quote tailored to your roof and usage." },
    { keywords: ["choose installer", "best installer", "how to pick", "why choose you", "why reload", "mission", "installation standard", "unsafe"], answer: "We set Reload up to fit solar properly: quality products, a high installation standard, and a calm, friendly service from the first visit to switch-on. There is no pressure to sign on the day." },
    { keywords: ["grant solar", "eco4", "bus solar", "free solar", "funding wrexham"], answer: "The main grant for heat pumps is the Boiler Upgrade Scheme (BUS) up to £7,500. Solar PV itself has 0% VAT on residential installs and Smart Export Guarantee payments. We can advise on ECO4 / GBIS schemes for eligible homes in Wrexham and Chester — ask during your survey." }
  ];

  function quoteHref() {
    var path = window.location.pathname || "";
    if (path.endsWith("/contact.html") || path.endsWith("contact.html")) return "#quote";
    return "contact.html#quote";
  }

  function addMessage(text, isBot, container) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "flex " + (isBot ? "justify-start" : "justify-end") + " mb-3";
    const bubble = document.createElement("div");
    bubble.className = "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed " +
      (isBot ? "bg-slate-100 text-slate-800 rounded-bl-none" : "bg-[#00A3E0] text-white rounded-br-none");
    bubble.textContent = text;
    messageDiv.appendChild(bubble);
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
  }

  function offerSurvey(container) {
    addMessage("Request a survey on the quotation form. No pressure to go ahead. Weekdays, usually within 2 hours.", true, container);
    const wrap = document.createElement("div");
    wrap.className = "mb-3";
    const link = document.createElement("a");
    link.href = quoteHref();
    link.className = "inline-block text-xs px-3 py-1.5 bg-[#00A3E0] text-white rounded-full";
    link.textContent = "Request a survey";
    wrap.appendChild(link);
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  function showQuickReplies(replies, container, onReply) {
    const wrap = document.createElement("div");
    wrap.className = "flex flex-wrap gap-2 mt-2 mb-3";
    replies.forEach(function (reply) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "text-xs px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-full transition-colors";
      btn.textContent = reply;
      btn.onclick = function () {
        wrap.remove();
        addMessage(reply, false, container);
        setTimeout(function () { onReply(reply); }, 400);
      };
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  function handleUserMessage(message, container) {
    const lowerMsg = message.toLowerCase();
    let answered = false;
    for (let i = 0; i < knowledgeBase.length; i++) {
      const item = knowledgeBase[i];
      if (item.keywords.some(function (kw) { return lowerMsg.includes(kw); })) {
        setTimeout(function () { addMessage(item.answer, true, container); }, 500);
        answered = true;
        break;
      }
    }
    if (!answered) {
      setTimeout(function () {
        addMessage("Thanks for the question. I don't have that detail here.", true, container);
        offerSurvey(container);
      }, 500);
    }
  }

  window.initPrimeChatbot = function () {
    if (window.primeChatInitDone) return;
    const chatButton = document.getElementById("chat-button");
    const chatModal = document.getElementById("chat-modal");
    const closeChat = document.getElementById("close-chat");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");
    if (!chatButton || !chatModal || !chatMessages || !chatInput || !sendBtn || !closeChat) return;
    window.primeChatInitDone = true;

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
      addMessage(text, false, chatMessages);
      chatInput.value = "";
      handleUserMessage(text, chatMessages);
    }

    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });

    chatButton.addEventListener("click", function () {
      chatModal.classList.remove("hidden");
      chatModal.classList.add("flex");
      if (!window.primeChatHasGreeted) {
        setTimeout(function () {
          addMessage("Hi. Questions about solar and battery storage in Wrexham and Chester. We fit to a high standard, and there is no pressure to go ahead. Weekdays, usually within 2 hours.", true, chatMessages);
          setTimeout(function () {
            addMessage("What would you like to know?", true, chatMessages);
            showQuickReplies(["Do you cover my area?", "0% finance details", "Battery only options", "How much does it cost?"], chatMessages, function (reply) {
              handleUserMessage(reply, chatMessages);
            });
          }, 700);
        }, 400);
        window.primeChatHasGreeted = true;
      }
    });

    closeChat.addEventListener("click", function () {
      chatModal.classList.add("hidden");
      chatModal.classList.remove("flex");
    });
  };
  // Start the chat on every page, even ones that don't call initPrimeChatbot themselves.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", window.initPrimeChatbot);
  } else {
    window.initPrimeChatbot();
  }
})();
