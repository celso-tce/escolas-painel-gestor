import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import FormOcorrenciaRecebida from "../../components/ocorrencias/forms/form-ocorrencia-recebida";
import { ApiServiceContext } from "../_app";

const Recebidas: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  return <OcorrenciasPage
    pageTitle="Ocorrências Recebidas"
    listOcorrencias={apiService.getOcorrenciasRecebidas}
    buildFormProsseguir={(ctx) => (
      <FormOcorrenciaRecebida {...ctx} />
    )}
    tableShowColumns={['id', 'titulo', 'escola', 'categoria', 'status', 'criadoEm', 'prazo',
      'operacoes']}
  />;
};

export default Recebidas;
