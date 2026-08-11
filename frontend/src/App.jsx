import React, { useState } from 'react';
import ProfessorPage from './pages/ProfessorPage';
import AlunoPage from './pages/AlunoPage';
import AdminPage from './pages/AdminPage';
import RankingPublicoPage from './pages/RankingPublicoPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import RankingTelaoPage from './pages/RankingTelaoPage';
import SiteEscolaPage from './pages/SiteEscolaPage';
import { obterUsuario, estaAutenticado, logout } from './services/auth';

export default function App() {
  const [usuario, setUsuario] = useState(obterUsuario());
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
    } else if (usuarioLogado?.tipo === 'aluno') {
      setPagina('aluno');
    } else if (usuarioLogado?.tipo === 'admin') {
      setPagina('admin');
    } else {
      setPagina('inicio');
    }
  }

  return (
    <div>
      {autenticado && (
        <div className="container">
          <div className="user-bar">
            <span>
              Usuário logado: <strong>{usuario?.nome}</strong> ({usuario?.tipo})
            </span>

            <button onClick={() => setPagina('site-escola')}>Site da Escola</button>
            <button onClick={() => setPagina('inicio')}>Sistema de Pontos</button>

            {usuario?.tipo === 'professor' && (
              <button onClick={() => setPagina('professor')}>Professor</button>
            )}

            {usuario?.tipo === 'aluno' && (
              <button onClick={() => setPagina('aluno')}>Aluno</button>
            )}

            {usuario?.tipo === 'admin' && (
              <button onClick={() => setPagina('admin')}>Admin</button>
            )}

            <button onClick={sair}>Sair</button>
          </div>
        </div>
      )}

      {pagina === 'site-escola' && <SiteEscolaPage mudarPagina={setPagina} />}

      {pagina === 'inicio' && <HomePage onLogin={aoFazerLogin} />}

      {pagina === 'professor' && autenticado && usuario?.tipo === 'professor' && (
        <ProtectedRoute role="professor">
          <ProfessorPage />
        </ProtectedRoute>
      )}

      {pagina === 'aluno' && autenticado && usuario?.tipo === 'aluno' && (
        <ProtectedRoute role="aluno">
          <AlunoPage />
        </ProtectedRoute>
      )}

      {pagina === 'admin' && autenticado && usuario?.tipo === 'admin' && (
        <ProtectedRoute role="admin">
          <AdminPage />
        </ProtectedRoute>
      )}

      {pagina === 'ranking' && <RankingPublicoPage />}

      {pagina === 'telao' && <RankingTelaoPage />}
    </div>
  );
}