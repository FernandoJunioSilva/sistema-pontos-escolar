import React, { useState } from 'react';

import ProfessorPage from './pages/ProfessorPage';
import AlunoPage from './pages/AlunoPage';
import AdminPage from './pages/AdminPage';
import RankingPublicoPage from './pages/RankingPublicoPage';
import HomePage from './pages/HomePage';
import RankingTelaoPage from './pages/RankingTelaoPage';
import SiteEscolaPage from './pages/SiteEscolaPage';

import ProtectedRoute from './components/ProtectedRoute';

import {
  obterUsuario,
  estaAutenticado,
  logout
} from './services/auth';


export default function App() {

  const [usuario, setUsuario] =
    useState(obterUsuario());

  // Página inicial do projeto
  const [pagina, setPagina] =
    useState('site-escola');

  const autenticado =
    estaAutenticado();


  // =====================================================
  // TROCAR DE PÁGINA
  // =====================================================

  function mudarPagina(novaPagina) {

    setPagina(novaPagina);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  // =====================================================
  // SAIR DO SISTEMA
  // =====================================================

  function sair() {

    logout();

    setUsuario(null);

    mudarPagina('site-escola');
  }


  // =====================================================
  // LOGIN
  // =====================================================

  function aoFazerLogin(usuarioLogado) {

    setUsuario(usuarioLogado);

    if (
      usuarioLogado?.tipo ===
      'professor'
    ) {

      mudarPagina('professor');

      return;
    }


    if (
      usuarioLogado?.tipo ===
      'aluno'
    ) {

      mudarPagina('aluno');

      return;
    }


    if (
      usuarioLogado?.tipo ===
      'admin'
    ) {

      mudarPagina('admin');

      return;
    }


    mudarPagina('inicio');
  }


  return (

    <div>

      {/* ============================================ */}
      {/* SITE INSTITUCIONAL                          */}
      {/* ============================================ */}

      {pagina === 'site-escola' && (

        <SiteEscolaPage
          mudarPagina={mudarPagina}
        />

      )}


      {/* ============================================ */}
      {/* SISTEMA DE PONTOS / LOGIN                   */}
      {/* ============================================ */}

      {pagina === 'inicio' && (

        <HomePage

          onLogin={
            aoFazerLogin
          }

          mudarPagina={
            mudarPagina
          }

        />

      )}


      {/* ============================================ */}
      {/* PROFESSOR                                   */}
      {/* ============================================ */}

      {
        pagina === 'professor' &&
        autenticado &&
        usuario?.tipo === 'professor' && (

          <ProtectedRoute
            role="professor"
          >

            <ProfessorPage />

          </ProtectedRoute>

        )
      }


      {/* ============================================ */}
      {/* ALUNO                                       */}
      {/* ============================================ */}

      {
        pagina === 'aluno' &&
        autenticado &&
        usuario?.tipo === 'aluno' && (

          <ProtectedRoute
            role="aluno"
          >

            <AlunoPage />

          </ProtectedRoute>

        )
      }


      {/* ============================================ */}
      {/* ADMINISTRADOR                               */}
      {/* ============================================ */}

      {
        pagina === 'admin' &&
        autenticado &&
        usuario?.tipo === 'admin' && (

          <ProtectedRoute
            role="admin"
          >

            <AdminPage />

          </ProtectedRoute>

        )
      }


      {/* ============================================ */}
      {/* RANKING                                     */}
      {/* ============================================ */}

      {pagina === 'ranking' && (

        <RankingPublicoPage

          mudarPagina={
            mudarPagina
          }

        />

      )}


      {/* ============================================ */}
      {/* TELÃO                                       */}
      {/* ============================================ */}

      {pagina === 'telao' && (

        <RankingTelaoPage

          mudarPagina={
            mudarPagina
          }

        />

      )}


      {/* ============================================ */}
      {/* CONTROLES DAS ÁREAS AUTENTICADAS            */}
      {/* ============================================ */}

      {
        (
          pagina === 'professor' ||
          pagina === 'aluno' ||
          pagina === 'admin'
        ) && (

          <div
            className="botao-voltar-site-area"
          >

            <button
              type="button"
              className="botao-voltar-site"
              onClick={() =>
                mudarPagina(
                  'site-escola'
                )
              }
            >

              ← Site da Escola

            </button>


            {autenticado && (

              <button
                type="button"
                className="botao-sair-sistema"
                onClick={sair}
              >

                Sair

              </button>

            )}

          </div>

        )
      }

    </div>

  );
}