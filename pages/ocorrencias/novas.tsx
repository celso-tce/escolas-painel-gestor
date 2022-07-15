import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";
import FormNovaOcorrencia from "../../components/ocorrencias/forms/form-nova-ocorrencia";
import Spinkit from "../../components/ui/Spinkit";
import MainLayout from "../../components/ui/layouts/MainLayout";
import { Ocorrencia } from "escolas-shared";
import { Hooks } from "../../lib/react/hooks";
import { OcorrenciaWithAll } from "../../lib/services/api-service";

const NovasPage: NextPage = () => {
  const [ocorrencias, setOcorrencias] = React.useState<Ocorrencia[]>();
  const [categoriasTitulos, loadCategoriasTitulos] = Hooks.useCategoriasTitulos();
  const [escolasNomes, loadEscolasNomes] = Hooks.useEscolasNomes();

  const apiService = React.useContext(ApiServiceContext);

  const loadOcorrencias = React.useCallback(() => {
    apiService.getNovasOcorrencias().then((result) => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      setOcorrencias(result.payload);
    });
  }, [apiService]);

  const reloadOcorrencias = React.useCallback(() => {
    setOcorrencias(undefined);
    loadOcorrencias();
  }, [loadOcorrencias]);

  React.useEffect(() => {
    loadOcorrencias();
    loadCategoriasTitulos();
    loadEscolasNomes();
  }, [loadOcorrencias, loadCategoriasTitulos, loadEscolasNomes]);

  const content = React.useMemo(() => {
    if (ocorrencias === undefined || categoriasTitulos === undefined || escolasNomes === undefined) {
      return (
        <div className="flex flex-col items-center my-2 text-slate-700">
          <Spinkit type="wave" color="var(--color-blue-400)" dots={5} />
          Carregando...
        </div>
      );
    }

    return (
      <OcorrenciasPage
        pageTitle="Novas Ocorrências"
        ocorrencias={ocorrencias}
        categoriasTitulos={categoriasTitulos}
        escolasNomes={escolasNomes}
        reloadOcorrencias={reloadOcorrencias}
        buildFormProsseguir={(ctx) => (
          <FormNovaOcorrencia {...ctx} />
        )}
        tableShowColumns={['id', 'titulo', 'descricao', 'escola', 'categoria', 'criadoEm',
          'operacoes']}
        lazyLoadOcorrencia={async (ocorrencia) => ocorrencia as OcorrenciaWithAll}
      />
    );
  }, [ocorrencias, categoriasTitulos, escolasNomes, reloadOcorrencias]);

  return (
    <MainLayout currentPage="Novas Ocorrências">
      {content}
    </MainLayout>
  );
};

export default NovasPage;
