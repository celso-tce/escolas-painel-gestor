import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";
import { Ocorrencia } from "escolas-shared";
import MainLayout from "../../components/ui/layouts/MainLayout";
import Spinkit from "../../components/ui/Spinkit";
import { Hooks } from "../../lib/react/hooks";
import FormOcorrenciaEmAnalise from "../../components/ocorrencias/forms/form-ocorrencia-em-analise";
import { OcorrenciaWithAll } from "../../lib/services/api-service";

const EmAnalise: NextPage = () => {
  const [ocorrencias, setOcorrencias] = React.useState<Ocorrencia[]>();
  const [categoriasTitulos, loadCategoriasTitulos] = Hooks.useCategoriasTitulos();
  const [escolasNomes, loadEscolasNomes] = Hooks.useEscolasNomes();

  const apiService = React.useContext(ApiServiceContext);

  const loadOcorrencias = React.useCallback(() => {
    apiService.getOcorrenciasEmAnalise().then((result) => {
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
        pageTitle="Ocorrências Em Análise"
        ocorrencias={ocorrencias}
        categoriasTitulos={categoriasTitulos}
        escolasNomes={escolasNomes}
        reloadOcorrencias={reloadOcorrencias}
        buildFormProsseguir={(ctx) => (
          <FormOcorrenciaEmAnalise {...ctx} />
        )}
        tableShowColumns={['id', 'titulo', 'escola', 'categoria', 'criadoEm', 'prazo',
          'operacoes']}
        lazyLoadOcorrencia={async (ocorrencia) => ocorrencia as OcorrenciaWithAll}
      />
    );
  }, [ocorrencias, categoriasTitulos, escolasNomes, reloadOcorrencias]);

  return (
    <MainLayout currentPage="Ocorrências Em Análise">
      {content}
    </MainLayout>
  );
};

export default EmAnalise;
