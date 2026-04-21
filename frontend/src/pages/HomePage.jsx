import React, { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost } from '../services/api';
import { salvarSessao } from '../services/auth';

const coresPadrao = [
  ['#2563eb', '#60a5fa'],
  ['#dc2626', '#fb923c'],
  ['#eab308', '#f59e0b'],
  ['#334155', '#64748b'],
  ['#7c3aed', '#a78bfa'],
  ['#059669', '#34d399']
];

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

export default function HomePage({ onLogin }) {
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [turmas, setTurmas] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarTurmas();
  }, []);

  useEffect(() => {
    if (turmas.length === 0) return;
    const intervalo = setInterval(() => {
      setIndiceAtual((valorAnterior) =>
        valorAnterior === turmas.length - 1 ? 0 : valorAnterior + 1
      );
    }, 3500);

    return () => clearInterval(intervalo);
  }, [turmas]);

  async function carregarTurmas() {
    const data = await apiGet('/turmas');

    const ordenado = [...data].sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));

    const turmasComEstilo = ordenado.map((turma, index) => ({
      ...turma,
      cor: coresPadrao[index % coresPadrao.length][0],
      corSecundaria: coresPadrao[index % coresPadrao.length][1],
      descricao: `Destaque da turma ${turma.nome}`
    }));

    setTurmas(turmasComEstilo);
  }

  async function entrar(e) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      const resposta = await apiPost('/auth/login', { email, senha });
      salvarSessao(resposta.token, resposta.usuario);
      onLogin(resposta.usuario);
    } catch (error) {
      setErro(error.message || 'Erro ao entrar no sistema.');
    } finally {
      setCarregando(false);
    }
  }

  const turmaAtual = turmas[indiceAtual];
  const proximaTurma =
    indiceAtual === turmas.length - 1 ? turmas[0] : turmas[indiceAtual + 1];

  const lider = useMemo(() => turmas[0], [turmas]);

  if (!turmaAtual) {
    return <div className="container">Carregando página inicial...</div>;
  }

  const medalhaAtual = obterMedalhaTurma(turmaAtual.pontuacao || 0);
  const conquistaAtual = obterConquistaTurma(indiceAtual, turmaAtual.pontuacao || 0);

  return (
    <div className="container">
      <section className="hero-home">
        <div className="hero-home__content">
          <p className="hero-home__tag">Bem-vindo</p>
          <h1>E.E. Zinha Meira</h1>
          <p className="hero-home__text">
            Acompanhe o desempenho das turmas com um visual jovem, interativo e moderno.
          </p>

          <div className="hero-home__stats">
            <div className="hero-stat">
              <span>Turmas</span>
              <strong>{turmas.length}</strong>
            </div>
            <div className="hero-stat">
              <span>Pontuação total</span>
              <strong>{turmas.reduce((t, item) => t + (item.pontuacao || 0), 0)}</strong>
            </div>
            <div className="hero-stat">
              <span>Líder atual</span>
              <strong>{lider?.nome}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="home-grid">
        <div className="home-left">
          <div
            className="home-feature-card"
            style={{
              background: `linear-gradient(135deg, ${turmaAtual.cor}, ${turmaAtual.corSecundaria})`
            }}
          >
            <div className="home-feature-top">
              <div>
                <p className="home-feature-label">Turma em destaque</p>
                <h2>{turmaAtual.nome}</h2>
                <p className="home-feature-desc">{turmaAtual.descricao}</p>
              </div>

              {turmaAtual.iconeUrl ? (
                <img
                  src={turmaAtual.iconeUrl}
                  alt={turmaAtual.nome}
                  className="home-feature-icon"
                />
              ) : (
                <div className="home-feature-icon home-feature-icon--fallback">🎓</div>
              )}
            </div>

            <div className="home-feature-stats">
              <div className="feature-box">
                <span>Pontuação</span>
                <strong>{turmaAtual.pontuacao || 0}</strong>
              </div>
              <div className="feature-box">
                <span>Medalha</span>
                <strong>
                  {medalhaAtual.emoji} {medalhaAtual.nome}
                </strong>
              </div>
              <div className="feature-box">
                <span>Ranking</span>
                <strong>{indiceAtual + 1}º lugar</strong>
              </div>
              <div className="feature-box">
                <span>Conquista</span>
                <strong>{conquistaAtual}</strong>
              </div>
            </div>

            <div className="carousel-dots">
              {turmas.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={index === indiceAtual ? 'dot active' : 'dot'}
                  onClick={() => setIndiceAtual(index)}
                />
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title-row">
              <div>
                <p className="section-subtitle">Destaques</p>
                <h2>Comparativo das turmas</h2>
              </div>
            </div>

            <div className="next-turma-box">
              {proximaTurma?.iconeUrl ? (
                <img
                  src={proximaTurma.iconeUrl}
                  alt={proximaTurma.nome}
                  className="next-turma-icon"
                />
              ) : (
                <div className="next-turma-icon next-turma-icon--fallback">🎓</div>
              )}

              <div>
                <h3>{proximaTurma?.nome}</h3>
                <p>{proximaTurma?.descricao}</p>
              </div>
            </div>

            <div className="turma-cards-grid">
              {turmas.map((turma, index) => {
                const medalha = obterMedalhaTurma(turma.pontuacao || 0);
                const conquista = obterConquistaTurma(index, turma.pontuacao || 0);

                return (
                  <div key={turma.id} className="mini-turma-card">
                    <div className="mini-turma-top">
                      {turma.iconeUrl ? (
                        <img
                          src={turma.iconeUrl}
                          alt={turma.nome}
                          className="mini-turma-icon"
                        />
                      ) : (
                        <div className="mini-turma-icon mini-turma-icon--fallback">🎓</div>
                      )}

                      <div>
                        <h4>{turma.nome}</h4>
                        <p>{turma.turno}</p>
                      </div>
                    </div>

                    <div className="mini-turma-info">
                      <div>
                        <span>Pontos</span>
                        <strong>{turma.pontuacao || 0}</strong>
                      </div>
                      <div>
                        <span>Medalha</span>
                        <strong>{medalha.emoji}</strong>
                      </div>
                    </div>

                    <p style={{ marginTop: '10px', fontSize: '13px', color: '#64748b' }}>
                      {conquista}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="home-login-card">
          <p className="section-subtitle">Área de acesso</p>
          <h2>Entrar no sistema</h2>
          <p className="login-side-text">
            Professores, alunos e administradores podem acessar por aqui.
          </p>

          <form onSubmit={entrar}>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit" disabled={carregando}>
              {carregando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {erro && <p className="erro-login">{erro}</p>}
        </aside>
      </div>
    </div>
  );
}