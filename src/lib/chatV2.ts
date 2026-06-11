"use client";

// Общее состояние v2-чата: блок на странице и плавающий виджет показывают ОДИН диалог
// (аналог window._AIMState у виджета v1, но в виде маленького стора).

export const SUPA = "https://cucmenaduvwuchjakxfa.supabase.co";
export const ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1Y21lbmFkdXZ3dWNoamFreGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTYzNjMsImV4cCI6MjA5NDA5MjM2M30.7gjW5Qwl5kYHZlSgydJ40CSHbEk4DGua7O5FvSYNfk4";
export const PROJECT_ID = "24fb0dde-db80-4b86-b827-6a264ecd2c8c";

export interface Card {
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

export interface Msg {
  role: "user" | "assistant";
  text: string;
  products?: Card[];
  suggestions?: string[];
  catalogUrl?: string;
}

export interface ChatState {
  msgs: Msg[];
  isTyping: boolean;
  kpCard: Card | null;
}

let state: ChatState = { msgs: [], isTyping: false, kpCard: null };
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

function set(partial: Partial<ChatState>) {
  state = { ...state, ...partial };
  emit();
}

const sessionId = "land-v2-" + Math.random().toString(36).slice(2);
let shown: string[] = [];

async function send(text: string, detailArticle?: string | null) {
  const t = text.trim();
  if (!t || state.isTyping) return;
  const isMore = /^показать ещ/i.test(t);
  const history = [
    ...state.msgs.map((m) => ({ role: m.role, content: m.text })),
    { role: "user", content: t },
  ];
  set({ msgs: [...state.msgs, { role: "user", text: t }], isTyping: true, kpCard: null });
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
        session_id: sessionId,
        exclude: isMore ? shown : undefined,
        detail_article: detailArticle || undefined,
        messages: history,
      }),
    });
    const data = await resp.json();
    const arts: string[] = (data.products ?? [])
      .map((p: Card) => p.article)
      .filter(Boolean) as string[];
    shown = isMore ? [...shown, ...arts] : arts;
    set({
      msgs: [
        ...state.msgs,
        {
          role: "assistant",
          text: data.reply ?? "",
          products: data.products ?? [],
          suggestions: data.suggestions ?? [],
          catalogUrl: data.catalog_url,
        },
      ],
      isTyping: false,
    });
  } catch {
    set({
      msgs: [
        ...state.msgs,
        { role: "assistant", text: "Не получилось обработать запрос. Попробуйте ещё раз.", products: [], suggestions: [] },
      ],
      isTyping: false,
    });
  }
}

export const chatV2 = {
  getState: () => state,
  subscribe: (fn: () => void) => {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  send: (text: string) => send(text),
  /** «Подробнее» по товару: описание + все характеристики с сайта */
  sendDetail: (card: Card) => send(`Подробнее: ${card.name}`, card.article),
  openKP: (card: Card) => set({ kpCard: card }),
  closeKP: () => set({ kpCard: null }),
  sessionId,
};
