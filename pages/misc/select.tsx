import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../../components/ui/layouts/MainLayout';
import CardSettings from "../../components/ui/cards/CardSettings";
import Fluxo from "../../components/misc/Fluxo";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { ApiServiceContext } from "../_app";
import { OcorrenciaWithAll } from "../../lib/services/api-service";
import ReactSelect from "react-select";
import OcorrenciaDetalhes from "../../components/ocorrencias/ocorrencia-detalhes";

const SelectPage: NextPage = () => {
  const [idsOpcoes, setIdsOpcoes] = React.useState<number[]>();
  const [ocorrencia, setOcorrencia] = React.useState<OcorrenciaWithAll | 'carregando'>();

  const MySwal = withReactContent(Swal);
  const apiService = React.useContext(ApiServiceContext);

  React.useEffect(() => {
    let mounted = true;

    apiService.getOcorrenciasIds().then((result) => {
      if (!mounted)
        return;

      if (result.type === 'error') {
        // TODO
        return;
      }

      setIdsOpcoes(result.payload.map((oco) => oco.id));
    });

    return () => { mounted = false };
  }, []);

  const loadOcorrencia = React.useCallback((id: number) => {
    setOcorrencia('carregando');

    apiService.loadOcorrencia(id).then((result) => {
      if (result.type === 'error') {
        // TODO
        setOcorrencia(undefined);
        return;
      }

      setOcorrencia(result.payload);
    });
  }, []);

  const result = React.useMemo(() => {
    if (ocorrencia === undefined) {
      return (
        <div className="py-2 px-4 text-slate-500">Nenhuma ocorrência selecionada</div>
      );
    }

    if (ocorrencia === 'carregando') {
      return (
        <div className="py-2 px-4">Carregando ocorrência...</div>
      );
    }

    return (
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 mb-4">
          <div className="mb-2 text-center text-xl">
            Fluxo
          </div>

          <Fluxo ocorrencia={ocorrencia} />
        </div>

        <div className="w-full lg:w-6/12 mb-4">
          <div className="mb-2 text-center text-xl">
            Detalhes
          </div>

          <OcorrenciaDetalhes ocorrencia={ocorrencia} />
        </div>
      </div>
    );
  }, [ocorrencia]);

  const content = React.useMemo(() => {
    if (idsOpcoes === undefined) {
      return (
        <div className="py-2 px-4">Carregando opções...</div>
      );
    }

    return (
      <div>
        <div className="mb-1">
          <ReactSelect
            isDisabled={ocorrencia == 'carregando'}
            options={idsOpcoes.map((idOpcao) => (
              { value: idOpcao, label: `Ocorrência #${idOpcao}` }
            ))}
            onChange={(option) => {
              if (option === null)
                setOcorrencia(undefined);
              else
                loadOcorrencia(option.value);
            }}
          />
        </div>

        {result}
      </div>
    );
  }, [idsOpcoes, ocorrencia, loadOcorrencia]);

  return (
    <MainLayout currentPage="Select">
      <div className="relative">
        <CardSettings>
          {content}
        </CardSettings>
      </div>
    </MainLayout>
  );
};

export default SelectPage;
