const footerLinkStyle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.85)',
  fontSize: '13px',
  textDecoration: 'none',
  display: 'block',
  marginBottom: '6px',
};

const col1Links = [
  'Оптом',
  'Спецодежда',
  'Защитная спецодежда',
  'Зимняя спецодежда',
  'Летняя спецодежда',
  'Рабочая обувь',
];

const col2Links = ['Медицинская одежда', 'Спецодежда для охраны', 'Одежда для ресторанов'];

const col3Links = ['Одежда для сферы услуг', 'Средства индивидуальной защиты'];

function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-label="VK">
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.79 13.71h-1.67c-.63 0-.82-.5-1.95-1.63-.98-.95-1.4-.95-1.63-.95-.33 0-.42.09-.42.54v1.49c0 .38-.12.61-1.13.61-1.67 0-3.52-1.01-4.82-2.9C4.57 10.85 4 8.78 4 8.28c0-.23.09-.45.54-.45h1.67c.4 0 .55.18.71.61.78 2.25 2.09 4.22 2.63 4.22.2 0 .29-.09.29-.59V9.79c-.06-1.06-.62-1.15-.62-1.53 0-.18.15-.37.38-.37H12c.33 0 .45.18.45.56v2.99c0 .33.15.45.24.45.2 0 .37-.12.74-.5 1.15-1.28 1.97-3.25 1.97-3.25.11-.23.29-.45.68-.45h1.67c.5 0 .61.26.5.59-.21.97-2.21 3.78-2.21 3.78-.18.28-.24.41 0 .72.17.24.73.74 1.1 1.19.68.77 1.2 1.41 1.34 1.86.14.44-.08.67-.52.67z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-label="Telegram">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.68 7.92c-.12.57-.47.71-.95.44l-2.63-1.94-1.27 1.22c-.14.14-.26.26-.53.26l.19-2.72 4.97-4.49c.22-.19-.05-.3-.33-.11L7.95 14.3l-2.59-.81c-.56-.18-.57-.56.12-.83l10.12-3.9c.47-.17.88.11.74.83-.01 0-.01.01 0 .01z" />
    </svg>
  );
}

function OdnoklassnikiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-label="Одноклассники">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4 8.5c-.55.9-1.47 1.58-2.57 1.86l2.3 2.3a.75.75 0 01-1.06 1.06L12 17.06l-2.67 2.66a.75.75 0 01-1.06-1.06l2.3-2.3a4.51 4.51 0 01-2.57-1.86.75.75 0 011.25-.83A3 3 0 0012 15a3 3 0 002.75-1.83.75.75 0 011.25.83z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer>
      {/* Top section */}
      <div
        style={{
          backgroundColor: '#2C3E6F',
          color: 'white',
          padding: '40px 0 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          {/* 5-column grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '24px',
              marginBottom: '24px',
            }}
          >
            {/* Column 1 */}
            <div>
              {col1Links.map((link) => (
                <a key={link} href="#" style={footerLinkStyle}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 2 */}
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginBottom: '8px',
                  color: 'white',
                  margin: '0 0 8px 0',
                }}
              >
                Средства индивидуальной защиты рук
              </p>
              {col2Links.map((link) => (
                <a key={link} href="#" style={footerLinkStyle}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 3 */}
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  marginBottom: '8px',
                  color: 'white',
                  margin: '0 0 8px 0',
                }}
              >
                Одежда для пищевой промышленности
              </p>
              {col3Links.map((link) => (
                <a key={link} href="#" style={footerLinkStyle}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 4 */}
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: 'white',
                  margin: 0,
                }}
              >
                Трикотажная спецодежда
              </p>
            </div>

            {/* Column 5: Contacts */}
            <div>
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: 'white',
                  margin: '0 0 8px 0',
                }}
              >
                Контакты
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: '0 0 12px 0', lineHeight: 1.6 }}>
                г. Москва
                <br />
                Офис: 109052, Рязанский пр-т, 2, стр.49, БЦ &ldquo;Карачарово&rdquo;
                <br />
                тел.{' '}
                <a href="tel:+74995004001" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
                  +7 (499) 500-40-01
                </a>
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.6 }}>
                г. Погар
                <br />
                Производство: ул. Октябрьская, д. 51
                <br />
                тел.{' '}
                <a href="tel:+74834922222" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>
                  +7(48349) 2-22-22
                </a>
              </p>
            </div>
          </div>

          {/* Below grid row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              marginBottom: '16px',
            }}
          >
            <button
              style={{
                border: '1px solid white',
                color: 'white',
                backgroundColor: 'transparent',
                padding: '8px 20px',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              ПИСЬМО ДИРЕКТОРУ
            </button>
            <a href="#" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>
              Политика конфиденциальности
            </a>
            <a href="#" style={{ color: 'white', fontSize: '13px', textDecoration: 'none' }}>
              Карта сайта
            </a>
          </div>

          {/* Social icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            {[
              { Icon: VkIcon, label: 'VK' },
              { Icon: TelegramIcon, label: 'Telegram' },
              { Icon: OdnoklassnikiIcon, label: 'Одноклассники' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.3)',
              margin: '16px 0',
            }}
          />

          {/* Center text */}
          <p
            style={{
              fontSize: '13px',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
            }}
          >
            Спецодежда и экипировка от производителя Авангард
          </p>
        </div>
      </div>

      {/* Footer bottom */}
      <div
        style={{
          backgroundColor: '#1e2d5e',
          padding: '12px 20px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Copyright &copy; 2004-2026. Все права защищены. Вся приведённая на сайте информация носит справочный характер и не является публичной офертой.
        </p>
      </div>
    </footer>
  );
}
