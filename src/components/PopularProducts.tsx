import Image from "next/image";

const products = [
  {
    name: 'Полуботинки мужские рабочие летние "Легион", МП',
    img: "/images/products/legion.jpg",
    price: "2 204",
    article: "077115",
    href: "#",
  },
  {
    name: 'Костюм мужской рабочий летний для ИТР "Виват"',
    img: "/images/products/vivat.jpg",
    price: "5 975",
    article: "171868",
    href: "#",
  },
  {
    name: 'Костюм мужской "Джокер" NEW',
    img: "/images/products/djoker.jpg",
    price: "4 400",
    article: "177619",
    href: "#",
  },
  {
    name: 'Ботинки с высоким берцем "Корвет-2", КП',
    img: "/images/products/korvet.jpg",
    price: "3 801",
    article: "176484",
    href: "#",
  },
];

export function PopularProducts() {
  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px 32px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          marginBottom: "16px",
          margin: "0 0 16px 0",
        }}
      >
        Популярные товары
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {products.map((product) => (
          <a
            key={product.article}
            href={product.href}
            style={{
              border: "0.75px solid #C4C4C4",
              width: "100%",
              height: "auto",
              padding: "5px 10px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              position: "relative",
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {/* Russian flag badge */}
            <img
              src="/images/rf-flag.jpg"
              width={28}
              height={18}
              alt="Российский флаг"
              style={{
                position: "absolute",
                top: 5,
                left: 5,
                objectFit: "cover",
              }}
            />

            {/* Product image */}
            <div
              style={{
                width: "100%",
                height: "200px",
                position: "relative",
                paddingTop: "20px",
                flexShrink: 0,
              }}
            >
              <Image
                src={product.img}
                alt={product.name}
                fill
                unoptimized
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Product name */}
            <p
              style={{
                fontSize: "14px",
                color: "black",
                lineHeight: 1.4,
                marginTop: "8px",
                margin: "8px 0 0 0",
                flexGrow: 1,
              }}
            >
              {product.name}
            </p>

            {/* Price row */}
            <p
              style={{
                fontSize: "14px",
                margin: "4px 0 0 0",
              }}
            >
              <span style={{ color: "#2C3E6F" }}>{product.price}</span>
              <span style={{ color: "#2C3E6F" }}> руб. </span>
              <span style={{ color: "#2C3E6F", fontWeight: "bold" }}>
                (Опт)
              </span>
            </p>

            {/* Article */}
            <p
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "2px",
                margin: "2px 0 0 0",
              }}
            >
              Арт. {product.article}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
