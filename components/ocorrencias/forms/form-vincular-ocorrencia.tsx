import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import OcorrenciasTable, { OcorrenciasTableProps } from "../ocorrencias-table";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import { ConfirmSwalDialog } from "../../../lib/types";
import Switch from "../../ui/Switch";
import Label from "../../ui/inputs/Label";
import ReactSelect from "react-select";

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
  const [filterCategoria, setFilterCategoria] = React.useState<boolean>(false);
  const [_ocorrenciaOpcoes, setOcorrenciaOpcoes] = React.useState<Ocorrencia[]>();
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

  const ocorrenciaOpcoes = React.useMemo(() => {
    if (_ocorrenciaOpcoes === undefined)
      return undefined;

    if (!filterCategoria)
      return _ocorrenciaOpcoes;

    return _ocorrenciaOpcoes.filter((oco) => oco.categoriaId === ocorrencia.categoriaId);
  }, [_ocorrenciaOpcoes, filterCategoria]);

  if (ocorrenciaOpcoes === undefined) {
    return (
      <div>Carregando opções...</div>
    );
  }

  const content = selected
    ? <OcorrenciaDetalhes ocorrencia={ocorrencia} />
    : (
      <div className="mt-2">
        {/* TODO */}
        {/*<div className="mb-4 flex flex-col items-start">
          <Label htmlFor="i-filter-status" label="Filtrar Status" />
          <ReactSelect
            //
          />
        </div>*/}

        <div className="mb-2 flex items-center">
          <Switch
            htmlId="i-filter-categoria"
            checked={filterCategoria}
            onToggle={() => setFilterCategoria(!filterCategoria)}
          />
          <label
            className="text-slate-600 text-xs ml-1"
            htmlFor="i-filter-categoria"
          >
            Mostrar apenas com a mesma categoria
          </label>
        </div>

        <div className="mb-1 text-slate-400 text-xs">
          Selecione a ocorrência a qual deseja vincular e clique em "Vincular"
        </div>

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
