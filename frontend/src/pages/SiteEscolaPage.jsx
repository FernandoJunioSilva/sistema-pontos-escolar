import React, { useEffect, useState } from 'react';
import './SiteEscolaPage.css';

import logoEscola from '../assets/zinha/imagens/logo escola.png';
import foto1 from '../assets/zinha/imagens/foto1.jpg';
import foto2 from '../assets/zinha/imagens/foto2.jpg';
import foto3 from '../assets/zinha/imagens/foto3.jpg';
import foto4 from '../assets/zinha/imagens/foto4.jpg';
import foto7 from '../assets/zinha/imagens/foto7.jpg';
import foto9 from '../assets/zinha/imagens/foto9.jpg';
import foto10 from '../assets/zinha/imagens/foto10.jpg';

const fotosSobre = [foto10, foto7, foto3, foto4, foto9, foto2, foto1];

export default function SiteEscolaPage({ mudarPagina }) {
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [menuSistemaAberto, setMenuSistemaAberto] = useState(false);
  const [mostrarNovidades, setMostrarNovidades] = useState(false);
  const [indiceGaleria, setIndiceGaleria] = useState(0);

  useEffect(() => {
    if (abaAtiva !== 'sobre') return undefined;

    const timer = window.setInterval(() => {
      setIndiceGaleria((indiceAtual) => (indiceAtual + 1) % fotosSobre.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [abaAtiva]);

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

  function fotoAnterior() {
    setIndiceGaleria((indiceAtual) =>
      indiceAtual === 0 ? fotosSobre.length - 1 : indiceAtual - 1
    );
  }

  function proximaFoto() {
    setIndiceGaleria((indiceAtual) => (indiceAtual + 1) % fotosSobre.length);
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
              className={abaAtiva === 'sobre' || abaAtiva === 'historia' ? 'is-active' : ''}
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
          <section className="zm-about-page">
            <section className="zm-about-gallery" aria-label="Galeria de fotos da escola">
              <div
                className="zm-about-gallery-track"
                style={{ transform: `translateX(-${indiceGaleria * 100}%)` }}
              >
                {fotosSobre.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1} da Escola Estadual Zinha Meira`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="zm-gallery-arrow zm-gallery-prev"
                onClick={fotoAnterior}
                aria-label="Foto anterior"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="m15.5 19-7-7 7-7 1.4 1.4L11.3 12l5.6 5.6L15.5 19Z" />
                </svg>
              </button>

              <button
                type="button"
                className="zm-gallery-arrow zm-gallery-next"
                onClick={proximaFoto}
                aria-label="Próxima foto"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="m8.5 5 7 7-7 7-1.4-1.4 5.6-5.6-5.6-5.6L8.5 5Z" />
                </svg>
              </button>

              <div className="zm-gallery-dots" aria-label="Selecionar foto">
                {fotosSobre.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={index === indiceGaleria ? 'is-active' : ''}
                    onClick={() => setIndiceGaleria(index)}
                    aria-label={`Ir para foto ${index + 1}`}
                  />
                ))}
              </div>
            </section>

            <section className="zm-about-content">
              <div className="zm-about-title">
                <h2>Sobre Nossa Escola</h2>
                <div className="zm-about-title-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 6.25C10.17 4.63 7.8 4 5.5 4 4.28 4 3.1 4.2 2 4.57v14.52c1.1-.37 2.28-.57 3.5-.57 2.3 0 4.67.63 6.5 2.25V6.25Zm0 0c1.83-1.62 4.2-2.25 6.5-2.25 1.22 0 2.4.2 3.5.57v14.52c-1.1-.37-2.28-.57-3.5-.57-2.3 0-4.67.63-6.5 2.25V6.25Z" />
                  </svg>
                </div>
              </div>

              <div className="zm-about-cards">
                <article className="zm-about-card">
                  <h2>História da Escola</h2>
                  <p>
                    A Escola Estadual Zinha Meira recebeu esse nome em homenagem à professora{' '}
                    <strong>Maria do Patrocínio Meira (Zinha Meira)</strong>, educadora que dedicou
                    quarenta anos ao magistério em Bocaiúva, tornando-se uma das personalidades mais
                    importantes da educação no município.
                  </p>
                  <p>
                    Criada inicialmente como Jardim de Infância Zinha Meira pelo Decreto nº 10.690,
                    de 20 de setembro de 1967, a instituição iniciou suas atividades em 31 de março de
                    1968. Em 1982 passou a denominar-se Escola Estadual Zinha Meira, com a implantação
                    do Ensino Fundamental, e em 1991 iniciou o Ensino Médio.
                  </p>
                  <p>
                    Desde 1983, funciona em sede própria na Rua Presidente Juscelino Kubitschek,
                    nº 615, contribuindo para a formação de milhares de estudantes de Bocaiúva e região.
                  </p>
                  <div className="zm-about-card-actions">
                    <button type="button" className="zm-more-button" onClick={() => trocarAba('historia')}>
                      Saiba mais →
                    </button>
                  </div>
                </article>

                <article className="zm-about-card">
                  <h2>Modalidades de Ensino</h2>

                  <h3>Ensino Fundamental – Anos Finais</h3>
                  <p>
                    Compreende do 6º ao 9º ano, promovendo a consolidação das aprendizagens,
                    o desenvolvimento das competências básicas e o fortalecimento da autonomia dos estudantes.
                  </p>

                  <hr />

                  <h3>Ensino Médio</h3>
                  <p>
                    Tem como objetivo aprofundar os conhecimentos adquiridos, preparar os estudantes
                    para o exercício da cidadania, para o mundo do trabalho e para a continuidade dos estudos.
                  </p>

                  <hr />

                  <h3>Ensino Médio Integral</h3>
                  <p>
                    O Programa de Ensino Médio Integral busca desenvolver o estudante em todas as suas
                    dimensões, tendo como foco o Projeto de Vida, o protagonismo juvenil, a autonomia e a formação cidadã.
                  </p>

                  <hr />

                  <h3>Educação de Jovens e Adultos (EJA)</h3>
                  <p>
                    Modalidade destinada às pessoas que não tiveram acesso ou continuidade dos estudos na idade
                    apropriada, valorizando suas experiências de vida e oferecendo flexibilidade curricular.
                  </p>

                  <hr />

                  <h3>Educação Especial</h3>
                  <p>
                    A escola oferece Atendimento Educacional Especializado (AEE), Plano de Desenvolvimento
                    Individual (PDI) e ações voltadas à inclusão dos estudantes com deficiência, TEA e altas
                    habilidades/superdotação.
                  </p>
                </article>

                <article className="zm-about-card">
                  <h2>Projeto Político-Pedagógico (PPP)</h2>
                  <p>
                    O Projeto Político-Pedagógico da escola é elaborado de forma coletiva, garantindo a
                    participação da comunidade escolar e fortalecendo a gestão democrática.
                  </p>

                  <h3>Equipe de Elaboração</h3>
                  <ul>
                    <li>Direção Escolar</li>
                    <li>Serviço Pedagógico</li>
                    <li>Professores e demais servidores</li>
                    <li>Pais, responsáveis e estudantes</li>
                  </ul>
                </article>

                <article className="zm-about-card">
                  <h2>Território Escolar</h2>
                  <p>
                    A Escola Estadual Zinha Meira está inserida em um território que oferece importantes
                    espaços públicos de aprendizagem, cultura, esporte e saúde, favorecendo o desenvolvimento
                    integral dos estudantes.
                  </p>
                  <p>
                    Cerca de <strong>70% dos alunos</strong> residem próximos à escola, fortalecendo a relação
                    entre instituição, comunidade e família.
                  </p>

                  <h3>Infraestrutura do Território</h3>
                  <ul>
                    <li>Biblioteca pública de acesso à comunidade.</li>
                    <li>Espaços esportivos e áreas de lazer.</li>
                    <li>Espaços públicos com acesso à internet.</li>
                    <li>Equipamentos culturais, como teatro e cinema.</li>
                    <li>Duas Unidades Básicas de Saúde (UBS).</li>
                  </ul>
                </article>
              </div>
            </section>
          </section>
        )}

        {abaAtiva === 'historia' && (
          <section className="zm-history-page">
            <section className="zm-history-hero">
              <h2>Escola Estadual Zinha Meira</h2>
              <p>
                Mais de meio século de dedicação à educação, formando cidadãos com responsabilidade,
                conhecimento e compromisso com o futuro.
              </p>
            </section>

            <div className="zm-history-container">
              <button type="button" className="zm-back-button" onClick={() => trocarAba('sobre')}>
                ← Voltar para Sobre Nós
              </button>

              <article className="zm-history-card">
                <h2>Maria do Patrocínio Meira – Zinha Meira</h2>
                <p>
                  Maria do Patrocínio Meira, conhecida por Zinha Meira, nasceu em Bocaiúva em 22 de junho de 1888.
                  Filha de Manoel Otaviano Meira e Tereza Caldeira Meira, realizou seus primeiros estudos na escola
                  da professora Belmira, concluindo o curso primário.
                </p>
                <p>
                  Mesmo diante das dificuldades de acesso à educação na época, destacou-se pela inteligência e
                  vocação para o ensino, dedicando-se ao magistério ainda muito jovem.
                </p>
                <p>
                  Em 1918 assumiu a escola mista do bairro Pernambuco e, posteriormente, tornou-se professora do
                  Grupo Escolar Coronel Fulgêncio, atual Escola Estadual Genesco Augusto Caldeira Brant, onde também
                  exerceu a função de diretora até sua aposentadoria, após quarenta anos de serviços prestados à educação.
                </p>
                <p>
                  Católica dedicada, atuou intensamente na Igreja do Senhor do Bonfim como catequista, zeladora da igreja,
                  presidente da Pia União das Filhas de Maria e integrante da Irmandade do Sagrado Coração de Jesus.
                </p>
                <p>
                  Zinha Meira nunca se casou, dedicando sua vida ao ensino e ao serviço religioso. Faleceu em 8 de julho
                  de 1959, deixando um legado que inspira gerações.
                </p>
              </article>

              <article className="zm-history-card">
                <h2>Fundação da Escola</h2>
                <p>
                  O Jardim de Infância Zinha Meira foi criado pelo Decreto nº 10.690, de 20 de setembro de 1967,
                  em homenagem à professora Maria do Patrocínio Meira.
                </p>
                <p>
                  As atividades escolares tiveram início em 31 de março de 1968, funcionando inicialmente na
                  Rua Pires e Albuquerque, nº 96, tendo como primeira diretora Maria de Lourdes Ribeiro.
                </p>
                <p>
                  Em 1982 foi implantado o Ensino Fundamental e a instituição passou a denominar-se Escola Estadual
                  Zinha Meira. Em 1991 foi autorizado o funcionamento do Ensino Médio, ampliando as oportunidades de
                  formação para os estudantes de Bocaiúva.
                </p>
                <p>
                  Desde 1983 a escola possui sede própria localizada na Rua Presidente Juscelino Kubitschek, nº 615.
                </p>
              </article>

              <article className="zm-history-card">
                <h2>Linha do Tempo</h2>
                <div className="zm-timeline">
                  <div className="zm-timeline-item"><span>1967</span><p>Criação do Jardim de Infância Zinha Meira.</p></div>
                  <div className="zm-timeline-item"><span>1968</span><p>Início das atividades escolares.</p></div>
                  <div className="zm-timeline-item"><span>1982</span><p>Criação da Escola Estadual Zinha Meira e implantação do Ensino Fundamental.</p></div>
                  <div className="zm-timeline-item"><span>1983</span><p>Inauguração do prédio próprio.</p></div>
                  <div className="zm-timeline-item"><span>1991</span><p>Implantação do Ensino Médio.</p></div>
                  <div className="zm-timeline-item"><span>2013</span><p>Início da gestão do diretor Ataíde Alves Barroso.</p></div>
                </div>
              </article>

              <article className="zm-history-card">
                <h2>Ensino Médio Integral</h2>
                <p>
                  O Programa de Ensino Médio em Tempo Integral de Minas Gerais promove uma formação completa,
                  preparando os estudantes para os desafios acadêmicos, profissionais e sociais do século XXI.
                </p>
                <p>
                  O modelo pedagógico coloca o estudante como protagonista do seu Projeto de Vida, incentivando
                  autonomia, liderança, responsabilidade, solidariedade e participação ativa na comunidade escolar.
                </p>
                <p>
                  A integração entre gestão e práticas pedagógicas possibilita uma educação de excelência, formando
                  jovens competentes, comprometidos com a cidadania e preparados para construir um futuro melhor.
                </p>
              </article>
            </div>
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