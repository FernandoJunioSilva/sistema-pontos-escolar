// ======================================================
// ENDEREÇO DO BACKEND
// ======================================================

const API_URL =
  'https://sistema-pontos-escolar-3acs.onrender.com/api';


// ======================================================
// TRATAR RESPOSTA
// ======================================================

async function tratarResposta(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get('content-type') || '';

  let dados = null;

  try {
    if (contentType.includes('application/json')) {
      dados = await response.json();
    } else {
      dados = await response.text();
    }
  } catch {
    dados = null;
  }

  if (!response.ok) {
    let mensagem = `Erro ${response.status}`;

    if (
      typeof dados === 'string' &&
      dados.trim() !== ''
    ) {
      mensagem = dados;
    }

    if (
      dados &&
      typeof dados === 'object'
    ) {
      mensagem =
        dados.message ||
        dados.mensagem ||
        dados.title ||
        mensagem;
    }

    throw new Error(mensagem);
  }

  return dados;
}


// ======================================================
// HEADERS PARA JSON
// ======================================================

function criarHeaders(
  token = null,
  temBody = false
) {
  const headers = {};

  if (temBody) {
    headers['Content-Type'] =
      'application/json';
  }

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  return headers;
}


// ======================================================
// HEADERS PARA FORMDATA
// ======================================================

function criarHeadersForm(token = null) {
  const headers = {};

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  // IMPORTANTE:
  // NÃO colocar Content-Type aqui.
  // O navegador cria automaticamente o
  // multipart/form-data com o boundary correto.

  return headers;
}


// ======================================================
// GET
// ======================================================

export async function apiGet(
  endpoint,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'GET',
        headers: criarHeaders(
          token,
          false
        )
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro GET ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// POST JSON
// ======================================================

export async function apiPost(
  endpoint,
  dados,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'POST',

        headers: criarHeaders(
          token,
          true
        ),

        body: JSON.stringify(dados)
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro POST ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// POST FORMDATA
// ======================================================

export async function apiPostForm(
  endpoint,
  formData,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'POST',

        headers:
          criarHeadersForm(token),

        body: formData
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro POST FORM ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// PUT JSON
// ======================================================

export async function apiPut(
  endpoint,
  dados,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'PUT',

        headers: criarHeaders(
          token,
          true
        ),

        body: JSON.stringify(dados)
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro PUT ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// PUT FORMDATA
// ======================================================

export async function apiPutForm(
  endpoint,
  formData,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'PUT',

        headers:
          criarHeadersForm(token),

        body: formData
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro PUT FORM ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// PATCH JSON
// ======================================================

export async function apiPatch(
  endpoint,
  dados,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'PATCH',

        headers: criarHeaders(
          token,
          true
        ),

        body: JSON.stringify(dados)
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro PATCH ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// DELETE
// ======================================================

export async function apiDelete(
  endpoint,
  token = null
) {
  try {
    const response = await fetch(
      `${API_URL}${endpoint}`,
      {
        method: 'DELETE',

        headers: criarHeaders(
          token,
          false
        )
      }
    );

    return await tratarResposta(response);
  } catch (error) {
    console.error(
      `Erro DELETE ${endpoint}:`,
      error
    );

    throw error;
  }
}


// ======================================================
// EXPORTAR URL
// ======================================================

export { API_URL };