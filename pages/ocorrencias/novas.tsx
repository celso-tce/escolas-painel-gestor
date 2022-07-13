import React from 'react';
import type { NextPage } from 'next';
import OcorrenciasPage from "../../components/ocorrencias/ocorrencias-page";
import { ApiServiceContext } from "../_app";
import FormNovaOcorrencia from "../../components/ocorrencias/forms/form-nova-ocorrencia";

const NovasPage: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  return <OcorrenciasPage
    pageTitle="Novas Ocorrências"
    listOcorrencias={apiService.getNovasOcorrencias}
    buildFormProsseguir={(ctx) => (
      <FormNovaOcorrencia {...ctx} />
    )}
  />;
};

export default NovasPage;
