import React from 'react';
import { OcorrenciaWithAll } from "../../../lib/services/api-service";
import { ConfirmSwalDialog } from "../../../lib/types";
import Button from "../../ui/buttons/Button";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import OcorrenciaProsseguir from "../ocorrencia-prosseguir";
import FormFinalizarOcorrencia from "./form-finalizar-ocorrencia";

type FormOcorrenciaRespondidaProps = {
  ocorrencia: OcorrenciaWithAll;
  onFinish: (error?: any) => void;
  onClose: () => void;

  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void; // usado no FormVincularOcorrencia
};

type Opcao = 'solucionar';

const FormOcorrenciaRespondida: React.FC<FormOcorrenciaRespondidaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  showConfirmSwalDialog,
}) => {
  const [opcao, setOpcao] = React.useState<Opcao>();

  if (opcao === 'solucionar') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormFinalizarOcorrencia
          ocorrencia={ocorrencia}
          onFinish={onFinish}
          onClose={() => setOpcao(undefined)}
          showConfirmSwalDialog={showConfirmSwalDialog}
        />
      </div>
    );
  }

  const detalhes = (
    <div className="px-4 py-2 bg-slate-100">
      <OcorrenciaDetalhes ocorrencia={ocorrencia} />
    </div>
  );

  const acoes = <>
    <Button color="success" onClick={() => setOpcao('solucionar')}>
      Finalizar
    </Button>
  </>;

  return (
    <OcorrenciaProsseguir detalhes={detalhes} acoes={acoes} />
  );
};

export default React.memo(FormOcorrenciaRespondida);
