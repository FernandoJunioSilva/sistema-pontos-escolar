import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

function obterMedalhaTurma(pontos) {
  if (pontos >= 1000) return { emoji: '🔥👑', nome: 'Turma Lendária' };
  if (pontos >= 800) return { emoji: '💎', nome: 'Turma Diamante' };
  if (pontos >= 600) return { emoji: '🥇', nome: 'Turma Ouro' };
  if (pontos >= 400) return { emoji: '🥈', nome: 'Turma Prata' };
  if (pontos >= 200) return { emoji: '🥉', nome: 'Turma Bronze' };
  return { emoji: '⭐', nome: 'Iniciante' };
}

function obterConquistaTurma(index, pontos) {
  if (index === 0) return '🏆 Turma da semana';
  if (pontos >= 800) return '📈 Mais pontos ganhos';
  if (pontos >= 600) return '🧠 Melhor desempenho acadêmico';
  if (pontos >= 400) return '🤝 Turma mais colaborativa';
  if (pontos >= 200) return '📢 Mais participativa';
  return '🚀 Em evolução';
}

export default function RankingPublicoPage() {
  const [turmas, setTurmas] = useState([]);

  async function carregarRanking() {
    const data = await apiGet('/turmas');
    const ordenado = [...data].sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));
    setTurmas(ordenado);
  }

  useEffect(() => {
    carregarRanking();
    const interval = setInterval(carregarRanking, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <section className="ranking-hero">
        <p className="ranking-hero__tag">Painel público</p>
        <h1>Ranking das Turmas</h1>
        <p>Veja em tempo real quais turmas estão liderando a pontuação da escola.</p>
      </section>

      <div className="ranking-grid">
        {turmas.map((turma, index) => {
          const medalha = obterMedalhaTurma(turma.pontuacao || 0);
          const conquista = obterConquistaTurma(index, turma.pontuacao || 0);

          return (
            <div
              key={turma.id}
              className={index === 0 ? 'ranking-card ranking-card--first' : 'ranking-card'}
            >
              <div className="ranking-card__left">
                <div className="ranking-position">{index + 1}</div>

                {turma.iconeUrl ? (
                  <img src={turma.iconeUrl} alt={turma.nome} className="ranking-card__icon" />
                ) : (
                  <div className="ranking-card__icon ranking-card__icon--fallback">🎓</div>
                )}

                <div>
                  <h3>{turma.nome}</h3>
                  <p>
                    {turma.turno} • {turma.quantidadeAlunos || 0} alunos
                  </p>
                  <p>
                    {medalha.emoji} {medalha.nome} • {conquista}
                  </p>
                </div>
              </div>

              <div className="ranking-card__right">
                <span>Pontuação</span>
                <strong>{turma.pontuacao || 0}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}