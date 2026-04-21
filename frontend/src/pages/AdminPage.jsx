import React, { useEffect, useMemo, useState } from 'react';
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPostForm,
  apiPut
} from '../services/api';
import { obterToken } from '../services/auth';
import DashboardGraficos from '../components/DashboardGraficos';

export default function AdminPage() {
  const token = obterToken();

  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [casas, setCasas] = useState([]);
  const [busca, setBusca] = useState('');

  const [formAluno, setFormAluno] = useState({
    nome: '',
    matricula: '',
    dataNascimento: '',
    turmaId: '',
    casaId: ''
  });

  const [formTurma, setFormTurma] = useState({
    nome: '',
    turno: '',
    icone: null
  });

  const [formCasa, setFormCasa] = useState({
    nome: '',
    cor: '',
    simbolo: ''
  });

  async function carregar() {
    try {
      const [listaAlunos, listaTurmas, listaCasas] = await Promise.all([
        apiGet('/alunos', token),
        apiGet('/turmas', token),
        apiGet('/casas', token)
      ]);

      setAlunos(listaAlunos);
      setTurmas(listaTurmas);
      setCasas(listaCasas);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvarAluno(e) {
    e.preventDefault();

    try {
      await apiPost(
        '/alunos',
        {
          nome: formAluno.nome,
          matricula: formAluno.matricula,
          dataNascimento: formAluno.dataNascimento || null,
          turmaId: Number(formAluno.turmaId),
          casaId: Number(formAluno.casaId)
        },
        token
      );

      setFormAluno({
        nome: '',
        matricula: '',
        dataNascimento: '',
        turmaId: '',
        casaId: ''
      });

      await carregar();
      alert('Aluno cadastrado com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function salvarTurma(e) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', formTurma.nome);
      formData.append('turno', formTurma.turno);

      if (formTurma.icone) {
        formData.append('icone', formTurma.icone);
      }

      await apiPostForm('/turmas', formData, token);

      setFormTurma({
        nome: '',
        turno: '',
        icone: null
      });

      await carregar();
      alert('Turma cadastrada com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function salvarCasa(e) {
    e.preventDefault();

    try {
      await apiPost(
        '/casas',
        {
          nome: formCasa.nome,
          cor: formCasa.cor,
          simbolo: formCasa.simbolo
        },
        token
      );

      setFormCasa({
        nome: '',
        cor: '',
        simbolo: ''
      });

      await carregar();
      alert('Casa cadastrada com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function excluirAluno(id) {
    const confirmar = window.confirm('Deseja excluir este aluno?');
    if (!confirmar) return;

    try {
      await apiDelete(`/alunos/${id}`, token);
      await carregar();
      alert('Aluno excluído com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function excluirTurma(id) {
    const confirmar = window.confirm('Deseja excluir esta turma?');
    if (!confirmar) return;

    try {
      await apiDelete(`/turmas/${id}`, token);
      await carregar();
      alert('Turma excluída com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function excluirCasa(id) {
    const confirmar = window.confirm('Deseja excluir esta casa?');
    if (!confirmar) return;

    try {
      await apiDelete(`/casas/${id}`, token);
      await carregar();
      alert('Casa excluída com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function editarAluno(aluno) {
    const novoNome = prompt('Novo nome do aluno:', aluno.nome);
    if (!novoNome) return;

    const novaMatricula = prompt('Nova matrícula:', aluno.matricula);
    if (!novaMatricula) return;

    try {
      await apiPut(
        `/alunos/${aluno.id}`,
        {
          id: aluno.id,
          nome: novoNome,
          matricula: novaMatricula,
          dataNascimento: aluno.dataNascimento,
          turmaId: aluno.turmaId ?? aluno.turma?.id,
          casaId: aluno.casaId ?? aluno.casa?.id,
          pontos: aluno.pontos
        },
        token
      );

      await carregar();
      alert('Aluno alterado com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function editarTurma(turma) {
    const novoNome = prompt('Novo nome da turma:', turma.nome);
    if (!novoNome) return;

    const novoTurno = prompt('Novo turno da turma:', turma.turno || '');
    if (novoTurno === null) return;

    try {
      await apiPut(
        `/turmas/${turma.id}`,
        {
          id: turma.id,
          nome: novoNome,
          turno: novoTurno,
          iconeUrl: turma.iconeUrl || null
        },
        token
      );

      await carregar();
      alert('Turma alterada com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  async function editarCasa(casa) {
    const novoNome = prompt('Novo nome da casa:', casa.nome);
    if (!novoNome) return;

    const novaCor = prompt('Nova cor da casa:', casa.cor || '');
    if (novaCor === null) return;

    const novoSimbolo = prompt('Novo símbolo da casa:', casa.simbolo || '');
    if (novoSimbolo === null) return;

    try {
      await apiPut(
        `/casas/${casa.id}`,
        {
          id: casa.id,
          nome: novoNome,
          cor: novaCor,
          simbolo: novoSimbolo
        },
        token
      );

      await carregar();
      alert('Casa alterada com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  const alunosFiltrados = useMemo(() => {
    return alunos.filter((a) =>
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [alunos, busca]);

  const turmasFiltradas = useMemo(() => {
    return turmas.filter((t) =>
      t.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [turmas, busca]);

  const casasFiltradas = useMemo(() => {
    return casas.filter((c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }, [casas, busca]);

  return (
    <div className="container">
      <div className="card">
        <p className="section-subtitle">Painel administrativo</p>
        <h2>Gerenciar alunos, turmas e casas</h2>

        <input
          type="text"
          placeholder="Buscar aluno, turma ou casa"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid-2">
        <div className="card">
          <h2>Cadastrar Aluno</h2>

          <form onSubmit={salvarAluno}>
            <input
              placeholder="Nome do aluno"
              value={formAluno.nome}
              onChange={(e) =>
                setFormAluno({ ...formAluno, nome: e.target.value })
              }
            />

            <input
              placeholder="Matrícula"
              value={formAluno.matricula}
              onChange={(e) =>
                setFormAluno({ ...formAluno, matricula: e.target.value })
              }
            />

            <input
              type="date"
              value={formAluno.dataNascimento}
              onChange={(e) =>
                setFormAluno({ ...formAluno, dataNascimento: e.target.value })
              }
            />

            <select
              value={formAluno.turmaId}
              onChange={(e) =>
                setFormAluno({ ...formAluno, turmaId: e.target.value })
              }
            >
              <option value="">Selecione a turma</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>

            <select
              value={formAluno.casaId}
              onChange={(e) =>
                setFormAluno({ ...formAluno, casaId: e.target.value })
              }
            >
              <option value="">Selecione a casa</option>
              {casas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            <button type="submit">Salvar Aluno</button>
          </form>
        </div>

        <div className="card">
          <h2>Criar Turma</h2>

          <form onSubmit={salvarTurma}>
            <input
              placeholder="Nome da turma"
              value={formTurma.nome}
              onChange={(e) =>
                setFormTurma({ ...formTurma, nome: e.target.value })
              }
            />

            <input
              placeholder="Turno"
              value={formTurma.turno}
              onChange={(e) =>
                setFormTurma({ ...formTurma, turno: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormTurma({
                  ...formTurma,
                  icone: e.target.files[0] || null
                })
              }
            />

            <button type="submit">Salvar Turma</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h2>Criar Casa</h2>

        <form onSubmit={salvarCasa}>
          <div className="grid-2">
            <input
              placeholder="Nome da casa"
              value={formCasa.nome}
              onChange={(e) =>
                setFormCasa({ ...formCasa, nome: e.target.value })
              }
            />

            <input
              placeholder="Cor da casa"
              value={formCasa.cor}
              onChange={(e) =>
                setFormCasa({ ...formCasa, cor: e.target.value })
              }
            />
          </div>

          <input
            placeholder="Símbolo da casa"
            value={formCasa.simbolo}
            onChange={(e) =>
              setFormCasa({ ...formCasa, simbolo: e.target.value })
            }
          />

          <button type="submit">Salvar Casa</button>
        </form>
      </div>

      <div className="card">
        <h2>Alunos cadastrados</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>Turma</th>
              <th>Casa</th>
              <th>Pontos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunosFiltrados.map((a) => (
              <tr key={a.id}>
                <td>{a.nome}</td>
                <td>{a.matricula}</td>
                <td>{a.turma?.nome}</td>
                <td>{a.casa?.nome}</td>
                <td>{a.pontos}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => editarAluno(a)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => excluirAluno(a.id)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>Turmas cadastradas</h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px'
          }}
        >
          {turmasFiltradas.map((t) => (
            <div
              key={t.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '16px',
                background: '#fff'
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                {t.iconeUrl ? (
                  <img
                    src={t.iconeUrl}
                    alt={t.nome}
                    style={{
                      width: '56px',
                      height: '56px',
                      objectFit: 'cover',
                      borderRadius: '14px'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    🎓
                  </div>
                )}

                <div>
                  <h3 style={{ margin: 0 }}>{t.nome}</h3>
                  <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>
                    {t.turno}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '12px' }}>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Pontuação: <strong>{t.pontuacao || 0}</strong>
                </p>
                <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>
                  Alunos: <strong>{t.quantidadeAlunos || 0}</strong>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => editarTurma(t)}>
                  Editar
                </button>
                <button type="button" onClick={() => excluirTurma(t.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2>Casas cadastradas</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cor</th>
              <th>Símbolo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {casasFiltradas.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.cor}</td>
                <td>{c.simbolo}</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button type="button" onClick={() => editarCasa(c)}>
                      Editar
                    </button>
                    <button type="button" onClick={() => excluirCasa(c.id)}>
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DashboardGraficos turmas={turmas} />
    </div>
  );
}