"use client";

import { MessagesV2, InputV2, NAVY, FONT } from "@/components/ChatV2Parts";

/** Блок чата v2 на странице — общий диалог с плавающим виджетом (FloatingChatV2). */
export function AIChatBlockV2() {
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
            display: "flex",
            flexDirection: "column",
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

          <MessagesV2 />
          <InputV2 placeholder="Например: летний костюм мужской, Казань..." />
        </div>
      </div>
    </section>
  );
}
