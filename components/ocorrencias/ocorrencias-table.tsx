import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { UiUtils } from "../../lib/ui-utils";
import LoadableString from "../misc/LoadableString";
import Button, { ButtonProps } from "../ui/buttons/Button";
import DateText from "../ui/displays/DateText";
import Anchor from "../ui/misc/Anchor";
import SimpleTable, { SimpleTableCol, SimpleTableHeaderData } from "../ui/tables/SimpleTable";
import OcorrenciaStatus from "./ocorrencia-status";

type OcorrenciasTableColumn = 'id' | 'titulo' | 'descricao' | 'status' | 'criadoEm' | 'operacoes'
  | 'escola' | 'categoria';

const ALL_COLUMNS: OcorrenciasTableColumn[] = [
  'id', 'titulo', 'descricao', 'status', 'criadoEm', 'operacoes', 'escola', 'categoria'
];

export type OcorrenciasTableOperacao = {
  icon?: IconProp;
  text?: boolean;
  name: string;
  color: ButtonProps['color'];
  onClick: (ocorrencia: Ocorrencia) => void;
};

export type OcorrenciasTableProps = {
  ocorrencias: Ocorrencia[];
  operacoes: OcorrenciasTableOperacao[];
  onClickEditarTitulo?: (ocorrencia: Ocorrencia) => void;
  showColumns?: OcorrenciasTableColumn[];
  hideColumns?: OcorrenciasTableColumn[];
  loadEscolaNome: (escolaId: number) => Promise<string>;
  loadCategoriaTitulo: (categoriaId: number) => Promise<string>;
};

const OcorrenciasTable: React.FC<OcorrenciasTableProps> = ({
  ocorrencias,
  operacoes,
  onClickEditarTitulo,
  showColumns,
  hideColumns,
  loadEscolaNome,
  loadCategoriaTitulo,
}) => {
  let allColumns = ALL_COLUMNS;

  if (showColumns) {
    allColumns = allColumns.filter((c) => showColumns.includes(c));
  }

  if (hideColumns) {
    allColumns = allColumns.filter((c) => !hideColumns.includes(c));
  }

  const columnId = allColumns.includes('id');
  const columnTitulo = allColumns.includes('titulo');
  const columnDescricao = allColumns.includes('descricao');
  const columnEscola = allColumns.includes('escola');
  const columnCategoria = allColumns.includes('categoria');
  const columnStatus = allColumns.includes('status');
  const columnCriadoEm = allColumns.includes('criadoEm');
  const columnOperacoes = allColumns.includes('operacoes');

  return (
    <SimpleTable
      headerClasses="text-xs"
      colClasses="text-xs"
      overrideColClasses="px-4 py-2 align-middle text-slate-700 break-words max-w-xs"
      header={[
        columnId && { label: '#', classes: 'w-0' },
        columnTitulo && { label: 'Título' },
        columnDescricao &&  { label: 'Descrição' },
        columnEscola &&  { label: 'Escola' },
        columnCategoria &&  { label: 'Categoria' },
        columnStatus &&  { label: 'Status' },
        columnCriadoEm &&  { label: 'Criado Em' },
        columnOperacoes &&  { label: 'Ação' },
      ].filter((c) => c !== false) as SimpleTableHeaderData[]}
      rows={ocorrencias.map((ocorrencia) => {
        const titulo = columnTitulo && ocorrencia.titulo
          ? ocorrencia.titulo
          : (
            <span className="text-gray-400 flex items-center">
              (Sem título)
              {onClickEditarTitulo && (
                <Anchor
                  href="#"
                  onClick={() => onClickEditarTitulo(ocorrencia)}
                  className="ml-1"
                >
                  <FontAwesomeIcon icon={faPencil} size="sm" />
                </Anchor>
              )}
            </span>
          );

        const descricao = columnDescricao && ocorrencia.descricao
          ? UiUtils.limitText(ocorrencia.descricao, 100)
          : '';

        const operacoesDiv = columnOperacoes && (
          <div className="flex">
            {operacoes.map((operacao, index) => (
              <Button
                key={index}
                onClick={() => operacao.onClick(ocorrencia)}
                color={operacao.color}
                className="px-2 py-1 mr-1 my-0.5"
                title={operacao.name}
                noPadding
              >
                {operacao.icon !== undefined && (
                  <FontAwesomeIcon icon={operacao.icon} fixedWidth />
                )}
                {operacao.text && (
                  <div className="text-xs">{operacao.name}</div>
                )}
              </Button>
            ))}
          </div>
        );

        const createdAt = columnCriadoEm && (
          <div>
            <DateText date={new Date(ocorrencia.createdAt)} />
            <div className="text-xs text-gray-400">
              <DateText date={new Date(ocorrencia.createdAt)} relative />
            </div>
          </div>
        );

        const escola = columnEscola && (
          <LoadableString
            placeholder="(Escola)"
            loadResult={loadEscolaNome(ocorrencia.escolaId)}
          />
        );

        const categoria = columnCategoria && (
          <LoadableString
            placeholder="(Categoria)"
            loadResult={loadCategoriaTitulo(ocorrencia.categoriaId)}
          />
        );

        return {
          cols: [
            columnId && { content: ocorrencia.id },
            columnTitulo && { content: titulo },
            columnDescricao && { content: descricao, classes: '' },
            columnEscola && { content: escola },
            columnCategoria && { content: categoria },
            columnStatus && { content: <OcorrenciaStatus status={ocorrencia.status} /> },
            columnCriadoEm && { content: createdAt },
            columnOperacoes && { content: operacoesDiv },
          ].filter((c) => c !== false) as SimpleTableCol[],
        };
      })}
    />
  );
};

export default React.memo(OcorrenciasTable);