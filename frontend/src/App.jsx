import { useState } from 'react';

import AdminPage from './pages/AdminPage';
import AlunoPage from './pages/AlunoPage';
import ProfessorPage from './pages/ProfessorPage';

import RankingPublicoPage
  from './pages/RankingPublicoPage';

import HomePage
  from './pages/HomePage';

import RankingTelaoPage
  from './pages/RankingTelaoPage';

import SiteEscolaPage
  from './pages/SiteEscolaPage';

import {
  obterUsuario
} from './services/auth';


function obterPaginaDoUsuario(
  usuario
) {
  if (!usuario) {
    return 'inicio';
  }

  const tipo =
    String(
      usuario.tipo || ''
    ).toLowerCase();

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
  const [
    usuario,
    setUsuario
  ] = useState(() => {
    try {
      return obterUsuario();
    } catch (error) {
      console.error(
        'Erro ao recuperar usuário:',
        error
      );

      return null;
    }
  });


  /*
    site = site institucional
    inicio = sistema de pontos
    ranking = ranking público
    telao = modo telão
  */

  const [
    pagina,
    setPagina
  ] = useState('site');


  function mudarPagina(
    novaPagina
  ) {
    setPagina(
      novaPagina
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  function aoFazerLogin(
    usuarioLogado
  ) {
    setUsuario(
      usuarioLogado
    );

    const paginaDestino =
      obterPaginaDoUsuario(
        usuarioLogado
      );

    setPagina(
      paginaDestino
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  function usuarioTemTipo(
    tipoPermitido
  ) {
    if (!usuario) {
      return false;
    }

    const tipoUsuario =
      String(
        usuario.tipo || ''
      ).toLowerCase();

    return (
      tipoUsuario ===
      tipoPermitido
    );
  }


  function renderizarPagina() {
    switch (pagina) {

      /* SITE DA ESCOLA */

      case 'site':
        return (
          <SiteEscolaPage
            mudarPagina={
              mudarPagina
            }
          />
        );


      /* SISTEMA DE PONTOS */

      case 'inicio':
        return (
          <HomePage
            onLogin={
              aoFazerLogin
            }
            mudarPagina={
              mudarPagina
            }
          />
        );


      /* RANKING */

      case 'ranking':
        return (
          <RankingPublicoPage
            mudarPagina={
              mudarPagina
            }
          />
        );


      /* TELÃO */

      case 'telao':
        return (
          <RankingTelaoPage
            mudarPagina={
              mudarPagina
            }
          />
        );


      /* PROFESSOR */

      case 'professor':

        if (
          !usuarioTemTipo(
            'professor'
          )
        ) {
          return (
            <HomePage
              onLogin={
                aoFazerLogin
              }
              mudarPagina={
                mudarPagina
              }
            />
          );
        }

        return (
          <ProfessorPage />
        );


      /* ADMIN */

      case 'admin':

        if (
          !usuarioTemTipo(
            'admin'
          )
        ) {
          return (
            <HomePage
              onLogin={
                aoFazerLogin
              }
              mudarPagina={
                mudarPagina
              }
            />
          );
        }

        return (
          <AdminPage />
        );


      /* ALUNO */

      case 'aluno':

        if (
          !usuarioTemTipo(
            'aluno'
          )
        ) {
          return (
            <HomePage
              onLogin={
                aoFazerLogin
              }
              mudarPagina={
                mudarPagina
              }
            />
          );
        }

        return (
          <AlunoPage />
        );


      default:
        return (
          <SiteEscolaPage
            mudarPagina={
              mudarPagina
            }
          />
        );
    }
  }


  return (
    <>
      {renderizarPagina()}
    </>
  );
}


export default App;