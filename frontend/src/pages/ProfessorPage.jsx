import React, {
  useEffect,
  useMemo,
  useState
} from 'react';

import {
  apiGet,
  apiPost,
  apiPut
} from '../services/api';

import {
  obterToken,
  obterUsuario
} from '../services/auth';

import CelebrationPopup
  from '../components/CelebrationPopup';

import './ProfessorPage.css';


const SEMANAS = [
  'Semana 1',
  'Semana 2',
  'Semana 3',
  'Semana 4',
  'Semana 5',
  'Semana 6',
  'Semana 7',
  'Semana 8',
  'Semana 9',
  'Semana 10',
  'Semana 11',
  'Semana 12'
];


/* ===================================================== */
/* PONTUAÇÃO COLETIVA                                   */
/* ===================================================== */

const OPCOES_COLETIVAS = [
  {
    id: 'participacao-ativa',
    label: 'Participação ativa em aula',
    exemplo:
      'A turma participou das explicações, respondeu perguntas ou se envolveu nas atividades.',
    pontos: 10,
    tipo: 'positivo',
    oposto: 'baixa-participacao'
  },
  {
    id: 'tarefa-entregue',
    label: 'Tarefa entregue',
    exemplo:
      'A atividade solicitada foi entregue dentro do prazo.',
    pontos: 10,
    tipo: 'positivo',
    oposto: 'tarefa-nao-entregue'
  },
  {
    id: 'presenca-turma',
    label: 'Presença da turma',
    exemplo:
      'Todos os alunos da turma estiveram presentes na aula.',
    pontos: 10,
    tipo: 'positivo',
    oposto: 'baixa-frequencia'
  },
  {
    id: 'pontualidade',
    label: 'Pontualidade da turma',
    exemplo:
      'Os alunos chegaram no horário e a aula começou sem atrasos.',
    pontos: 10,
    tipo: 'positivo',
    oposto: 'atraso'
  },
  {
    id: 'bom-comportamento',
    label: 'Bom comportamento',
    exemplo:
      'A turma manteve respeito, organização e disciplina durante a aula.',
    pontos: 10,
    tipo: 'positivo',
    oposto: 'comportamento-inadequado'
  },

  {
    id: 'baixa-participacao',
    label: 'Baixa participação em aula',
    exemplo:
      'A turma demonstrou pouca participação ou pouco envolvimento nas atividades.',
    pontos: -10,
    tipo: 'negativo',
    oposto: 'participacao-ativa'
  },
  {
    id: 'tarefa-nao-entregue',
    label: 'Tarefa não entregue',
    exemplo:
      'A atividade solicitada não foi entregue.',
    pontos: -10,
    tipo: 'negativo',
    oposto: 'tarefa-entregue'
  },
  {
    id: 'baixa-frequencia',
    label: 'Baixa frequência da turma',
    exemplo:
      'Houve quantidade significativa de alunos ausentes na aula.',
    pontos: -10,
    tipo: 'negativo',
    oposto: 'presenca-turma'
  },
  {
    id: 'atraso',
    label: 'Atraso',
    exemplo:
      'Houve atraso significativo dos alunos para o início da aula.',
    pontos: -10,
    tipo: 'negativo',
    oposto: 'pontualidade'
  },
  {
    id: 'comportamento-inadequado',
    label: 'Comportamento inadequado',
    exemplo:
      'Houve bagunça excessiva, desrespeito ou interrupções constantes.',
    pontos: -10,
    tipo: 'negativo',
    oposto: 'bom-comportamento'
  }
];


/* ===================================================== */
/* PONTUAÇÃO INDIVIDUAL                                 */
/* ===================================================== */

const OPCOES_INDIVIDUAIS = [
  {
    id: 'destaque',
    label: 'Destaque individual',
    pontos: 10,
    simbolo: '⭐',
    descricao:
      'Excelente participação, interesse, colaboração, bom desempenho ou comportamento positivo.'
  },
  {
    id: 'atencao',
    label: 'Ponto de atenção',
    pontos: -10,
    simbolo: '⚠️',
    descricao:
      'Falta de participação, atividade não realizada, desrespeito às orientações ou comportamento que precisa melhorar.'
  }
];


const criarAvaliacaoVazia = () => ({
  alunoId: '',
  tipo: '',
  observacao: ''
});


