import React, { useState } from 'react';
import './SiteEscolaPage.css';

import logoEscola from '../assets/zinha/imagens/logo escola.png';
import foto4 from '../assets/zinha/imagens/foto4.jpg';

export default function SiteEscolaPage({ mudarPagina }) {
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [menuSistemaAberto, setMenuSistemaAberto] = useState(false);
  const [mostrarNovidades, setMostrarNovidades] = useState(false);

  function trocarAba(aba) {
    setAbaAtiva(aba);
    setMenuSistemaAberto(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function abrirSistema(pagina) {
    setMenuSistemaAberto(false);

    if (typeof mudarPagina === 'function') {
      mudarPagina(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="zm-site">
      <header className="zm-topbar">
        <div className="zm-topbar-inner">
          <div className="zm-topbar-left">
            <a href="mailto:Escola.79383@educacao.mg.gov.br" className="zm-topbar-item">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
              </svg>
              <span>Escola.79383@educacao.mg.gov.br</span>
            </a>

            <span className="zm-topbar-item">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
              <span>Bocaiúva - MG</span>
            </span>
          </div>

          <div className="zm-social">
            <a
              href="https://www.instagram.com/terceirao.inf26/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 1.5A1.5 1.5 0 1 1 18 8.5a1.5 1.5 0 0 1 0-3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
            </a>

            <a
              href="https://web.facebook.com/E.E.ZinhaMeira/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.57V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
              </svg>
            </a>

            <a
              href="https://wa.me/qr/V57FQNNTV7UIP1"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.28-1.52A9.99 9.99 0 1 0 12.04 2Zm0 17.97a8.02 8.02 0 0 1-4.09-1.12l-.29-.17-3.13.9.84-3.05-.19-.31a7.95 7.95 0 1 1 6.86 3.75Zm4.38-5.97c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <header className="zm-header">
        <div className="zm-header-inner">
          <button type="button" className="zm-brand" onClick={() => trocarAba('inicio')}>
            <img src={logoEscola} alt="Logo da Escola Estadual Zinha Meira" />
            <div className="zm-brand-text">
              <h1>Zinha Meira</h1>
              <p>Crescendo e Aprendendo Sempre</p>
            </div>
          </button>

          <nav className="zm-nav" aria-label="Menu principal">
            <button
              type="button"
              className={abaAtiva === 'inicio' ? 'is-active' : ''}
              onClick={() => trocarAba('inicio')}
            >
              Início
            </button>

            <button
              type="button"
              className={abaAtiva === 'sobre' ? 'is-active' : ''}
              onClick={() => trocarAba('sobre')}
            >
              Sobre Nós
            </button>

            <button
              type="button"
              className={abaAtiva === 'contatos' ? 'is-active' : ''}
              onClick={() => trocarAba('contatos')}
            >
              Contatos
            </button>

            <div className={`zm-system-menu ${menuSistemaAberto ? 'is-open' : ''}`}>
              <button
                type="button"
                className="zm-system-trigger"
                onClick={() => setMenuSistemaAberto((valor) => !valor)}
                aria-expanded={menuSistemaAberto}
              >
                Sistema Escolar
                <span aria-hidden="true">▾</span>
              </button>

              <div className="zm-system-dropdown">
                <button type="button" onClick={() => abrirSistema('inicio')}>
                  Acessar Sistema
                </button>
                <button type="button" onClick={() => abrirSistema('ranking')}>
                  Ranking
                </button>
                <button type="button" onClick={() => abrirSistema('telao')}>
                  Telão
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="zm-main">
        {abaAtiva === 'inicio' && (
          <section className="zm-home">
            <section className="zm-banner" aria-label="Foto da escola">
              <img src={foto4} alt="Área externa da Escola Estadual Zinha Meira" />
            </section>

            <section className="zm-services">
              <div className="zm-section-title">
                <h2>Serviços Oferecidos</h2>
                <div className="zm-title-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 6.25C10.17 4.63 7.8 4 5.5 4 4.28 4 3.1 4.2 2 4.57v14.52c1.1-.37 2.28-.57 3.5-.57 2.3 0 4.67.63 6.5 2.25V6.25Zm0 0c1.83-1.62 4.2-2.25 6.5-2.25 1.22 0 2.4.2 3.5.57v14.52c-1.1-.37-2.28-.57-3.5-.57-2.3 0-4.67.63-6.5 2.25V6.25Z" />
                  </svg>
                </div>
                <span className="zm-title-line" />
              </div>

              <div className="zm-service-grid">
                <article className="zm-service-card">
                  <div className="zm-service-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M21 4H14c-.8 0-1.55.3-2 .78A2.75 2.75 0 0 0 10 4H3a2 2 0 0 0-2 2v13a1 1 0 0 0 1.45.9A10.42 10.42 0 0 1 7 19c1.7 0 3.08.5 4.32 1.55a1.05 1.05 0 0 0 1.36 0C13.92 19.5 15.3 19 17 19a10.42 10.42 0 0 1 4.55.9A1 1 0 0 0 23 19V6a2 2 0 0 0-2-2Zm-10 14a8.17 8.17 0 0 0-4-.97 12.55 12.55 0 0 0-4 .65V6h7c.55 0 1 .45 1 1v11Zm10-.32a12.55 12.55 0 0 0-4-.65 8.17 8.17 0 0 0-4 .97V7c0-.55.45-1 1-1h7v11.68Z" />
                    </svg>
                  </div>
                  <h3>Reforço Escolar</h3>
                  <p>Acompanhamento pedagógico para melhorar o desempenho dos alunos.</p>
                </article>

                <article className="zm-service-card">
                  <div className="zm-service-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z" />
                    </svg>
                  </div>
                  <h3>Atividades Educativas</h3>
                  <p>Projetos que estimulam criatividade, aprendizado e convivência.</p>
                </article>

                <article className="zm-service-card">
                  <div className="zm-service-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
                    </svg>
                  </div>
                  <h3>Apoio ao Aluno</h3>
                  <p>Um ambiente acolhedor para o desenvolvimento pessoal e acadêmico.</p>
                </article>
              </div>
            </section>

            <section className="zm-news-section">
              <button
                type="button"
                className="zm-news-card"
                onClick={() => setMostrarNovidades((valor) => !valor)}
              >
                <div className="zm-news-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 17H5v-2h3v2Zm0-4H5v-2h3v2Zm0-4H5V7h3v2Zm11 8h-9v-2h9v2Zm0-4h-9v-2h9v2Zm0-4h-9V7h9v2Z" />
                  </svg>
                </div>
                <h2>Novidades</h2>
                <p>Clique para conferir as últimas notícias da escola.</p>
              </button>

              {mostrarNovidades && (
                <div className="zm-news-list">
                  <article>
                    <h3>Projeto de Leitura</h3>
                    <p>Atividades de incentivo à leitura com participação dos estudantes.</p>
                  </article>
                  <article>
                    <h3>Ensino Médio Integral</h3>
                    <p>Atividades com foco no protagonismo juvenil e no projeto de vida.</p>
                  </article>
                  <article>
                    <h3>Eventos Escolares</h3>
                    <p>Ações culturais e educativas envolvendo toda a comunidade escolar.</p>
                  </article>
                </div>
              )}
            </section>
          </section>
        )}

        {abaAtiva === 'sobre' && (
          <section className="zm-internal-page">
            <div className="zm-internal-hero">
              <h2>Sobre a Escola</h2>
              <p>Conheça um pouco mais sobre a Escola Estadual Zinha Meira.</p>
            </div>

            <article className="zm-info-card">
              <h3>Escola Estadual Zinha Meira</h3>
              <p>
                A escola atende a comunidade de Bocaiúva/MG e desenvolve ações voltadas à
                aprendizagem, à convivência e ao desenvolvimento dos estudantes.
              </p>
            </article>
          </section>
        )}

        {abaAtiva === 'contatos' && (
          <section className="zm-internal-page">
            <div className="zm-internal-hero">
              <h2>Entre em Contato</h2>
              <p>Acompanhe a escola pelos canais oficiais de comunicação.</p>
            </div>

            <div className="zm-contact-grid">
              <article className="zm-info-card">
                <h3>E-mail</h3>
                <p>Escola.79383@educacao.mg.gov.br</p>
                <a href="mailto:Escola.79383@educacao.mg.gov.br">Enviar e-mail</a>
              </article>

              <article className="zm-info-card">
                <h3>Localização</h3>
                <p>Bocaiúva - Minas Gerais</p>
              </article>

              <article className="zm-info-card">
                <h3>Redes sociais</h3>
                <p>Instagram e Facebook da comunidade escolar.</p>
              </article>
            </div>
          </section>
        )}
      </main>

      <footer className="zm-footer">
        <p>Rua Presidente Juscelino Kubitschek, 615 – Pernambuco, Bocaiúva/MG – CEP 39390-000</p>
        <p>Código INEP: 31079383</p>
        <p>© 2026 Escola Estadual Zinha Meira - Bocaiúva/MG</p>
      </footer>
    </div>
  );
}