import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { UiUtils } from "../../lib/ui-utils";
import Button, { ButtonProps } from "../ui/buttons/Button";
import DateText from "../ui/displays/DateText";
import Anchor from "../ui/misc/Anchor";
import SimpleTable from "../ui/tables/SimpleTable";
import OcorrenciaStatus from "./ocorrencia-status";

export type OcorrenciasTableOperacao = {
  icon: IconProp;
  name: string;
  color: ButtonProps['color'];
  onClick: (ocorrencia: Ocorrencia) => void;
};

type OcorrenciasTableProps = {
  ocorrencias: Ocorrencia[];
  operacoes: OcorrenciasTableOperacao[];
  onClickEditarTitulo: (ocorrencia: Ocorrencia) => void;
};

const OcorrenciasTable: React.FC<OcorrenciasTableProps> = ({
  ocorrencias,
  operacoes,
  onClickEditarTitulo,
}) => {
  return (
    <SimpleTable
      headerClasses="text-xs"
      header={[
        { label: '#', classes: 'w-0' },
        { label: 'Título' },
        { label: 'Descrição' },
        { label: 'Status' },
        { label: 'Criado Em' },
        { label: 'Operações' },
      ]}
      colClasses="text-sm"
      rows={ocorrencias.map((ocorrencia) => {
        const titulo = ocorrencia.titulo ? ocorrencia.titulo : (
          <span className="text-gray-400 flex items-center">
            (Sem título)
            <Anchor
              href="#"
              onClick={() => onClickEditarTitulo(ocorrencia)}
              className="ml-1"
            >
              <FontAwesomeIcon icon={faPencil} size="sm" />
            </Anchor>
          </span>
        );

        const descricao = ocorrencia.descricao
          ? UiUtils.limitText(ocorrencia.descricao, 100)
          : '';

        const operacoesDiv = (
          <div className="flex flex-wrap space-x-1">
            {operacoes.map((operacao, index) => (
              <Button
                key={index}
                onClick={() => operacao.onClick(ocorrencia)}
                color={operacao.color}
                className="px-2 py-1"
                title={operacao.name}
                noPadding
              >
                <FontAwesomeIcon icon={operacao.icon} fixedWidth />
              </Button>
            ))}
          </div>
        );

        const createdAt = (
          <div>
            <DateText date={new Date(ocorrencia.createdAt)} />
            <div className="text-xs text-gray-400">
              <DateText date={new Date(ocorrencia.createdAt)} relative />
            </div>
          </div>
        );

        return {
          cols: [
            { content: ocorrencia.id },
            { content: titulo },
            { content: descricao, classes: 'break-words' },
            { content: <OcorrenciaStatus status={ocorrencia.status} /> },
            { content: createdAt },
            { content: operacoesDiv },
          ],
        };
      })}
    />
  );
};

export default React.memo(OcorrenciasTable);
