import React, { useEffect, useMemo, useRef, useState } from 'react';
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

function obterCorTurma(index) {
  const cores = [
    'from-blue-700 to-cyan-500',
    'from-red-700 to-orange-500',
    'from-yellow-500 to-amber-400',
    'from-violet-700 to-fuchsia-500',
    'from-emerald-700 to-lime-500',
    'from-slate-700 to-slate-500'
  ];
  return cores[index % cores.length];
}

export default function RankingTelaoPage() {
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [conquistas, setConquistas] = useState([]);

  const [horaAtual, setHoraAtual] = useState(new Date());

  const [painelAtual, setPainelAtual] = useState(0);
  const [itemAtual, setItemAtual] = useState(0);

  const [destaqueTroca, setDestaqueTroca] = useState(null);

  const rankingAnteriorRef = useRef([]);

  const paineis = ['turmas', 'alunos', 'conquistas'];

  async function carregarDados() {
    try {
      const [dadosTurmas, dadosAlunos, dadosConquistas] = await Promise.all([
        apiGet('/turmas'),
        apiGet('/ranking/alunos'),
        apiGet('/conquistas/recentes')
      ]);

      const rankingTurmas = [...dadosTurmas].sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));
      const rankingAlunos = [...dadosAlunos].sort((a, b) => (b.pontos || 0) - (a.pontos || 0));

      detectarMudancaRanking(rankingTurmas);

      setTurmas(rankingTurmas);
      setAlunos(rankingAlunos);
      setConquistas(dadosConquistas);
    } catch (error) {
      console.error('Erro ao carregar telão:', error);
    }
  }

  function detectarMudancaRanking(novoRanking) {
    const rankingAnterior = rankingAnteriorRef.current;

    if (!rankingAnterior.length) {
      rankingAnteriorRef.current = novoRanking.map((t) => t.id);
      return;
    }

    const novoIds = novoRanking.map((t) => t.id);

    for (let i = 0; i < novoIds.length; i++) {
      const idAtual = novoIds[i];
      const posicaoAnterior = rankingAnterior.indexOf(idAtual);

      if (posicaoAnterior !== -1 && posicaoAnterior > i) {
        const turma = novoRanking.find((t) => t.id === idAtual);
        if (turma) {
          setDestaqueTroca(`🔥 ${turma.nome} subiu para ${i + 1}º lugar!`);
          setTimeout(() => setDestaqueTroca(null), 3500);
          break;
        }
      }
    }

    rankingAnteriorRef.current = novoIds;
  }

  useEffect(() => {
    carregarDados();

    const intervalDados = setInterval(carregarDados, 5000);
    const intervalHora = setInterval(() => setHoraAtual(new Date()), 1000);

    const intervalPainel = setInterval(() => {
      setPainelAtual((prev) => (prev + 1) % paineis.length);
      setItemAtual(0);
    }, 9000);

    const intervalItem = setInterval(() => {
      setItemAtual((prev) => prev + 1);
    }, 3000);

    return () => {
      clearInterval(intervalDados);
      clearInterval(intervalHora);
      clearInterval(intervalPainel);
      clearInterval(intervalItem);
    };
  }, []);

  const painel = paineis[painelAtual];

  const tituloPainel = useMemo(() => {
    if (painel === 'turmas') return '🏆 Ranking das Melhores Turmas';
    if (painel === 'alunos') return '🎓 Ranking dos Melhores Alunos';
    return '✨ Novas Conquistas da Escola';
  }, [painel]);

  const subtituloPainel = useMemo(() => {
    if (painel === 'turmas') return 'Pontuação total • medalhas • conquistas';
    if (painel === 'alunos') return 'Destaques individuais da semana';
    return 'Turmas em evolução e momentos de destaque';
  }, [painel]);

  const itemPrincipalTurma = turmas.length ? turmas[itemAtual % turmas.length] : null;
  const itemPrincipalAluno = alunos.length ? alunos[itemAtual % alunos.length] : null;
  const itemPrincipalConquista = conquistas.length ? conquistas[itemAtual % conquistas.length] : null;

  const topTurmas = turmas.slice(0, 5);
  const topAlunos = alunos.slice(0, 5);
  const topConquistas = conquistas.slice(0, 5);

  return (
    <div className="telao-evento">
      <div className="telao-evento__bg" />
      <div className="telao-evento__overlay">
        <header className="telao-evento__header">
          <div>
            <span className="telao-evento__tag">Modo Telão • Evento</span>
            <h1>E.E. Zinha Meira</h1>
            <p>{tituloPainel}</p>
            <small>{subtituloPainel}</small>
          </div>

          <div className="telao-evento__clock">
            {horaAtual.toLocaleTimeString()}
          </div>
        </header>

        {destaqueTroca && (
          <div className="telao-alerta">
            {destaqueTroca}
          </div>
        )}

        <div className="telao-paineis-indicadores">
          {paineis.map((item, index) => (
            <span
              key={item}
              className={index === painelAtual ? 'telao-painel-dot ativo' : 'telao-painel-dot'}
            />
          ))}
        </div>

        {painel === 'turmas' && itemPrincipalTurma && (
          <section className="telao-painel fade-panel">
            <div className={`telao-principal-card bg-grad ${obterCorTurma(itemAtual)}`}>
              <div className="telao-principal-card__left">
                <span className="telao-principal-card__badge">Painel principal</span>
                <h2>{itemPrincipalTurma.nome}</h2>
                <p>{itemPrincipalTurma.turno}</p>

                <div className="telao-principal-card__stats">
                  <div className="telao-mini-stat">
                    <span>Pontuação total</span>
                    <strong>{itemPrincipalTurma.pontuacao || 0}</strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Medalha</span>
                    <strong>
                      {obterMedalhaTurma(itemPrincipalTurma.pontuacao || 0).emoji}{' '}
                      {obterMedalhaTurma(itemPrincipalTurma.pontuacao || 0).nome}
                    </strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Ranking</span>
                    <strong>
                      {topTurmas.findIndex((t) => t.id === itemPrincipalTurma.id) >= 0
                        ? `${topTurmas.findIndex((t) => t.id === itemPrincipalTurma.id) + 1}º lugar`
                        : 'Em disputa'}
                    </strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Conquista</span>
                    <strong>{obterConquistaTurma(itemAtual % Math.max(turmas.length, 1), itemPrincipalTurma.pontuacao || 0)}</strong>
                  </div>
                </div>
              </div>

              <div className="telao-principal-card__right">
                {itemPrincipalTurma.iconeUrl ? (
                  <img
                    src={itemPrincipalTurma.iconeUrl}
                    alt={itemPrincipalTurma.nome}
                    className="telao-principal-card__icon"
                  />
                ) : (
                  <div className="telao-principal-card__icon fallback">🏫</div>
                )}
              </div>
            </div>

            <div className="telao-secundario-grid">
              {topTurmas.map((turma, index) => {
                const medalha = obterMedalhaTurma(turma.pontuacao || 0);
                const conquista = obterConquistaTurma(index, turma.pontuacao || 0);

                return (
                  <div key={turma.id} className={index === 0 ? 'telao-ranking-card lider' : 'telao-ranking-card'}>
                    <div className="telao-ranking-card__top">
                      <span className="telao-ranking-card__pos">{index + 1}º</span>
                      <span className="telao-ranking-card__medalha">{medalha.emoji}</span>
                    </div>
                    <h3>{turma.nome}</h3>
                    <p>{conquista}</p>
                    <strong>{turma.pontuacao || 0} pts</strong>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {painel === 'alunos' && itemPrincipalAluno && (
          <section className="telao-painel fade-panel">
            <div className="telao-principal-card bg-grad from-violet-700 to-fuchsia-600">
              <div className="telao-principal-card__left">
                <span className="telao-principal-card__badge">Aluno destaque</span>
                <h2>{itemPrincipalAluno.nome}</h2>
                <p>{itemPrincipalAluno.turma}</p>

                <div className="telao-principal-card__stats">
                  <div className="telao-mini-stat">
                    <span>Pontos</span>
                    <strong>{itemPrincipalAluno.pontos || 0}</strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Status</span>
                    <strong>⭐ Destaque</strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Ranking</span>
                    <strong>{(itemAtual % alunos.length) + 1}º em foco</strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Conquista</span>
                    <strong>🎯 Melhor desempenho</strong>
                  </div>
                </div>
              </div>

              <div className="telao-principal-card__right">
                <div className="telao-principal-card__icon fallback">🎓</div>
              </div>
            </div>

            <div className="telao-secundario-grid">
              {topAlunos.map((aluno, index) => (
                <div key={aluno.id} className={index === 0 ? 'telao-ranking-card lider' : 'telao-ranking-card'}>
                  <div className="telao-ranking-card__top">
                    <span className="telao-ranking-card__pos">{index + 1}º</span>
                    <span className="telao-ranking-card__medalha">🎓</span>
                  </div>
                  <h3>{aluno.nome}</h3>
                  <p>{aluno.turma}</p>
                  <strong>{aluno.pontos || 0} pts</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        {painel === 'conquistas' && itemPrincipalConquista && (
          <section className="telao-painel fade-panel">
            <div className="telao-principal-card bg-grad from-emerald-700 to-teal-500">
              <div className="telao-principal-card__left">
                <span className="telao-principal-card__badge">Nova conquista</span>
                <h2>{itemPrincipalConquista.nome}</h2>
                <p>{itemPrincipalConquista.conquista}</p>

                <div className="telao-principal-card__stats">
                  <div className="telao-mini-stat">
                    <span>Pontuação total</span>
                    <strong>{itemPrincipalConquista.pontuacao || 0}</strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Medalha</span>
                    <strong>
                      {obterMedalhaTurma(itemPrincipalConquista.pontuacao || 0).emoji}{' '}
                      {obterMedalhaTurma(itemPrincipalConquista.pontuacao || 0).nome}
                    </strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Ranking</span>
                    <strong>Em acompanhamento</strong>
                  </div>

                  <div className="telao-mini-stat">
                    <span>Histórico</span>
                    <strong>✔ Atualizado</strong>
                  </div>
                </div>
              </div>

              <div className="telao-principal-card__right">
                <div className="telao-principal-card__icon fallback">
                  {obterMedalhaTurma(itemPrincipalConquista.pontuacao || 0).emoji}
                </div>
              </div>
            </div>

            <div className="telao-secundario-grid">
              {topConquistas.map((item, index) => {
                const medalha = obterMedalhaTurma(item.pontuacao || 0);

                return (
                  <div key={item.id} className={index === 0 ? 'telao-ranking-card lider' : 'telao-ranking-card'}>
                    <div className="telao-ranking-card__top">
                      <span className="telao-ranking-card__pos">✨</span>
                      <span className="telao-ranking-card__medalha">{medalha.emoji}</span>
                    </div>
                    <h3>{item.nome}</h3>
                    <p>{item.conquista}</p>
                    <strong>{item.pontuacao || 0} pts</strong>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}