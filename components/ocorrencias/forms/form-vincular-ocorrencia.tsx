import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import OcorrenciasTable, { OcorrenciasTableProps } from "../ocorrencias-table";
import OcorrenciaDetalhes from "../ocorrencia-detalhes";
import { ConfirmSwalDialog } from "../../../lib/types";
import Switch from "../../ui/Switch";
import { OcorrenciaWithAll } from "../../../lib/services/api-service";
import LoadableOcorrencia from "../LoadableOcorrencia";

type FormVincularOcorrenciaProps = {
  ocorrencia: OcorrenciaWithAll;
  onFinish: (error?: any) => void;
  onClose: () => void;
  loadEscolaNome: OcorrenciasTableProps['loadEscolaNome'];
  loadCategoriaTitulo: OcorrenciasTableProps['loadCategoriaTitulo'];
  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void;

  loadOcorrenciaWithAll: (ocorrencia: Ocorrencia) => Promise<OcorrenciaWithAll>;
};

const FormVincularOcorrencia: React.FC<FormVincularOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  loadEscolaNome,
  loadCategoriaTitulo,
  showConfirmSwalDialog,
  loadOcorrenciaWithAll,
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
  }, [apiService, ocorrencia.id, onFinish]);

  const ocorrenciaOpcoes = React.useMemo(() => {
    if (_ocorrenciaOpcoes === undefined)
      return undefined;

    if (!filterCategoria)
      return _ocorrenciaOpcoes;

    return _ocorrenciaOpcoes.filter((oco) => oco.categoriaId === ocorrencia.categoriaId);
  }, [_ocorrenciaOpcoes, filterCategoria, ocorrencia.categoriaId]);

  if (ocorrenciaOpcoes === undefined) {
    return (
      <div>Carregando opções...</div>
    );
  }

  const content = selected
    ? (
      <LoadableOcorrencia
        ocorrencia={selected}
        loader={() => loadOcorrenciaWithAll(selected)}
      >{(ocorrenciaWithAll) => (
        <OcorrenciaDetalhes ocorrencia={ocorrenciaWithAll} />
      )}</LoadableOcorrencia>
    )
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
          Selecione a ocorrência a qual deseja vincular e clique em &quot;Vincular&quot;
        </div>

        <div className="border border-slate-300">
          <OcorrenciasTable
            ocorrencias={ocorrenciaOpcoes}
            showColumns={['id', 'descricao', 'categoria', 'status', 'criadoEm', 'operacoes']}
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
                  apiService.loadOcorrencia(ocorrencia.id).then((result) => {
                    if (result.type === 'error') {
                      throw result.message;
                    }

                    const ocorrencia = result.payload;

                    if (ocorrencia.relatos.length !== 1) {
                      // teoricamente IMPOSSÍVEL de ocorrer
                      console.error(`Algo de errado ocorreu. Esta ocorrência possui `
                        + `"${ocorrencia.relatos.length}" relatos mas deveria possuir apenas 1.`);
                    }

                    return Promise.all(ocorrencia.relatos.map((relato => {
                      return apiService.vincularRelato({
                        relatoId: relato.id,
                        novaOcorrenciaId: selected.id,
                      });
                    })));
                  }).then(() => {
                    onFinish();
                  }).catch((err) => {
                    onFinish(err);
                  });

                  /*apiService.vincularRelato({
                    relatoId: ocorrencia.
                  }).then(() => {
                    onFinish();
                  }).catch((err) => {
                    onFinish(err);
                  });*/
                },
              });
            }}
          >
            Vincular
          </Button>
        ) : <div />}

        {selected ? (
          <Button key="0" onClick={() => setSelected(undefined)}>Voltar</Button>
        ) : (
          <Button key="1" onClick={onClose}>Cancelar</Button>
        )}
      </div>
    </div>
  );
};

export default React.memo(FormVincularOcorrencia);
