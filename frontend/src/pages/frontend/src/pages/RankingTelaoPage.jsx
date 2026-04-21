import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';

export default function RankingTelaoPage() {
  const [turmas, setTurmas] = useState([]);
  const [horaAtual, setHoraAtual] = useState(new Date());

  async function carregarRanking() {
    try {
      const data = await apiGet('/turmas');
      const ordenado = [...data].sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));
      setTurmas(ordenado);
    } catch (error) {
      console.error('Erro ao carregar ranking do telão:', error);
    }
  }

  useEffect(() => {
    carregarRanking();

    const intervalRanking = setInterval(carregarRanking, 5000);
    const intervalHora = setInterval(() => setHoraAtual(new Date()), 1000);

    return () => {
      clearInterval(intervalRanking);
      clearInterval(intervalHora);
    };
  }, []);

  const lider = turmas[0];
  const segundo = turmas[1];
  const terceiro = turmas[2];
  const restantes = turmas.slice(3);

  return (
    <div className="telao-page">
      <div className="telao-overlay">
        <header className="telao-header">
          <div>
            <p className="telao-tag">Modo Telão</p>
            <h1>E.E. Zinha Meira</h1>
            <p className="telao-subtitle">Ranking ao vivo das turmas</p>
          </div>

          <div className="telao-clock">
            {horaAtual.toLocaleTimeString()}
          </div>
        </header>

        <section className="telao-podio">
          {segundo && (
            <div className="podio-card podio-card--second">
              <div className="podio-posicao">2º</div>
              {segundo.iconeUrl ? (
                <img src={segundo.iconeUrl} alt={segundo.nome} className="podio-icon" />
              ) : (
                <div className="podio-icon podio-icon--fallback">🎓</div>
              )}
              <h2>{segundo.nome}</h2>
              <p>{segundo.turno}</p>
              <strong>{segundo.pontuacao || 0}</strong>
            </div>
          )}

          {lider && (
            <div className="podio-card podio-card--first">
              <div className="podio-posicao">1º</div>
              {lider.iconeUrl ? (
                <img src={lider.iconeUrl} alt={lider.nome} className="podio-icon" />
              ) : (
                <div className="podio-icon podio-icon--fallback">🏆</div>
              )}
              <h2>{lider.nome}</h2>
              <p>{lider.turno}</p>
              <strong>{lider.pontuacao || 0}</strong>
            </div>
          )}

          {terceiro && (
            <div className="podio-card podio-card--third">
              <div className="podio-posicao">3º</div>
              {terceiro.iconeUrl ? (
                <img src={terceiro.iconeUrl} alt={terceiro.nome} className="podio-icon" />
              ) : (
                <div className="podio-icon podio-icon--fallback">🎓</div>
              )}
              <h2>{terceiro.nome}</h2>
              <p>{terceiro.turno}</p>
              <strong>{terceiro.pontuacao || 0}</strong>
            </div>
          )}
        </section>

        <section className="telao-lista">
          {restantes.map((turma, index) => (
            <div key={turma.id} className="telao-linha">
              <div className="telao-linha-left">
                <div className="telao-ranking-numero">{index + 4}</div>

                {turma.iconeUrl ? (
                  <img src={turma.iconeUrl} alt={turma.nome} className="telao-mini-icon" />
                ) : (
                  <div className="telao-mini-icon telao-mini-icon--fallback">🎓</div>
                )}

                <div>
                  <h3>{turma.nome}</h3>
                  <p>{turma.turno} • {turma.quantidadeAlunos || 0} alunos</p>
                </div>
              </div>

              <div className="telao-linha-right">
                <span>Pontos</span>
                <strong>{turma.pontuacao || 0}</strong>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}