"use client";

import { useState } from "react";
import { MessagesV2, InputV2, NAVY, FONT } from "@/components/ChatV2Parts";

/** Плавающий чат v2 (правый нижний угол) — тот же диалог, что и в блоке на странице. */
export function FloatingChatV2() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Окно */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            width: "min(390px, calc(100vw - 16px))",
            height: "min(580px, calc(100vh - 120px))",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,.18)",
            display: "flex",
            flexDirection: "column",
            zIndex: 99999,
            overflow: "hidden",
          }}
        >
          {/* Шапка */}
          <div style={{ background: NAVY, color: "#fff", padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" fill="white" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.3, fontFamily: FONT }}>
              Менеджер Авангард
              <div style={{ fontSize: 11, fontWeight: 400, opacity: 0.85 }}>AI · Подбор товаров и цены по городам</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: 0, marginLeft: "auto", opacity: 0.8 }}
            >
              ×
            </button>
          </div>

          {/* Лента (общий диалог со страничным блоком) */}
          <MessagesV2 compact />

          {/* Ввод */}
          <InputV2 placeholder="Задайте вопрос..." />
        </div>
      )}

      {/* Кнопка */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Чат с AI-менеджером"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: NAVY,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99998,
          transition: "transform .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6 6 18" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" fill="white" />
          </svg>
        )}
      </button>
    </>
  );
}
