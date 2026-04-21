import React from 'react';
import { estaAutenticado, obterUsuario } from '../services/auth';

export default function ProtectedRoute({ children, role }) {
  const usuario = obterUsuario();

  if (!estaAutenticado()) {
    return <div className="container"><div className="card">Acesso negado. Faça login.</div></div>;
  }

  if (role && usuario?.tipo !== role) {
    return <div className="container"><div className="card">Você não tem permissão para acessar esta página.</div></div>;
  }

  return children;
}
