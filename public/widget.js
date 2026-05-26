(function () {
  "use strict";

  var config = window.AIManagerConfig || {};
  var token = config.token || "";

  var PROJECT_MAP = {
    "avangard-demo": "24fb0dde-db80-4b86-b827-6a264ecd2c8c",
  };

  var SUPABASE_URL = "https://cucmenaduvwuchjakxfa.supabase.co";
  var SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1Y21lbmFkdXZ3dWNoamFreGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTYzNjMsImV4cCI6MjA5NDA5MjM2M30.7gjW5Qwl5kYHZlSgydJ40CSHbEk4DGua7O5FvSYNfk4";

  var projectId = PROJECT_MAP[token];
  if (!projectId) {
    console.warn("[AIManager] Unknown token: " + token);
    return;
  }

  var STORAGE_KEY = "aimanager_history_" + token;
  var SESSION_KEY = "aimanager_session_" + token;
  var NAVY = "#2C3E6F";
  var messages = [];
  var isTyping = false;

  var sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved) messages = JSON.parse(saved);
  } catch (_) {}

  // ── Shared state (используется инлайн-блоком и виджетом) ─────────────────
  function notifyAll() {
    window.dispatchEvent(new CustomEvent("aim:update", {
      detail: { messages: messages.slice(), isTyping: isTyping },
    }));
  }

  function saveHistory() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages)); } catch (_) {}
  }

  async function sendMessageShared(text) {
    if (!text || isTyping) return;

    messages.push({ role: "user", content: text });
    saveHistory();
    isTyping = true;
    notifyAll();

    try {
      var resp = await fetch(SUPABASE_URL + "/functions/v1/chat-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ project_id: projectId, messages: messages, session_id: sessionId }),
      });

      var data = await resp.json();
      var reply =
        (data && data.reply) ||
        (data && data.message) ||
        (data && data.content) ||
        "Извините, не смог получить ответ. Попробуйте ещё раз.";

      messages.push({ role: "assistant", content: reply });
      saveHistory();
    } catch (_) {
      messages.push({ role: "assistant", content: "Ошибка соединения. Попробуйте позже." });
    }

    isTyping = false;
    notifyAll();
  }

  window._AIMState = {
    get messages() { return messages.slice(); },
    get isTyping() { return isTyping; },
    sessionId: sessionId,
    sendMessage: sendMessageShared,
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  var style = document.createElement("style");
  style.textContent = [
    "#aim-btn{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:" + NAVY + ";border:none;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;z-index:99998;transition:transform .2s;}",
    "#aim-btn:hover{transform:scale(1.08);}",
    "#aim-btn svg{display:block;}",
    "#aim-window{position:fixed;bottom:92px;right:24px;width:360px;height:520px;background:#fff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.18);display:flex;flex-direction:column;z-index:99999;overflow:hidden;transition:opacity .2s,transform .2s;}",
    "#aim-window.aim-hidden{opacity:0;pointer-events:none;transform:translateY(12px);}",
    "#aim-header{background:" + NAVY + ";color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px;flex-shrink:0;}",
    "#aim-header-avatar{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;}",
    "#aim-header-title{flex:1;font-size:14px;font-weight:600;line-height:1.3;}",
    "#aim-header-sub{font-size:11px;opacity:.75;margin-top:2px;}",
    "#aim-close{background:none;border:none;color:#fff;cursor:pointer;font-size:20px;line-height:1;padding:0;margin-left:auto;opacity:.8;}",
    "#aim-close:hover{opacity:1;}",
    "#aim-messages{flex:1;overflow-y:auto;padding:12px 12px 4px;display:flex;flex-direction:column;gap:10px;}",
    "#aim-messages::-webkit-scrollbar{width:4px;}",
    "#aim-messages::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px;}",
    ".aim-msg{max-width:82%;padding:10px 13px;border-radius:12px;font-size:13px;line-height:1.5;word-break:break-word;}",
    ".aim-msg.aim-user{background:" + NAVY + ";color:#fff;align-self:flex-end;border-bottom-right-radius:3px;}",
    ".aim-msg.aim-bot{background:#f0f2f7;color:#1a1a1a;align-self:flex-start;border-bottom-left-radius:3px;}",
    ".aim-msg.aim-typing{color:#888;font-style:italic;}",
    "#aim-footer{padding:10px 12px;border-top:1px solid #eee;display:flex;gap:8px;flex-shrink:0;}",
    "#aim-input{flex:1;border:1px solid #ddd;border-radius:8px;padding:9px 12px;font-size:13px;font-family:inherit;outline:none;resize:none;height:38px;max-height:100px;overflow-y:auto;line-height:1.4;}",
    "#aim-input:focus{border-color:" + NAVY + ";}",
    "#aim-send{background:" + NAVY + ";color:#fff;border:none;border-radius:8px;width:38px;height:38px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;}",
    "#aim-send:hover{background:#1a2d5a;}",
    "#aim-send:disabled{opacity:.4;cursor:default;}",
    "@media(max-width:420px){#aim-window{width:calc(100vw - 16px);right:8px;bottom:80px;}}",
  ].join("");
  document.head.appendChild(style);

  // ── HTML ──────────────────────────────────────────────────────────────────
  var btn = document.createElement("button");
  btn.id = "aim-btn";
  btn.title = "Менеджер";
  btn.innerHTML =
    '<svg width="26" height="26" fill="none" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" fill="white"/></svg>';

  var win = document.createElement("div");
  win.id = "aim-window";
  win.className = "aim-hidden";
  win.innerHTML = [
    '<div id="aim-header">',
    '  <div id="aim-header-avatar"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="white"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>',
    '  <div><div id="aim-header-title">Менеджер Авангард</div><div id="aim-header-sub">Онлайн • Отвечает за секунды</div></div>',
    '  <button id="aim-close">&#x2715;</button>',
    "</div>",
    '<div id="aim-messages"></div>',
    '<div id="aim-footer">',
    '  <textarea id="aim-input" placeholder="Напишите вопрос..." rows="1"></textarea>',
    '  <button id="aim-send"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
    "</div>",
  ].join("");

  document.body.appendChild(btn);
  document.body.appendChild(win);

  var messagesEl = document.getElementById("aim-messages");
  var inputEl = document.getElementById("aim-input");
  var sendBtn = document.getElementById("aim-send");

  // ── Markdown → HTML ───────────────────────────────────────────────────────
  function parseMarkdown(text) {
    return text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#90cdf4;text-decoration:underline;">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function renderMessage(role, text) {
    var div = document.createElement("div");
    div.className = "aim-msg " + (role === "user" ? "aim-user" : "aim-bot");
    if (role === "assistant") {
      div.innerHTML = parseMarkdown(text);
    } else {
      div.textContent = text;
    }
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  var typingEl = null;

  function renderAll(msgs, typing) {
    messagesEl.innerHTML = "";
    typingEl = null;
    if (msgs.length === 0) {
      renderMessage("assistant", "Здравствуйте! Я менеджер компании Авангард. Помогу подобрать спецодежду, СИЗ или рабочую обувь. Чем могу помочь?");
    } else {
      msgs.forEach(function (m) { renderMessage(m.role, m.content); });
    }
    if (typing) {
      typingEl = document.createElement("div");
      typingEl.className = "aim-msg aim-bot aim-typing";
      typingEl.textContent = "Печатает...";
      messagesEl.appendChild(typingEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
    sendBtn.disabled = typing;
  }

  // Синхронизация виджета с общим состоянием
  window.addEventListener("aim:update", function (e) {
    renderAll(e.detail.messages, e.detail.isTyping);
  });

  renderAll(messages, false);

  // ── Toggle ────────────────────────────────────────────────────────────────
  var isOpen = false;
  function toggleWindow() {
    isOpen = !isOpen;
    if (isOpen) {
      win.classList.remove("aim-hidden");
      inputEl.focus();
      messagesEl.scrollTop = messagesEl.scrollHeight;
    } else {
      win.classList.add("aim-hidden");
    }
  }

  btn.addEventListener("click", toggleWindow);
  document.getElementById("aim-close").addEventListener("click", toggleWindow);

  // ── Send ──────────────────────────────────────────────────────────────────
  function handleSend() {
    var text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";
    inputEl.style.height = "38px";
    sendMessageShared(text);
  }

  sendBtn.addEventListener("click", handleSend);
  inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  });
  inputEl.addEventListener("input", function () {
    this.style.height = "38px";
    this.style.height = Math.min(this.scrollHeight, 100) + "px";
  });

  // Сигнал о готовности — инлайн-блок может инициализироваться
  window.dispatchEvent(new CustomEvent("aim:ready", { detail: { messages: messages.slice(), isTyping: false } }));
})();
