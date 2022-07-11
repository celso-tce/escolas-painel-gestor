import React from 'react';
import type { NextPage } from 'next';
import { ApiServiceContext } from "../_app";
import MainLayout from "../../components/ui/layouts/MainLayout";
import { Ocorrencia } from "escolas-shared";
import Spinkit from "../../components/ui/Spinkit";
import OcorrenciasTable from "../../components/ocorrencias/ocorrencias-table";
import CardSettings from "../../components/ui/cards/CardSettings";
import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/ui/modal/Modal";
import OcorrenciaDetalhes from "../../components/ocorrencias/ocorrencia-detalhes";

const NovasPage: NextPage = () => {
  const [ocorrencias, setOcorrencias] = React.useState<Ocorrencia[]>();
  const [visualizarOcorrencia, setVisualizarOcorrencia] = React.useState<Ocorrencia>();
  const [prosseguirOcorrencia, setProsseguirOcorrencia] = React.useState<Ocorrencia>();
  const [editarTituloOcorrencia, setEditarTituloOcorrencia] = React.useState<Ocorrencia>();

  const apiService = React.useContext(ApiServiceContext);

  React.useEffect(() => {
    apiService.getNovasOcorrencias().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setOcorrencias(result.payload);
    });
  }, [apiService]);

  const table = React.useMemo(() => {
    if (ocorrencias === undefined) {
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
            name: 'Visualizar',
            color: 'primary',
            icon: faEye,
            onClick: setVisualizarOcorrencia,
          },
          {
            name: 'Prosseguir',
            color: 'info',
            icon: faPlay,
            onClick: setProsseguirOcorrencia,
          },
        ]}
        onClickEditarTitulo={setEditarTituloOcorrencia}
      />
    );
  }, [ocorrencias]);

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
        <OcorrenciaDetalhes ocorrencia={visualizarOcorrencia} />
      </Modal>
    );
  }, [visualizarOcorrencia]);

  const modalProsseguir = React.useMemo(() => {
    if (!prosseguirOcorrencia)
      return null;

    const content = (
      <div>TODO Prosseguir...</div>
    );

    return (
      <Modal
        titulo="Prosseguir com Ocorrência"
        visible={true}
        onClose={() => setProsseguirOcorrencia(undefined)}
        hideBotaoFechar
      >
        {content}
      </Modal>
    );
  }, [prosseguirOcorrencia]);

  const modalEditarTitulo = React.useMemo(() => {
    if (!editarTituloOcorrencia)
      return null;

    const content = (
      <div>TODO Editar título...</div>
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
  }, [editarTituloOcorrencia]);

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
