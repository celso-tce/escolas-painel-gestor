import { StatusOcorrencia } from "escolas-shared/dist/common";
import React from 'react';

type OcorrenciaStatusProps = {
  status: string;
};

const statusClasses: Record<keyof typeof StatusOcorrencia, string> = {
  Recebido: 'text-blue-500 font-bold',
  Cancelado: 'text-slate-600',
  EmAnalise: 'text-slate-600',
  AguardandoGestor: 'text-slate-600',
  SolicitandoProrrogacao: 'text-slate-600',
  Respondido: 'text-slate-600',
  SolucionadoInspecao: 'text-slate-600',
  Solucionado: 'text-slate-600',
};

const OcorrenciaStatus: React.FC<OcorrenciaStatusProps> = ({ status }) => {
  const statusKey = Object.entries(StatusOcorrencia)
    .find(([key, value]) => value === status)?.[0];

  const css = statusKey
    ? statusClasses[statusKey as keyof typeof StatusOcorrencia]
    : 'bg-gray-200';

  return (
    <span className={`rounded ${css}`}>
      {status}
    </span>
  );
};

export default React.memo(OcorrenciaStatus);