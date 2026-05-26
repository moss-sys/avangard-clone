import Image from "next/image";

const categories = [
  {
    name: "СПЕЦОДЕЖДА",
    img: "/images/categories/specodezhda.png",
    href: "/catalog/specodezhda/",
  },
  {
    name: "РАБОЧАЯ ОБУВЬ",
    img: "/images/categories/obuv.png",
    href: "/catalog/rabochaya_obuv/",
  },
  {
    name: "СРЕДСТВА ИНДИВИДУАЛЬНОЙ ЗАЩИТЫ",
    img: "/images/categories/siz.png",
    href: "/catalog/siz/",
  },
  {
    name: "ЗАЩИТА РУК",
    img: "/images/categories/zashchita-ruk.png",
    href: "/catalog/zashchita_ruk/",
  },
];

export function CategoryGrid() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div style={{ marginBottom: "12px", fontSize: "16px" }}>
        Лучшие категории{" "}
        <a
          href="#"
          style={{
            textDecoration: "underline",
            color: "inherit",
          }}
        >
          все категории
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
        }}
        className="category-grid"
      >
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={cat.href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              border: "1px solid #d8d8d8",
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              paddingBottom: "16px",
            }}
          >
            {/* Title */}
            <span
              style={{
                display: "block",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "bold",
                color: "#000",
                textTransform: "uppercase",
                padding: "16px 12px 12px",
                lineHeight: "1.3",
              }}
            >
              {cat.name}
            </span>

            {/* Product image centered */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                flexGrow: 1,
              }}
            >
              <Image
                src={cat.img}
                alt={cat.name}
                fill
                unoptimized
                style={{ objectFit: "contain", objectPosition: "center" }}
              />
            </div>

            {/* Подробнее button */}
            <span
              style={{
                display: "inline-block",
                marginTop: "16px",
                backgroundColor: "#2C3E6F",
                color: "white",
                padding: "10px 28px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Подробнее
            </span>
          </a>
        ))}
      </div>

      <style>{`
        .category-grid a:hover span:last-child {
          background-color: #1a2d5a;
        }
        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
