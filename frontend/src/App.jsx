import React, { useState } from 'react';
import ProfessorPage from './pages/ProfessorPage';
import AlunoPage from './pages/AlunoPage';
import AdminPage from './pages/AdminPage';
import RankingPublicoPage from './pages/RankingPublicoPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import RankingTelaoPage from './pages/RankingTelaoPage';
import { obterUsuario, estaAutenticado, logout } from './services/auth';
import logo from './assets/logo.png';

export default function App() {
  const [usuario, setUsuario] = useState(obterUsuario());
  const [pagina, setPagina] = useState('inicio');

  function sair() {
    logout();
    setUsuario(null);
    setPagina('inicio');
    window.location.reload();
  }

  const autenticado = estaAutenticado();

  return (
    <div>
      <header className="site-header">
        <div className="container">
          <div className="site-header__inner">
            <div className="site-brand">
              <div className="site-brand__logo">
  <img src={logo} alt="Logo da escola" />
</div>
              <div>
                <h1 className="site-brand__title">E.E. Zinha Meira</h1>
                <p className="site-brand__subtitle">Sistema de Pontos Escolar</p>
              </div>
            </div>

            <nav className="site-nav">
              <button onClick={() => setPagina('telao')}>Telão</button>
              <button onClick={() => setPagina('inicio')}>Início</button>
              <button onClick={() => setPagina('ranking')}>Ranking</button>
              {autenticado && usuario?.tipo === 'professor' && <button onClick={() => setPagina('professor')}>Professor</button>}
              {autenticado && usuario?.tipo === 'aluno' && <button onClick={() => setPagina('aluno')}>Aluno</button>}
              {autenticado && usuario?.tipo === 'admin' && <button onClick={() => setPagina('admin')}>Admin</button>}
              {autenticado ? <button onClick={sair}>Sair</button> : null}
            </nav>
          </div>
        </div>
      </header>

      {autenticado && (
        <div className="container">
          <div className="user-bar">
            <span>Usuário logado: <strong>{usuario?.nome}</strong> ({usuario?.tipo})</span>
          </div>
        </div>
      )}

      {pagina === 'inicio' && <HomePage onLogin={setUsuario} />}
      {pagina === 'professor' && autenticado && usuario?.tipo === 'professor' && <ProtectedRoute role="professor"><ProfessorPage /></ProtectedRoute>}
      {pagina === 'aluno' && autenticado && usuario?.tipo === 'aluno' && <ProtectedRoute role="aluno"><AlunoPage /></ProtectedRoute>}
      {pagina === 'admin' && autenticado && usuario?.tipo === 'admin' && <ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>}
      {pagina === 'ranking' && <RankingPublicoPage />}
      {pagina === 'telao' && <RankingTelaoPage />}

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__content">
            <div>
              <h3>E.E. Zinha Meira</h3>
              <p>Plataforma de acompanhamento de pontuação, desempenho e destaque das turmas.</p>
            </div>
            <div>
              <h4>Acesso rápido</h4>
              <p>Início</p>
              <p>Ranking</p>
              <p>Painéis por perfil</p>
            </div>
            <div>
              <h4>Projeto escolar</h4>
              <p>Gamificação</p>
              <p>Pontuação por turma</p>
              <p>Visual moderno e interativo</p>
            </div>
          </div>
          <div className="site-footer__bottom">© 2026 - E.E. Zinha Meira - Sistema de Pontos Escolar</div>
        </div>
      </footer>
    </div>
  );
}
