import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";
import FormOcorrenciaEmAnalise from "../../components/ocorrencias/forms/form-ocorrencia-em-analise";

const EmAnalise: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  return <OcorrenciasPage
    pageTitle="Ocorrências Em Análise"
    listOcorrencias={apiService.getOcorrenciasEmAnalise}
    buildFormProsseguir={(ctx) => (
      <FormOcorrenciaEmAnalise {...ctx} />
    )}
  />;
};

export default EmAnalise;
