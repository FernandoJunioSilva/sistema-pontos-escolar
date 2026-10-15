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


/* ===================================================== */
/* DESCOBRIR QUAL PÁGINA ABRIR DEPOIS DO LOGIN          */
/* ===================================================== */

function obterPaginaDoUsuario(usuario) {
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


/* ===================================================== */
/* APP                                                   */
/* ===================================================== */

function App() {

  /* =================================================== */
  /* USUÁRIO LOGADO                                      */
  /* =================================================== */

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


  /* =================================================== */
  /* PÁGINA ATUAL                                        */
  /* =================================================== */

  /*
    Páginas usadas:

    site      = Site institucional da escola
    inicio    = Sistema de Pontos / Login
    ranking   = Ranking público
    telao     = Modo Telão
    professor = Página de lançamento de pontuação
    admin     = Administração
    aluno     = Área do aluno
  */

  const [
    pagina,
    setPagina
  ] = useState('site');


  /* =================================================== */
  /* TROCAR DE PÁGINA                                    */
  /* =================================================== */

  function mudarPagina(novaPagina) {

    setPagina(
      novaPagina
    );


    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  /* =================================================== */
  /* LOGIN REALIZADO                                     */
  /* =================================================== */

  function aoFazerLogin(usuarioLogado) {

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


  /* =================================================== */
  /* VERIFICAR PERFIL                                    */
  /* =================================================== */

  function usuarioTemTipo(tipoPermitido) {

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


  /* =================================================== */
  /* RENDERIZAR PÁGINA                                   */
  /* =================================================== */

  function renderizarPagina() {

    switch (pagina) {


      /* =============================================== */
      /* SITE INSTITUCIONAL                              */
      /* =============================================== */

      case 'site':

        return (

          <SiteEscolaPage
            mudarPagina={
              mudarPagina
            }
          />

        );


      /* =============================================== */
      /* SISTEMA DE PONTOS / LOGIN                       */
      /* =============================================== */

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


      /* =============================================== */
      /* RANKING PÚBLICO                                 */
      /* =============================================== */

      case 'ranking':

        return (

          <RankingPublicoPage
            mudarPagina={
              mudarPagina
            }
          />

        );


      /* =============================================== */
      /* MODO TELÃO                                      */
      /* =============================================== */

      case 'telao':

        return (

          <RankingTelaoPage
            mudarPagina={
              mudarPagina
            }
          />

        );


      /* =============================================== */
      /* PÁGINA DE PONTUAÇÃO                             */
      /* =============================================== */

      case 'professor':

        /*
          Se não houver usuário professor logado,
          volta para a tela de login.
        */

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


        /*
          IMPORTANTE:

          Aqui passamos mudarPagina
          para ProfessorPage.

          Isso permite que o botão
          "← Voltar" da nova página
          funcione corretamente.
        */

        return (

          <ProfessorPage
            mudarPagina={
              mudarPagina
            }
          />

        );


      /* =============================================== */
      /* ADMINISTRADOR                                   */
      /* =============================================== */

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


      /* =============================================== */
      /* ALUNO                                           */
      /* =============================================== */

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


      /* =============================================== */
      /* PÁGINA DESCONHECIDA                             */
      /* =============================================== */

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


  /* =================================================== */
  /* RETORNO PRINCIPAL                                   */
  /* =================================================== */

  return (
    <>
      {
        renderizarPagina()
      }
    </>
  );

}


/* ===================================================== */
/* EXPORTAÇÃO                                            */
/* ===================================================== */

export default App;