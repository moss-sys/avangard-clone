"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { chatV2, SUPA, ANON, PROJECT_ID, type Card, type ChatState } from "@/lib/chatV2";

export const NAVY = "#2C3E6F";
export const FONT = "Calibri, Tahoma, sans-serif";

export const WELCOME =
  "Здравствуйте! Я менеджер компании Авангард. Помогу подобрать спецодежду с актуальными ценами для вашего города. Подскажите, в каком городе вы находитесь?";
export const WELCOME_CHIPS = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Краснодар"];

const fmt = (n: number | null | undefined) => (n == null ? "" : n.toLocaleString("ru-RU"));

export function useChatV2(): ChatState {
  return useSyncExternalStore(chatV2.subscribe, chatV2.getState, chatV2.getState);
}

export function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "85%",
        alignSelf: role === "user" ? "flex-end" : "flex-start",
        padding: "10px 14px",
        borderRadius: role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
        background: role === "user" ? NAVY : "#f0f2f7",
        color: role === "user" ? "#fff" : "#1a1a1a",
        fontSize: 13, lineHeight: 1.5, wordBreak: "break-word", fontFamily: FONT, whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </div>
  );
}

export function Chips({ items, catalogUrl }: { items: string[]; catalogUrl?: string }) {
  if (!items.length && !catalogUrl) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((s, i) => (
        <button
          key={i}
          onClick={() => chatV2.send(s)}
          style={{
            padding: "7px 13px", borderRadius: 999, border: "1px solid #d8dce8", background: "#fff",
            color: NAVY, fontSize: 13, cursor: "pointer", fontFamily: FONT,
          }}
        >
          {s}
        </button>
      ))}
      {catalogUrl && (
        <a
          href={catalogUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "7px 13px", borderRadius: 999, border: "1px solid #d8dce8", background: "#fff",
            color: "#555", fontSize: 13, fontFamily: FONT, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
          }}
        >
          Смотреть товары на сайте <span style={{ fontSize: 12 }}>↗</span>
        </a>
      )}
    </div>
  );
}

