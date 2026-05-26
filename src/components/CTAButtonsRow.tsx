const buttons = [
  "ЗАКАЗАТЬ ПРОДУКЦИЮ",
  "ЗАДАТЬ ВОПРОС ЭКСПЕРТУ",
  "ЗАПРОСИТЬ СЕРТИФИКАТЫ",
  "СКАЧАТЬ КАТАЛОГ",
] as const;

export function CTAButtonsRow() {
  return (
    <>
      <style>{`
        .cta-button {
          background-color: white;
          color: #2C3E6F;
          border: 1.5px solid #2C3E6F;
          font-size: 16px;
          font-weight: 400;
          text-transform: uppercase;
          padding: 11px 20px;
          min-width: 228px;
          cursor: pointer;
          border-radius: 0px;
          font-family: Calibri, Tahoma, sans-serif;
          transition: background-color 0.2s ease, color 0.2s ease;
          line-height: 1.2;
          white-space: nowrap;
        }
        .cta-button:hover {
          background-color: #2C3E6F;
          color: white;
        }
      `}</style>
      <div
        style={{
          width: "100%",
          padding: "24px 0",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {buttons.map((label) => (
            <button key={label} className="cta-button" type="button">
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
