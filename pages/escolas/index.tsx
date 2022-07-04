import type { NextPage } from 'next';
import React from 'react';
import { Escola } from 'escolas-shared';
import EscolaForm from "../../components/escolas/EscolaForm";
import ResourcesPage from "../../components/resources/ResourcePage";
import { CreateEscolaDto } from "../../lib/services/api-service";
import ResourceDetails from "../../components/resources/ResourceDetails";
import EscolaTable from "../../components/escolas/EscolaTable";
import { Utils } from "../../lib/utils";
import { ApiServiceContext } from "../_app";
import EscolaStatus from "../../components/escolas/EscolaStatus";

const EscolasPage: NextPage = () => {
  const apiService = React.useContext(ApiServiceContext);

  const buildDetails = React.useCallback((res: Escola) => (
    <ResourceDetails
      data={[
        { label: 'Nome', value: res.nome },
        { label: 'Tipo', value: Utils.escolaTipoLabel(res.tipo) },
        { label: 'Status', value: <EscolaStatus status={res.status} /> },
        { label: 'Modalidades', value: res.modalidades },
        { label: 'Nome do Diretor', value: res.diretorNome ?? '' },
        { label: 'E-mail do Diretor', value: res.diretorEmail ?? '' },
        { label: 'QEdu', value: res.qeduUrl ?? '' },
        { label: 'CEP', value: res.postalCode ?? '' },
        { label: 'Endereço', value: res.endereco ?? '' },
        { label: 'Complemento', value: res.complemento ?? '' },
        { label: 'Cidade', value: res.cidade ?? '' },
        { label: 'Bairro', value: res.bairro ?? '' },
      ]}
    />
  ), []);

  return (
    <ResourcesPage<Escola, CreateEscolaDto>
      labelSingular="Escola"
      labelPlural="Escolas"
      getResourceTitle={(res) => res.nome}
      serviceProvider={{
        getResources: apiService.getEscolas,
        createResource: apiService.createEscola,
        updateResource: apiService.updateEscola,
        deleteResource: apiService.deleteEscola,
      }}
      buildTabela={React.useCallback((props) => <EscolaTable {...props} />, [])}
      buildDetails={buildDetails}
      buildForm={React.useCallback((props) => <EscolaForm {...props} />, [])}
    />
  );
}

export default EscolasPage;
