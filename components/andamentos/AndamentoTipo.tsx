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

export function getTipoCss(tipo: string) {
  const tipoKey = Object.entries(TipoAndamento)
    .find(([key, value]) => value === tipo)?.[0];

  return tipoKey
    ? tipoClasses[tipoKey as keyof typeof TipoAndamento]
    : null;
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
