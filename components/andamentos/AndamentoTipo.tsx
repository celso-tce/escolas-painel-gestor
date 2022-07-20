import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faClockRotateLeft, faCodeBranch, faMagnifyingGlassArrowRight, faMailBulk, faMailForward, faReply, faTimesSquare } from "@fortawesome/free-solid-svg-icons";
import { displayTipoAndamento, TipoAndamento } from "escolas-shared/dist/common";
import React from 'react';

type AndamentoTipoProps = {
  tipo: string;
  className?: string;
};

const tipoClasses: Record<keyof typeof TipoAndamento, string> = {
  Cancelamento: 'text-red-600',
  Vinculamento: 'text-slate-700 italic',
  EnvioParaAnalise: 'text-cyan-600',
  EnvioAoGestor: 'text-amber-600',
  SolicitacaoDeProrrogacao: 'text-pink-700',
  Resposta: 'text-sky-700',
  SolucaoInspecao: 'text-green-700 italic',
  Solucao: 'text-green-700',
};

const tipoIcons: Record<keyof typeof TipoAndamento, IconProp> = {
  Cancelamento: faTimesSquare,
  Vinculamento: faCodeBranch,
  EnvioParaAnalise: faMailBulk,
  EnvioAoGestor: faMailForward,
  SolicitacaoDeProrrogacao: faClockRotateLeft,
  Resposta: faReply,
  SolucaoInspecao: faMagnifyingGlassArrowRight,
  Solucao: faCheckSquare,
};

export function getTipoCss(tipo: string): string | undefined {
  const tipoKey = Object.entries(TipoAndamento)
    .find(([key, value]) => value === tipo)?.[0];

  return tipoKey
    ? tipoClasses[tipoKey as keyof typeof TipoAndamento]
    : undefined;
}

export function getTipoIcon(tipo: string): IconProp | undefined {
  const tipoKey = Object.entries(TipoAndamento)
    .find(([key, value]) => value === tipo)?.[0];

  return tipoKey
    ? tipoIcons[tipoKey as keyof typeof TipoAndamento]
    : undefined;
}

const AndamentoTipo: React.FC<AndamentoTipoProps> = ({ tipo, className }) => {
  const tipoKey = Object.entries(TipoAndamento)
    .find(([key, value]) => value === tipo)?.[0];

  const css = getTipoCss(tipo) ?? 'text-gray-600';

  const extraCss = className ?? '';

  return (
    <span className={`rounded ${css} ${extraCss}`}>
      { tipoKey
        ? displayTipoAndamento[tipoKey as keyof typeof TipoAndamento]
        : tipo}
    </span>
  );
};

export default React.memo(AndamentoTipo);
