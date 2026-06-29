// Reload Renewables & AC - AI Chatbot
(function() {
  let conversation = [];
  let hasGreeted = false;

  const knowledgeBase = [
    { keywords: ["area", "cover", "wrexham", "chester", "mold", "oswestry", "north wales", "where", "serve"], answer: "We cover Wrexham, Chester, Mold, Oswestry, Flint, Deeside, Rhyl and all of North Wales plus the North West (including parts of Cheshire and Wirral). If you're unsure if we serve your area, just let us know your postcode." },
    { keywords: ["finance", "0%", "zero", "interest", "payment", "pay monthly"], answer: "Yes! We offer 0% interest finance options. These are arranged through our authorised broker partners to ensure full compliance with UK consumer credit regulations." },
    { keywords: ["warranty", "guarantee", "how long"], answer: "We provide 10-year workmanship warranties on all installations. Panels typically come with 25–30 year performance warranties, and batteries (BYD/Tesla) usually have 10-year warranties." },
    { keywords: ["battery only", "no solar", "just battery", "arbitrage", "off peak", "octopus go"], answer: "Absolutely. Many customers install battery storage only, especially on tariffs like Octopus Go. You can charge overnight at cheap rates and use the power during the day." },
    { keywords: ["heat pump", "grant", "bus", "air source"], answer: "Yes, we install air source heat pumps and can help with the Boiler Upgrade Scheme (BUS) grant of up to £7,500. We handle the full application." },
    { keywords: ["air conditioning", "ac", "cooling", "mitsubishi", "daikin"], answer: "We install high-quality air conditioning systems from Mitsubishi, Daikin, and LG for both homes and commercial properties. We're F-Gas certified." },
    { keywords: ["mcs", "accredited", "niceic", "trustmark"], answer: "Yes — we are fully MCS accredited, NICEIC registered, RECC members, TrustMark approved, and F-Gas certified." },
    { keywords: ["servicing", "maintenance", "service", "annual", "repair"], answer: "We offer annual servicing and maintenance plans for solar PV, batteries, heat pumps and air conditioning across Wrexham, Chester and North Wales. Keeps systems efficient and protects your warranties. F-Gas certified for AC." },
    { keywords: ["cost", "price", "how much", "expensive"], answer: "Our popular packages start from £8,000 for Silver (3.6kWp + 5.1kWh battery). Prices vary depending on your property — we always provide a free, no-obligation site survey and quote." },
    { keywords: ["payback", "return", "save", "bill reduction"], answer: "Most customers see 70-90% reduction in energy bills. Payback is typically 6–9 years depending on the system and your usage/tariff." },
    { keywords: ["tesla", "powerwall", "byd"], answer: "We install both BYD batteries (excellent value) and Tesla Powerwall 3. The Platinum package includes the Tesla Powerwall 3 + Gateway." },
    { keywords: ["commercial", "business", "office", "chester", "wrexham business"], answer: "Yes, we regularly work with homes and businesses, offices, farms, and commercial properties for solar, battery storage, heat pumps and air conditioning in Wrexham, Chester and across North Wales." },
    { keywords: ["time", "how long", "installation", "install"], answer: "A typical domestic solar + battery install takes 1–3 days. We handle everything including scaffolding, DNO applications, and MCS registration." },
    { keywords: ["solar installers", "solar wrexham", "solar chester", "best solar", "recommended solar", "solar installers wrexham", "solar installers chester"], answer: "We are professional local solar installers based in Wrexham serving homes and businesses in Wrexham, Chester, Mold, Oswestry and all of North Wales. MCS accredited with premium DAS 450W panels, full project management, 10-year workmanship warranty and free site surveys." },
    { keywords: ["solar cost", "how much solar", "solar price", "solar wrexham cost", "solar chester price"], answer: "Our Silver package starts from £8,000 (3.6kWp solar + 5.1kWh battery). Most 4-6kWp systems with battery land between £9k-£14k after 0% VAT. We always do a free site survey for an accurate fixed quote tailored to your roof and usage." },
    { keywords: ["choose installer", "best installer", "how to pick", "mcs important", "why choose you"], answer: "Look for current MCS certification, NICEIC, local base (we are in Wrexham Industrial Estate), transparent quotes listing exact equipment (DAS panels, BYD/Tesla batteries), and real local reviews. We publish our accreditations and give honest advice — even if a smaller system or waiting for a grant is better for you." },
    { keywords: ["grant solar", "eco4", "bus solar", "free solar", "funding wrexham"], answer: "The main grant for heat pumps is the Boiler Upgrade Scheme (BUS) up to £7,500. Solar PV itself has 0% VAT on residential installs and Smart Export Guarantee payments. We can advise on ECO4 / GBIS schemes for eligible homes in Wrexham and Chester — ask during your survey." }
  ];

  function addMessage(text, isBot = true, container) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`;
    
    const bubble = document.createElement('div');
    bubble.className = `max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
      isBot ? 'bg-slate-100 text-slate-800 rounded-bl-none' : 'bg-[#00A3E0] text-white rounded-br-none'
    }`;
    bubble.textContent = text;
    
    messageDiv.appendChild(bubble);
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;

    conversation.push({ role: isBot ? 'bot' : 'user', message: text });
  }

  function showQuickReplies(replies, container, onReply) {
    const wrap = document.createElement('div');
    wrap.className = 'flex flex-wrap gap-2 mt-2 mb-3';
    
    replies.forEach(reply => {
      const btn = document.createElement('button');
      btn.className = 'text-xs px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-full transition-colors';
      btn.textContent = reply;
      btn.onclick = () => {
        wrap.remove();
        addMessage(reply, false, container);
        setTimeout(() => onReply(reply), 400);
      };
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
    container.scrollTop = container.scrollHeight;
  }

  function handleUserMessage(message, container) {
    const lowerMsg = message.toLowerCase();
    let answered = false;

    for (let item of knowledgeBase) {
      if (item.keywords.some(kw => lowerMsg.includes(kw))) {
        setTimeout(() => {
          addMessage(item.answer, true, container);
        }, 500);
        answered = true;
        break;
      }
    }

    if (!answered) {
      setTimeout(() => {
        addMessage("Thanks for the question. I don't have specific details on that yet, but one of our team can give you a precise answer. Would you like to send your details through?", true, container);
      }, 500);
    }
  }

  // Expose a global function to initialise the chatbot on any page
  window.initPrimeChatbot = function() {
    const chatButton = document.getElementById('chat-button');
    const chatModal = document.getElementById('chat-modal');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const leadForm = document.getElementById('lead-form');

    if (!chatButton || !chatModal) return;

    let localConversation = [];

    function addLocalMessage(text, isBot = true) {
      addMessage(text, isBot, chatMessages);
    }

    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
      addLocalMessage(text, false);
      chatInput.value = '';
      handleUserMessage(text, chatMessages);
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    chatButton.addEventListener('click', () => {
      chatModal.classList.remove('hidden');
      chatModal.classList.add('flex');

      if (!window.primeChatHasGreeted) {
        setTimeout(() => {
          addLocalMessage("Hi! I'm here to help with questions about solar installers in Wrexham & Chester, battery storage, air conditioning, heat pumps, grants and our 0% finance options.");
          setTimeout(() => {
            addLocalMessage("What would you like to know?");
            showQuickReplies(["Do you cover my area?", "0% finance details", "Battery only options", "How much does it cost?"], chatMessages, (reply) => {
              handleUserMessage(reply, chatMessages);
            });
          }, 700);
        }, 400);
        window.primeChatHasGreeted = true;
      }
    });

    closeChat.addEventListener('click', () => {
      chatModal.classList.add('hidden');
      chatModal.classList.remove('flex');
    });

    // Lead form
    const leadFormEl = document.getElementById('lead-form-element');
    if (leadFormEl) {
      leadFormEl.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
          name: document.getElementById('lead-name').value,
          phone: document.getElementById('lead-phone').value,
          email: document.getElementById('lead-email').value,
          interest: document.getElementById('lead-interest').value,
          summary: document.getElementById('chat-summary').value,
          source: "Website Chatbot - " + window.location.pathname
        };

        // IMPORTANT: Replace this with your actual Formspree endpoint
        const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID_HERE";

        try {
          const response = await fetch(formspreeEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          });

          if (response.ok) {
            leadForm.innerHTML = `
              <div class="text-center py-8">
                <i class="fas fa-check-circle text-emerald-500 text-4xl mb-4"></i>
                <h3 class="font-semibold text-lg">Thank you!</h3>
                <p class="text-sm text-slate-600 mt-2">We've received your details and chat transcript. A member of our team will contact you shortly.</p>
              </div>
            `;
          } else {
            throw new Error("Form submission failed");
          }
        } catch (err) {
          alert("There was a problem sending your enquiry. Please call us directly on (01978) 809 500.");
        }
      });
    }
  };
})();