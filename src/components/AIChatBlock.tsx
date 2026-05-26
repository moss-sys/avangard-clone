"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#2C3E6F";

interface Msg { role: "user" | "assistant"; content: string; }

function parseMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#2C3E6F;text-decoration:underline;">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

const WELCOME = "Здравствуйте! Я менеджер компании Авангард. Помогу подобрать спецодежду, СИЗ или рабочую обувь. Чем могу помочь?";

declare global {
  interface Window {
    _AIMState?: {
      messages: Msg[];
      isTyping: boolean;
      sendMessage: (text: string) => Promise<void>;
    };
  }
}

export function AIChatBlock() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Синхронизация с виджетом через общий канал событий
  useEffect(() => {
    const sync = (e: Event) => {
      const detail = (e as CustomEvent).detail as { messages: Msg[]; isTyping: boolean };
      setMsgs(detail.messages);
      setIsTyping(detail.isTyping);
    };

    window.addEventListener("aim:update", sync);
    window.addEventListener("aim:ready", sync);

    // Если виджет уже готов — читаем состояние немедленно
    if (window._AIMState) {
      setMsgs(window._AIMState.messages);
      setIsTyping(window._AIMState.isTyping);
    }

    return () => {
      window.removeEventListener("aim:update", sync);
      window.removeEventListener("aim:ready", sync);
    };
  }, []);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, isTyping]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isTyping || !window._AIMState) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "38px";
    window._AIMState.sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "38px";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  };

  const displayMsgs = msgs.length === 0 ? [{ role: "assistant" as const, content: WELCOME }] : msgs;

  return (
    <section style={{ backgroundColor: "#f7f8fc", padding: "48px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Заголовок */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#111", margin: 0, fontFamily: "Calibri, Tahoma, sans-serif" }}>
            Остались вопросы?
          </h2>
          <p style={{ fontSize: "15px", color: "#888", marginTop: "6px", fontFamily: "Calibri, Tahoma, sans-serif" }}>
            Спросите AI — ответит за несколько секунд
          </p>
        </div>

        {/* Карточка чата */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
          maxWidth: "680px",
          margin: "0 auto",
        }}>
          {/* Шапка */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              background: "#fff3e0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" fill={NAVY} />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: "14px", color: "#111", fontFamily: "Calibri, Tahoma, sans-serif" }}>
                Менеджер Авангард
              </div>
              <div style={{ fontSize: "12px", color: "#999", marginTop: "1px", fontFamily: "Calibri, Tahoma, sans-serif" }}>
                AI · Отвечает мгновенно
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: "13px", color: "#555", fontFamily: "Calibri, Tahoma, sans-serif" }}>онлайн</span>
            </div>
          </div>

          {/* Сообщения */}
          <div ref={messagesContainerRef} style={{
            padding: "16px",
            minHeight: "220px",
            maxHeight: "340px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
            {displayMsgs.map((m, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "82%",
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  padding: "10px 14px",
                  borderRadius: m.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                  background: m.role === "user" ? NAVY : "#f0f2f7",
                  color: m.role === "user" ? "#fff" : "#1a1a1a",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  wordBreak: "break-word",
                  fontFamily: "Calibri, Tahoma, sans-serif",
                }}
              >
                {m.role === "assistant"
                  ? <span dangerouslySetInnerHTML={{ __html: parseMarkdown(m.content) }} />
                  : m.content}
              </div>
            ))}
            {isTyping && (
              <div style={{
                alignSelf: "flex-start", padding: "10px 14px", borderRadius: "12px 12px 12px 3px",
                background: "#f0f2f7", fontSize: "13px", color: "#888", fontStyle: "italic",
                fontFamily: "Calibri, Tahoma, sans-serif",
              }}>
                Печатает...
              </div>
            )}
          </div>

          {/* Ввод */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid #eee",
            display: "flex",
            gap: "8px",
            alignItems: "flex-end",
          }}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Задайте любой вопрос об ассортименте..."
              rows={1}
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "9px 12px",
                fontSize: "13px",
                fontFamily: "Calibri, Tahoma, sans-serif",
                outline: "none",
                resize: "none",
                height: "38px",
                maxHeight: "100px",
                lineHeight: "1.4",
                overflowY: "auto",
                color: "#333",
              }}
              onFocus={e => (e.target.style.borderColor = NAVY)}
              onBlur={e => (e.target.style.borderColor = "#ddd")}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              style={{
                background: NAVY,
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                width: "38px",
                height: "38px",
                cursor: isTyping || !input.trim() ? "default" : "pointer",
                opacity: isTyping || !input.trim() ? 0.4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "opacity .15s",
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
