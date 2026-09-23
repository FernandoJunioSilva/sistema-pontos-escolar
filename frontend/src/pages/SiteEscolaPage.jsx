import React, { useState } from 'react';
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

const imagensGaleria = [
  foto1,
  foto2,
  foto3,
  foto5,
  foto6,
  foto7,
  foto8,
  foto9,
  foto10
];

export default function SiteEscolaPage({ mudarPagina }) {
  const [abaAtiva, setAbaAtiva] = useState('inicio');
  const [mostrarNovidades, setMostrarNovidades] = useState(false);
  const [menuSistemaAberto, setMenuSistemaAberto] = useState(false);

  function trocarAba(aba) {
    setMenuSistemaAberto(false);
    setAbaAtiva(aba);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function abrirPaginaSistema(pagina) {
    setMenuSistemaAberto(false);

    if (typeof mudarPagina === 'function') {
      mudarPagina(pagina);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className="site-escola">

      {/* ================================================= */}
      {/* BARRA AZUL SUPERIOR                              */}
      {/* ================================================= */}

      <header className="escola-topo">
        <div className="escola-topo-conteudo">

          <div className="escola-topo-esquerda">

            {/* EMAIL */}

            <a
              className="escola-topo-item"
              href="mailto:Escola.79383@educacao.mg.gov.br"
            >
              <svg
                className="icone-topo"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"
                />
              </svg>

              <span>
                Escola.79383@educacao.mg.gov.br
              </span>
            </a>

            {/* LOCALIZAÇÃO */}

            <span className="escola-topo-item">

              <svg
                className="icone-topo"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
                />
              </svg>

              <span>
                Bocaiúva - MG
              </span>

            </span>

          </div>

          {/* REDES SOCIAIS */}

          <div className="escola-redes">

            {/* INSTAGRAM */}

            <a
              href="https://www.instagram.com/terceirao.inf26/"
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm11 1.5A1.5 1.5 0 1 1 18 8.5a1.5 1.5 0 0 1 0-3ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
                />
              </svg>
            </a>

            {/* FACEBOOK */}

            <a
              href="https://web.facebook.com/E.E.ZinhaMeira/"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.25.2 2.25.2v2.47H15.2c-1.25 0-1.64.78-1.64 1.57V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"
                />
              </svg>
            </a>

            {/* WHATSAPP */}

            <a
              href="https://wa.me/qr/V57FQNNTV7UIP1"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.28-1.52A9.99 9.99 0 1 0 12.04 2Zm0 17.97a8.02 8.02 0 0 1-4.09-1.12l-.29-.17-3.13.9.84-3.05-.19-.31a7.95 7.95 0 1 1 6.86 3.75Zm4.38-5.97c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.39-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
                />
              </svg>
            </a>

          </div>

        </div>
      </header>


      {/* ================================================= */}
      {/* CABEÇALHO PRINCIPAL                              */}
      {/* ================================================= */}

      <header className="escola-cabecalho">

        <div className="escola-cabecalho-conteudo">

          {/* LOGO */}

          <button
            type="button"
            className="escola-logo-area"
            onClick={() => trocarAba('inicio')}
          >

            <img
              src={logoEscola}
              alt="Logo da Escola Estadual Zinha Meira"
            />

            <div className="escola-identidade">

              <h1>
                Zinha Meira
              </h1>

              <p>
                Crescendo e Aprendendo Sempre
              </p>

            </div>

          </button>


          {/* ================================================= */}
          {/* MENU                                              */}
          {/* ================================================= */}

          <nav className="escola-menu-abas">

            {/* INÍCIO */}

            <button
              type="button"
              className={abaAtiva === 'inicio' ? 'ativo' : ''}
              onClick={() => trocarAba('inicio')}
            >
              Início
            </button>

            {/* SOBRE NÓS */}

            <button
              type="button"
              className={abaAtiva === 'sobre' ? 'ativo' : ''}
              onClick={() => trocarAba('sobre')}
            >
              Sobre Nós
            </button>


            {/* CONTATOS */}

            <button
              type="button"
              className={abaAtiva === 'contatos' ? 'ativo' : ''}
              onClick={() => trocarAba('contatos')}
            >
              Contatos
            </button>

            {/* SISTEMA ESCOLAR */}

            <div
              className={`escola-menu-sistema ${menuSistemaAberto ? 'aberto' : ''}`}
            >
              <button
                type="button"
                className="escola-menu-sistema-botao"
                onClick={() => setMenuSistemaAberto((aberto) => !aberto)}
                aria-expanded={menuSistemaAberto}
                aria-haspopup="true"
              >
                Sistema Escolar
                <span className="escola-menu-seta" aria-hidden="true">
                  ▾
                </span>
              </button>

              <div className="escola-submenu-sistema">
                <button
                  type="button"
                  onClick={() => abrirPaginaSistema('inicio')}
                >
                  Acessar Sistema
                </button>

                <button
                  type="button"
                  onClick={() => abrirPaginaSistema('ranking')}
                >
                  Ranking
                </button>

                <button
                  type="button"
                  onClick={() => abrirPaginaSistema('telao')}
                >
                  Telão
                </button>
              </div>
            </div>

          </nav>

        </div>
      </header>


      {/* ================================================= */}
      {/* CONTEÚDO                                         */}
      {/* ================================================= */}

      <main className="escola-conteudo">

        {/* ================================================= */}
        {/* INÍCIO                                            */}
        {/* ================================================= */}

        {abaAtiva === 'inicio' && (

          <section className="pagina-inicio-escola">

            {/* IMAGEM PRINCIPAL */}

            <section className="escola-banner-principal">

              <img
                src={foto4}
                alt="Área externa da Escola Estadual Zinha Meira"
              />

            </section>


            {/* ================================================= */}
            {/* SERVIÇOS                                          */}
            {/* ================================================= */}

            <section className="secao-servicos">

              <div className="titulo-secao-servicos">

                <h2>
                  Serviços Oferecidos
                </h2>

                <div className="titulo-icone-livro">

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 6.25C10.17 4.63 7.8 4 5.5 4 4.28 4 3.1 4.2 2 4.57v14.52c1.1-.37 2.28-.57 3.5-.57 2.3 0 4.67.63 6.5 2.25V6.25Zm0 0c1.83-1.62 4.2-2.25 6.5-2.25 1.22 0 2.4.2 3.5.57v14.52c-1.1-.37-2.28-.57-3.5-.57-2.3 0-4.67.63-6.5 2.25V6.25Z"
                    />
                  </svg>

                </div>

                <div className="titulo-linha"></div>

              </div>


              <div className="servicos-grid">


                {/* REFORÇO ESCOLAR */}

                <article className="servico-card">

                  <div className="servico-icone">

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M21 4H14c-.8 0-1.55.3-2 .78A2.75 2.75 0 0 0 10 4H3a2 2 0 0 0-2 2v13a1 1 0 0 0 1.45.9A10.42 10.42 0 0 1 7 19c1.7 0 3.08.5 4.32 1.55a1.05 1.05 0 0 0 1.36 0C13.92 19.5 15.3 19 17 19a10.42 10.42 0 0 1 4.55.9A1 1 0 0 0 23 19V6a2 2 0 0 0-2-2Zm-10 14a8.17 8.17 0 0 0-4-.97 12.55 12.55 0 0 0-4 .65V6h7c.55 0 1 .45 1 1v11Zm10-.32a12.55 12.55 0 0 0-4-.65 8.17 8.17 0 0 0-4 .97V7c0-.55.45-1 1-1h7v11.68Z"
                      />
                    </svg>

                  </div>

                  <h3>
                    Reforço Escolar
                  </h3>

                  <p>
                    Acompanhamento pedagógico para melhorar o desempenho dos alunos.
                  </p>

                </article>


                {/* ATIVIDADES EDUCATIVAS */}

                <article className="servico-card">

                  <div className="servico-icone">

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3ZM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3Zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13Zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5Z"
                      />
                    </svg>

                  </div>

                  <h3>
                    Atividades Educativas
                  </h3>

                  <p>
                    Projetos que estimulam criatividade, aprendizado e convivência.
                  </p>

                </article>


                {/* APOIO AO ALUNO */}

                <article className="servico-card">

                  <div className="servico-icone">

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
                      />
                    </svg>

                  </div>

                  <h3>
                    Apoio ao Aluno
                  </h3>

                  <p>
                    Um ambiente acolhedor para o desenvolvimento pessoal e acadêmico.
                  </p>

                </article>

              </div>

            </section>


            {/* ================================================= */}
            {/* NOVIDADES                                         */}
            {/* ================================================= */}

            <section className="secao-novidades">

              <button
                type="button"
                className="novidades-card"
                onClick={() =>
                  setMostrarNovidades((valor) => !valor)
                }
              >

                <div className="novidades-icone">

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M20 3H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8 17H5v-2h3v2Zm0-4H5v-2h3v2Zm0-4H5V7h3v2Zm11 8h-9v-2h9v2Zm0-4h-9v-2h9v2Zm0-4h-9V7h9v2Z"
                    />
                  </svg>

                </div>

                <h2>
                  Novidades
                </h2>

                <p>
                  Clique para conferir as últimas notícias da escola.
                </p>

              </button>


              {mostrarNovidades && (

                <div className="novidades-lista">

                  <article className="novidade-item">

                    <h3>
                      Projeto de Leitura
                    </h3>

                    <p>
                      A Escola Estadual Zinha Meira realizou atividades de incentivo
                      à leitura com participação dos estudantes.
                    </p>

                  </article>


                  <article className="novidade-item">

                    <h3>
                      Ensino Médio Integral
                    </h3>

                    <p>
                      Novas atividades foram desenvolvidas com foco no protagonismo
                      juvenil e no projeto de vida dos alunos.
                    </p>

                  </article>


                  <article className="novidade-item">

                    <h3>
                      Eventos Escolares
                    </h3>

                    <p>
                      A escola promoveu ações culturais e educativas envolvendo toda
                      a comunidade escolar.
                    </p>

                  </article>

                </div>

              )}

            </section>

          </section>

        )}


        {/* ================================================= */}
        {/* CONTATOS                                          */}
        {/* ================================================= */}

        {abaAtiva === 'contatos' && (

          <section>

            <section className="escola-hero">

              <h2>
                Entre em Contato
              </h2>

              <p>
                Acompanhe a Escola Estadual Zinha Meira pelos
                canais oficiais de comunicação.
              </p>

            </section>


            <section className="escola-cards">

              <article className="escola-card">

                <h3>
                  📷 Instagram
                </h3>

                <p>
                  @terceirao.inf26
                </p>

                <a
                  href="https://www.instagram.com/terceirao.inf26/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Acessar Instagram
                </a>

              </article>


              <article className="escola-card">

                <h3>
                  ☎️ Telefone
                </h3>

                <p>
                  (38) 93251-1732
                </p>

              </article>


              <article className="escola-card">

                <h3>
                  ✉️ E-mail
                </h3>

                <p>
                  Escola.79383@educacao.mg.gov.br
                </p>

                <a
                  href="mailto:Escola.79383@educacao.mg.gov.br"
                >
                  Enviar e-mail
                </a>

              </article>

            </section>


            <section className="escola-card escola-texto-card">

              <h2>
                Endereço
              </h2>

              <p>
                Rua Presidente Juscelino Kubitschek, 615 –
                Pernambuco, Bocaiúva/MG – CEP 39390-000.
              </p>

              <p>
                <strong>Código INEP:</strong> 31079383
              </p>

            </section>


            <div className="acesso-sistema-area">
              <button
                type="button"
                className="acesso-sistema-botao"
                onClick={() => abrirPaginaSistema('inicio')}
              >
                Acessar Sistema de Pontos
              </button>
            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* SOBRE NÓS                                         */}
        {/* ================================================= */}

        {abaAtiva === 'sobre' && (

          <section>

            {/* GALERIA */}

            <section className="escola-galeria">

              {imagensGaleria
                .slice(0, 6)
                .map((imagem, index) => (

                  <img
                    key={index}
                    src={imagem}
                    alt={`Registro da escola ${index + 1}`}
                  />

                ))}

            </section>


            {/* HISTÓRIA */}

            <section className="escola-card escola-texto-card">

              <h2>
                Sobre Nossa Escola
              </h2>

              <h3>
                História da Escola
              </h3>

              <p>
                A Escola Estadual Zinha Meira recebeu esse nome em homenagem à professora
                <strong> Maria do Patrocínio Meira, conhecida como Zinha Meira</strong>,
                educadora que dedicou sua vida ao magistério em Bocaiúva.
              </p>

              <p>
                Criada inicialmente como Jardim de Infância Zinha Meira pelo Decreto
                nº 10.690, de 20 de setembro de 1967, a instituição iniciou suas
                atividades em 31 de março de 1968.
              </p>

              <p>
                Em 1982 passou a denominar-se Escola Estadual Zinha Meira,
                com a implantação do Ensino Fundamental.
                Em 1991 iniciou o Ensino Médio.
              </p>

              <p>
                Desde 1983 funciona em sede própria na Rua Presidente
                Juscelino Kubitschek, nº 615, contribuindo para a formação
                de milhares de estudantes de Bocaiúva e região.
              </p>

            </section>


            {/* MODALIDADES */}

            <section className="escola-card escola-texto-card">

              <h2>
                Modalidades de Ensino
              </h2>

              <h3>
                Ensino Fundamental – Anos Finais
              </h3>

              <p>
                Compreende do 6º ao 9º ano, promovendo a consolidação
                das aprendizagens e o fortalecimento da autonomia dos estudantes.
              </p>

              <h3>
                Ensino Médio
              </h3>

              <p>
                Tem como objetivo aprofundar os conhecimentos adquiridos,
                preparar os estudantes para o exercício da cidadania,
                para o mundo do trabalho e para a continuidade dos estudos.
              </p>

              <h3>
                Ensino Médio Integral
              </h3>

              <p>
                O Programa de Ensino Médio Integral busca desenvolver
                o estudante em todas as suas dimensões, tendo como foco
                o Projeto de Vida, o protagonismo juvenil e a autonomia.
              </p>

              <h3>
                Educação de Jovens e Adultos (EJA)
              </h3>

              <p>
                Modalidade destinada às pessoas que não tiveram acesso
                ou continuidade dos estudos na idade apropriada.
              </p>

              <h3>
                Educação Especial
              </h3>

              <p>
                A escola oferece Atendimento Educacional Especializado (AEE),
                Plano de Desenvolvimento Individual (PDI) e ações de inclusão.
              </p>

            </section>


            {/* PPP */}

            <section className="escola-card escola-texto-card">

              <h2>
                Projeto Político-Pedagógico
              </h2>

              <p>
                O Projeto Político-Pedagógico da escola é elaborado
                de forma coletiva, garantindo a participação da
                comunidade escolar e fortalecendo a gestão democrática.
              </p>

              <h3>
                Equipe de Elaboração
              </h3>

              <ul className="escola-lista">

                <li>Direção Escolar</li>
                <li>Serviço Pedagógico</li>
                <li>Professores e demais servidores</li>
                <li>Pais, responsáveis e estudantes</li>

              </ul>

            </section>


            {/* ================================================= */}
            {/* CONTEÚDO QUE ANTES ESTAVA EM SAIBA MAIS           */}
            {/* ================================================= */}

            <section className="escola-hero">

              <h2>
                Conheça Mais Sobre a Nossa História
              </h2>

              <p>
                Mais de meio século de dedicação à educação,
                formando cidadãos com responsabilidade,
                conhecimento e compromisso com o futuro.
              </p>

            </section>


            {/* ZINHA MEIRA */}

            <section className="escola-card escola-texto-card">

              <h2>
                Maria do Patrocínio Meira – Zinha Meira
              </h2>

              <p>
                Maria do Patrocínio Meira, conhecida por Zinha Meira,
                nasceu em Bocaiúva em 22 de junho de 1888.
              </p>

              <p>
                Filha de Manoel Otaviano Meira e Tereza Caldeira Meira,
                realizou seus primeiros estudos na escola da professora
                Belmira, concluindo o curso primário.
              </p>

              <p>
                Mesmo diante das dificuldades de acesso à educação na época,
                destacou-se pela inteligência e vocação para o ensino.
              </p>

              <p>
                Em 1918 assumiu a escola mista do bairro Pernambuco
                e posteriormente tornou-se professora do Grupo Escolar
                Coronel Fulgêncio.
              </p>

              <p>
                Também exerceu a função de diretora até sua aposentadoria,
                após quarenta anos de serviços prestados à educação.
              </p>

              <p>
                Zinha Meira dedicou sua vida ao ensino e ao serviço religioso.
                Faleceu em 8 de julho de 1959, deixando um legado que inspira gerações.
              </p>

            </section>


            {/* FUNDAÇÃO */}

            <section className="escola-card escola-texto-card">

              <h2>
                Fundação da Escola
              </h2>

              <p>
                O Jardim de Infância Zinha Meira foi criado pelo
                Decreto nº 10.690, de 20 de setembro de 1967.
              </p>

              <p>
                As atividades escolares tiveram início em
                31 de março de 1968.
              </p>

              <p>
                A primeira diretora foi Maria de Lourdes Ribeiro.
              </p>

              <p>
                Em 1982 foi implantado o Ensino Fundamental.
              </p>

              <p>
                Em 1991 foi autorizado o funcionamento do Ensino Médio.
              </p>

              <p>
                Desde 1983 a escola possui sede própria localizada
                na Rua Presidente Juscelino Kubitschek, nº 615.
              </p>

            </section>


            {/* LINHA DO TEMPO */}

            <section className="escola-card escola-texto-card">

              <h2>
                Linha do Tempo
              </h2>

              <div className="escola-timeline">

                <div className="item">
                  <span>1967</span>
                  <p>Criação do Jardim de Infância Zinha Meira.</p>
                </div>

                <div className="item">
                  <span>1968</span>
                  <p>Início das atividades escolares.</p>
                </div>

                <div className="item">
                  <span>1982</span>
                  <p>
                    Criação da Escola Estadual Zinha Meira e implantação
                    do Ensino Fundamental.
                  </p>
                </div>

                <div className="item">
                  <span>1983</span>
                  <p>Inauguração do prédio próprio.</p>
                </div>

                <div className="item">
                  <span>1991</span>
                  <p>Implantação do Ensino Médio.</p>
                </div>

              </div>

            </section>


            {/* ENSINO INTEGRAL */}

            <section className="escola-card escola-texto-card">

              <h2>
                Ensino Médio Integral
              </h2>

              <p>
                O Programa de Ensino Médio em Tempo Integral de Minas Gerais
                promove uma formação completa, preparando os estudantes
                para os desafios acadêmicos, profissionais e sociais.
              </p>

              <p>
                O modelo pedagógico coloca o estudante como protagonista
                do seu Projeto de Vida, incentivando autonomia,
                liderança e responsabilidade.
              </p>

            </section>

          </section>

        )}

      </main>


      {/* ================================================= */}
      {/* RODAPÉ                                            */}
      {/* ================================================= */}

      <footer className="escola-rodape">

        <p>
          Rua Presidente Juscelino Kubitschek, 615 –
          Pernambuco, Bocaiúva/MG – CEP 39390-000
        </p>

        <p>
          Código INEP: 31079383
        </p>

        <p className="escola-copy">
          © 2026 Escola Estadual Zinha Meira - Bocaiúva/MG
        </p>

      </footer>

    </div>
  );
}