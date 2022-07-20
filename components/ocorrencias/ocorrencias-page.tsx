import { faPlay, faEye, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ocorrencia, Categoria, Escola, Andamento } from "escolas-shared";
import React from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { OcorrenciaWithAll } from "../../lib/services/api-service";
import { ConfirmSwalDialog } from "../../lib/types";
import { ApiServiceContext } from "../../pages/_app";
import AndamentoDetalhes from "../andamentos/AndamentoDetalhes";
import CardSettings from "../ui/cards/CardSettings";
import Modal from "../ui/modal/Modal";
import FormEditarTitulo from "./forms/form-editar-titulo";
import LoadableOcorrencia from "./LoadableOcorrencia";
import OcorrenciaDetalhesFluxo from "./OcorrenciaDetalhesFluxo";
import OcorrenciasTable, { OcorrenciasTableOperacao, OcorrenciasTableProps } from "./ocorrencias-table";

export type OcorrenciasPageProps = {
  ocorrencias: Ocorrencia[];
  reloadOcorrencias: () => void;
  categoriasTitulos: Categoria[];
  escolasNomes: Escola[];
  pageTitle: string;
  tableShowColumns?: OcorrenciasTableProps['showColumns'];
  lazyLoadOcorrencia: (ocorrencia: Ocorrencia) => Promise<OcorrenciaWithAll>;
} & (
  {
    readonly?: false;
    buildFormProsseguir: (context: {
      ocorrencia: OcorrenciaWithAll;
      onClose: () => void;
      onFinish: (err?: any) => void;
      loadEscolaNome: OcorrenciasTableProps['loadEscolaNome'];
      loadCategoriaTitulo: OcorrenciasTableProps['loadCategoriaTitulo'];
      showConfirmSwalDialog: (args: ConfirmSwalDialog) => void;
      loadOcorrenciaWithAll: (ocorrencia: Ocorrencia) => Promise<OcorrenciaWithAll>;
    }) => React.ReactNode;
  }
  |
  {
    readonly: true;
    buildFormProsseguir?: never;
  }
);

