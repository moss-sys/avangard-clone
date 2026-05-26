import type { Metadata } from "next";
import Script from "next/script";
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
        {/* AI Manager widget — клиент вставляет эти 2 строки на свой сайт */}
        <Script id="aim-config" strategy="beforeInteractive">
          {`window.AIManagerConfig = { token: "avangard-demo" };`}
        </Script>
        <Script src="/avangard-clone/widget.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
