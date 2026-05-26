"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  src: string;
  href: string;
}

const slides: Slide[] = [
  { src: "/images/hero/slide-1.webp", href: "/catalog/specodezhda/letnyaya/" },
  { src: "/images/hero/slide-2.webp", href: "#" },
  { src: "/images/hero/slide-3.webp", href: "/catalog/specodezhda/trikotazh/" },
  { src: "/images/hero/slide-4.webp", href: "/catalog/siz/" },
  { src: "/images/hero/slide-5.webp", href: "/catalog/specodezhda/zashchitnaya/" },
  { src: "/images/hero/slide-6.webp", href: "#" },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        maxWidth: "1240px",
        margin: "0 auto",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          height: "438px",
        }}
      >
        {slides.map((slide, index) => (
          <Link
            key={slide.src}
            href={slide.href}
            style={{
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentSlide ? 1 : 0,
              transition: "opacity 0.6s ease-in-out",
              pointerEvents: index === currentSlide ? "auto" : "none",
            }}
            aria-hidden={index !== currentSlide}
            tabIndex={index === currentSlide ? 0 : -1}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={slide.src}
                alt={`Slide ${index + 1}`}
                fill
                unoptimized
                style={{ objectFit: "cover" }}
                priority={index === 0}
              />
            </div>
          </Link>
        ))}

        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "20px",
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            zIndex: 10,
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "white",
                opacity: index === currentSlide ? 1 : 0.5,
                border: index === currentSlide ? "none" : "1px solid white",
                cursor: "pointer",
                padding: 0,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
