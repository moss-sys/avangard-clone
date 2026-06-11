import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Рабочая одежда - купить спецодежду в интернет-магазине Авангард оптом и в розницу",
  description: "ООО ГК Авангард Сэйфети занимается производством и реализацией оптовых партий спецодежды, спецобуви, СИЗ на территории России и стран СНГ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
