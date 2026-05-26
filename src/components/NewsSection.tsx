import Image from 'next/image';

const newsColumns = [
  {
    heading: 'Новости',
    img: '/images/news/news1.png',
    overlayTitle: 'Новинки формы поваров: Стандарты стиля и комфорта',
    date: '29 апреля 2026',
    fullTitle: 'Новинки формы поваров',
    href: '#',
  },
  {
    heading: 'Блог',
    img: '/images/news/news2.png',
    overlayTitle: 'Академия «Авангард» уходит в цеха Екатеринбурга',
    date: '19 мая 2026',
    fullTitle: 'Академия «Авангард» уходит в цеха: эксперты «Спец-СИЗ» подтвердили квалификацию на заводах Екатеринбурга',
    href: '#',
  },
  {
    heading: 'Наша экспертиза',
    img: '/images/news/news3.png',
    overlayTitle: '5 стереотипов о рабочей экипировке: что важно знать о спецодежде',
    date: '12 мая 2026',
    fullTitle: '5 стереотипов о рабочей экипировке: что важно знать о спецодежде',
    href: '#',
  },
];

export function NewsSection() {
  return (
    <section
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}
      >
        {newsColumns.map((col) => (
          <div key={col.heading}>
            <p
              style={{
                fontWeight: 'bold',
                fontSize: '16px',
                marginBottom: '12px',
                margin: '0 0 12px 0',
              }}
            >
              {col.heading}
            </p>

            <a href={col.href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '200px',
                }}
              >
                <Image
                  src={col.img}
                  alt={col.fullTitle}
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 1200px) 33vw, 400px"
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
                    padding: '12px',
                  }}
                >
                  <p
                    style={{
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    {col.overlayTitle}
                  </p>
                </div>
              </div>
            </a>

            <p
              style={{
                color: '#888',
                fontSize: '12px',
                marginTop: '8px',
                margin: '8px 0 4px 0',
              }}
            >
              {col.date}
            </p>
            <a
              href={col.href}
              style={{
                color: 'black',
                fontSize: '14px',
                textDecoration: 'none',
                display: 'block',
              }}
            >
              {col.fullTitle}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
