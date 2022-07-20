import { faEmber } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faCalendar, faCalendarAlt, faHashtag, faQuestion, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Andamento } from "escolas-shared";
import React from 'react';
import DateText from "../ui/displays/DateText";
import AndamentoTipo, { getTipoCss, getTipoIcon } from "./AndamentoTipo";

type AndamentoDetalhesProps = {
  andamento: Andamento;
};

const AndamentoDetalhes: React.FC<AndamentoDetalhesProps> = ({ andamento }) => {
  const prazoFinal = andamento.prazoFinal && (
    <div className="flex flex-wrap items-center">
      <div>
        <DateText date={new Date(andamento.prazoFinal)} />&nbsp;
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">
        (<DateText date={new Date(andamento.prazoFinal)} relative />)
      </span>
    </div>
  );

  const colorAndamento = getTipoCss(andamento.tipo) ?? '';
  const iconAndamento = getTipoIcon(andamento.tipo) ?? faQuestion;

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex text-center text-xs mb-0.5">
        <div className="basis-1/3" />

        <div className="text-left">
          <span className="text-slate-500">
            <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
          </span>&nbsp;
          <span className="text-gray-600">
            <DateText date={new Date(andamento.createdAt)} format="dd/MM/yyyy hh:mm" />
          </span>
          <span className="text-slate-400 ml-1">
            <DateText date={new Date(andamento.createdAt)} relative />
          </span>
        </div>
      </div>

      <div className="flex items-center">
        <div className={`mr-2 rounded-full px-1 shadow ${colorAndamento}`}>
          <FontAwesomeIcon icon={iconAndamento} fixedWidth />
        </div>

        <div className="grow bg-white rounded shadow">
          <div className="flex flex-wrap justify-between items-center">
            <div className="px-1 py-0.5 text-sm font-medium">
              <AndamentoTipo tipo={andamento.tipo} />
            </div>
            <div className="px-1 py-0.5 text-xs">
              <span className="text-slate-400">
                <FontAwesomeIcon icon={faUser} fixedWidth />
              </span>&nbsp;
              <span className="text-gray-600">Fulano de Tal</span>
            </div>
          </div>

          <div className="text-sm text-slate-600 px-2">
            {andamento.prazoFinal && (
              <div className="flex mb-1">
                <span className="font-bold mr-1">Prazo:</span>
                {prazoFinal}
              </div>
            )}

            {andamento.mensagem && (
              <div className="flex mb-1">
                <span className="font-bold mr-1">Mensagem:</span>
                <div className="break-words">{andamento.mensagem}</div>
              </div>
            )}

            {andamento.relatoId && (
              <div className="flex mb-1">
                <span className="font-bold mr-1">Relato Vinculado:</span>
                <span># {andamento.relatoId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AndamentoDetalhes);