export default function ProfessorPage({
  mudarPagina
}) {
  const token = obterToken();
  const usuario = obterUsuario();


  /* =================================================== */
  /* DADOS                                               */
  /* =================================================== */

  const [
    alunos,
    setAlunos
  ] = useState([]);

  const [
    turmas,
    setTurmas
  ] = useState([]);

  const [
    pontuacoes,
    setPontuacoes
  ] = useState([]);


  /* =================================================== */
  /* TURMA E SEMANA                                      */
  /* =================================================== */

  const [
    turmaSelecionada,
    setTurmaSelecionada
  ] = useState('');

  const [
    semana,
    setSemana
  ] = useState('Semana 1');


  /* =================================================== */
  /* PONTUAÇÃO COLETIVA                                  */
  /* =================================================== */

  const [
    selecoesTurma,
    setSelecoesTurma
  ] = useState({});


  /* =================================================== */
  /* PONTUAÇÃO INDIVIDUAL                                */
  /* =================================================== */

  const [
    avaliacoesIndividuais,
    setAvaliacoesIndividuais
  ] = useState([
    criarAvaliacaoVazia(),
    criarAvaliacaoVazia(),
    criarAvaliacaoVazia(),
    criarAvaliacaoVazia(),
    criarAvaliacaoVazia()
  ]);


  /* =================================================== */
  /* CONFERÊNCIA DA FICHA                                */
  /* =================================================== */

  const [
    professorFicha,
    setProfessorFicha
  ] = useState('');

  const [
    totalInformado,
    setTotalInformado
  ] = useState('');

  const [
    assinaturaConferida,
    setAssinaturaConferida
  ] = useState(false);


  /* =================================================== */
  /* ESTADOS AUXILIARES                                  */
  /* =================================================== */

  const [
    salvando,
    setSalvando
  ] = useState(false);

  const [
    popupVisivel,
    setPopupVisivel
  ] = useState(false);

  const [
    popupDados,
    setPopupDados
  ] = useState(null);


  /* =================================================== */
  /* HISTÓRICO / EDIÇÃO                                  */
  /* =================================================== */

  const [
    filtroSemanaEdicao,
    setFiltroSemanaEdicao
  ] = useState('Semana 1');

  const [
    editandoId,
    setEditandoId
  ] = useState(null);

  const [
    editPontos,
    setEditPontos
  ] = useState('');

  const [
    editMotivo,
    setEditMotivo
  ] = useState('');

  const [
    editSemana,
    setEditSemana
  ] = useState('');


  /* =================================================== */
  /* CARREGAMENTO                                        */
  /* =================================================== */

  useEffect(() => {
    carregarDados();
  }, []);


  async function carregarDados() {
    try {
      const [
        alunosData,
        turmasData,
        pontuacoesData
      ] = await Promise.all([
        apiGet('/alunos', token),
        apiGet('/turmas', token),
        apiGet('/pontuacoes', token)
      ]);


      setAlunos(
        alunosData
      );

      setTurmas(
        turmasData
      );

      setPontuacoes(
        pontuacoesData
      );


      if (
        turmasData.length > 0 &&
        !turmaSelecionada
      ) {
        setTurmaSelecionada(
          turmasData[0].nome
        );
      }

    } catch (error) {
      console.error(
        'Erro ao carregar dados:',
        error
      );
    }
  }


  /* =================================================== */
  /* ALUNOS DA TURMA                                     */
  /* =================================================== */

  const alunosDaTurma =
    useMemo(() => {
      return alunos.filter(
        (aluno) =>
          aluno.turma?.nome ===
          turmaSelecionada
      );
    }, [
      alunos,
      turmaSelecionada
    ]);


  /* =================================================== */
  /* HISTÓRICO FILTRADO                                  */
  /* =================================================== */

  const historicoFiltrado =
    useMemo(() => {
      return pontuacoes.filter(
        (p) =>
          p.aluno?.turma?.nome ===
            turmaSelecionada &&
          (
            filtroSemanaEdicao
              ? p.semana ===
                filtroSemanaEdicao
              : true
          )
      );
    }, [
      pontuacoes,
      turmaSelecionada,
      filtroSemanaEdicao
    ]);


  /* =================================================== */
  /* INDIVIDUAIS JÁ REGISTRADOS                         */
  /* =================================================== */

  const individuaisJaRegistrados =
    useMemo(() => {

      const registros =
        pontuacoes.filter(
          (p) =>
            p.aluno?.turma?.nome ===
              turmaSelecionada &&
            p.semana === semana &&
            String(
              p.motivo || ''
            ).includes(
              '[INDIVIDUAL]'
            )
        );


      const ids =
        new Set(
          registros.map(
            (p) =>
              p.aluno?.id ??
              p.alunoId
          )
        );


      return ids;

    }, [
      pontuacoes,
      turmaSelecionada,
      semana
    ]);


  const quantidadeJaRegistrada =
    individuaisJaRegistrados.size;


  const limiteDisponivel =
    Math.max(
      0,
      5 -
      quantidadeJaRegistrada
    );


  /* =================================================== */
  /* SELEÇÃO COLETIVA                                    */
  /* =================================================== */

  function alternarCriterioTurma(
    opcao
  ) {
    setSelecoesTurma(
      (anterior) => {

        const novoEstado = {
          ...anterior
        };


        const vaiMarcar =
          !novoEstado[
            opcao.id
          ];


        novoEstado[
          opcao.id
        ] =
          vaiMarcar;


        /*
          Ao marcar uma opção,
          desmarca automaticamente
          o critério contrário.
        */

        if (
          vaiMarcar &&
          opcao.oposto
        ) {
          novoEstado[
            opcao.oposto
          ] = false;
        }


        return novoEstado;
      }
    );
  }


  /* =================================================== */
  /* CRITÉRIOS SELECIONADOS                              */
  /* =================================================== */

  const criteriosSelecionados =
    useMemo(() => {
      return OPCOES_COLETIVAS.filter(
        (opcao) =>
          selecoesTurma[
            opcao.id
          ]
      );
    }, [
      selecoesTurma
    ]);


  const totalColetivo =
    useMemo(() => {
      return criteriosSelecionados.reduce(
        (
          total,
          opcao
        ) =>
          total +
          opcao.pontos,
        0
      );
    }, [
      criteriosSelecionados
    ]);


  /* =================================================== */
  /* INDIVIDUAL                                          */
  /* =================================================== */

  function atualizarAvaliacao(
    index,
    campo,
    valor
  ) {
    setAvaliacoesIndividuais(
      (anterior) => {

        const novaLista =
          anterior.map(
            (
              item,
              indice
            ) =>
              indice === index
                ? {
                    ...item,
                    [campo]: valor
                  }
                : item
          );


        return novaLista;
      }
    );
  }


  function selecionarTipoIndividual(
    index,
    tipo
  ) {
    atualizarAvaliacao(
      index,
      'tipo',
      tipo
    );
  }


  const avaliacoesPreenchidas =
    useMemo(() => {

      return avaliacoesIndividuais
        .filter(
          (item) =>
            item.alunoId &&
            item.tipo
        )
        .map(
          (item) => {

            const opcao =
              OPCOES_INDIVIDUAIS
                .find(
                  (o) =>
                    o.id ===
                    item.tipo
                );


            return {
              ...item,

              pontos:
                opcao?.pontos ??
                0,

              label:
                opcao?.label ??
                ''
            };
          }
        );

    }, [
      avaliacoesIndividuais
    ]);


  const totalIndividual =
    useMemo(() => {

      return avaliacoesPreenchidas.reduce(
        (
          total,
          item
        ) =>
          total +
          item.pontos,
        0
      );

    }, [
      avaliacoesPreenchidas
    ]);


  /* =================================================== */
  /* TOTAIS DA FICHA                                     */
  /* =================================================== */

  const positivosColetivos =
    criteriosSelecionados
      .filter(
        (o) =>
          o.pontos > 0
      )
      .reduce(
        (
          total,
          o
        ) =>
          total +
          o.pontos,
        0
      );


  const negativosColetivos =
    criteriosSelecionados
      .filter(
        (o) =>
          o.pontos < 0
      )
      .reduce(
        (
          total,
          o
        ) =>
          total +
          o.pontos,
        0
      );


  const positivosIndividuais =
    avaliacoesPreenchidas
      .filter(
        (a) =>
          a.pontos > 0
      )
      .reduce(
        (
          total,
          a
        ) =>
          total +
          a.pontos,
        0
      );


  const negativosIndividuais =
    avaliacoesPreenchidas
      .filter(
        (a) =>
          a.pontos < 0
      )
      .reduce(
        (
          total,
          a
        ) =>
          total +
          a.pontos,
        0
      );


  const totalPositivo =
    positivosColetivos +
    positivosIndividuais;


  const totalNegativo =
    negativosColetivos +
    negativosIndividuais;


  const totalCalculado =
    totalColetivo +
    totalIndividual;


  const totalConfere =
    totalInformado !== '' &&
    Number(
      totalInformado
    ) ===
      totalCalculado;


  /* =================================================== */
  /* ALUNO JÁ UTILIZADO                                  */
  /* =================================================== */

  function alunoJaSelecionado(
    alunoId,
    ignorarIndex
  ) {
    return avaliacoesIndividuais
      .some(
        (
          item,
          index
        ) =>
          index !==
            ignorarIndex &&
          String(
            item.alunoId
          ) ===
            String(
              alunoId
            )
      );
  }


  /* =================================================== */
  /* LIMPAR FORMULÁRIO                                   */
  /* =================================================== */

  function limparFormulario() {
    setSelecoesTurma(
      {}
    );


    setAvaliacoesIndividuais([
      criarAvaliacaoVazia(),
      criarAvaliacaoVazia(),
      criarAvaliacaoVazia(),
      criarAvaliacaoVazia(),
      criarAvaliacaoVazia()
    ]);


    setProfessorFicha(
      ''
    );


    setTotalInformado(
      ''
    );


    setAssinaturaConferida(
      false
    );
  }


  /* =================================================== */
  /* LANÇAR PONTUAÇÕES                                   */
  /* =================================================== */

  async function lancarPontuacoes() {

    if (
      !turmaSelecionada
    ) {
      alert(
        'Selecione uma turma.'
      );

      return;
    }


    if (
      criteriosSelecionados.length ===
        0 &&
      avaliacoesPreenchidas.length ===
        0
    ) {
      alert(
        'Selecione pelo menos uma pontuação coletiva ou individual.'
      );

      return;
    }


    if (
      !professorFicha.trim()
    ) {
      alert(
        'Informe o nome do professor responsável pela ficha.'
      );

      return;
    }


    if (
      totalInformado === ''
    ) {
      alert(
        'Informe o total anotado pelo professor na ficha.'
      );

      return;
    }


    if (
      !totalConfere
    ) {
      alert(
        `O total informado (${totalInformado}) não corresponde ao total calculado pelo sistema (${totalCalculado}).`
      );

      return;
    }


    if (
      !assinaturaConferida
    ) {
      alert(
        'Confirme que a ficha foi assinada pelo professor.'
      );

      return;
    }


    if (
      avaliacoesPreenchidas.length >
      limiteDisponivel
    ) {
      alert(
        `Esta turma possui apenas ${limiteDisponivel} vaga(s) restante(s) para pontuação individual nesta semana.`
      );

      return;
    }


    const idsIndividuais =
      avaliacoesPreenchidas.map(
        (a) =>
          String(
            a.alunoId
          )
      );


    if (
      new Set(
        idsIndividuais
      ).size !==
      idsIndividuais.length
    ) {
      alert(
        'O mesmo aluno não pode ser selecionado mais de uma vez.'
      );

      return;
    }


    if (
      !usuario?.professorId
    ) {
      alert(
        'O usuário atual não possui professorId. Verifique o cadastro do usuário responsável pelo lançamento.'
      );

      return;
    }


    setSalvando(
      true
    );


    try {

      const motivoColetivo =
        criteriosSelecionados
          .map(
            (opcao) =>
              opcao.label
          )
          .join(
            ', '
          );


      const mapaIndividuais =
        new Map(
          avaliacoesPreenchidas.map(
            (item) => [
              String(
                item.alunoId
              ),
              item
            ]
          )
        );


      /*
        Mantém o funcionamento atual
        do seu backend:

        critérios coletivos são
        aplicados aos alunos da turma.

        Pontuação individual é somada
        somente ao aluno selecionado.
      */

      for (
        const aluno of
        alunosDaTurma
      ) {

        const individual =
          mapaIndividuais.get(
            String(
              aluno.id
            )
          );


        const possuiColetivo =
          criteriosSelecionados.length >
          0;


        if (
          !possuiColetivo &&
          !individual
        ) {
          continue;
        }


        const pontos =
          totalColetivo +
          (
            individual?.pontos ??
            0
          );


        const partesMotivo =
          [];


        if (
          possuiColetivo
        ) {
          partesMotivo.push(
            `[COLETIVA] ${motivoColetivo}`
          );
        }


        if (
          individual
        ) {

          let textoIndividual =
            `[INDIVIDUAL] ${individual.label}`;


          if (
            individual.observacao.trim()
          ) {
            textoIndividual +=
              ` - ${individual.observacao.trim()}`;
          }


          partesMotivo.push(
            textoIndividual
          );
        }


        partesMotivo.push(
          `Professor da ficha: ${professorFicha.trim()}`
        );


        partesMotivo.push(
          'Assinatura conferida'
        );


        await apiPost(
          '/pontuacoes',
          {
            alunoId:
              aluno.id,

            professorId:
              usuario.professorId,

            pontos,

            motivo:
              partesMotivo.join(
                ' | '
              ),

            semana
          },
          token
        );
      }


      setPopupDados({
        aluno:
          turmaSelecionada,

        turma:
          semana,

        pontos:
          totalCalculado,

        motivo:
          'Ficha lançada e conferida com sucesso.'
      });


      setPopupVisivel(
        true
      );


      limparFormulario();


      await carregarDados();

    } catch (error) {

      console.error(
        'Erro ao lançar pontuações:',
        error
      );


      alert(
        error.message ||
        'Erro ao lançar pontuações.'
      );

    } finally {

      setSalvando(
        false
      );
    }
  }


  /* =================================================== */
  /* EDIÇÃO                                              */
  /* =================================================== */

  function iniciarEdicao(
    item
  ) {
    setEditandoId(
      item.id
    );

    setEditPontos(
      item.pontos
    );

    setEditMotivo(
      item.motivo
    );

    setEditSemana(
      item.semana ||
      'Semana 1'
    );
  }


  async function salvarEdicao(
    id
  ) {
    const item =
      pontuacoes.find(
        (p) =>
          p.id === id
      );


    if (!item) {
      return;
    }


    try {

      await apiPut(
        `/pontuacoes/${id}`,
        {
          alunoId:
            item.alunoId,

          professorId:
            item.professorId,

          pontos:
            Number(
              editPontos
            ),

          motivo:
            editMotivo,

          semana:
            editSemana
        },
        token
      );


      setEditandoId(
        null
      );


      await carregarDados();

    } catch (error) {

      console.error(
        'Erro ao editar pontuação:',
        error
      );


      alert(
        'Não foi possível editar a pontuação.'
      );
    }
  }


  /* =================================================== */
  /* VOLTAR                                              */
  /* =================================================== */

  function voltar() {

    if (
      typeof mudarPagina ===
      'function'
    ) {
      mudarPagina(
        'inicio'
      );

      return;
    }


    window.history.back();
  }


  /* =================================================== */
  /* INTERFACE                                           */
  /* =================================================== */

  return (

    <div className="pontuacao-page">


      <CelebrationPopup
        visivel={
          popupVisivel
        }
        dados={
          popupDados
        }
        onClose={() =>
          setPopupVisivel(
            false
          )
        }
      />


      <div className="pontuacao-container">


        {/* ================================================= */}
        {/* TOPO                                              */}
        {/* ================================================= */}

        <header className="pontuacao-header">


          <div className="pontuacao-header__conteudo">


            <span className="pontuacao-header__tag">

              Sistema de Pontos

            </span>


            <h1>

              Lançamento de Pontuação

            </h1>


            <p>

              Registre os dados da ficha
              entregue pelo professor de
              forma simples e organizada.

            </p>


          </div>


          <button
            type="button"
            className="pontuacao-voltar"
            onClick={
              voltar
            }
          >

            <span>
              ←
            </span>

            Voltar

          </button>


        </header>


        {/* ================================================= */}
        {/* ETAPA 1                                           */}
        {/* ================================================= */}

        <section className="pontuacao-card">


          <div className="pontuacao-card__titulo">


            <div className="pontuacao-numero">

              1

            </div>


            <div>

              <span>
                Identificação
              </span>

              <h2>
                Selecione a turma e a semana
              </h2>

              <p>
                Comece informando em qual turma
                e semana a ficha será lançada.
              </p>

            </div>


          </div>


          <div className="pontuacao-form-grid">


            <div className="pontuacao-campo">

              <label>
                Turma
              </label>


              <select
                value={
                  turmaSelecionada
                }
                onChange={
                  (e) => {

                    setTurmaSelecionada(
                      e.target.value
                    );

                    limparFormulario();
                  }
                }
              >

                {
                  turmas.map(
                    (turma) => (

                      <option
                        key={
                          turma.id
                        }
                        value={
                          turma.nome
                        }
                      >

                        {turma.nome}

                      </option>

                    )
                  )
                }

              </select>

            </div>


            <div className="pontuacao-campo">

              <label>
                Semana
              </label>


              <select
                value={
                  semana
                }
                onChange={
                  (e) => {

                    setSemana(
                      e.target.value
                    );

                    limparFormulario();
                  }
                }
              >

                {
                  SEMANAS.map(
                    (item) => (

                      <option
                        key={
                          item
                        }
                        value={
                          item
                        }
                      >

                        {item}

                      </option>

                    )
                  )
                }

              </select>

            </div>


          </div>


          <div className="pontuacao-resumo-turma">

            <span>
              Turma selecionada
            </span>

            <strong>
              {
                turmaSelecionada ||
                'Nenhuma'
              }
            </strong>

            <small>
              {
                alunosDaTurma.length
              }
              {' alunos cadastrados'}
            </small>

          </div>


        </section>


        {/* ================================================= */}
        {/* ETAPA 2                                           */}
        {/* ================================================= */}

        <section className="pontuacao-card">


          <div className="pontuacao-card__titulo">


            <div className="pontuacao-numero">

              2

            </div>


            <div>

              <span>
                Pontuação coletiva
              </span>

              <h2>
                Avaliação da turma
              </h2>

              <p>
                Marque somente os critérios
                assinalados na ficha.
                Opções contrárias são
                desmarcadas automaticamente.
              </p>

            </div>


          </div>


          <div className="pontuacao-legenda">


            <span className="pontuacao-legenda__positivo">

              + Critérios positivos

            </span>


            <span className="pontuacao-legenda__negativo">

              − Critérios negativos

            </span>


          </div>


          <div className="pontuacao-criterios-grid">


            {
              OPCOES_COLETIVAS.map(
                (opcao) => {

                  const marcado =
                    !!selecoesTurma[
                      opcao.id
                    ];


                  return (

                    <button
                      type="button"
                      key={
                        opcao.id
                      }
                      className={
                        [
                          'pontuacao-criterio',

                          `pontuacao-criterio--${opcao.tipo}`,

                          marcado
                            ? 'pontuacao-criterio--marcado'
                            : ''
                        ].join(
                          ' '
                        )
                      }
                      onClick={() =>
                        alternarCriterioTurma(
                          opcao
                        )
                      }
                    >


                      <div className="pontuacao-criterio__check">

                        {
                          marcado
                            ? '✓'
                            : ''
                        }

                      </div>


                      <div className="pontuacao-criterio__conteudo">


                        <div className="pontuacao-criterio__topo">


                          <strong>

                            {
                              opcao.pontos >
                              0
                                ? `+${opcao.pontos}`
                                : opcao.pontos
                            }

                          </strong>


                          <span>

                            {opcao.label}

                          </span>


                        </div>


                        <small>

                          {opcao.exemplo}

                        </small>


                      </div>


                    </button>

                  );
                }
              )
            }


          </div>


          <div className="pontuacao-total-coletivo">


            <span>

              Total coletivo selecionado

            </span>


            <strong
              className={
                totalColetivo >= 0
                  ? 'positivo'
                  : 'negativo'
              }
            >

              {
                totalColetivo >
                0
                  ? `+${totalColetivo}`
                  : totalColetivo
              }

            </strong>


          </div>


        </section>


        {/* ================================================= */}
        {/* ETAPA 3                                           */}
        {/* ================================================= */}

        <section className="pontuacao-card">


          <div className="pontuacao-card__titulo pontuacao-card__titulo--contador">


            <div className="pontuacao-card__titulo-esquerda">


              <div className="pontuacao-numero">

                3

              </div>


              <div>

                <span>
                  Pontuação individual
                </span>

                <h2>
                  Até 5 alunos por semana
                </h2>

                <p>
                  Cada aluno pode receber
                  apenas Destaque individual
                  ou Ponto de atenção.
                </p>

              </div>


            </div>


            <div
              className={
                quantidadeJaRegistrada >= 5
                  ? 'pontuacao-contador pontuacao-contador--cheio'
                  : 'pontuacao-contador'
              }
            >

              <strong>

                {
                  quantidadeJaRegistrada +
                  avaliacoesPreenchidas.length
                }

                /5

              </strong>

              <span>
                alunos
              </span>

            </div>


          </div>


          {
            quantidadeJaRegistrada >
            0 && (

              <div className="pontuacao-aviso">

                ℹ️ Esta turma já possui{' '}

                <strong>
                  {quantidadeJaRegistrada}
                </strong>

                {' '}aluno(s) com pontuação
                individual registrada em{' '}

                <strong>
                  {semana}
                </strong>.

              </div>

            )
          }


          <div className="pontuacao-individuais">


            {
              avaliacoesIndividuais.map(
                (
                  avaliacao,
                  index
                ) => {

                  const linhaDisponivel =
                    index <
                    limiteDisponivel;


                  return (

                    <div
                      key={
                        index
                      }
                      className={
                        linhaDisponivel
                          ? 'pontuacao-individual-card'
                          : 'pontuacao-individual-card pontuacao-individual-card--bloqueado'
                      }
                    >


                      <div className="pontuacao-individual-numero">

                        {index + 1}

                      </div>


                      <div className="pontuacao-individual-conteudo">


                        <div className="pontuacao-campo">

                          <label>
                            Aluno
                          </label>


                          <select
                            value={
                              avaliacao.alunoId
                            }
                            disabled={
                              !linhaDisponivel
                            }
                            onChange={
                              (e) =>
                                atualizarAvaliacao(
                                  index,
                                  'alunoId',
                                  e.target.value
                                )
                            }
                          >

                            <option value="">

                              Selecione o aluno

                            </option>


                            {
                              alunosDaTurma.map(
                                (aluno) => {

                                  const jaSelecionado =
                                    alunoJaSelecionado(
                                      aluno.id,
                                      index
                                    );


                                  const jaRegistrado =
                                    individuaisJaRegistrados.has(
                                      aluno.id
                                    ) ||
                                    individuaisJaRegistrados.has(
                                      String(
                                        aluno.id
                                      )
                                    );


                                  return (

                                    <option
                                      key={
                                        aluno.id
                                      }
                                      value={
                                        aluno.id
                                      }
                                      disabled={
                                        jaSelecionado ||
                                        jaRegistrado
                                      }
                                    >

                                      {aluno.nome}

                                      {
                                        jaRegistrado
                                          ? ' — já lançado'
                                          : ''
                                      }

                                    </option>

                                  );
                                }
                              )
                            }

                          </select>

                        </div>


                        <div className="pontuacao-tipos-individuais">


                          {
                            OPCOES_INDIVIDUAIS.map(
                              (opcao) => (

                                <button
                                  type="button"
                                  key={
                                    opcao.id
                                  }
                                  disabled={
                                    !linhaDisponivel ||
                                    !avaliacao.alunoId
                                  }
                                  className={
                                    [
                                      'pontuacao-tipo-btn',

                                      opcao.pontos >
                                      0
                                        ? 'pontuacao-tipo-btn--positivo'
                                        : 'pontuacao-tipo-btn--negativo',

                                      avaliacao.tipo ===
                                      opcao.id
                                        ? 'ativo'
                                        : ''
                                    ].join(
                                      ' '
                                    )
                                  }
                                  onClick={() =>
                                    selecionarTipoIndividual(
                                      index,
                                      opcao.id
                                    )
                                  }
                                >

                                  <strong>

                                    {
                                      opcao.simbolo
                                    }

                                    {' '}

                                    {
                                      opcao.pontos >
                                      0
                                        ? `+${opcao.pontos}`
                                        : opcao.pontos
                                    }

                                  </strong>


                                  <span>

                                    {
                                      opcao.label
                                    }

                                  </span>


                                  <small>

                                    {
                                      opcao.descricao
                                    }

                                  </small>


                                </button>

                              )
                            )
                          }


                        </div>


                        <div className="pontuacao-campo">

                          <label>
                            Observação
                            <span>
                              {' '}— opcional
                            </span>
                          </label>


                          <input
                            type="text"
                            disabled={
                              !linhaDisponivel
                            }
                            value={
                              avaliacao.observacao
                            }
                            placeholder="Ex.: excelente participação na atividade em grupo."
                            onChange={
                              (e) =>
                                atualizarAvaliacao(
                                  index,
                                  'observacao',
                                  e.target.value
                                )
                            }
                          />

                        </div>


                      </div>


                    </div>

                  );
                }
              )
            }


          </div>


        </section>


        {/* ================================================= */}
        {/* ETAPA 4                                           */}
        {/* ================================================= */}

        <section className="pontuacao-card">


          <div className="pontuacao-card__titulo">


            <div className="pontuacao-numero">

              4

            </div>


            <div>

              <span>
                Conferência da ficha
              </span>

              <h2>
                Total e assinatura
              </h2>

              <p>
                Confira os valores da ficha
                física antes de finalizar o
                lançamento.
              </p>

            </div>


          </div>


          <div className="pontuacao-totais-grid">


            <div className="pontuacao-total-card pontuacao-total-card--positivo">

              <span>
                Pontos positivos
              </span>

              <strong>

                +{totalPositivo}

              </strong>

            </div>


            <div className="pontuacao-total-card pontuacao-total-card--negativo">

              <span>
                Pontos negativos
              </span>

              <strong>

                {totalNegativo}

              </strong>

            </div>


            <div className="pontuacao-total-card pontuacao-total-card--principal">

              <span>
                Total calculado
              </span>

              <strong>

                {
                  totalCalculado >
                  0
                    ? `+${totalCalculado}`
                    : totalCalculado
                }

              </strong>

            </div>


          </div>


          <div className="pontuacao-conferencia-grid">


            <div className="pontuacao-campo">

              <label>
                Professor(a) responsável pela ficha
              </label>


              <input
                type="text"
                value={
                  professorFicha
                }
                placeholder="Digite o nome do professor"
                onChange={
                  (e) =>
                    setProfessorFicha(
                      e.target.value
                    )
                }
              />

            </div>


            <div className="pontuacao-campo">

              <label>
                Total informado pelo professor
              </label>


              <input
                type="number"
                value={
                  totalInformado
                }
                placeholder="Ex.: 30"
                onChange={
                  (e) =>
                    setTotalInformado(
                      e.target.value
                    )
                }
              />

            </div>


          </div>


          {
            totalInformado !== '' && (

              <div
                className={
                  totalConfere
                    ? 'pontuacao-conferencia pontuacao-conferencia--ok'
                    : 'pontuacao-conferencia pontuacao-conferencia--erro'
                }
              >

                {
                  totalConfere
                    ? '✓ O total informado confere com o cálculo do sistema.'
                    : `⚠ O professor informou ${totalInformado}, mas o sistema calculou ${totalCalculado}.`
                }

              </div>

            )
          }


          <label className="pontuacao-assinatura">


            <input
              type="checkbox"
              checked={
                assinaturaConferida
              }
              onChange={
                (e) =>
                  setAssinaturaConferida(
                    e.target.checked
                  )
              }
            />


            <div>

              <strong>
                Assinatura conferida
              </strong>

              <span>
                Confirmo que a ficha física
                está assinada pelo professor responsável.
              </span>

            </div>


          </label>


          <button
            type="button"
            className="pontuacao-salvar"
            disabled={
              salvando
            }
            onClick={
              lancarPontuacoes
            }
          >

            {
              salvando
                ? 'Salvando pontuações...'
                : '✓ Confirmar e lançar pontuação'
            }

          </button>


        </section>


        {/* ================================================= */}
        {/* HISTÓRICO                                         */}
        {/* ================================================= */}

        <section className="pontuacao-card">


          <div className="pontuacao-card__titulo">


            <div className="pontuacao-numero pontuacao-numero--historico">

              ↻

            </div>


            <div>

              <span>
                Histórico
              </span>

              <h2>
                Pontuações já registradas
              </h2>

              <p>
                Consulte ou corrija lançamentos
                anteriores da turma.
              </p>

            </div>


          </div>


          <div className="pontuacao-filtro-historico">


            <div className="pontuacao-campo">

              <label>
                Semana
              </label>


              <select
                value={
                  filtroSemanaEdicao
                }
                onChange={
                  (e) =>
                    setFiltroSemanaEdicao(
                      e.target.value
                    )
                }
              >

                {
                  SEMANAS.map(
                    (item) => (

                      <option
                        key={
                          item
                        }
                        value={
                          item
                        }
                      >

                        {item}

                      </option>

                    )
                  )
                }

              </select>

            </div>


          </div>


          <div className="pontuacao-tabela-wrapper">


            <table className="pontuacao-tabela">


              <thead>

                <tr>

                  <th>
                    Aluno
                  </th>

                  <th>
                    Pontos
                  </th>

                  <th>
                    Motivo
                  </th>

                  <th>
                    Semana
                  </th>

                  <th>
                    Ação
                  </th>

                </tr>

              </thead>


              <tbody>


                {
                  historicoFiltrado.length ===
                  0 && (

                    <tr>

                      <td
                        colSpan="5"
                        className="pontuacao-sem-registros"
                      >

                        Nenhum lançamento encontrado
                        para esta semana.

                      </td>

                    </tr>

                  )
                }


                {
                  historicoFiltrado.map(
                    (p) => (

                      <tr
                        key={
                          p.id
                        }
                      >


                        <td>

                          {
                            p.aluno?.nome ||
                            '-'
                          }

                        </td>


                        <td>

                          {
                            editandoId ===
                            p.id
                              ? (

                                <input
                                  type="number"
                                  value={
                                    editPontos
                                  }
                                  onChange={
                                    (e) =>
                                      setEditPontos(
                                        e.target.value
                                      )
                                  }
                                />

                              )
                              : (

                                <span
                                  className={
                                    p.pontos >= 0
                                      ? 'pontuacao-pontos positivo'
                                      : 'pontuacao-pontos negativo'
                                  }
                                >

                                  {
                                    p.pontos >
                                    0
                                      ? `+${p.pontos}`
                                      : p.pontos
                                  }

                                </span>

                              )
                          }

                        </td>


                        <td>

                          {
                            editandoId ===
                            p.id
                              ? (

                                <input
                                  type="text"
                                  value={
                                    editMotivo
                                  }
                                  onChange={
                                    (e) =>
                                      setEditMotivo(
                                        e.target.value
                                      )
                                  }
                                />

                              )
                              : p.motivo
                          }

                        </td>


                        <td>

                          {
                            editandoId ===
                            p.id
                              ? (

                                <select
                                  value={
                                    editSemana
                                  }
                                  onChange={
                                    (e) =>
                                      setEditSemana(
                                        e.target.value
                                      )
                                  }
                                >

                                  {
                                    SEMANAS.map(
                                      (item) => (

                                        <option
                                          key={
                                            item
                                          }
                                          value={
                                            item
                                          }
                                        >

                                          {item}

                                        </option>

                                      )
                                    )
                                  }

                                </select>

                              )
                              : (
                                p.semana ||
                                '-'
                              )
                          }

                        </td>


                        <td>

                          {
                            editandoId ===
                            p.id
                              ? (

                                <button
                                  type="button"
                                  className="pontuacao-btn-salvar-edicao"
                                  onClick={() =>
                                    salvarEdicao(
                                      p.id
                                    )
                                  }
                                >

                                  Salvar

                                </button>

                              )
                              : (

                                <button
                                  type="button"
                                  className="pontuacao-btn-editar"
                                  onClick={() =>
                                    iniciarEdicao(
                                      p
                                    )
                                  }
                                >

                                  Editar

                                </button>

                              )
                          }

                        </td>


                      </tr>

                    )
                  )
                }


              </tbody>


            </table>


          </div>


        </section>


      </div>


    </div>
  );
}