import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ConfirmSwalDialog } from "../../../lib/types";
import Button from "../../ui/buttons/Button";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import OcorrenciaProsseguir from "../ocorrencia-prosseguir";
import FormEncaminharOcorrencia from "./form-encaminhar-ocorrencia";
import FormRejeitarOcorrencia from "./form-rejeitar-ocorrencia";

type FormOcorrenciaEmAnaliseProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;

  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void; // usado no FormVincularOcorrencia
};

type Opcao = 'encaminhar' | 'rejeitar';

const FormOcorrenciaEmAnalise: React.FC<FormOcorrenciaEmAnaliseProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  showConfirmSwalDialog,
}) => {
  const [opcao, setOpcao] = React.useState<Opcao>();

  if (opcao === 'encaminhar') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormEncaminharOcorrencia
          ocorrencia={ocorrencia}
          onFinish={onFinish}
          onClose={() => setOpcao(undefined)}
          showConfirmSwalDialog={showConfirmSwalDialog}
        />
      </div>
    );
  }

  if (opcao === 'rejeitar') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormRejeitarOcorrencia
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
    <Button color="success" onClick={() => setOpcao('encaminhar')}>
      Encaminhar
    </Button>
    <Button color="danger" onClick={() => setOpcao('rejeitar')}>
      Rejeitar
    </Button>
  </>;

  return (
    <OcorrenciaProsseguir detalhes={detalhes} acoes={acoes} />
  );
};

export default React.memo(FormOcorrenciaEmAnalise);
