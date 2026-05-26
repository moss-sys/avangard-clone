"use client";

export function TopNavBar() {
  const navLinks: { label: string; hasDropdown?: boolean }[] = [
    { label: "О компании", hasDropdown: true },
    { label: "Доставка" },
    { label: "Оплата" },
    { label: "Авангард Лайф", hasDropdown: true },
    { label: "Клиентам", hasDropdown: true },
    { label: "Академия" },
    { label: "Контакты" },
  ];

  const linkStyle: React.CSSProperties = {
    color: "#EBEBEB",
    fontSize: "13px",
    fontFamily: "Calibri, Tahoma, sans-serif",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "3px",
  };

  const underlinedLinkStyle: React.CSSProperties = {
    ...linkStyle,
    textDecoration: "underline",
  };

  return (
    <div
      style={{
        backgroundColor: "#2C3E6F",
        height: "40px",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {/* Left: navigation links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          {navLinks.map((link) => (
            <a key={link.label} href="#" style={linkStyle}>
              {link.label}
              {link.hasDropdown && (
                <span style={{ fontSize: "10px", marginLeft: "2px" }}>▾</span>
              )}
            </a>
          ))}
        </nav>

        {/* Right: region, phone link, login */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            style={{
              color: "#EBEBEB",
              fontSize: "13px",
              fontFamily: "Calibri, Tahoma, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Ваш регион: Москва
          </span>

          <a href="#" style={underlinedLinkStyle}>
            Телефоны центров продаж
          </a>

          <svg
            width="18"
            height="21"
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <circle
              cx="9"
              cy="6"
              r="5"
              stroke="#EBEBEB"
              strokeWidth="1.5"
            />
            <path
              d="M1 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
              stroke="#EBEBEB"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <a href="#" style={linkStyle}>
            Войти
          </a>
        </div>
      </div>
    </div>
  );
}
