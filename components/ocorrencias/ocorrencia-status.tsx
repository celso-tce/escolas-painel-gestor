import { StatusOcorrencia } from "escolas-shared/dist/common";
import React from 'react';

type OcorrenciaStatusProps = {
  status: string;
};

const statusClasses: Record<keyof typeof StatusOcorrencia, string> = {
  Recebido: 'text-white bg-blue-500',
  Cancelado: 'text-white',
  EmAnalise: 'text-white',
  AguardandoGestor: 'text-white',
  SolicitandoProrrogacao: 'text-white',
  Respondido: 'text-white',
  SolucionadoInspecao: 'text-white',
  Solucionado: 'text-white',
};

const OcorrenciaStatus: React.FC<OcorrenciaStatusProps> = ({ status }) => {
  const statusKey = Object.entries(StatusOcorrencia)
    .find(([key, value]) => value === status)?.[0];

  const css = statusKey
    ? statusClasses[statusKey as keyof typeof StatusOcorrencia]
    : 'bg-gray-200';

  return (
    <span className={`px-2 py-1 rounded ${css}`}>
      {status}
    </span>
  );
};

export default React.memo(OcorrenciaStatus);