export function ProductCard({ c, compact }: { c: Card; compact?: boolean }) {
  const params = Object.entries(c.params ?? {}).filter(([, v]) => v);
  const cur = c.currency ?? "₽";
  return (
    <div
      onClick={() => window.open(c.url, "_blank", "noopener")}
      role="link"
      title="Открыть страницу товара"
      style={{ display: "flex", gap: 10, border: "1px solid #e8eaf2", borderRadius: 12, padding: 10, background: "#fff", maxWidth: "97%", cursor: "pointer", transition: "box-shadow .15s" }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 3px 14px rgba(44,62,111,.14)")}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      {c.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.image} alt={c.name} style={{ width: compact ? 62 : 84, height: compact ? 80 : 106, objectFit: "cover", borderRadius: 8, background: "#f5f5f5", flexShrink: 0 }} />
      ) : (
        <div style={{ width: compact ? 62 : 84, height: compact ? 80 : 106, borderRadius: 8, background: "#f0f2f7", flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0, fontFamily: FONT }}>
        <div style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: "#111", marginBottom: 3 }}>{c.name}</div>
        {c.price_on_request ? (
          <div style={{ color: "#b45309", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Цена по запросу</div>
        ) : (
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: "#16803c", fontSize: compact ? 16 : 19, fontWeight: 800 }}>
              {fmt(c.price_wholesale)} {cur}
            </span>
            <span style={{ color: "#888", fontSize: 11, marginLeft: 7 }}>
              розн {fmt(c.price_retail)} {cur} · {c.price_city}
            </span>
          </div>
        )}
        {c.article && <div style={{ color: "#999", fontSize: 11, marginBottom: 4 }}>Артикул: {c.article}</div>}
        {!compact && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", marginBottom: 7 }}>
            {params.map(([k, v]) => (
              <span key={k} style={{ fontSize: 12, color: "#444" }}>
                <span style={{ color: "#999" }}>{k}:</span> {v}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginTop: compact ? 4 : 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); chatV2.sendDetail(c); }}
            style={{ padding: "5px 12px", borderRadius: 7, background: NAVY, color: "#fff", border: "none", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: FONT }}
          >
            Подробнее
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); chatV2.openKP(c); }}
            style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${NAVY}`, background: "transparent", color: NAVY, fontSize: 12, cursor: "pointer", fontFamily: FONT }}
          >
            Запросить КП
          </button>
        </div>
      </div>
    </div>
  );
}

export function KPForm() {
  const { kpCard } = useChatV2();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSent(false);
  }, [kpCard]);

  if (!kpCard) return null;
  const canSubmit = name.trim() && (phone.trim() || email.trim());

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    try {
      await fetch(`${SUPA}/rest/v1/leads_v2`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}`, Prefer: "return=minimal" },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          session_id: chatV2.sessionId,
          name,
          phone: phone || null,
          email: email || null,
          note: note || null,
          product_name: kpCard.name,
          product_url: kpCard.url,
        }),
      });
      setSent(true);
    } catch {
      /* noop */
    }
    setBusy(false);
  };

  const inp: React.CSSProperties = {
    width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #ddd",
    fontSize: 13, fontFamily: FONT, outline: "none", color: "#333", boxSizing: "border-box",
  };

  if (sent)
    return (
      <div style={{ border: "1px solid #bbe7c8", background: "#f2fbf5", borderRadius: 12, padding: 13, fontFamily: FONT, maxWidth: "97%" }}>
        <div style={{ color: "#16803c", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Заявка отправлена</div>
        <div style={{ color: "#555", fontSize: 13 }}>Менеджер свяжется с вами по «{kpCard.name}».</div>
        <button onClick={chatV2.closeKP} style={{ marginTop: 8, padding: "7px 13px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#555", fontSize: 13, cursor: "pointer", fontFamily: FONT }}>
          Вернуться к диалогу
        </button>
      </div>
    );

  return (
    <div style={{ border: `1px solid ${NAVY}33`, background: "#f8f9fd", borderRadius: 12, padding: 13, fontFamily: FONT, maxWidth: "97%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Запросить КП</div>
        <button onClick={chatV2.closeKP} title="Отменить" style={{ background: "none", border: "none", color: "#999", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>
          ×
        </button>
      </div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 9 }}>{kpCard.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ФИО *" style={inp} />
        <div style={{ display: "flex", gap: 7 }}>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" style={inp} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inp} />
        </div>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Примечание (необязательно)" rows={2} style={{ ...inp, resize: "vertical" }} />
        <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={submit}
            disabled={busy || !canSubmit}
            style={{
              padding: "8px 16px", borderRadius: 8, border: "none", background: NAVY, color: "#fff",
              fontSize: 13, fontWeight: 600, cursor: canSubmit ? "pointer" : "default", opacity: canSubmit ? 1 : 0.5, fontFamily: FONT,
            }}
          >
            {busy ? "Отправка..." : "Отправить"}
          </button>
          <button onClick={chatV2.closeKP} style={{ padding: "8px 13px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#777", fontSize: 13, cursor: "pointer", fontFamily: FONT }}>
            Отмена
          </button>
          <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>Телефон или email</span>
        </div>
      </div>
    </div>
  );
}

/** Общая лента сообщений (для блока на странице и плавающего окна).
 *  fill — занять всю высоту контейнера (плавающее окно); иначе ограничение для блока на странице. */
export function MessagesV2({ compact, fill }: { compact?: boolean; fill?: boolean }) {
  const { msgs, isTyping, kpCard } = useChatV2();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, isTyping, kpCard]);

  const isEmpty = msgs.length === 0;

  return (
    <div
      ref={boxRef}
      style={{
        padding: compact ? "12px" : "16px",
        flex: 1,
        minHeight: fill ? 0 : "260px",
        maxHeight: fill ? undefined : "560px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {isEmpty && (
        <>
          <Bubble role="assistant">{WELCOME}</Bubble>
          <Chips items={WELCOME_CHIPS} />
        </>
      )}
      {msgs.map((m, i) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Bubble role={m.role}>{m.text}</Bubble>
          {m.products && m.products.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {m.products.map((c, j) => (
                <ProductCard key={j} c={c} compact={compact} />
              ))}
            </div>
          )}
          {((m.suggestions && m.suggestions.length > 0) || m.catalogUrl) && i === msgs.length - 1 && !isTyping && (
            <Chips items={m.suggestions ?? []} catalogUrl={m.catalogUrl} />
          )}
        </div>
      ))}
      {isTyping && (
        <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: "12px 12px 12px 3px", background: "#f0f2f7", fontSize: 13, color: "#888", fontStyle: "italic", fontFamily: FONT }}>
          Подбираю...
        </div>
      )}
      <KPForm />
    </div>
  );
}

/** Общее поле ввода. */
export function InputV2({ placeholder }: { placeholder?: string }) {
  const { isTyping } = useChatV2();
  const [input, setInput] = useState("");
  const taRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    chatV2.send(input);
    setInput("");
    if (taRef.current) taRef.current.style.height = "38px";
  };

  return (
    <div style={{ padding: "10px 12px", borderTop: "1px solid #eee", display: "flex", gap: 8, alignItems: "flex-end", background: "#fff" }}>
      <textarea
        ref={taRef}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.height = "38px";
          e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder={placeholder ?? "Например: летний костюм мужской..."}
        rows={1}
        style={{
          flex: 1, border: "1px solid #ddd", borderRadius: 8, padding: "9px 12px", fontSize: 13,
          fontFamily: FONT, outline: "none", resize: "none", height: 38, maxHeight: 100,
          lineHeight: 1.4, overflowY: "auto", color: "#333",
        }}
        onFocus={(e) => (e.target.style.borderColor = NAVY)}
        onBlur={(e) => (e.target.style.borderColor = "#ddd")}
      />
      <button
        onClick={handleSend}
        disabled={isTyping || !input.trim()}
        style={{
          background: NAVY, color: "#fff", border: "none", borderRadius: 8, width: 38, height: 38,
          cursor: isTyping || !input.trim() ? "default" : "pointer", opacity: isTyping || !input.trim() ? 0.4 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "opacity .15s",
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
          <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
