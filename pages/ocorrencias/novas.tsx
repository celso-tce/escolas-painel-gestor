import React from 'react';
import type { NextPage } from 'next';
import { ApiServiceContext } from "../_app";
import MainLayout from "../../components/ui/layouts/MainLayout";
import { Categoria, Escola, Ocorrencia } from "escolas-shared";
import Spinkit from "../../components/ui/Spinkit";
import OcorrenciasTable from "../../components/ocorrencias/ocorrencias-table";
import CardSettings from "../../components/ui/cards/CardSettings";
import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/ui/modal/Modal";
import OcorrenciaDetalhes from "../../components/ocorrencias/ocorrencia-detalhes";
import FormEditarTitulo from "../../components/ocorrencias/forms/form-editar-titulo";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import FormNovaOcorrencia from "../../components/ocorrencias/forms/form-nova-ocorrencia";

const NovasPage: NextPage = () => {
  const [ocorrencias, setOcorrencias] = React.useState<Ocorrencia[]>();
  const [categoriasTitulos, setCategoriasTitulos] = React.useState<Categoria[]>();
  const [escolasNomes, setEscolasNomes] = React.useState<Escola[]>();

  const [visualizarOcorrencia, setVisualizarOcorrencia] = React.useState<Ocorrencia>();
  const [prosseguirOcorrencia, setProsseguirOcorrencia] = React.useState<Ocorrencia>();
  const [editarTituloOcorrencia, setEditarTituloOcorrencia] = React.useState<Ocorrencia>();

  const apiService = React.useContext(ApiServiceContext);

  const MySwal = withReactContent(Swal);

  const loadOcorrencias = React.useCallback(() => {
    apiService.getNovasOcorrencias().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setOcorrencias(result.payload);
    });
  }, [apiService]);

  const loadCategoriasTitulos = React.useCallback(() => {
    apiService.getCategoriasTitulos().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setCategoriasTitulos(result.payload);
    });
  }, [apiService]);

  const loadEscolasNomes = React.useCallback(() => {
    apiService.getEscolasNomes().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setEscolasNomes(result.payload);
    });
  }, [apiService]);

  React.useEffect(() => {
    loadOcorrencias();
    loadCategoriasTitulos();
    loadEscolasNomes();
  }, [loadOcorrencias, loadCategoriasTitulos, loadEscolasNomes]);

  const onFinishForm = React.useCallback((err: any) => {
    if (err) {
      console.error(err);
      MySwal.fire({
        text: 'Erro ao enviar informações. Por favor tente novamente mais tarde ou ' +
          'contate da DAINF (TCE) caso o problema persistir.',
        icon: 'error',
      });
    }

    setOcorrencias(undefined);
    setVisualizarOcorrencia(undefined);
    setProsseguirOcorrencia(undefined);
    setEditarTituloOcorrencia(undefined);
    loadOcorrencias();
  }, [loadOcorrencias]);

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

  const table = React.useMemo(() => {
    if (ocorrencias === undefined || categoriasTitulos === undefined || escolasNomes === undefined) {
      return (
        <div className="flex flex-col items-center my-2 text-slate-700">
          <Spinkit type="wave" color="var(--color-blue-400)" dots={5} />
          Carregando...
        </div>
      );
    }

    return (
      <OcorrenciasTable
        ocorrencias={ocorrencias}
        operacoes={[
          {
            name: 'Prosseguir',
            color: 'info',
            icon: faPlay,
            onClick: setProsseguirOcorrencia,
          },
          {
            name: 'Visualizar',
            color: 'primary',
            icon: faEye,
            onClick: setVisualizarOcorrencia,
          },
        ]}
        onClickEditarTitulo={setEditarTituloOcorrencia}
        loadEscolaNome={loadEscolaNome}
        loadCategoriaTitulo={loadCategoriaTitulo}
      />
    );
  }, [ocorrencias, categoriasTitulos, escolasNomes, loadEscolaNome, loadCategoriaTitulo]);

  const content = (
    <div>
      <div className="border-t border-slate-200">
        {table}
      </div>
    </div>
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
          <OcorrenciaDetalhes ocorrencia={visualizarOcorrencia} />
        </div>
      </Modal>
    );
  }, [visualizarOcorrencia]);

  const modalProsseguir = React.useMemo(() => {
    if (!prosseguirOcorrencia)
      return null;

    return (
      <Modal
        titulo="Prosseguir com Ocorrência"
        visible={true}
        onClose={() => setProsseguirOcorrencia(undefined)}
        hideBotaoFechar
      >
        <FormNovaOcorrencia
          ocorrencia={prosseguirOcorrencia}
          onClose={() => setProsseguirOcorrencia(undefined)}
          onFinish={onFinishForm}
          loadEscolaNome={loadEscolaNome}
          loadCategoriaTitulo={loadCategoriaTitulo}
          showConfirmSwalDialog={(args) => {
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
          }}
        />
      </Modal>
    );
  }, [prosseguirOcorrencia, onFinishForm]);

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

  return (
    <MainLayout currentPage="Novas Ocorrências">
      <div className="relative">
        <CardSettings header="Novas Ocorrências">
          {content}
        </CardSettings>
      </div>

      {modalVisualizar}
      {modalProsseguir}
      {modalEditarTitulo}
    </MainLayout>
  );
};

export default NovasPage;
