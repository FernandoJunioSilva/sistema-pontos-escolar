import React, { useEffect, useState } from 'react';
import './SiteEscolaPage.css';

/* =========================================
   IMAGENS
========================================= */

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


export default function SiteEscolaPage({ mudarPagina }) {

  /* =========================================
     CARROSSEL
  ========================================= */

  const imagens = [
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

  const [imagemAtual, setImagemAtual] = useState(0);


  /* =========================================
     TROCA AUTOMÁTICA DAS IMAGENS
  ========================================= */

  useEffect(() => {

    const intervalo = setInterval(() => {

      setImagemAtual((anterior) =>
        anterior === imagens.length - 1
          ? 0
          : anterior + 1
      );

    }, 5000);


    return () => clearInterval(intervalo);

  }, [imagens.length]);


  /* =========================================
     FUNÇÕES DO CARROSSEL
  ========================================= */

  function imagemAnterior() {

    setImagemAtual((anterior) =>
      anterior === 0
        ? imagens.length - 1
        : anterior - 1
    );

  }


  function proximaImagem() {

    setImagemAtual((anterior) =>
      anterior === imagens.length - 1
        ? 0
        : anterior + 1
    );

  }


  /* =========================================
     ABRIR SISTEMA DE PONTOS
  ========================================= */

  function abrirSistema() {

    mudarPagina('inicio');

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  return (

    <div className="site-escola">


      {/* ==================================================
          IMPORTANTE

          O CABEÇALHO NÃO FICA MAIS AQUI.

          Agora ele é exibido pelo App.jsx através do:

          <CabecalhoEscola />

          Isso permite usar o mesmo cabeçalho em:
          - Site da escola
          - Sistema de Pontos
          - Ranking
          - Telão
      =================================================== */}



      {/* ==================================================
          BANNER / CARROSSEL
      =================================================== */}

      <section className="escola-banner-principal">

        <img
          src={imagens[imagemAtual]}
          alt={`E.E. Zinha Meira ${imagemAtual + 1}`}
        />


        {/* SOMBRA */}
        <div className="escola-banner-overlay" />


        {/* TEXTO */}
        <div className="escola-banner-conteudo">

          <span className="escola-banner-tag">
            Educação que transforma
          </span>

          <h1>
            Escola Estadual Zinha Meira
          </h1>

          <p>
            Educação, conhecimento, participação e oportunidades
            para construir um futuro melhor.
          </p>


          <button
            type="button"
            className="escola-banner-botao"
            onClick={abrirSistema}
          >
            Acessar Sistema de Pontos
          </button>

        </div>


        {/* SETA ESQUERDA */}
        <button
          type="button"
          className="escola-banner-seta escola-banner-seta-esquerda"
          onClick={imagemAnterior}
          aria-label="Imagem anterior"
        >
          ‹
        </button>


        {/* SETA DIREITA */}
        <button
          type="button"
          className="escola-banner-seta escola-banner-seta-direita"
          onClick={proximaImagem}
          aria-label="Próxima imagem"
        >
          ›
        </button>


        {/* INDICADORES */}
        <div className="escola-banner-indicadores">

          {imagens.map((_, index) => (

            <button
              key={index}
              type="button"
              aria-label={`Mostrar imagem ${index + 1}`}
              className={
                index === imagemAtual
                  ? 'escola-banner-indicador ativo'
                  : 'escola-banner-indicador'
              }
              onClick={() => setImagemAtual(index)}
            />

          ))}

        </div>

      </section>



      {/* ==================================================
          SERVIÇOS
      =================================================== */}

      <section className="escola-secao escola-servicos">

        <div className="escola-titulo-secao">

          <div className="escola-titulo-icone">
            📚
          </div>

          <h2>
            Serviços Oferecidos
          </h2>

          <div className="escola-titulo-linha" />

          <p>
            Conheça algumas das ações desenvolvidas pela
            E.E. Zinha Meira para apoiar nossos estudantes.
          </p>

        </div>


        <div className="escola-servicos-grid">


          {/* CARD 1 */}

          <article className="escola-servico-card">

            <div className="escola-servico-icone">
              📖
            </div>

            <h3>
              Reforço Escolar
            </h3>

            <p>
              Apoio pedagógico para fortalecer a aprendizagem
              e auxiliar os estudantes em suas dificuldades.
            </p>

          </article>



          {/* CARD 2 */}

          <article className="escola-servico-card">

            <div className="escola-servico-icone">
              🎓
            </div>

            <h3>
              Atividades Educativas
            </h3>

            <p>
              Projetos, atividades e experiências que estimulam
              a criatividade, o conhecimento e a participação.
            </p>

          </article>



          {/* CARD 3 */}

          <article className="escola-servico-card">

            <div className="escola-servico-icone">
              🤝
            </div>

            <h3>
              Apoio ao Aluno
            </h3>

            <p>
              Acompanhamento e orientação para contribuir
              com o desenvolvimento acadêmico e pessoal
              dos estudantes.
            </p>

          </article>


        </div>

      </section>



      {/* ==================================================
          SISTEMA DE PONTOS
      =================================================== */}

      <section className="escola-secao">

        <div className="escola-sistema-card">

          <div className="escola-sistema-icone">
            🏆
          </div>


          <div className="escola-sistema-texto">

            <span className="escola-mini-titulo">
              Projeto Escolar
            </span>

            <h2>
              Sistema de Pontos
            </h2>

            <p>
              Acompanhe a participação das turmas,
              pontuações, medalhas, conquistas e o ranking
              da E.E. Zinha Meira.
            </p>

          </div>


          <button
            type="button"
            onClick={abrirSistema}
            className="escola-sistema-botao"
          >
            Entrar no sistema
          </button>

        </div>

      </section>



      {/* ==================================================
          NOVIDADES
      =================================================== */}

      <section className="escola-secao escola-novidades">

        <div className="escola-titulo-secao">

          <div className="escola-titulo-icone">
            📢
          </div>

          <h2>
            Novidades
          </h2>

          <div className="escola-titulo-linha" />

        </div>


        <div className="escola-novidade-card">

          <div className="escola-novidade-icone">
            🏫
          </div>


          <div>

            <span className="escola-mini-titulo">
              E.E. Zinha Meira
            </span>

            <h3>
              Acompanhe nossas atividades
            </h3>

            <p>
              Projetos, ações pedagógicas, eventos e atividades
              desenvolvidas pela comunidade escolar.
            </p>

          </div>

        </div>

      </section>



      {/* ==================================================
          SOBRE NÓS

          IMPORTANTE:
          id="sobre" permite que o botão Sobre Nós
          do cabeçalho venha diretamente para cá.
      =================================================== */}

      <section
        id="sobre"
        className="escola-secao escola-sobre"
      >

        <div className="escola-titulo-secao">

          <div className="escola-titulo-icone">
            🏫
          </div>

          <h2>
            Sobre Nós
          </h2>

          <div className="escola-titulo-linha" />

        </div>


        <div className="escola-sobre-grid">


          {/* TEXTO */}

          <div className="escola-sobre-texto">

            <span className="escola-mini-titulo">
              Nossa Escola
            </span>

            <h2>
              Escola Estadual Zinha Meira
            </h2>

            <p>
              A Escola Estadual Zinha Meira está localizada
              em Bocaiúva, Minas Gerais, e tem como compromisso
              proporcionar educação de qualidade e contribuir
              para a formação integral de seus estudantes.
            </p>

            <p>
              A escola busca incentivar o conhecimento,
              a participação, o respeito, a responsabilidade
              e o desenvolvimento de habilidades importantes
              para a vida acadêmica e profissional.
            </p>

            <p>
              Também incentivamos o desenvolvimento de projetos,
              tecnologia, atividades pedagógicas e iniciativas
              que aproximem os estudantes de experiências
              práticas de aprendizagem.
            </p>


            <div className="escola-sobre-dados">

              <div>
                <strong>
                  INEP
                </strong>

                <span>
                  31079383
                </span>
              </div>


              <div>
                <strong>
                  Município
                </strong>

                <span>
                  Bocaiúva - MG
                </span>
              </div>


              <div>
                <strong>
                  Rede
                </strong>

                <span>
                  Estadual
                </span>
              </div>

            </div>

          </div>



          {/* IMAGEM */}

          <div className="escola-sobre-imagem">

            <img
              src={foto6}
              alt="E.E. Zinha Meira"
            />

          </div>


        </div>

      </section>



      {/* ==================================================
          CONTATOS

          IMPORTANTE:
          id="contatos" permite que o botão Contatos
          do cabeçalho venha diretamente para cá.
      =================================================== */}

      <section
        id="contatos"
        className="escola-secao escola-contatos"
      >

        <div className="escola-titulo-secao">

          <div className="escola-titulo-icone">
            📞
          </div>

          <h2>
            Contatos
          </h2>

          <div className="escola-titulo-linha" />

          <p>
            Entre em contato com a Escola Estadual Zinha Meira.
          </p>

        </div>



        <div className="escola-contatos-grid">


          {/* ENDEREÇO */}

          <div className="escola-contato-card">

            <div className="escola-contato-icone">
              📍
            </div>

            <h3>
              Endereço
            </h3>

            <p>
              Rua Presidente Juscelino Kubitschek, 615
            </p>

            <p>
              Pernambuco
            </p>

            <p>
              Bocaiúva/MG
            </p>

            <p>
              CEP 39390-000
            </p>

          </div>



          {/* TELEFONE */}

          <div className="escola-contato-card">

            <div className="escola-contato-icone">
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
              Falar pelo WhatsApp
            </a>

          </div>



          {/* EMAIL */}

          <div className="escola-contato-card">

            <div className="escola-contato-icone">
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



          {/* REDES SOCIAIS */}

          <div className="escola-contato-card">

            <div className="escola-contato-icone">
              🌐
            </div>

            <h3>
              Redes Sociais
            </h3>


            <div className="escola-redes">

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

      </section>



      {/* ==================================================
          RODAPÉ
      =================================================== */}

      <footer className="escola-footer">

        <div className="escola-footer-conteudo">


          {/* ESCOLA */}

          <div className="escola-footer-coluna">

            <h3>
              E.E. Zinha Meira
            </h3>

            <p>
              Educação, conhecimento e oportunidades
              para nossos estudantes.
            </p>

            <p>
              Bocaiúva - Minas Gerais
            </p>

          </div>



          {/* EQUIPE */}

          <div className="escola-footer-coluna">

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



          {/* PROFESSOR / COORDENAÇÃO */}

          <div className="escola-footer-coluna">

            <h3>
              Orientação
            </h3>

            <p>
              Professor: Jader Leal
            </p>

            <p>
              Coordenação:
              Fernando J. Silva
            </p>

            <p>
              Amanda K. D. Werneck
            </p>

          </div>



          {/* DIREÇÃO */}

          <div className="escola-footer-coluna">

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



        <div className="escola-footer-final">

          <p>
            © 2026 Escola Estadual Zinha Meira -
            Bocaiúva/MG
          </p>

        </div>

      </footer>


    </div>

  );

}