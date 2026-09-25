import { useState } from 'react';

import AdminPage from './pages/AdminPage';
import AlunoPage from './pages/AlunoPage';
import ProfessorPage from './pages/ProfessorPage';
import RankingPublicoPage from './pages/RankingPublicoPage';
import HomePage from './pages/HomePage';
import RankingTelaoPage from './pages/RankingTelaoPage';
import SiteEscolaPage from './pages/SiteEscolaPage';

import { obterUsuario } from './services/auth';

function obterPaginaDoUsuario(usuario) {
  if (!usuario) {
    return 'inicio';
  }

  const tipo = String(usuario.tipo || '').toLowerCase();

  if (tipo === 'admin') {
    return 'admin';
  }

  if (tipo === 'professor') {
    return 'professor';
  }

  if (tipo === 'aluno') {
    return 'aluno';
  }

  return 'inicio';
}

function App() {
  // --------------------------------------------------
  // USUÁRIO LOGADO
  // --------------------------------------------------

  const [usuario, setUsuario] = useState(() => {
    try {
      return obterUsuario();
    } catch (error) {
      console.error('Erro ao recuperar usuário:', error);
      return null;
    }
  });

  // --------------------------------------------------
  // PÁGINA ATUAL
  // --------------------------------------------------

  // O site institucional será a página inicial
  const [pagina, setPagina] = useState('site');

  // --------------------------------------------------
  // MUDAR DE PÁGINA
  // --------------------------------------------------

  function mudarPagina(novaPagina) {
    setPagina(novaPagina);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // --------------------------------------------------
  // LOGIN REALIZADO
  // --------------------------------------------------

  function aoFazerLogin(usuarioLogado) {
    setUsuario(usuarioLogado);

    const paginaDestino =
      obterPaginaDoUsuario(usuarioLogado);

    setPagina(paginaDestino);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // --------------------------------------------------
  // VERIFICAR ACESSO
  // --------------------------------------------------

  function usuarioTemTipo(tipoPermitido) {
    if (!usuario) {
      return false;
    }

    const tipoUsuario =
      String(usuario.tipo || '').toLowerCase();

    return tipoUsuario === tipoPermitido;
  }

  // --------------------------------------------------
  // RENDERIZAÇÃO DAS PÁGINAS
  // --------------------------------------------------

  function renderizarPagina() {
    switch (pagina) {

      // ==============================================
      // SITE INSTITUCIONAL
      // ==============================================

      case 'site':
        return (
          <SiteEscolaPage
            mudarPagina={mudarPagina}
          />
        );


      // ==============================================
      // SISTEMA / LOGIN
      // ==============================================

      case 'inicio':
        return (
          <HomePage
            onLogin={aoFazerLogin}
          />
        );


      // ==============================================
      // RANKING PÚBLICO
      // ==============================================

      case 'ranking':
        return (
          <RankingPublicoPage />
        );


      // ==============================================
      // TELÃO
      // ==============================================

      case 'telao':
        return (
          <RankingTelaoPage />
        );


      // ==============================================
      // PROFESSOR
      // ==============================================

      case 'professor':
        if (!usuarioTemTipo('professor')) {
          return (
            <HomePage
              onLogin={aoFazerLogin}
            />
          );
        }

        return (
          <ProfessorPage />
        );


      // ==============================================
      // ADMINISTRADOR
      // ==============================================

      case 'admin':
        if (!usuarioTemTipo('admin')) {
          return (
            <HomePage
              onLogin={aoFazerLogin}
            />
          );
        }

        return (
          <AdminPage />
        );


      // ==============================================
      // ALUNO
      // ==============================================

      case 'aluno':
        if (!usuarioTemTipo('aluno')) {
          return (
            <HomePage
              onLogin={aoFazerLogin}
            />
          );
        }

        return (
          <AlunoPage />
        );


      // ==============================================
      // CASO A PÁGINA NÃO EXISTA
      // ==============================================

      default:
        return (
          <SiteEscolaPage
            mudarPagina={mudarPagina}
          />
        );
    }
  }

  // --------------------------------------------------
  // APP
  // --------------------------------------------------

  return (
    <>
      {renderizarPagina()}
    </>
  );
}

export default App;