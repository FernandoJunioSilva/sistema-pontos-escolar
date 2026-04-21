import React from 'react';

export default function MedalhasAluno({ aluno }) {
  return (
    <div className="card">
      <h2>Medalhas</h2>
      <p>Aluno: {aluno?.nome}</p>
      <p>Pontos: {aluno?.pontos}</p>
    </div>
  );
}