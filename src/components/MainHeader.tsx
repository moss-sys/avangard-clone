"use client";

import Image from "next/image";

function HamburgerIcon() {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <rect y="0" width="18" height="2" rx="1" fill="white" />
      <rect y="6" width="18" height="2" rx="1" fill="white" />
      <rect y="12" width="18" height="2" rx="1" fill="white" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, cursor: "pointer" }}
    >
      <rect
        x="3"
        y="12"
        width="4"
        height="9"
        stroke="#2C3E6F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y="7"
        width="4"
        height="14"
        stroke="#2C3E6F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect
        x="17"
        y="3"
        width="4"
        height="18"
        stroke="#2C3E6F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MainHeader() {
  const outlineButtonStyle: React.CSSProperties = {
    backgroundColor: "white",
    color: "#2C3E6F",
    border: "1.5px solid #2C3E6F",
    fontSize: "13px",
    fontFamily: "Calibri, Tahoma, sans-serif",
    textTransform: "uppercase",
    width: "148px",
    height: "36px",
    cursor: "pointer",
    borderRadius: "0",
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "10px 20px",
          height: "58px",
        }}
      >
        {/* 1. Logo */}
        <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/images/logo.svg"
            alt="Авангард"
            width={191}
            height={34}
            unoptimized
          />
        </div>

        {/* 2. КАТАЛОГ button */}
        <button
          style={{
            backgroundColor: "#2C3E6F",
            color: "white",
            fontSize: "13px",
            fontFamily: "Calibri, Tahoma, sans-serif",
            padding: "0 14px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "none",
            cursor: "pointer",
            borderRadius: "0",
            flexShrink: 0,
          }}
        >
          <HamburgerIcon />
          КАТАЛОГ
        </button>

        {/* 3. Search box */}
        <div
          style={{
            backgroundColor: "#FAFAFA",
            border: "1px solid #D9D9D9",
            height: "41px",
            width: "215px",
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <input
            type="text"
            placeholder="Поиск"
            style={{
              border: "none",
              background: "transparent",
              flex: 1,
              fontSize: "14px",
              outline: "none",
              fontFamily: "Calibri, Tahoma, sans-serif",
              color: "#333",
            }}
          />
          <Image
            src="/images/icon/search-blue.png"
            width={17}
            height={17}
            alt="Поиск"
            unoptimized
            style={{ flexShrink: 0, cursor: "pointer" }}
          />
        </div>

        {/* 4. Phone/email block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "black",
              whiteSpace: "nowrap",
              fontFamily: "Calibri, Tahoma, sans-serif",
            }}
          >
            +7 (499) 500-40-01
          </span>
          <a
            href="mailto:inform@avangard-sp.ru"
            style={{
              fontSize: "12px",
              color: "#2C3E6F",
              textDecoration: "none",
              fontFamily: "Calibri, Tahoma, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            inform@avangard-sp.ru
          </a>
        </div>

        {/* 5. Spacer */}
        <div style={{ flex: 1 }} />

        {/* 6. ЗАПРОСИТЬ ПРАЙС button */}
        <button style={outlineButtonStyle}>ЗАПРОСИТЬ ПРАЙС</button>

        {/* 7. ОТПРАВИТЬ ЗАЯВКУ button */}
        <button style={outlineButtonStyle}>ОТПРАВИТЬ ЗАЯВКУ</button>

        {/* 8. Chart/comparison icon */}
        <ChartIcon />

        {/* 9. Cart with badge */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <Image
            src="/images/cart-icon.png"
            width={24}
            height={24}
            alt="Корзина"
            unoptimized
            style={{ cursor: "pointer", display: "block" }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              backgroundColor: "#2C3E6F",
              color: "white",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Calibri, Tahoma, sans-serif",
              fontWeight: 600,
            }}
          >
            0
          </div>
        </div>
      </div>
    </div>
  );
}
