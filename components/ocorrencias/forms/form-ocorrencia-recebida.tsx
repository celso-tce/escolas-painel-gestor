import { DateTime } from "luxon";
import React from 'react';
import { OcorrenciaHelper } from "../../../lib/escolas/ocorrencia-helper";
import { OcorrenciaWithAll } from "../../../lib/services/api-service";
import { ConfirmSwalDialog } from "../../../lib/types";
import Button from "../../ui/buttons/Button";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import OcorrenciaProsseguir from "../ocorrencia-prosseguir";
import FormResponderOcorrencia from "./form-responder-ocorrencia";
import FormSolicitarProrrogacao from "./form-solicitar-prorrogacao";

type FormOcorrenciaRecebidaProps = {
  ocorrencia: OcorrenciaWithAll;
  onFinish: (error?: any) => void;
  onClose: () => void;

  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void; // usado no FormVincularOcorrencia
};

type Opcao = 'responder' | 'prorrogar';

const FormOcorrenciaRecebida: React.FC<FormOcorrenciaRecebidaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  showConfirmSwalDialog,
}) => {
  const [opcao, setOpcao] = React.useState<Opcao>();

  if (opcao === 'responder') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormResponderOcorrencia
          ocorrencia={ocorrencia}
          onFinish={onFinish}
          onClose={() => setOpcao(undefined)}
          showConfirmSwalDialog={showConfirmSwalDialog}
        />
      </div>
    );
  }

  if (opcao === 'prorrogar') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormSolicitarProrrogacao
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

  const situacaoPrazo = OcorrenciaHelper.getSituacaoPrazo(ocorrencia);

  const acoes = (situacaoPrazo === 'atraso' || situacaoPrazo === 'atraso-prorrogavel') ? (
    <Button color="warning" onClick={() => setOpcao('prorrogar')}>
      Solicitar Prorrogação
    </Button>
  ) : (
    <Button color="success" onClick={() => setOpcao('responder')}>
      Responder
    </Button>
  );

  return (
    <OcorrenciaProsseguir detalhes={detalhes} acoes={acoes} />
  );
};

export default React.memo(FormOcorrenciaRecebida);
