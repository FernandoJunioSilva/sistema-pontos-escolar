import React, { useEffect, useState } from 'react';

import './SiteEscolaPage.css';

import logoEscola from '../assets/zinha/imagens/logo escola.png';

import foto1 from '../assets/zinha/imagens/foto1.jpg';
import foto2 from '../assets/zinha/imagens/foto2.jpg';
import foto3 from '../assets/zinha/imagens/foto3.jpg';
import foto4 from '../assets/zinha/imagens/foto4.jpg';
import foto5 from '../assets/zinha/imagens/foto5.jpg';
import foto6 from '../assets/zinha/imagens/foto6.jpg';
import foto7 from '../assets/zinha/imagens/foto7.jpg';
import foto8 from '../assets/zinha/imagens/foto8.jpg';
import foto9 from '../assets/zinha/imagens/foto9.jpg';
import foto10 from '../assets/zinha/imagens/foto10.jpg';

export default function SiteEscolaPage({
  mudarPagina
}) {
  const fotos = [
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
    foto6,
    foto7,
    foto8,
    foto9,
    foto10
  ];

  const [fotoAtual, setFotoAtual] =
    useState(0);

  const [
    menuSistemaAberto,
    setMenuSistemaAberto
  ] = useState(false);


  /* =====================================================
     CARROSSEL
  ===================================================== */

  useEffect(() => {
    const intervalo = setInterval(() => {
      setFotoAtual((anterior) =>
        anterior === fotos.length - 1
          ? 0
          : anterior + 1
      );
    }, 5000);

    return () =>
      clearInterval(intervalo);
  }, [fotos.length]);


  /* =====================================================
     ROLAGEM
  ===================================================== */

  function rolarPara(id) {
    const elemento =
      document.getElementById(id);

    if (elemento) {
      elemento.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }


  return (
    <div className="site-escola-page">


      {/* =================================================
          BARRA SUPERIOR
      ================================================= */}

      <div className="escola-topbar">

        <div className="escola-topbar-container">

          <div className="escola-topbar-left">

            <span>
              ✉ Escola.79383@educacao.mg.gov.br
            </span>

            <span>
              📍 Bocaiúva - MG
            </span>

          </div>


          <div className="escola-topbar-right">

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


      {/* =================================================
          CABEÇALHO ORIGINAL
      ================================================= */}

      <header className="escola-header">

        <div className="escola-header-container">


          {/* LOGO */}

          <div
            className="escola-logo-area"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
          >

            <img
              src={logoEscola}
              alt="E.E. Zinha Meira"
              className="escola-logo"
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

          <nav className="escola-menu">


            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              Início
            </button>


            {/* SISTEMA DE PONTOS */}

            <div
              className="escola-menu-dropdown"
              onMouseEnter={() =>
                setMenuSistemaAberto(true)
              }
              onMouseLeave={() =>
                setMenuSistemaAberto(false)
              }
            >

              <button
                type="button"
                onClick={() =>
                  mudarPagina('inicio')
                }
              >
                Sistema de Pontos

                <span className="escola-menu-seta">
                  ▾
                </span>
              </button>


              {menuSistemaAberto && (

                <div className="escola-submenu">

                  <button
                    type="button"
                    onClick={() =>
                      mudarPagina('ranking')
                    }
                  >
                    🏆 Ranking
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      mudarPagina('telao')
                    }
                  >
                    📺 Telão
                  </button>

                </div>

              )}

            </div>


            <button
              type="button"
              onClick={() =>
                rolarPara('contatos')
              }
            >
              Contatos
            </button>


            <button
              type="button"
              onClick={() =>
                rolarPara('sobre')
              }
            >
              Sobre Nós
            </button>

          </nav>

        </div>

      </header>


      {/* =================================================
          BANNER
      ================================================= */}

      <section className="escola-banner-principal">

        <img
          src={fotos[fotoAtual]}
          alt="E.E. Zinha Meira"
        />


        <div className="escola-banner-dots">

          {fotos.map((_, index) => (

            <button
              key={index}
              type="button"
              aria-label={
                `Mostrar imagem ${index + 1}`
              }
              className={
                fotoAtual === index
                  ? 'escola-banner-dot ativo'
                  : 'escola-banner-dot'
              }
              onClick={() =>
                setFotoAtual(index)
              }
            />

          ))}

        </div>

      </section>


      {/* =================================================
          SERVIÇOS
      ================================================= */}

      <section className="escola-servicos">

        <div className="escola-section-title">

          <div className="escola-section-icon">
            📚
          </div>

          <h2>
            Serviços Oferecidos
          </h2>

          <div className="escola-section-line" />

        </div>


        <div className="escola-servicos-grid">


          <div className="escola-servico-card">

            <div className="escola-servico-icon">
              📖
            </div>

            <h3>
              Reforço Escolar
            </h3>

            <p>
              Apoio pedagógico para auxiliar
              os estudantes no desenvolvimento
              da aprendizagem.
            </p>

          </div>


          <div className="escola-servico-card">

            <div className="escola-servico-icon">
              🎓
            </div>

            <h3>
              Atividades Educativas
            </h3>

            <p>
              Projetos e atividades que estimulam
              conhecimento, criatividade e
              participação.
            </p>

          </div>


          <div className="escola-servico-card">

            <div className="escola-servico-icon">
              🤝
            </div>

            <h3>
              Apoio ao Aluno
            </h3>

            <p>
              Acompanhamento e orientação para
              contribuir com o desenvolvimento
              dos estudantes.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          NOVIDADES
      ================================================= */}

      <section className="escola-novidades">

        <div className="escola-section-title">

          <div className="escola-section-icon">
            📢
          </div>

          <h2>
            Novidades
          </h2>

          <div className="escola-section-line" />

        </div>


        <div className="escola-novidades-card">

          <div className="escola-novidades-icon">
            🏫
          </div>

          <div>

            <h3>
              Acompanhe as novidades da escola
            </h3>

            <p>
              Projetos, atividades, eventos e
              ações desenvolvidas pela comunidade
              escolar da E.E. Zinha Meira.
            </p>

          </div>

        </div>

      </section>


      {/* =================================================
          SOBRE NÓS
      ================================================= */}

      <section
        id="sobre"
        className="escola-sobre"
      >

        <div className="escola-section-title">

          <div className="escola-section-icon">
            🏫
          </div>

          <h2>
            Sobre Nós
          </h2>

          <div className="escola-section-line" />

        </div>


        <div className="escola-sobre-card">

          <div className="escola-sobre-texto">

            <h2>
              Escola Estadual Zinha Meira
            </h2>

            <p>
              A Escola Estadual Zinha Meira,
              localizada em Bocaiúva/MG, possui
              como compromisso oferecer educação
              de qualidade e contribuir para a
              formação integral dos estudantes.
            </p>

            <p>
              A escola incentiva conhecimento,
              responsabilidade, participação,
              respeito e desenvolvimento de
              habilidades para a vida acadêmica
              e profissional.
            </p>


            <div className="escola-info-grid">

              <div>

                <span>
                  INEP
                </span>

                <strong>
                  31079383
                </strong>

              </div>


              <div>

                <span>
                  Município
                </span>

                <strong>
                  Bocaiúva - MG
                </strong>

              </div>


              <div>

                <span>
                  Rede
                </span>

                <strong>
                  Estadual
                </strong>

              </div>

            </div>

          </div>


          <div className="escola-sobre-foto">

            <img
              src={foto6}
              alt="E.E. Zinha Meira"
            />

          </div>

        </div>

      </section>


      {/* =================================================
          CONTATOS
      ================================================= */}

      <section
        id="contatos"
        className="escola-contatos"
      >

        <div className="escola-section-title">

          <div className="escola-section-icon">
            📞
          </div>

          <h2>
            Contatos
          </h2>

          <div className="escola-section-line" />

        </div>


        <div className="escola-contatos-grid">


          <div className="escola-contato-card">

            <div className="escola-contato-icon">
              📍
            </div>

            <h3>
              Endereço
            </h3>

            <p>
              Rua Presidente Juscelino Kubitschek,
              615 – Pernambuco
            </p>

            <p>
              Bocaiúva/MG – CEP 39390-000
            </p>

          </div>


          <div className="escola-contato-card">

            <div className="escola-contato-icon">
              📱
            </div>

            <h3>
              Telefone
            </h3>

            <p>
              (38) 93251-1732
            </p>

            <a
              href="https://wa.me/qr/V57FQNNTV7UIP1"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

          </div>


          <div className="escola-contato-card">

            <div className="escola-contato-icon">
              ✉️
            </div>

            <h3>
              E-mail
            </h3>

            <p>
              Escola.79383@educacao.mg.gov.br
            </p>

            <a
              href="mailto:Escola.79383@educacao.mg.gov.br"
            >
              Enviar e-mail
            </a>

          </div>


          <div className="escola-contato-card">

            <div className="escola-contato-icon">
              🌐
            </div>

            <h3>
              Redes Sociais
            </h3>

            <a
              href="https://www.instagram.com/terceirao.inf26/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>

            <br />

            <a
              href="https://web.facebook.com/E.E.ZinhaMeira/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>

          </div>

        </div>

      </section>


      {/* =================================================
          RODAPÉ
      ================================================= */}

      <footer className="escola-footer">

        <div className="escola-footer-container">


          <div>

            <h3>
              E.E. Zinha Meira
            </h3>

            <p>
              Escola Estadual
            </p>

            <p>
              Bocaiúva - Minas Gerais
            </p>

          </div>


          <div>

            <h3>
              Desenvolvimento
            </h3>

            <p>
              Beatriz G. Cardoso
            </p>

            <p>
              Bruna E. M. Silva
            </p>

            <p>
              Lara Bragança C. Rosa
            </p>

            <p>
              Thalisson R.A. Rosa
            </p>

          </div>


          <div>

            <h3>
              Orientação
            </h3>

            <p>
              Professor Jader Leal
            </p>

            <p>
              Coordenação:
            </p>

            <p>
              Fernando J. Silva
            </p>

            <p>
              Amanda K. D. Werneck
            </p>

          </div>


          <div>

            <h3>
              Gestão Escolar
            </h3>

            <p>
              Diretora:
              Janiny J. D. Oliveira
            </p>

            <p>
              Vice-diretores:
            </p>

            <p>
              Elizeth C. O. Montes
            </p>

            <p>
              Helbert E. C. Souza
            </p>

            <p>
              Cristiane C. Alves
            </p>

          </div>

        </div>


        <div className="escola-footer-bottom">

          © 2026 Escola Estadual Zinha Meira -
          Bocaiúva/MG

        </div>

      </footer>

    </div>
  );
}