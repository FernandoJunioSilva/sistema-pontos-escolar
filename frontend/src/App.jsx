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
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  function fazerLogin(usuario) {

    setUsuarioLogado(usuario);

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

  function sair() {

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    setUsuarioLogado(null);
    setPagina('site-escola');
  }

  /*
    Estas páginas terão o cabeçalho
    institucional.
  */
  const paginasComCabecalho = [
    'site-escola',
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
          <RankingPublicoPage
            mudarPagina={setPagina}
          />
        );

      case 'telao':
        return (
          <RankingTelaoPage
            mudarPagina={setPagina}
          />
        );

      case 'professor':
        return (
          <ProfessorPage
            usuario={usuarioLogado}
            onSair={sair}
          />
        );

      case 'admin':
        return (
          <AdminPage
            usuario={usuarioLogado}
            onSair={sair}
          />
        );

      case 'aluno':
        return (
          <AlunoPage
            usuario={usuarioLogado}
            onSair={sair}
          />
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