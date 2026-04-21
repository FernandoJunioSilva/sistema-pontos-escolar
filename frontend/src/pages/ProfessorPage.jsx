import React, { useEffect, useMemo, useState } from 'react';
import { apiGet, apiPost, apiPut } from '../services/api';
import { obterToken, obterUsuario } from '../services/auth';
import CelebrationPopup from '../components/CelebrationPopup';

const SEMANAS = [
  'Semana 1',
  'Semana 2',
  'Semana 3',
  'Semana 4',
  'Semana 5',
  'Semana 6',
  'Semana 7',
  'Semana 8',
  'Semana 9',
  'Semana 10',
  'Semana 11',
  'Semana 12'
];

const OPCOES_PONTUACAO = [
  { categoria: 'Acadêmico', label: 'Participação em aula', pontos: 10 },
  { categoria: 'Acadêmico', label: 'Tarefa entregue', pontos: 20 },
  { categoria: 'Acadêmico', label: 'Trabalho bem feito', pontos: 30 },
  { categoria: 'Acadêmico', label: 'Nota alta (prova)', pontos: 50 },
  { categoria: 'Acadêmico', label: 'Melhor aluno da turma', pontos: 100 },

  { categoria: 'Comportamento', label: 'Ajudar colega', pontos: 10 },
  { categoria: 'Comportamento', label: 'Trabalho em grupo', pontos: 20 },
  { categoria: 'Comportamento', label: 'Respeito e disciplina', pontos: 30 },
  { categoria: 'Comportamento', label: 'Liderança', pontos: 40 },

  { categoria: 'Extras', label: 'Presença diária', pontos: 10 },
  { categoria: 'Extras', label: 'Semana perfeita', pontos: 25 },
  { categoria: 'Extras', label: 'Destaque da semana', pontos: 50 },
  { categoria: 'Extras', label: 'Destaque do mês', pontos: 80 },

  { categoria: 'Negativos', label: 'Atraso', pontos: -10 },
  { categoria: 'Negativos', label: 'Tarefa não entregue', pontos: -20 },
  { categoria: 'Negativos', label: 'Comportamento inadequado', pontos: -30 }
];

const OPCOES_COLETIVAS = OPCOES_PONTUACAO.filter(
  (o) => o.label !== 'Nota alta (prova)' && o.label !== 'Melhor aluno da turma'
);

function agruparPorCategoria(lista) {
  return {
    Acadêmico: lista.filter((o) => o.categoria === 'Acadêmico'),
    Comportamento: lista.filter((o) => o.categoria === 'Comportamento'),
    Extras: lista.filter((o) => o.categoria === 'Extras'),
    Negativos: lista.filter((o) => o.categoria === 'Negativos')
  };
}

