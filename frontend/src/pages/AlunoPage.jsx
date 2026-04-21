import React, { useEffect, useState } from 'react';
import { apiGet } from '../services/api';
import { obterToken } from '../services/auth';
import MedalhasAluno from '../components/MedalhasAluno';
import DashboardGraficos from '../components/DashboardGraficos';

export default function AlunoPage() {
  const [aluno, setAluno] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const token = obterToken();

  useEffect(() => {
    async function carregar() {
      const [dadosAluno, dadosTurmas] = await Promise.all([
        apiGet('/meupainel', token),
        apiGet('/turmas', token)
      ]);

      setAluno(dadosAluno);
      setTurmas(dadosTurmas);
    }

    carregar();
  }, []);

  if (!aluno) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <div className="card">
        <p className="section-subtitle">Meu painel</p>
        <h2>{aluno.nome}</h2>
        <p><strong>Turma:</strong> {aluno.turma?.nome}</p>
        <p><strong>Casa:</strong> {aluno.casa?.nome}</p>
        <p><strong>Pontos:</strong> {aluno.pontos}</p>
      </div>

      <MedalhasAluno aluno={aluno} />

      <DashboardGraficos aluno={aluno} turmas={turmas} />

      <div className="card">
        <h3>Histórico</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Pontos</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            {aluno.pontuacoes?.map((p) => (
              <tr key={p.id}>
                <td>{new Date(p.dataLancamento).toLocaleString()}</td>
                <td>{p.pontos}</td>
                <td>{p.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}