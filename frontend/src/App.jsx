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

  // Página da escola abre primeiro
  const [pagina, setPagina] = useState('site-escola');

  const autenticado = estaAutenticado();

  function sair() {
    logout();
    setUsuario(null);
    setPagina('site-escola');
    window.location.reload();
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

      {/* ADMINISTRADOR */}
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

      {/* BOTÃO PARA VOLTAR AO SITE QUANDO ESTIVER LOGADO */}
      {pagina !== 'site-escola' && autenticado && (
        <div
          style={{
            position: 'fixed',
            right: '18px',
            bottom: '18px',
            zIndex: 9999
          }}
        >
          <button
            type="button"
            onClick={() => setPagina('site-escola')}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700'
            }}
          >
            ← Site da Escola
          </button>

          <button
            type="button"
            onClick={sair}
            style={{
              marginLeft: '8px',
              padding: '10px 16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '700'
            }}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}