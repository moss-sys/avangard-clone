const reviews = [
  {
    company: 'ТЕХСТРОЙ',
    title: '«Квалифицированный поставщик спецодежды. Что простые рабочие, что ИТР - все довольны качеством»',
    text: 'ООО «ТехСтрой» плодотворно сотрудничает с ООО «ГК Авангард Сэйфети» уже несколько лет. За время совместной работы можно с уверенностью сказать...',
    companyFull: 'ООО «ТехСтрой»',
  },
  {
    company: 'БАЙСАД',
    title: '«Предоставляется широкий ассортимент спецодежды (зима, лето), обувь, СИЗ»',
    text: 'Хотелось бы выразить благодарность фирме ООО «ГК Авангард Сэйфети» за многолетнее сотрудничество...',
    companyFull: 'ОАО «БАЙСАД-Кашира»',
  },
  {
    company: 'AVON',
    title: '«Благодарим за многолетнюю совместную работу»',
    text: 'Компания «Эйвон Бьюти Продактс Компани» благодарит за многолетнюю совместную работу ООО «ГК Авангард Сэйфети»...',
    companyFull: 'ООО «Эйвон Бьюти Продактс Компани»',
  },
];

export function ReviewsSection() {
  return (
    <section
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 40px',
      }}
    >
      <h2
        style={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '16px',
          margin: '0 0 16px 0',
        }}
      >
        Отзывы
      </h2>

      <div
        style={{
          border: '1px solid #e0e0e0',
          padding: '24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {reviews.map((review) => (
          <div
            key={review.company}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              padding: '8px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
                textAlign: 'center',
                padding: '8px',
                color: 'black',
                flexShrink: 0,
                boxSizing: 'border-box',
              }}
            >
              {review.company}
            </div>

            <p
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {review.title}
            </p>

            <p
              style={{
                fontSize: '13px',
                color: '#444',
                lineHeight: 1.5,
                textAlign: 'center',
                margin: 0,
              }}
            >
              {review.text}
            </p>

            <button
              style={{
                color: '#2C3E6F',
                fontSize: '13px',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Развернуть
            </button>

            <p
              style={{
                fontSize: '13px',
                color: '#444',
                textAlign: 'center',
                margin: 0,
              }}
            >
              {review.companyFull}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