export default function ProfessorPage() {
  const token = obterToken();
  const usuario = obterUsuario();

  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [pontuacoes, setPontuacoes] = useState([]);

  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [semana, setSemana] = useState('Semana 1');

  const [selecoesPorAluno, setSelecoesPorAluno] = useState({});
  const [selecoesTurma, setSelecoesTurma] = useState({});

  const [popupVisivel, setPopupVisivel] = useState(false);
  const [popupDados, setPopupDados] = useState(null);

  const [filtroSemanaEdicao, setFiltroSemanaEdicao] = useState('Semana 1');
  const [editandoId, setEditandoId] = useState(null);
  const [editPontos, setEditPontos] = useState('');
  const [editMotivo, setEditMotivo] = useState('');
  const [editSemana, setEditSemana] = useState('');

  const categoriasIndividuais = agruparPorCategoria(OPCOES_PONTUACAO);
  const categoriasColetivas = agruparPorCategoria(OPCOES_COLETIVAS);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const [alunosData, turmasData, pontuacoesData] = await Promise.all([
      apiGet('/alunos', token),
      apiGet('/turmas', token),
      apiGet('/pontuacoes', token)
    ]);

    setAlunos(alunosData);
    setTurmas(turmasData);
    setPontuacoes(pontuacoesData);

    if (turmasData.length > 0 && !turmaSelecionada) {
      setTurmaSelecionada(turmasData[0].nome);
    }
  }

  const alunosDaTurma = useMemo(() => {
    return alunos.filter((a) => a.turma?.nome === turmaSelecionada);
  }, [alunos, turmaSelecionada]);

  const historicoFiltrado = useMemo(() => {
    return pontuacoes.filter(
      (p) =>
        p.aluno?.turma?.nome === turmaSelecionada &&
        (filtroSemanaEdicao ? p.semana === filtroSemanaEdicao : true)
    );
  }, [pontuacoes, turmaSelecionada, filtroSemanaEdicao]);

  function alternarMarcacaoAluno(alunoId, opcaoLabel) {
    setSelecoesPorAluno((prev) => ({
      ...prev,
      [alunoId]: {
        ...prev[alunoId],
        [opcaoLabel]: !prev[alunoId]?.[opcaoLabel]
      }
    }));
  }

  function alternarMarcacaoTurma(opcaoLabel) {
    const novoValor = !selecoesTurma[opcaoLabel];

    setSelecoesTurma((prev) => ({
      ...prev,
      [opcaoLabel]: novoValor
    }));

    setSelecoesPorAluno((prev) => {
      const atualizado = { ...prev };

      alunosDaTurma.forEach((aluno) => {
        atualizado[aluno.id] = {
          ...atualizado[aluno.id],
          [opcaoLabel]: novoValor
        };
      });

      return atualizado;
    });
  }

  function calcularTotalAluno(alunoId) {
    const selecoes = selecoesPorAluno[alunoId] || {};

    return OPCOES_PONTUACAO
      .filter((opcao) => selecoes[opcao.label])
      .reduce((soma, opcao) => soma + opcao.pontos, 0);
  }

  function montarMotivoAluno(alunoId) {
    const selecoes = selecoesPorAluno[alunoId] || {};

    return OPCOES_PONTUACAO
      .filter((opcao) => selecoes[opcao.label])
      .map((opcao) => opcao.label)
      .join(', ');
  }

  async function lancarPontuacoesLote() {
    const alunosComMarcacao = alunosDaTurma.filter((aluno) => montarMotivoAluno(aluno.id));

    if (alunosComMarcacao.length === 0) {
      alert('Marque pelo menos uma opção para algum aluno.');
      return;
    }

    for (const aluno of alunosComMarcacao) {
      const pontos = calcularTotalAluno(aluno.id);
      const motivo = montarMotivoAluno(aluno.id);

      await apiPost(
        '/pontuacoes',
        {
          alunoId: aluno.id,
          professorId: usuario.professorId,
          pontos,
          motivo,
          semana
        },
        token
      );
    }

    setPopupDados({
      aluno: turmaSelecionada,
      turma: semana,
      pontos: alunosComMarcacao.reduce((soma, aluno) => soma + calcularTotalAluno(aluno.id), 0),
      motivo: `Pontuação lançada para ${alunosComMarcacao.length} aluno(s)`
    });

    setPopupVisivel(true);
    setSelecoesPorAluno({});
    setSelecoesTurma({});
    await carregarDados();
  }

  function iniciarEdicao(item) {
    setEditandoId(item.id);
    setEditPontos(item.pontos);
    setEditMotivo(item.motivo);
    setEditSemana(item.semana || 'Semana 1');
  }

  async function salvarEdicao(id) {
    const item = pontuacoes.find((p) => p.id === id);
    if (!item) return;

    await apiPut(
      `/pontuacoes/${id}`,
      {
        alunoId: item.alunoId,
        professorId: item.professorId,
        pontos: Number(editPontos),
        motivo: editMotivo,
        semana: editSemana
      },
      token
    );

    setEditandoId(null);
    await carregarDados();
  }

  function renderGrupoOpcoes(titulo, opcoes, tipo = 'aluno', alunoId = null) {
    return (
      <div style={{ marginBottom: '12px' }}>
        <h4 style={{ marginBottom: '8px' }}>{titulo}</h4>
        <div className="prof-opcoes-grid">
          {opcoes.map((opcao) => {
            const marcado =
              tipo === 'turma'
                ? !!selecoesTurma[opcao.label]
                : !!selecoesPorAluno[alunoId]?.[opcao.label];

            return (
              <label
                key={`${tipo}-${alunoId ?? 'geral'}-${opcao.label}`}
                className={marcado ? 'prof-opcao-card marcado' : 'prof-opcao-card'}
              >
                <input
                  type="checkbox"
                  checked={marcado}
                  onChange={() =>
                    tipo === 'turma'
                      ? alternarMarcacaoTurma(opcao.label)
                      : alternarMarcacaoAluno(alunoId, opcao.label)
                  }
                />
                <div>
                  <strong>{opcao.pontos > 0 ? `+${opcao.pontos}` : opcao.pontos}</strong>
                  <span>{opcao.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <CelebrationPopup
        visivel={popupVisivel}
        dados={popupDados}
        onClose={() => setPopupVisivel(false)}
      />

      <div className="card">
        <p className="section-subtitle">Painel do professor</p>
        <h2>Lançamento em lote por turma</h2>

        <div className="grid-2">
          <div>
            <label>Turma</label>
            <select value={turmaSelecionada} onChange={(e) => setTurmaSelecionada(e.target.value)}>
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.nome}>
                  {turma.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Semana da pontuação</label>
            <select value={semana} onChange={(e) => setSemana(e.target.value)}>
              {SEMANAS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="section-subtitle">Pontuação geral da turma</p>
        <h3>Marcação coletiva</h3>
        <p style={{ color: '#64748b' }}>
          Marque aqui para aplicar a opção a todos os alunos da turma.
        </p>

        {renderGrupoOpcoes('Acadêmico', categoriasColetivas.Acadêmico, 'turma')}
        {renderGrupoOpcoes('Comportamento', categoriasColetivas.Comportamento, 'turma')}
        {renderGrupoOpcoes('Extras', categoriasColetivas.Extras, 'turma')}
        {renderGrupoOpcoes('Negativos', categoriasColetivas.Negativos, 'turma')}
      </div>

      <div className="card">
        <p className="section-subtitle">Lista de alunos</p>
        <h3>Alunos da turma {turmaSelecionada}</h3>

        {alunosDaTurma.length === 0 && <p>Nenhum aluno encontrado para esta turma.</p>}

        {alunosDaTurma.map((aluno) => (
          <div key={aluno.id} className="prof-aluno-box">
            <div className="prof-aluno-topo">
              <div>
                <h4>{aluno.nome}</h4>
                <p>
                  Pontos atuais: <strong>{aluno.pontos}</strong>
                </p>
              </div>

              <div className="prof-total-aluno">
                Total marcado: <strong>{calcularTotalAluno(aluno.id)}</strong>
              </div>
            </div>

            {renderGrupoOpcoes('Acadêmico', categoriasIndividuais.Acadêmico, 'aluno', aluno.id)}
            {renderGrupoOpcoes(
              'Comportamento',
              categoriasIndividuais.Comportamento,
              'aluno',
              aluno.id
            )}
            {renderGrupoOpcoes('Extras', categoriasIndividuais.Extras, 'aluno', aluno.id)}
            {renderGrupoOpcoes('Negativos', categoriasIndividuais.Negativos, 'aluno', aluno.id)}
          </div>
        ))}
      </div>

      <div className="card">
        <button onClick={lancarPontuacoesLote}>Lançar pontuações da turma</button>
      </div>

      <div className="card">
        <p className="section-subtitle">Alterar pontuações de uma semana</p>
        <div className="grid-2">
          <div>
            <label>Filtrar semana</label>
            <select
              value={filtroSemanaEdicao}
              onChange={(e) => setFiltroSemanaEdicao(e.target.value)}
            >
              {SEMANAS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Pontos</th>
              <th>Motivo</th>
              <th>Semana</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {historicoFiltrado.map((p) => (
              <tr key={p.id}>
                <td>{p.aluno?.nome}</td>
                <td>
                  {editandoId === p.id ? (
                    <input value={editPontos} onChange={(e) => setEditPontos(e.target.value)} />
                  ) : (
                    p.pontos
                  )}
                </td>
                <td>
                  {editandoId === p.id ? (
                    <input value={editMotivo} onChange={(e) => setEditMotivo(e.target.value)} />
                  ) : (
                    p.motivo
                  )}
                </td>
                <td>
                  {editandoId === p.id ? (
                    <select value={editSemana} onChange={(e) => setEditSemana(e.target.value)}>
                      {SEMANAS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  ) : (
                    p.semana || '-'
                  )}
                </td>
                <td>
                  {editandoId === p.id ? (
                    <button onClick={() => salvarEdicao(p.id)}>Salvar</button>
                  ) : (
                    <button onClick={() => iniciarEdicao(p)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}