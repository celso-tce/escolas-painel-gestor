import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Andamento, Ocorrencia, TipoAndamento } from "escolas-shared";
import React from 'react';
import { OcorrenciaHelper } from "../../lib/escolas/ocorrencia-helper";
import { OcorrenciaWithAll } from "../../lib/services/api-service";
import AndamentosTimeline from "../andamentos/AndamentosTimeline";
import AndamentoTipo from "../andamentos/AndamentoTipo";
import RelatosGroup from "../relatos/RelatosGroup";
import DateText from "../ui/displays/DateText";
import SimpleToggleable from "../ui/SimpleToggleable";
import OcorrenciaPrazo from "./ocorrencia-prazo";
import OcorrenciaStatus from "./ocorrencia-status";

type OcorrenciaDetalhesProps = {
  ocorrencia: OcorrenciaWithAll;
};

const OcorrenciaDetalhes: React.FC<OcorrenciaDetalhesProps> = ({
  ocorrencia,
}) => {
  const createdAt = (
    <div className="flex flex-wrap items-center">
      <div>
        <DateText date={new Date(ocorrencia.createdAt)} />&nbsp;
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">
        (<DateText date={new Date(ocorrencia.createdAt)} relative />)
      </span>
    </div>
  );

  const escola = (
    <div>{ocorrencia.escola.nome}</div>
  );

  const ultimoAndamento = OcorrenciaHelper.getUltimoAndamento(ocorrencia);

  return (
    <div className="flex flex-wrap items-stretch py-2">
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="#" value={ocorrencia.id} />
      </div>
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Status" value={<OcorrenciaStatus status={ocorrencia.status} />} />
      </div>
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Título" value={ocorrencia.titulo ?? '(Sem título)'} />
      </div>
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Criado Em" value={createdAt} />
      </div>
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Categoria" value={ocorrencia.categoria.titulo} />
      </div>
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Escola" value={escola} />
      </div>
      <div className="w-full lg:w-12/12 p-1">
        <_Section label="Descrição" value={ocorrencia.descricao} />
      </div>
      {ultimoAndamento && (
        <div className="w-full lg:w-12/12 p-1">
          <_UltimoAndamento andamento={ultimoAndamento} />
        </div>
      )}

      <div className="w-full p-1 mt-2">
        <SimpleToggleable title="Ver Relatos">
          <RelatosGroup relatos={ocorrencia.relatos} />
        </SimpleToggleable>
      </div>

      <div className="w-full p-1 mt-2">
        <SimpleToggleable title="Ver Andamentos">
          <AndamentosTimeline andamentos={ocorrencia.andamentos} />
        </SimpleToggleable>
      </div>
    </div>
  );
};

function _Section({
  label,
  value,
  vertical,
}: {
  label: string;
  value: React.ReactNode;
  vertical?: boolean;
}): React.ReactElement {
  if (vertical) {
    return (
      <div className="h-full flex flex-col items-stretch border border-slate-200 bg-white overflow-x-auto">
        <div className="px-2 py-1 font-bold text-center">{label}</div>
        <div className="grow px-2 py-1 break-words">{value}</div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-start border border-slate-200 bg-white overflow-x-auto">
      <div className="px-2 py-1 font-bold">{label}:</div>
      <div className="grow px-2 py-1 break-words">{value}</div>
    </div>
  );
}

function _UltimoAndamento({ andamento }: { andamento: Andamento }) {
  const tipo = <AndamentoTipo tipo={andamento.tipo} />;

  const createdAt = (
    <div className="flex flex-wrap items-center">
      <div>
        <DateText date={new Date(andamento.createdAt)} />&nbsp;
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">
        (<DateText date={new Date(andamento.createdAt)} relative />)
      </span>
    </div>
  );

  const prazo = andamento.prazoFinal
    && <OcorrenciaPrazo prazo={new Date(andamento.prazoFinal)} inline />;

  const relatoVinculado = andamento.relatoId;

  const anexo = false; // TODO

  const content = (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Tipo" value={tipo} />
      </div>
      <div className="w-full lg:w-6/12 p-1">
        <_Section label="Data" value={createdAt} />
      </div>
      {relatoVinculado && (
        <div className="w-full lg:w-6/12 p-1">
          <_Section label="Relato Vinculado" value={'#' + relatoVinculado} />
        </div>
      )}
      {andamento.prazoFinal && (
        <div className="w-full lg:w-6/12 p-1">
          <_Section label="Prazo" value={prazo} />
        </div>
      )}
      {anexo && (
        <div className="w-full lg:w-6/12 p-1">
          <_Section label="Anexo" value={anexo} />
        </div>
      )}
      {andamento.mensagem && (
        <div className="w-full p-1">
          <_Section label="Mensagem" value={andamento.mensagem} />
        </div>
      )}
    </div>
  );

  return (
    <_Section label="Último Andamento" value={content} vertical />
  );
}

export default React.memo(OcorrenciaDetalhes);
