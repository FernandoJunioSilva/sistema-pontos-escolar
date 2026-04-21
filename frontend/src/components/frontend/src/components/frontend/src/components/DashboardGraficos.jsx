import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardGraficos({ turmas = [], aluno = null, pontuacoes = [] }) {
  const dadosTurmas = {
    labels: turmas.map((t) => t.nome),
    datasets: [
      {
        label: 'Pontuação por turma',
        data: turmas.map((t) => t.pontuacao || 0)
      }
    ]
  };

  const dadosAlunosTurma = {
    labels: turmas.map((t) => t.nome),
    datasets: [
      {
        label: 'Quantidade de alunos',
        data: turmas.map((t) => t.quantidadeAlunos || 0)
      }
    ]
  };

  const dadosHistoricoAluno = aluno
    ? {
        labels: aluno.pontuacoes?.map((p) =>
          new Date(p.dataLancamento).toLocaleDateString()
        ) || [],
        datasets: [
          {
            label: 'Histórico de pontos',
            data: aluno.pontuacoes?.map((p) => p.pontos) || []
          }
        ]
      }
    : null;

  return (
    <div className="graficos-grid">
      <div className="card">
        <p className="section-subtitle">Desempenho</p>
        <h2>Pontuação por turma</h2>
        <div style={{ marginTop: '20px' }}>
          <Bar data={dadosTurmas} />
        </div>
      </div>

      <div className="card">
        <p className="section-subtitle">Distribuição</p>
        <h2>Quantidade de alunos</h2>
        <div style={{ marginTop: '20px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
          <Doughnut data={dadosAlunosTurma} />
        </div>
      </div>

      {aluno && dadosHistoricoAluno && (
        <div className="card graficos-grid__full">
          <p className="section-subtitle">Evolução</p>
          <h2>Histórico de desempenho do aluno</h2>
          <div style={{ marginTop: '20px' }}>
            <Line data={dadosHistoricoAluno} />
          </div>
        </div>
      )}

      {!aluno && pontuacoes.length > 0 && (
        <div className="card graficos-grid__full">
          <p className="section-subtitle">Lançamentos</p>
          <h2>Pontuações recentes</h2>
          <div style={{ marginTop: '20px' }}>
            <Line
              data={{
                labels: pontuacoes.slice(0, 10).map((p) =>
                  new Date(p.dataLancamento).toLocaleDateString()
                ),
                datasets: [
                  {
                    label: 'Últimos lançamentos',
                    data: pontuacoes.slice(0, 10).map((p) => p.pontos)
                  }
                ]
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}