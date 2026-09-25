import { useState } from 'react';

// ======================================================
// PÁGINAS
// ======================================================

import AdminPage from './pages/AdminPage';
import AlunoPage from './pages/AlunoPage';
import ProfessorPage from './pages/ProfessorPage';
import RankingPublicoPage from './pages/RankingPublicoPage';
import HomePage from './pages/HomePage';
import RankingTelaoPage from './pages/RankingTelaoPage';
import SiteEscolaPage from './pages/SiteEscolaPage';

// ======================================================
// COMPONENTES
// ======================================================

import VoltarSiteButton from './components/VoltarSiteButton';

// ======================================================
// AUTENTICAÇÃO
// ======================================================

import { obterUsuario } from './services/auth';


// ======================================================
// DESCOBRIR PARA QUAL PÁGINA O USUÁRIO DEVE IR
// ======================================================

function obterPaginaDoUsuario(usuario) {
  if (!usuario) {
    return 'inicio';
  }

  const tipo =
    String(usuario.tipo || '').toLowerCase();

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


// ======================================================
// APP
// ======================================================

function App() {

  // ====================================================
  // USUÁRIO LOGADO
  // ====================================================

  const [usuario, setUsuario] = useState(() => {
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


  // ====================================================
  // PÁGINA ATUAL
  // ====================================================

  // A página inicial será o site institucional.
  const [pagina, setPagina] =
    useState('site');


  // ====================================================
  // TROCAR DE PÁGINA
  // ====================================================

  function mudarPagina(novaPagina) {
    setPagina(novaPagina);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // ====================================================
  // VOLTAR PARA O SITE DA ESCOLA
  // ====================================================

  function voltarParaSite() {
    setPagina('site');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // ====================================================
  // LOGIN REALIZADO
  // ====================================================

  function aoFazerLogin(usuarioLogado) {

    setUsuario(usuarioLogado);

    const paginaDestino =
      obterPaginaDoUsuario(
        usuarioLogado
      );

    setPagina(paginaDestino);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // ====================================================
  // VERIFICAR TIPO DO USUÁRIO
  // ====================================================

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
      tipoUsuario === tipoPermitido
    );
  }


  // ====================================================
  // MOSTRAR BOTÃO VOLTAR
  // ====================================================

  // O botão aparecerá somente nestas três páginas:
  //
  // inicio  = Sistema de Pontos
  // ranking = Ranking
  // telao   = Telão

  const mostrarBotaoVoltar =
    pagina === 'inicio' ||
    pagina === 'ranking' ||
    pagina === 'telao';


  // ====================================================
  // RENDERIZAR PÁGINA
  // ====================================================

  function renderizarPagina() {

    switch (pagina) {

      // =================================================
      // SITE INSTITUCIONAL
      // =================================================

      case 'site':

        return (
          <SiteEscolaPage
            mudarPagina={mudarPagina}
          />
        );


      // =================================================
      // SISTEMA DE PONTOS / LOGIN
      // =================================================

      case 'inicio':

        return (
          <HomePage
            onLogin={aoFazerLogin}
          />
        );


      // =================================================
      // RANKING PÚBLICO
      // =================================================

      case 'ranking':

        return (
          <RankingPublicoPage />
        );


      // =================================================
      // TELÃO
      // =================================================

      case 'telao':

        return (
          <RankingTelaoPage />
        );


      // =================================================
      // PROFESSOR
      // =================================================

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
            />
          );
        }

        return (
          <ProfessorPage />
        );


      // =================================================
      // ADMINISTRADOR
      // =================================================

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
            />
          );
        }

        return (
          <AdminPage />
        );


      // =================================================
      // ALUNO
      // =================================================

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
            />
          );
        }

        return (
          <AlunoPage />
        );


      // =================================================
      // PÁGINA NÃO ENCONTRADA
      // =================================================

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


  // ====================================================
  // INTERFACE PRINCIPAL
  // ====================================================

  return (
    <>
      {mostrarBotaoVoltar && (
        <VoltarSiteButton
          onVoltar={
            voltarParaSite
          }
        />
      )}

      {renderizarPagina()}
    </>
  );
}


// ======================================================
// EXPORTAÇÃO
// ======================================================

export default App;