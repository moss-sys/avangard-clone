"use client";

import { useEffect, useRef, useState } from "react";

const NAVY = "#2C3E6F";
const FONT = "Calibri, Tahoma, sans-serif";
const SUPA = "https://cucmenaduvwuchjakxfa.supabase.co";
const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1Y21lbmFkdXZ3dWNoamFreGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTYzNjMsImV4cCI6MjA5NDA5MjM2M30.7gjW5Qwl5kYHZlSgydJ40CSHbEk4DGua7O5FvSYNfk4";
const PROJECT_ID = "24fb0dde-db80-4b86-b827-6a264ecd2c8c";

interface Card {
  name: string;
  image: string | null;
  url: string;
  article: string | null;
  price_retail: number | null;
  price_wholesale: number | null;
  price_city: string;
  currency?: string;
  price_on_request: boolean;
  params: Record<string, string | null>;
}

interface Msg {
  role: "user" | "assistant";
  text: string;
  products?: Card[];
  suggestions?: string[];
  catalogUrl?: string;
}

const WELCOME =
  "Здравствуйте! Я менеджер компании Авангард. Помогу подобрать спецодежду с актуальными ценами для вашего города. Подскажите, в каком городе вы находитесь?";
const WELCOME_CHIPS = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Новосибирск", "Краснодар"];

const fmt = (n: number | null | undefined) => (n == null ? "" : n.toLocaleString("ru-RU"));

