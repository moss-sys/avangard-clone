import Image from "next/image";

const banners = [
  {
    img: "/images/categories/letnyaya.jpg",
    text: "ЛЕТНИЙ КОСТЮМ «ПАЛЕРМО»",
    href: "#",
  },
  {
    img: "/images/categories/zashchitnaya.jpg",
    text: "Ботинки «Энфорсер 101 Шорт»",
    href: "#",
  },
  {
    img: "/images/categories/novinki.jpg",
    text: "СРЕДСТВА ЗАЩИТЫ ОРГАНОВ ДЫХАНИЯ",
    href: "#",
  },
];

export function PromoBanners() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px",
        display: "flex",
        gap: "8px",
      }}
    >
      {banners.map((banner) => (
        <a
          key={banner.text}
          href={banner.href}
          style={{
            flex: 1,
            height: "200px",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
            display: "block",
          }}
        >
          <Image
            src={banner.img}
            alt={banner.text}
            fill
            unoptimized
            style={{ objectFit: "cover", objectPosition: "center" }}
          />

          <span
            style={{
              position: "absolute",
              bottom: "12px",
              left: "12px",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              fontSize: "14px",
              padding: "4px 8px",
              zIndex: 1,
            }}
          >
            {banner.text}
          </span>
        </a>
      ))}
    </div>
  );
}
