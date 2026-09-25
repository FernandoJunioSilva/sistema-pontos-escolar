import './VoltarSiteButton.css';

export default function VoltarSiteButton({
  onVoltar,
  modo = 'normal'
}) {
  return (
    <button
      type="button"
      className={`voltar-site-btn voltar-site-btn--${modo}`}
      onClick={onVoltar}
      title="Voltar para o site da escola"
    >
      <span className="voltar-site-btn__seta">
        ←
      </span>

      <span>
        Voltar
      </span>
    </button>
  );
}