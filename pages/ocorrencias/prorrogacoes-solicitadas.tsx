import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";
import Spinkit from "../../components/ui/Spinkit";
import MainLayout from "../../components/ui/layouts/MainLayout";
import { Ocorrencia } from "escolas-shared";
import { Hooks } from "../../lib/react/hooks";
import FormProrrogacaoSolicitada from "../../components/ocorrencias/forms/form-prorrogacao-solicitada";

const ProrrogacoesSolicitadasPage: NextPage = () => {
  const [ocorrencias, setOcorrencias] = React.useState<Ocorrencia[]>();
  const [categoriasTitulos, loadCategoriasTitulos] = Hooks.useCategoriasTitulos();
  const [escolasNomes, loadEscolasNomes] = Hooks.useEscolasNomes();

  const apiService = React.useContext(ApiServiceContext);

  const loadOcorrencias = React.useCallback(() => {
    apiService.getSolicitacoesProrrogacao().then((result) => {
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
        pageTitle="Prorrogações Solicitadas"
        ocorrencias={ocorrencias}
        categoriasTitulos={categoriasTitulos}
        escolasNomes={escolasNomes}
        reloadOcorrencias={reloadOcorrencias}
        buildFormProsseguir={(ctx) => (
          <FormProrrogacaoSolicitada {...ctx} />
        )}
        tableShowColumns={['id', 'titulo', 'escola', 'categoria', 'status', 'criadoEm', 'operacoes']}
      />
    );
  }, [ocorrencias, categoriasTitulos, escolasNomes, reloadOcorrencias]);

  return (
    <MainLayout currentPage="Prorrogações Solicitadas">
      {content}
    </MainLayout>
  );
};

export default ProrrogacoesSolicitadasPage;
