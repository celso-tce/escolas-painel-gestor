import { Andamento } from "escolas-shared";
import React from 'react';
import { OcorrenciaWithAll } from "../../lib/services/api-service";
import Fluxo from "../misc/Fluxo";
import Button from "../ui/buttons/Button";
import OcorrenciaDetalhes from "./ocorrencia-detalhes";

type OcorrenciaDetalhesFluxoProps = {
  ocorrencia: OcorrenciaWithAll;
  onClickAndamento?: (andamento: Andamento) => void;
};

enum Tab {
  Detalhes,
  Fluxo,
}

const OcorrenciaDetalhesFluxo: React.FC<OcorrenciaDetalhesFluxoProps> = ({
  ocorrencia,
  onClickAndamento,
}) => {
  const [tab, setTab] = React.useState<Tab>(Tab.Detalhes);

  const detalhes = React.useMemo(() => (
    <OcorrenciaDetalhes ocorrencia={ocorrencia} />
  ), [ocorrencia]);

  const fluxo = React.useMemo(() => (
    <div className="border border-slate-200">
      <Fluxo ocorrencia={ocorrencia} onClickAndamento={onClickAndamento} />
    </div>
  ), [ocorrencia, onClickAndamento]);

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex py-1">
        <Button
          className="mr-2"
          color="light"
          disabled={tab === Tab.Detalhes}
          onClick={() => setTab(Tab.Detalhes)}
        >
          Detalhes
        </Button>
        <Button
          color="light"
          disabled={tab === Tab.Fluxo}
          onClick={() => setTab(Tab.Fluxo)}
        >
          Fluxo
        </Button>
      </div>

      {tab === Tab.Detalhes ? detalhes : fluxo}
    </div>
  );
};

export default React.memo(OcorrenciaDetalhesFluxo);
