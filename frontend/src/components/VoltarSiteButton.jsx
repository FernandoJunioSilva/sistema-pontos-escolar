export default function VoltarSiteButton({ onVoltar }) {
  return (
    <button
      type="button"
      onClick={onVoltar}
      title="Voltar para o site da escola"
      style={{
        position: 'fixed',
        top: '18px',
        left: '18px',
        zIndex: 99999,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',

        padding: '10px 16px',

        border: '1px solid rgba(255, 255, 255, 0.30)',
        borderRadius: '12px',

        background: 'rgba(15, 23, 42, 0.90)',
        color: '#ffffff',

        fontSize: '14px',
        fontWeight: '700',

        cursor: 'pointer',

        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.22)',

        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',

        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          'translateY(-2px)';

        e.currentTarget.style.background =
          'rgba(37, 99, 235, 0.95)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          'translateY(0)';

        e.currentTarget.style.background =
          'rgba(15, 23, 42, 0.90)';
      }}
    >
      <span
        style={{
          fontSize: '20px',
          lineHeight: 1
        }}
      >
        ←
      </span>

      <span>
        Voltar
      </span>
    </button>
  );
}