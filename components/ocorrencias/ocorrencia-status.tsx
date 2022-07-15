import { displayStatusOcorrencia, StatusOcorrencia } from "escolas-shared/dist/common";
import React from 'react';

type OcorrenciaStatusProps = {
  status: string;
  className?: string;
};

const statusClasses: Record<keyof typeof StatusOcorrencia, string> = {
  Recebido: 'text-gray-500',
  Cancelado: 'text-red-600',
  EmAnalise: 'text-cyan-600',
  AguardandoGestor: 'text-amber-600',
  SolicitandoProrrogacao: 'text-pink-700',
  Respondido: 'text-sky-700',
  SolucionadoInspecao: 'text-green-700 italic',
  Solucionado: 'text-green-700',
};

const OcorrenciaStatus: React.FC<OcorrenciaStatusProps> = ({ status, className }) => {
  const statusKey = Object.entries(StatusOcorrencia)
    .find(([key, value]) => value === status)?.[0];

  const css = statusKey
    ? statusClasses[statusKey as keyof typeof StatusOcorrencia]
    : 'text-gray-600';

  const extraCss = className ?? '';

  return (
    <span className={`rounded ${css} ${extraCss}`}>
      { statusKey
        ? displayStatusOcorrencia[statusKey as keyof typeof StatusOcorrencia]
        : status}
    </span>
  );
};

export default React.memo(OcorrenciaStatus);
