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
  const [usuario, setUsuario] = useState(obterUsuario());

  // O site institucional abre primeiro
  const [pagina, setPagina] = useState('site-escola');

  const autenticado = estaAutenticado();

  function sair() {
    logout();
    setUsuario(null);
    setPagina('site-escola');
  }

  function aoFazerLogin(usuarioLogado) {
    setUsuario(usuarioLogado);

    if (usuarioLogado?.tipo === 'professor') {
      setPagina('professor');
      return;
    }

    if (usuarioLogado?.tipo === 'aluno') {
      setPagina('aluno');
      return;
    }

    if (usuarioLogado?.tipo === 'admin') {
      setPagina('admin');
      return;
    }

    setPagina('inicio');
  }

  return (
    <div>
      {/* SITE INSTITUCIONAL */}
      {pagina === 'site-escola' && (
        <SiteEscolaPage mudarPagina={setPagina} />
      )}

      {/* SISTEMA DE PONTOS / LOGIN */}
      {pagina === 'inicio' && (
        <HomePage onLogin={aoFazerLogin} />
      )}

      {/* PROFESSOR */}
      {pagina === 'professor' &&
        autenticado &&
        usuario?.tipo === 'professor' && (
          <ProtectedRoute role="professor">
            <ProfessorPage />
          </ProtectedRoute>
        )}

      {/* ALUNO */}
      {pagina === 'aluno' &&
        autenticado &&
        usuario?.tipo === 'aluno' && (
          <ProtectedRoute role="aluno">
            <AlunoPage />
          </ProtectedRoute>
        )}

      {/* ADMIN */}
      {pagina === 'admin' &&
        autenticado &&
        usuario?.tipo === 'admin' && (
          <ProtectedRoute role="admin">
            <AdminPage />
          </ProtectedRoute>
        )}

      {/* RANKING */}
      {pagina === 'ranking' && (
        <RankingPublicoPage />
      )}

      {/* TELÃO */}
      {pagina === 'telao' && (
        <RankingTelaoPage />
      )}

      {/* VOLTAR PARA O SITE */}
      {pagina !== 'site-escola' && (
        <div className="botao-voltar-site-area">
          <button
            type="button"
            className="botao-voltar-site"
            onClick={() => setPagina('site-escola')}
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
      )}
    </div>
  );
}