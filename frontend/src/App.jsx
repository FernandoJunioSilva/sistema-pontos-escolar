import React, { useState } from 'react';

import SiteEscolaPage from './pages/SiteEscolaPage';
import HomePage from './pages/HomePage';
import RankingPublicoPage from './pages/RankingPublicoPage';
import RankingTelaoPage from './pages/RankingTelaoPage';
import ProfessorPage from './pages/ProfessorPage';
import AdminPage from './pages/AdminPage';
import AlunoPage from './pages/AlunoPage';

import CabecalhoEscola from './components/CabecalhoEscola';

export default function App() {
  const [pagina, setPagina] = useState('site-escola');

  function fazerLogin(usuario) {
    const tipo = (
      usuario?.tipo ||
      usuario?.Tipo ||
      ''
    ).toLowerCase();

    if (tipo === 'admin') {
      setPagina('admin');
      return;
    }

    if (tipo === 'professor') {
      setPagina('professor');
      return;
    }

    if (tipo === 'aluno') {
      setPagina('aluno');
      return;
    }

    setPagina('inicio');
  }

  /*
    IMPORTANTE:

    O site institucional NÃO está aqui.

    Ele continua usando o próprio cabeçalho,
    preservando o layout da página inicial.
  */
  const paginasComCabecalho = [
    'inicio',
    'ranking',
    'telao'
  ];

  function renderizarPagina() {
    switch (pagina) {
      case 'site-escola':
        return (
          <SiteEscolaPage
            mudarPagina={setPagina}
          />
        );

      case 'inicio':
        return (
          <HomePage
            onLogin={fazerLogin}
          />
        );

      case 'ranking':
        return (
          <RankingPublicoPage />
        );

      case 'telao':
        return (
          <RankingTelaoPage />
        );

      case 'professor':
        return (
          <ProfessorPage />
        );

      case 'admin':
        return (
          <AdminPage />
        );

      case 'aluno':
        return (
          <AlunoPage />
        );

      default:
        return (
          <SiteEscolaPage
            mudarPagina={setPagina}
          />
        );
    }
  }

  return (
    <>
      {paginasComCabecalho.includes(pagina) && (
        <CabecalhoEscola
          paginaAtual={pagina}
          mudarPagina={setPagina}
        />
      )}

      {renderizarPagina()}
    </>
  );
}