import React from 'react';
import { OcorrenciaWithAll } from "../../../lib/services/api-service";
import { ConfirmSwalDialog } from "../../../lib/types";
import Button from "../../ui/buttons/Button";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import OcorrenciaProsseguir from "../ocorrencia-prosseguir";
import FormAprovarProrrogacao from "./form-aprovar-prorrogacao";
import FormRejeitarProrrogacao from "./form-rejeitar-prorrogacao";

type FormProrrogacaoSolicitadaProps = {
  ocorrencia: OcorrenciaWithAll;
  onFinish: (error?: any) => void;
  onClose: () => void;

  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void; // usado no FormVincularOcorrencia
};

type Opcao = 'aprovar' | 'rejeitar';

const FormProrrogacaoSolicitada: React.FC<FormProrrogacaoSolicitadaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  showConfirmSwalDialog,
}) => {
  const [opcao, setOpcao] = React.useState<Opcao>();

  if (opcao === 'aprovar') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormAprovarProrrogacao
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
        <FormRejeitarProrrogacao
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
    <Button color="success" onClick={() => setOpcao('aprovar')}>
      Aprovar&nbsp;Prorrogação
    </Button>

    <Button color="warning" onClick={() => setOpcao('rejeitar')}>
      Rejeitar&nbsp;Prorrogação
    </Button>
  </>;

  return (
    <OcorrenciaProsseguir detalhes={detalhes} acoes={acoes} />
  );
};

export default React.memo(FormProrrogacaoSolicitada);
