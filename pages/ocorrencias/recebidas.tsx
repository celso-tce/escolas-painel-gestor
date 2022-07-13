import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";

const Recebidas: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  return <OcorrenciasPage
    pageTitle="Ocorrências Recebidas"
    listOcorrencias={apiService.getOcorrenciasRecebidas}
    buildFormProsseguir={(ctx) => (
      // <FormOcorrenciaRecebidas {...ctx} />
      <div></div>
    )}
    tableShowColumns={['id', 'titulo', 'escola', 'categoria', 'status', 'criadoEm', 'prazo',
      'operacoes']}
  />;
};

export default Recebidas;
