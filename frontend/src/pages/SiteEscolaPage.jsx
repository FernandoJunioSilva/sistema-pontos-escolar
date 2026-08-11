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

  function trocarAba(aba) {
    setAbaAtiva(aba);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function abrirPaginaSistema(pagina) {
    if (typeof mudarPagina === 'function') {
      mudarPagina(pagina);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="site-escola">
      <header className="escola-topo">
        <div className="escola-topo-conteudo">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=escola.79383@educacao.mg.gov.br"
            target="_blank"
            rel="noreferrer"
          >
            ✉️ Escola.79383@educacao.mg.gov.br
          </a>

          <span>📍 Bocaiúva - MG</span>

          <a href="https://www.instagram.com/terceirao.inf26/" target="_blank" rel="noreferrer">
            Instagram
          </a>

          <a href="https://web.facebook.com/E.E.ZinhaMeira/?_rdc=1&_rdr#" target="_blank" rel="noreferrer">
            Facebook
          </a>

          <a href="https://wa.me/qr/V57FQNNTV7UIP1" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </header>

      <header className="escola-cabecalho">
        <div className="escola-cabecalho-conteudo">
          <button className="escola-logo-area" type="button" onClick={() => trocarAba('inicio')}>
            <img src={logoEscola} alt="Logo da Escola Estadual Zinha Meira" />

            <div>
              <h1>Zinha Meira</h1>
              <p>Crescendo e Aprendendo Sempre</p>
            </div>
          </button>

          <nav className="escola-menu-abas">
            <button
              type="button"
              className={abaAtiva === 'inicio' ? 'ativo' : ''}
              onClick={() => trocarAba('inicio')}
            >
              Início
            </button>

            <button
              type="button"
              className={abaAtiva === 'sobre' ? 'ativo' : ''}
              onClick={() => trocarAba('sobre')}
            >
              Sobre Nós
            </button>

            <button
              type="button"
              className={abaAtiva === 'saiba' ? 'ativo' : ''}
              onClick={() => trocarAba('saiba')}
            >
              Saiba Mais
            </button>

            <button
              type="button"
              className={abaAtiva === 'contatos' ? 'ativo' : ''}
              onClick={() => trocarAba('contatos')}
            >
              Contatos
            </button>

            <button type="button" onClick={() => abrirPaginaSistema('inicio')}>
              Sistema de Pontos
            </button>

            <button type="button" onClick={() => abrirPaginaSistema('ranking')}>
              Ranking
            </button>

            <button type="button" onClick={() => abrirPaginaSistema('telao')}>
              Telão
            </button>
          </nav>
        </div>
      </header>

      <main className="escola-conteudo">
        {abaAtiva === 'inicio' && (
          <section>
            <section className="escola-banner">
              <img src={foto4} alt="Banner da Escola Estadual Zinha Meira" />
            </section>

            <section className="escola-servicos">
              <h2>Serviços Oferecidos</h2>

              <div className="escola-cards">
                <article className="escola-card">
                  <h3>📚 Reforço Escolar</h3>
                  <p>
                    Acompanhamento pedagógico para melhorar o desempenho dos alunos e fortalecer
                    o aprendizado em sala de aula.
                  </p>
                </article>

                <article className="escola-card">
                  <h3>👥 Atividades Educativas</h3>
                  <p>
                    Projetos que estimulam criatividade, participação, responsabilidade,
                    convivência e protagonismo estudantil.
                  </p>
                </article>

                <article className="escola-card">
                  <h3>💙 Apoio ao Aluno</h3>
                  <p>
                    Um ambiente acolhedor para o desenvolvimento pessoal, social e acadêmico dos
                    estudantes.
                  </p>
                </article>
              </div>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Bem-vindo à Escola Estadual Zinha Meira</h2>

              <p>
                A Escola Estadual Zinha Meira é uma instituição comprometida com a formação dos
                estudantes, oferecendo um ambiente de aprendizagem, acolhimento, desenvolvimento
                humano e preparação para o futuro.
              </p>

              <p>
                Nosso objetivo é promover uma educação de qualidade, valorizando o conhecimento,
                o respeito, a participação da comunidade escolar e o protagonismo dos alunos.
              </p>
            </section>

            <section className="escola-novidades">
              <button
                type="button"
                className="escola-card"
                onClick={() => setMostrarNovidades((valor) => !valor)}
              >
                <h3>📰 Novidades</h3>
                <p>Clique aqui para conferir as últimas notícias da escola.</p>
              </button>

              {mostrarNovidades && (
                <div>
                  <article className="escola-card escola-noticia">
                    <h3>Projeto de Leitura</h3>
                    <p>
                      A Escola Estadual Zinha Meira realizou atividades de incentivo à leitura
                      com participação dos estudantes.
                    </p>
                  </article>

                  <article className="escola-card escola-noticia">
                    <h3>Ensino Médio Integral</h3>
                    <p>
                      Novas atividades foram desenvolvidas com foco no protagonismo juvenil e no
                      projeto de vida dos alunos.
                    </p>
                  </article>

                  <article className="escola-card escola-noticia">
                    <h3>Eventos Escolares</h3>
                    <p>
                      A escola promoveu ações culturais e educativas envolvendo toda a comunidade
                      escolar.
                    </p>
                  </article>
                </div>
              )}
            </section>
          </section>
        )}

        {abaAtiva === 'sobre' && (
          <section>
            <section className="escola-galeria">
              {imagensGaleria.slice(0, 6).map((imagem, index) => (
                <img key={index} src={imagem} alt={`Registro da escola ${index + 1}`} />
              ))}
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Sobre Nossa Escola</h2>

              <h3>História da Escola</h3>

              <p>
                A Escola Estadual Zinha Meira recebeu esse nome em homenagem à professora
                <strong> Maria do Patrocínio Meira, conhecida como Zinha Meira</strong>, educadora
                que dedicou sua vida ao magistério em Bocaiúva.
              </p>

              <p>
                Criada inicialmente como Jardim de Infância Zinha Meira pelo Decreto nº 10.690,
                de 20 de setembro de 1967, a instituição iniciou suas atividades em 31 de março
                de 1968.
              </p>

              <p>
                Em 1982 passou a denominar-se Escola Estadual Zinha Meira, com a implantação do
                Ensino Fundamental, e em 1991 iniciou o Ensino Médio.
              </p>

              <p>
                Desde 1983, funciona em sede própria na Rua Presidente Juscelino Kubitschek, nº
                615, contribuindo para a formação de milhares de estudantes de Bocaiúva e região.
              </p>

              <button type="button" className="escola-botao" onClick={() => trocarAba('saiba')}>
                Saiba mais →
              </button>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Modalidades de Ensino</h2>

              <h3>Ensino Fundamental – Anos Finais</h3>
              <p>
                Compreende do 6º ao 9º ano, promovendo a consolidação das aprendizagens, o
                desenvolvimento das competências básicas e o fortalecimento da autonomia dos
                estudantes.
              </p>

              <h3>Ensino Médio</h3>
              <p>
                Tem como objetivo aprofundar os conhecimentos adquiridos, preparar os estudantes
                para o exercício da cidadania, para o mundo do trabalho e para a continuidade dos
                estudos.
              </p>

              <h3>Ensino Médio Integral</h3>
              <p>
                O Programa de Ensino Médio Integral busca desenvolver o estudante em todas as suas
                dimensões, tendo como foco o Projeto de Vida, o protagonismo juvenil, a autonomia
                e a formação cidadã.
              </p>

              <h3>Educação de Jovens e Adultos (EJA)</h3>
              <p>
                Modalidade destinada às pessoas que não tiveram acesso ou continuidade dos estudos
                na idade apropriada, valorizando suas experiências de vida e oferecendo
                flexibilidade curricular.
              </p>

              <h3>Educação Especial</h3>
              <p>
                A escola oferece Atendimento Educacional Especializado (AEE), Plano de
                Desenvolvimento Individual (PDI) e ações voltadas à inclusão dos estudantes com
                deficiência, TEA e altas habilidades/superdotação.
              </p>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Projeto Político-Pedagógico</h2>

              <p>
                O Projeto Político-Pedagógico da escola é elaborado de forma coletiva, garantindo
                a participação da comunidade escolar e fortalecendo a gestão democrática.
              </p>

              <h3>Equipe de Elaboração</h3>

              <ul className="escola-lista">
                <li>Direção Escolar</li>
                <li>Serviço Pedagógico</li>
                <li>Professores e demais servidores</li>
                <li>Pais, responsáveis e estudantes</li>
              </ul>
            </section>
          </section>
        )}

        {abaAtiva === 'saiba' && (
          <section>
            <section className="escola-hero">
              <h2>Escola Estadual Zinha Meira</h2>

              <p>
                Mais de meio século de dedicação à educação, formando cidadãos com
                responsabilidade, conhecimento e compromisso com o futuro.
              </p>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Maria do Patrocínio Meira – Zinha Meira</h2>

              <p>
                Maria do Patrocínio Meira, conhecida por Zinha Meira, nasceu em Bocaiúva em 22 de
                junho de 1888. Filha de Manoel Otaviano Meira e Tereza Caldeira Meira, realizou
                seus primeiros estudos na escola da professora Belmira, concluindo o curso primário.
              </p>

              <p>
                Mesmo diante das dificuldades de acesso à educação na época, destacou-se pela
                inteligência e vocação para o ensino, dedicando-se ao magistério ainda muito jovem.
              </p>

              <p>
                Em 1918 assumiu a escola mista do bairro Pernambuco e, posteriormente, tornou-se
                professora do Grupo Escolar Coronel Fulgêncio, atual Escola Estadual Genesco Augusto
                Caldeira Brant, onde também exerceu a função de diretora até sua aposentadoria,
                após quarenta anos de serviços prestados à educação.
              </p>

              <p>
                Católica dedicada, atuou intensamente na Igreja do Senhor do Bonfim como catequista,
                zeladora da igreja, presidente da Pia União das Filhas de Maria e integrante da
                Irmandade do Sagrado Coração de Jesus.
              </p>

              <p>
                Zinha Meira nunca se casou, dedicando sua vida ao ensino e ao serviço religioso.
                Faleceu em 8 de julho de 1959, deixando um legado que inspira gerações.
              </p>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Fundação da Escola</h2>

              <p>
                O Jardim de Infância Zinha Meira foi criado pelo Decreto nº 10.690, de 20 de
                setembro de 1967, em homenagem à professora Maria do Patrocínio Meira.
              </p>

              <p>
                As atividades escolares tiveram início em 31 de março de 1968, funcionando
                inicialmente na Rua Pires e Albuquerque, nº 96, tendo como primeira diretora Maria
                de Lourdes Ribeiro.
              </p>

              <p>
                Em 1982 foi implantado o Ensino Fundamental e a instituição passou a denominar-se
                Escola Estadual Zinha Meira. Em 1991 foi autorizado o funcionamento do Ensino
                Médio, ampliando as oportunidades de formação para os estudantes de Bocaiúva.
              </p>

              <p>
                Desde 1983 a escola possui sede própria localizada na Rua Presidente Juscelino
                Kubitschek, nº 615.
              </p>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Linha do Tempo</h2>

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
                  <p>Criação da Escola Estadual Zinha Meira e implantação do Ensino Fundamental.</p>
                </div>

                <div className="item">
                  <span>1983</span>
                  <p>Inauguração do prédio próprio.</p>
                </div>

                <div className="item">
                  <span>1991</span>
                  <p>Implantação do Ensino Médio.</p>
                </div>

                <div className="item">
                  <span>2013</span>
                  <p>Início da gestão do diretor Ataíde Alves Barroso.</p>
                </div>
              </div>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Ensino Médio Integral</h2>

              <p>
                O Programa de Ensino Médio em Tempo Integral de Minas Gerais promove uma formação
                completa, preparando os estudantes para os desafios acadêmicos, profissionais e
                sociais do século XXI.
              </p>

              <p>
                O modelo pedagógico coloca o estudante como protagonista do seu Projeto de Vida,
                incentivando autonomia, liderança, responsabilidade, solidariedade e participação
                ativa na comunidade escolar.
              </p>

              <p>
                A integração entre gestão e práticas pedagógicas possibilita uma educação de
                excelência, formando jovens competentes, comprometidos com a cidadania e preparados
                para construir um futuro melhor.
              </p>
            </section>
          </section>
        )}

        {abaAtiva === 'contatos' && (
          <section>
            <section className="escola-hero">
              <h2>Entre em Contato</h2>

              <p>
                Acompanhe a Escola Estadual Zinha Meira pelos canais oficiais de comunicação.
              </p>
            </section>

            <section className="escola-cards">
              <article className="escola-card">
                <h3>📷 Instagram</h3>
                <p>@terceirao.inf26</p>

                <a href="https://www.instagram.com/terceirao.inf26/" target="_blank" rel="noreferrer">
                  Acessar Instagram
                </a>
              </article>

              <article className="escola-card">
                <h3>☎️ Telefone</h3>
                <p>(38) 93251-1732</p>
              </article>

              <article className="escola-card">
                <h3>✉️ E-mail</h3>
                <p>Escola.79383@educacao.mg.gov.br</p>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=escola.79383@educacao.mg.gov.br"
                  target="_blank"
                  rel="noreferrer"
                >
                  Enviar e-mail
                </a>
              </article>
            </section>

            <section className="escola-card escola-texto-card">
              <h2>Endereço</h2>

              <p>
                Rua Presidente Juscelino Kubitschek, 615 – Pernambuco, Bocaiúva/MG – CEP 39390-000.
              </p>

              <p>Código INEP: 31079383</p>
            </section>
          </section>
        )}
      </main>

      <footer className="escola-rodape">
        <p>Rua Presidente Juscelino Kubitschek, 615 – Pernambuco, Bocaiúva/MG – CEP 39390-000</p>

        <p>Código INEP: 31079383</p>

        <p className="escola-copy">
          © 2026 Escola Estadual Zinha Meira - Bocaiúva/MG
        </p>

        <div className="escola-creditos">
          <p>
            <strong>Criadores:</strong> Beatriz G. Cardoso, Bruna E. M. Silva, Lara Bragança C. Rosa e Thalisson R.A. Rosa.
          </p>

          <p>
            <strong>Professor do Projeto:</strong> Jader Leal.
          </p>

          <p>
            <strong>Coordenação:</strong> Fernando J. Silva, Amanda K. D. Werneck.
          </p>

          <p>
            <strong>Vice Direção:</strong> Elizeth C. O. Montes, Helbert E. C. Souza, Cristiane C. Alves.
          </p>

          <p>
            <strong>Direção:</strong> Janiny J. D. Oliveira.
          </p>
        </div>
      </footer>
    </div>
  );
}