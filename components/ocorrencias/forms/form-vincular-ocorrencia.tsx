import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import OcorrenciasTable, { OcorrenciasTableProps } from "../ocorrencias-table";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import { ConfirmSwalDialog } from "../../../lib/types";

type FormVincularOcorrenciaProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;
  loadEscolaNome: OcorrenciasTableProps['loadEscolaNome'];
  loadCategoriaTitulo: OcorrenciasTableProps['loadCategoriaTitulo'];
  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void;
};

const FormVincularOcorrencia: React.FC<FormVincularOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  loadEscolaNome,
  loadCategoriaTitulo,
  showConfirmSwalDialog,
}) => {
  const [ocorrenciaOpcoes, setOcorrenciaOpcoes] = React.useState<Ocorrencia[]>();
  const [selected, setSelected] = React.useState<Ocorrencia>();

  const apiService = React.useContext(ApiServiceContext);

  React.useEffect(() => {
    apiService.listarOcorrenciasVinculaveis(ocorrencia.id)
      .then((result) => {
        if (result.type === 'error') {
          onFinish(result.message);
          return;
        }

        setOcorrenciaOpcoes(result.payload);
      });
  }, []);

  if (ocorrenciaOpcoes === undefined) {
    return (
      <div>Carregando opções...</div>
    );
  }

  const content = selected
    ? <OcorrenciaDetalhes ocorrencia={ocorrencia} />
    : (
      <div className="border border-slate-300">
        <OcorrenciasTable
          ocorrencias={ocorrenciaOpcoes}
          showColumns={['descricao', 'categoria', 'status', 'criadoEm', 'operacoes']}
          operacoes={[
            {
              name: 'Vincular',
              text: true,
              color: 'info',
              onClick: setSelected,
            }
          ]}
          loadEscolaNome={loadEscolaNome}
          loadCategoriaTitulo={loadCategoriaTitulo}
        />
      </div>
    );

  return (
    <div className="flex flex-col items-stretch">
      <div className="mb-4">
        {content}
      </div>

      <div className="flex justify-between">
        {selected ? (
          <Button
            color="success"
            onClick={() => {
              showConfirmSwalDialog({
                title: 'Essa é uma operação permanente.',
                text: 'Tem certeza que deseja vincular a esta ocorrência?',
                onCancel: () => {},
                onConfirm: () => {
                  console.log('VINCULANDO OCORRÊNCIA:');
                  console.log(selected);
                },
              });
            }}
          >
            Vincular
          </Button>
        ) : <div />}

        {selected ? (
          <Button key="0" onClick={() => setSelected(undefined)}>Alterar Ocorrência</Button>
        ) : (
          <Button key="1" onClick={onClose}>Cancelar</Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(FormVincularOcorrencia);
