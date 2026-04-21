const TOKEN_KEY = 'token';
const USER_KEY = 'usuario';

export function salvarSessao(token, usuario) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

export function obterToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function obterUsuario() {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function estaAutenticado() {
  return !!obterToken();
}
