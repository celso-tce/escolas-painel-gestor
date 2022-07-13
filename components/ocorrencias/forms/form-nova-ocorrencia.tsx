import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { OcorrenciaWithAll } from "../../../lib/services/api-service";
import { ConfirmSwalDialog } from "../../../lib/types";
import Button from "../../ui/buttons/Button";
import Modal from "../../ui/modal/Modal";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import OcorrenciaProsseguir from "../ocorrencia-prosseguir";
import { OcorrenciasTableProps } from "../ocorrencias-table";
import FormAprovarOcorrencia from "./form-aprovar-ocorrencia";
import FormRejeitarOcorrencia from "./form-rejeitar-ocorrencia";
import FormVincularOcorrencia from "./form-vincular-ocorrencia";

type FormNovaOcorrenciaProps = {
  ocorrencia: OcorrenciaWithAll;
  onFinish: (error?: any) => void;
  onClose: () => void;

  loadEscolaNome: OcorrenciasTableProps['loadEscolaNome']; // usado no FormVincularOcorrencia
  loadCategoriaTitulo: OcorrenciasTableProps['loadCategoriaTitulo']; // usado no FormVincularOcorrencia
  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void; // usado no FormVincularOcorrencia

  loadOcorrenciaWithAll: (ocorrencia: Ocorrencia) => Promise<OcorrenciaWithAll>; // usado no FormVincularOcorrencia
};

type Opcao = 'aprovar' | 'vincular' | 'rejeitar';

const FormNovaOcorrencia: React.FC<FormNovaOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  loadEscolaNome,
  loadCategoriaTitulo,
  showConfirmSwalDialog,
  loadOcorrenciaWithAll,
}) => {
  const [opcao, setOpcao] = React.useState<Opcao>();

  if (opcao === 'aprovar') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormAprovarOcorrencia
          ocorrencia={ocorrencia}
          onFinish={onFinish}
          onClose={() => setOpcao(undefined)}
          showConfirmSwalDialog={showConfirmSwalDialog}
        />
      </div>
    );
  }

  if (opcao === 'vincular') {
    return (
      <div className="px-4 py-2 bg-slate-100">
        <FormVincularOcorrencia
          ocorrencia={ocorrencia}
          onFinish={onFinish}
          onClose={() => setOpcao(undefined)}
          loadEscolaNome={loadEscolaNome}
          loadCategoriaTitulo={loadCategoriaTitulo}
          showConfirmSwalDialog={showConfirmSwalDialog}
          loadOcorrenciaWithAll={loadOcorrenciaWithAll}
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
    <Button color="success" onClick={() => setOpcao('aprovar')}>
      Aprovar
    </Button>
    <Button color="primary" onClick={() => setOpcao('vincular')}>
      Vincular com ocorrência existente
    </Button>
    <Button color="danger" onClick={() => setOpcao('rejeitar')}>
      Rejeitar
    </Button>
  </>;

  return (
    <OcorrenciaProsseguir detalhes={detalhes} acoes={acoes} />
  );
};

export default React.memo(FormNovaOcorrencia);
