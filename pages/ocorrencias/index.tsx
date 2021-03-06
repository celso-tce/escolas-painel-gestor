import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";
import Spinkit from "../../components/ui/Spinkit";
import MainLayout from "../../components/ui/layouts/MainLayout";
import { Ocorrencia } from "escolas-shared";
import { Hooks } from "../../lib/react/hooks";

const IndexPage: NextPage = () => {
  const [ocorrencias, setOcorrencias] = React.useState<Ocorrencia[]>();
  const [categoriasTitulos, loadCategoriasTitulos] = Hooks.useCategoriasTitulos();
  const [escolasNomes, loadEscolasNomes] = Hooks.useEscolasNomes();

  const apiService = React.useContext(ApiServiceContext);

  const loadOcorrencias = React.useCallback(() => {
    apiService.getOcorrencias().then((result) => {
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

  const lazyLoadOcorrencia = React.useCallback((ocorrencia: Ocorrencia) => {
    return apiService.loadOcorrencia(ocorrencia.id).then((result) => {
      if (result.type === 'error') {
        // TODO handle error!
        throw result.message;
      }

      return result.payload;
    });
  }, [apiService]);

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
        pageTitle="Todas as OcorrĂȘncias"
        ocorrencias={ocorrencias}
        categoriasTitulos={categoriasTitulos}
        escolasNomes={escolasNomes}
        reloadOcorrencias={reloadOcorrencias}
        tableShowColumns={['id', 'titulo', 'escola', 'categoria', 'status', 'criadoEm',
          'operacoes']}
        readonly
        lazyLoadOcorrencia={lazyLoadOcorrencia}
      />
    );
  }, [ocorrencias, categoriasTitulos, escolasNomes, reloadOcorrencias]);

  return (
    <MainLayout currentPage="Todas as OcorrĂȘncias">
      {content}
    </MainLayout>
  );
};

export default IndexPage;
