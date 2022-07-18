import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../../components/ui/layouts/MainLayout';
import CardSettings from "../../components/ui/cards/CardSettings";
import Fluxo from "../../components/misc/Fluxo";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ApiServiceContext } from "../_app";
import { OcorrenciaWithAll } from "../../lib/services/api-service";

const FluxoPage: NextPage = () => {
  const [ocorrencia, setOcorrencia] = React.useState<OcorrenciaWithAll>();

  const MySwal = withReactContent(Swal);
  const apiService = React.useContext(ApiServiceContext);

  React.useEffect(() => {
    let mounted = true;

    apiService.loadOcorrencia(39).then((result) => {
      if (result.type === 'error') {
        // TODO
        return;
      }

      setOcorrencia(result.payload);
    });

    return () => { mounted = false };
  }, []);

  const content = React.useMemo(() => {
    if (ocorrencia === undefined) {
      return (
        <div className="py-2 px-4">Carregando ocorrência...</div>
      );
    }

    return <Fluxo ocorrencia={ocorrencia} />;
  }, [ocorrencia]);

  return (
    <MainLayout currentPage="Fluxo">
      <div className="relative">
        <CardSettings>
          {content}
        </CardSettings>
      </div>
    </MainLayout>
  );
};

export default FluxoPage;