const OcorrenciasPage: React.FC<OcorrenciasPageProps> = ({
  pageTitle,
  ocorrencias,
  reloadOcorrencias,
  categoriasTitulos,
  escolasNomes,
  tableShowColumns,
  readonly,
  buildFormProsseguir,
  lazyLoadOcorrencia,
}) => {
  const [visualizarOcorrencia, setVisualizarOcorrencia] = React.useState<Ocorrencia>();
  const [prosseguirOcorrencia, setProsseguirOcorrencia] = React.useState<Ocorrencia>();
  const [editarTituloOcorrencia, setEditarTituloOcorrencia] = React.useState<Ocorrencia>();
  const [showModalAndamento, setShowModalAndamento] = React.useState<Andamento>();

  const apiService = React.useContext(ApiServiceContext);

  const MySwal = withReactContent(Swal);

  const loadOcorrenciaWithAll = React.useCallback(async (ocorrencia: Ocorrencia) => {
    const existente = ocorrencias && ocorrencias.find((oco) => oco.id === ocorrencia.id);

    if (existente)
      return lazyLoadOcorrencia(existente);

    return apiService.loadOcorrencia(ocorrencia.id).then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        throw result.message;
      }

      return result.payload;
    });
  }, [apiService, ocorrencias]);

  const onFinishForm = React.useCallback((err: any) => {
    if (err) {
      console.error(err);

      const errorMsg = typeof err === 'string' ? (
        `<div class="text-sm text-slate-500"><b>${err}</b></div>`
      ) : '';

      MySwal.fire({
        html: 'Erro ao enviar informações. Por favor tente novamente mais tarde ou ' +
          'contate da DAINF (TCE) caso o problema persistir.' + errorMsg,
        icon: 'error',
      });
    }

    reloadOcorrencias();
  }, [reloadOcorrencias, MySwal]);

  const loadEscolaNome = React.useCallback(async (escolaId: number) => {
    if (escolasNomes === undefined)
      return 'Erro'; // Impossível de acontecer. Usado apeans para type-checking

    return escolasNomes.find((esc) => esc.id === escolaId)?.nome
      ?? '(ESCOLA NÃO ENCONTRADA)';
  }, [escolasNomes]);

  const loadCategoriaTitulo = React.useCallback(async (categoriaId: number) => {
    if (categoriasTitulos === undefined)
      return 'Erro'; // Impossível de acontecer. Usado apeans para type-checking

    return categoriasTitulos.find((cat) => cat.id === categoriaId)?.titulo
      ?? '(CATEGORIA NÃO ENCONTRADA)';
  }, [categoriasTitulos]);

  const operacoesArray: OcorrenciasTableOperacao[] = [
    {
      name: 'Visualizar',
      color: 'primary',
      icon: faEye,
      onClick: setVisualizarOcorrencia,
    },
  ];

  if (!readonly) {
    operacoesArray.unshift({
      name: 'Prosseguir',
      color: 'info',
      icon: faPlay,
      onClick: setProsseguirOcorrencia,
    });
  }

  const table = React.useMemo(() => {
    return (
      <OcorrenciasTable
        ocorrencias={ocorrencias}
        operacoes={operacoesArray}
        onClickEditarTitulo={setEditarTituloOcorrencia}
        loadEscolaNome={loadEscolaNome}
        loadCategoriaTitulo={loadCategoriaTitulo}
        showColumns={tableShowColumns}
      />
    );
  }, [ocorrencias, loadEscolaNome, loadCategoriaTitulo, tableShowColumns]);

  const content = (
    <div>
      <div className="border-t border-slate-200">
        {table}
      </div>
    </div>
  );

  const refreshDiv = (
    <a
      className={ocorrencias === undefined ? 'text-slate-200' : 'text-slate-600'}
      href=""
      onClick={(e) => {
        e.preventDefault();
        if (ocorrencias !== undefined) {
          reloadOcorrencias();
        }
      }}
    >
      <FontAwesomeIcon icon={faRefresh} fixedWidth />
    </a>
  );

  const modalVisualizar = React.useMemo(() => {
    if (!visualizarOcorrencia)
      return null;

    return (
      <Modal
        titulo="Visualizar Ocorrência"
        visible={true}
        onClose={() => setVisualizarOcorrencia(undefined)}
        hideBotaoFechar
      >
        <div className="px-4 py-2 bg-slate-100">
          {<LoadableOcorrencia
            ocorrencia={visualizarOcorrencia}
            loader={() => lazyLoadOcorrencia(visualizarOcorrencia)}
          >{(ocorrenciaWithAll) => (
            <OcorrenciaDetalhesFluxo
              ocorrencia={ocorrenciaWithAll}
              onClickAndamento={setShowModalAndamento}
            />
          )}</LoadableOcorrencia>}
        </div>
      </Modal>
    );
  }, [visualizarOcorrencia, setShowModalAndamento]);

  const modalProsseguir = React.useMemo(() => {
    if (!prosseguirOcorrencia || readonly)
      return null;

    return (
      <Modal
        titulo="Prosseguir com Ocorrência"
        visible={true}
        onClose={() => setProsseguirOcorrencia(undefined)}
        hideBotaoFechar
      >
        {<LoadableOcorrencia
          ocorrencia={prosseguirOcorrencia}
          loader={() => lazyLoadOcorrencia(prosseguirOcorrencia)}
        >{(ocorrenciaWithAll) => (
          buildFormProsseguir({
            ocorrencia: ocorrenciaWithAll,
            onClose: () => setProsseguirOcorrencia(undefined),
            onFinish: onFinishForm,
            loadEscolaNome: loadEscolaNome,
            loadCategoriaTitulo: loadCategoriaTitulo,
            loadOcorrenciaWithAll: loadOcorrenciaWithAll,
            showConfirmSwalDialog: (args) => {
              MySwal.fire({
                icon: 'warning',
                title: args.title,
                text: args.text,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed)
                  args.onConfirm();
                else
                  args.onCancel();
              });
            },
          })
        )}</LoadableOcorrencia>}
      </Modal>
    );
  }, [prosseguirOcorrencia, onFinishForm, MySwal, buildFormProsseguir, loadCategoriaTitulo,
      loadEscolaNome, loadOcorrenciaWithAll]);

  const modalEditarTitulo = React.useMemo(() => {
    if (!editarTituloOcorrencia)
      return null;

    const content = (
      <div className="flex flex-col px-4 py-4 bg-slate-100">
        <FormEditarTitulo
          ocorrencia={editarTituloOcorrencia}
          onClose={() => setEditarTituloOcorrencia(undefined)}
          onFinish={onFinishForm}
        />
      </div>
    );

    return (
      <Modal
        titulo="Editar Título da Ocorrência"
        visible={true}
        onClose={() => setEditarTituloOcorrencia(undefined)}
        hideBotaoFechar
      >
        {content}
      </Modal>
    );
  }, [editarTituloOcorrencia, onFinishForm]);

  const modalAndamento = React.useMemo(() => {
    if (!showModalAndamento)
      return null;

    return (
      <Modal
        titulo="Visualizar Andamento"
        visible={true}
        onClose={() => setShowModalAndamento(undefined)}
        hideBotaoFechar
      >
        <div className="px-6 py-4 bg-slate-100">
          <AndamentoDetalhes andamento={showModalAndamento} />
        </div>
      </Modal>
    );
  }, [showModalAndamento]);

  const header = ocorrencias !== undefined
    ? `${pageTitle} (${ocorrencias.length})`
    : pageTitle;

  return (<>
    <div className="relative">
      <CardSettings header={header} headerEnd={refreshDiv}>
        {content}
      </CardSettings>
    </div>

    {modalVisualizar}
    {modalProsseguir}
    {modalEditarTitulo}
    {modalAndamento}
  </>);
};

export default React.memo(OcorrenciasPage);
