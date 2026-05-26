export function NewsletterSection() {
  return (
    <section
      style={{
        backgroundColor: '#f8f8f8',
        padding: '32px 0',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          padding: '0 20px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          ПОДПИСАТЬСЯ НА НАШИ НОВОСТИ:
        </span>

        <input
          type="email"
          placeholder="Введите ваш e-mail"
          style={{
            border: '1px solid #ccc',
            height: '40px',
            width: '300px',
            padding: '0 12px',
            fontSize: '14px',
            outline: 'none',
          }}
        />

        <button
          style={{
            backgroundColor: '#2C3E6F',
            color: 'white',
            border: 'none',
            height: '40px',
            padding: '0 20px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          ПОДПИСАТЬСЯ
        </button>
      </div>
    </section>
  );
}
