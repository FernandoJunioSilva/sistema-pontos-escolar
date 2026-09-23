import React, { useState } from 'react';

import './CabecalhoEscola.css';

import logoEscola from '../assets/zinha/imagens/logo escola.png';

export default function CabecalhoEscola({
  paginaAtual,
  mudarPagina
}) {
  const [menuAberto, setMenuAberto] = useState(false);

  function abrirInicio() {
    mudarPagina('site-escola');

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }

  function irParaSecao(id) {
    mudarPagina('site-escola');

    setTimeout(() => {
      const elemento = document.getElementById(id);

      if (elemento) {
        elemento.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 250);
  }

  return (
    <>
      {/* BARRA SUPERIOR */}
      <div className="cabecalho-topo">

        <div className="cabecalho-topo-conteudo">

          <div className="cabecalho-topo-esquerda">

            <span>
              ✉ Escola.79383@educacao.mg.gov.br
            </span>

            <span>
              📍 Bocaiúva - MG
            </span>

          </div>


          <div className="cabecalho-topo-direita">

            <a
              href="https://www.instagram.com/terceirao.inf26/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://web.facebook.com/E.E.ZinhaMeira/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>

          </div>

        </div>

      </div>


      {/* CABEÇALHO PRINCIPAL */}
      <header className="cabecalho-principal">

        <div className="cabecalho-principal-conteudo">


          {/* LOGO */}
          <div
            className="cabecalho-logo-area"
            onClick={abrirInicio}
          >

            <img
              src={logoEscola}
              alt="E.E. Zinha Meira"
              className="cabecalho-logo"
            />

            <div>

              <h1>
                E.E. Zinha Meira
              </h1>

              <p>
                Escola Estadual • Bocaiúva/MG
              </p>

            </div>

          </div>


          {/* MENU */}
          <nav className="cabecalho-menu">


            {/* INÍCIO */}
            <button
              type="button"
              onClick={abrirInicio}
            >
              Início
            </button>


            {/* SISTEMA */}
            <div
              className="cabecalho-dropdown"
              onMouseEnter={() => setMenuAberto(true)}
              onMouseLeave={() => setMenuAberto(false)}
            >

              <button
                type="button"
                className={
                  paginaAtual === 'inicio' ||
                  paginaAtual === 'ranking' ||
                  paginaAtual === 'telao'
                    ? 'cabecalho-menu-ativo'
                    : ''
                }
                onClick={() => mudarPagina('inicio')}
              >
                Sistema de Pontos
                <span className="cabecalho-seta">
                  ▾
                </span>
              </button>


              {menuAberto && (

                <div className="cabecalho-submenu">

                  <button
                    type="button"
                    onClick={() => {
                      mudarPagina('inicio');
                      setMenuAberto(false);
                    }}
                  >
                    🏠 Sistema de Pontos
                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      mudarPagina('ranking');
                      setMenuAberto(false);
                    }}
                  >
                    🏆 Ranking
                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      mudarPagina('telao');
                      setMenuAberto(false);
                    }}
                  >
                    📺 Telão
                  </button>

                </div>

              )}

            </div>


            {/* CONTATOS */}
            <button
              type="button"
              onClick={() => irParaSecao('contatos')}
            >
              Contatos
            </button>


            {/* SOBRE */}
            <button
              type="button"
              onClick={() => irParaSecao('sobre')}
            >
              Sobre Nós
            </button>

          </nav>

        </div>

      </header>
    </>
  );
}