export function AIChatBlockV2() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [kpCard, setKpCard] = useState<Card | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = useRef("land-v2-" + Math.random().toString(36).slice(2));
  const shownRef = useRef<string[]>([]);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, isTyping, kpCard]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || isTyping) return;
    const isMore = /^показать ещ/i.test(t);
    const history = [
      ...msgs.map((m) => ({ role: m.role, content: m.text })),
      { role: "user", content: t },
    ];
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setKpCard(null);
    if (taRef.current) taRef.current.style.height = "38px";
    setIsTyping(true);
    try {
      const resp = await fetch(`${SUPA}/functions/v1/chat-assistant-v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANON}`,
          apikey: ANON,
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          session_id: sessionId.current,
          exclude: isMore ? shownRef.current : undefined,
          messages: history,
        }),
      });
      const data = await resp.json();
      const arts: string[] = (data.products ?? [])
        .map((p: Card) => p.article)
        .filter(Boolean) as string[];
      shownRef.current = isMore ? [...shownRef.current, ...arts] : arts;
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          text: data.reply ?? "",
          products: data.products ?? [],
          suggestions: data.suggestions ?? [],
          catalogUrl: data.catalog_url,
        },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: "Не получилось обработать запрос. Попробуйте ещё раз.", products: [], suggestions: [] },
      ]);
    }
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "38px";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  };

  const isEmpty = msgs.length === 0;

  return (
    <section style={{ backgroundColor: "#f7f8fc", padding: "48px 20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#111", margin: 0, fontFamily: FONT }}>
            Остались вопросы?
          </h2>
          <p style={{ fontSize: "15px", color: "#888", marginTop: "6px", fontFamily: FONT }}>
            Спросите AI — подберёт товар и покажет цены для вашего города
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            overflow: "hidden",
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {/* Шапка */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff3e0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" fill={NAVY} />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111", fontFamily: FONT }}>Менеджер Авангард</div>
              <div style={{ fontSize: 12, color: "#999", marginTop: 1, fontFamily: FONT }}>AI · Подбор товаров и цены по городам</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 13, color: "#555", fontFamily: FONT }}>онлайн</span>
            </div>
          </div>

          {/* Сообщения */}
          <div
            ref={boxRef}
            style={{ padding: "16px", minHeight: "260px", maxHeight: "560px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {/* Приветствие (локальное, пока диалог пуст) */}
            {isEmpty && (
              <>
                <Bubble role="assistant">{WELCOME}</Bubble>
                <Chips items={WELCOME_CHIPS} onPick={send} />
              </>
            )}

            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Bubble role={m.role}>{m.text}</Bubble>
                {m.products && m.products.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {m.products.map((c, j) => (
                      <ProductCard key={j} c={c} onKP={() => setKpCard(c)} />
                    ))}
                  </div>
                )}
                {((m.suggestions && m.suggestions.length > 0) || m.catalogUrl) && i === msgs.length - 1 && !isTyping && (
                  <Chips items={m.suggestions ?? []} onPick={send} catalogUrl={m.catalogUrl} />
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: "flex-start", padding: "10px 14px", borderRadius: "12px 12px 12px 3px", background: "#f0f2f7", fontSize: 13, color: "#888", fontStyle: "italic", fontFamily: FONT }}>
                Подбираю...
              </div>
            )}

            {kpCard && (
              <KPForm card={kpCard} sessionId={sessionId.current} onClose={() => setKpCard(null)} />
            )}
          </div>

          {/* Ввод */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid #eee", display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea
              ref={taRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Например: летний костюм мужской, Казань..."
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
              onClick={() => send(input)}
              disabled={isTyping || !input.trim()}
              style={{
                background: NAVY, color: "#fff", border: "none", borderRadius: 8, width: 38, height: 38,
                cursor: isTyping || !input.trim() ? "default" : "pointer",
                opacity: isTyping || !input.trim() ? 0.4 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "opacity .15s",
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

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: "82%",
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

function Chips({ items, onPick, catalogUrl }: { items: string[]; onPick: (s: string) => void; catalogUrl?: string }) {
  if (!items.length && !catalogUrl) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {items.map((s, i) => (
        <button
          key={i}
          onClick={() => onPick(s)}
          style={{
            padding: "7px 14px", borderRadius: 999, border: "1px solid #d8dce8", background: "#fff",
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
            padding: "7px 14px", borderRadius: 999, border: "1px solid #d8dce8", background: "#fff",
            color: "#555", fontSize: 13, fontFamily: FONT, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5,
          }}
        >
          Смотреть товары на сайте <span style={{ fontSize: 12 }}>↗</span>
        </a>
      )}
    </div>
  );
}

function ProductCard({ c, onKP }: { c: Card; onKP: () => void }) {
  const params = Object.entries(c.params ?? {}).filter(([, v]) => v);
  const cur = c.currency ?? "₽";
  return (
    <div style={{ display: "flex", gap: 12, border: "1px solid #e8eaf2", borderRadius: 12, padding: 12, background: "#fff", maxWidth: "96%" }}>
      {c.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.image} alt={c.name} style={{ width: 84, height: 106, objectFit: "cover", borderRadius: 8, background: "#f5f5f5", flexShrink: 0 }} />
      ) : (
        <div style={{ width: 84, height: 106, borderRadius: 8, background: "#f0f2f7", flexShrink: 0 }} />
      )}
      <div style={{ flex: 1, minWidth: 0, fontFamily: FONT }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }}>{c.name}</div>
        {c.price_on_request ? (
          <div style={{ color: "#b45309", fontSize: 14, fontWeight: 700, marginBottom: 6 }}>Цена по запросу</div>
        ) : (
          <div style={{ marginBottom: 6 }}>
            <span style={{ color: "#16803c", fontSize: 19, fontWeight: 800 }}>
              {fmt(c.price_wholesale)} {cur}
            </span>
            <span style={{ color: "#888", fontSize: 12, marginLeft: 8 }}>
              розн {fmt(c.price_retail)} {cur} · {c.price_city}
            </span>
          </div>
        )}
        {c.article && <div style={{ color: "#999", fontSize: 11, marginBottom: 6 }}>Артикул: {c.article}</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 14px", marginBottom: 8 }}>
          {params.map(([k, v]) => (
            <span key={k} style={{ fontSize: 12, color: "#444" }}>
              <span style={{ color: "#999" }}>{k}:</span> {v}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "6px 14px", borderRadius: 7, background: NAVY, color: "#fff", fontSize: 12, textDecoration: "none", fontWeight: 600 }}
          >
            Смотреть на сайте
          </a>
          <button
            onClick={onKP}
            style={{ padding: "6px 14px", borderRadius: 7, border: `1px solid ${NAVY}`, background: "transparent", color: NAVY, fontSize: 12, cursor: "pointer", fontFamily: FONT }}
          >
            Запросить КП
          </button>
        </div>
      </div>
    </div>
  );
}

function KPForm({ card, sessionId, onClose }: { card: Card; sessionId: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const canSubmit = name.trim() && (phone.trim() || email.trim());

  const submit = async () => {
    if (!canSubmit) return;
    setBusy(true);
    try {
      await fetch(`${SUPA}/rest/v1/leads_v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: ANON,
          Authorization: `Bearer ${ANON}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          project_id: PROJECT_ID,
          session_id: sessionId,
          name,
          phone: phone || null,
          email: email || null,
          note: note || null,
          product_name: card.name,
          product_url: card.url,
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
      <div style={{ border: "1px solid #bbe7c8", background: "#f2fbf5", borderRadius: 12, padding: 14, fontFamily: FONT, maxWidth: "96%" }}>
        <div style={{ color: "#16803c", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Заявка отправлена</div>
        <div style={{ color: "#555", fontSize: 13 }}>Менеджер свяжется с вами по «{card.name}».</div>
        <button onClick={onClose} style={{ marginTop: 10, padding: "7px 14px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#555", fontSize: 13, cursor: "pointer", fontFamily: FONT }}>
          Вернуться к диалогу
        </button>
      </div>
    );

  return (
    <div style={{ border: `1px solid ${NAVY}33`, background: "#f8f9fd", borderRadius: 12, padding: 14, fontFamily: FONT, maxWidth: "96%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Запросить КП</div>
        <button onClick={onClose} title="Отменить" style={{ background: "none", border: "none", color: "#999", fontSize: 18, cursor: "pointer", lineHeight: 1 }}>
          ×
        </button>
      </div>
      <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>{card.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="ФИО *" style={inp} />
        <div style={{ display: "flex", gap: 8 }}>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Телефон" style={inp} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inp} />
        </div>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Примечание (необязательно)" rows={2} style={{ ...inp, resize: "vertical" }} />
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={submit}
            disabled={busy || !canSubmit}
            style={{
              padding: "8px 18px", borderRadius: 8, border: "none", background: NAVY, color: "#fff",
              fontSize: 13, fontWeight: 600, cursor: canSubmit ? "pointer" : "default",
              opacity: canSubmit ? 1 : 0.5, fontFamily: FONT,
            }}
          >
            {busy ? "Отправка..." : "Отправить"}
          </button>
          <button onClick={onClose} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #ddd", background: "#fff", color: "#777", fontSize: 13, cursor: "pointer", fontFamily: FONT }}>
            Отмена
          </button>
          <span style={{ fontSize: 11, color: "#999", marginLeft: "auto" }}>Укажите телефон или email</span>
        </div>
      </div>
    </div>
  );
}
