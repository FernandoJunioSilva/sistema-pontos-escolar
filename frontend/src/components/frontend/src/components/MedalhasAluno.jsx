import React from 'react';

function obterMedalha(pontos) {
  if (pontos >= 200) return { nome: 'Diamante', emoji: '💎', cor: '#7c3aed' };
  if (pontos >= 150) return { nome: 'Ouro', emoji: '🥇', cor: '#eab308' };
  if (pontos >= 100) return { nome: 'Prata', emoji: '🥈', cor: '#94a3b8' };
  if (pontos >= 50) return { nome: 'Bronze', emoji: '🥉', cor: '#b45309' };
  return { nome: 'Iniciante', emoji: '⭐', cor: '#2563eb' };
}

export default function MedalhasAluno({ aluno }) {
  if (!aluno) return null;

  const medalhaAtual = obterMedalha(aluno.pontos || 0);

  const medalhas = [
    { limite: 50, nome: 'Bronze', emoji: '🥉' },
    { limite: 100, nome: 'Prata', emoji: '🥈' },
    { limite: 150, nome: 'Ouro', emoji: '🥇' },
    { limite: 200, nome: 'Diamante', emoji: '💎' }
  ];

  return (
    <div className="card">
      <p className="section-subtitle">Conquistas</p>
      <h2>Medalhas do aluno</h2>

      <div
        style={{
          marginTop: '16px',
          padding: '18px',
          borderRadius: '18px',
          background: medalhaAtual.cor,
          color: 'white'
        }}
      >
        <div style={{ fontSize: '42px' }}>{medalhaAtual.emoji}</div>
        <h3 style={{ margin: '10px 0 6px 0' }}>{medalhaAtual.nome}</h3>
        <p style={{ margin: 0 }}>Pontuação atual: {aluno.pontos || 0}</p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
          marginTop: '18px'
        }}
      >
        {medalhas.map((medalha) => {
          const conquistada = (aluno.pontos || 0) >= medalha.limite;

          return (
            <div
              key={medalha.nome}
              style={{
                border: conquistada ? '2px solid #22c55e' : '1px solid #e5e7eb',
                background: conquistada ? '#f0fdf4' : '#fff',
                borderRadius: '16px',
                padding: '14px',
                textAlign: 'center',
                opacity: conquistada ? 1 : 0.6
              }}
            >
              <div style={{ fontSize: '32px' }}>{medalha.emoji}</div>
              <strong style={{ display: 'block', marginTop: '8px' }}>{medalha.nome}</strong>
              <span style={{ display: 'block', marginTop: '6px', color: '#64748b', fontSize: '13px' }}>
                {medalha.limite} pontos
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}