import { Ocorrencia } from "escolas-shared";
import React from 'react';

type OcorrenciaDetalhesProps = {
  ocorrencia: Ocorrencia;
};

const OcorrenciaDetalhes: React.FC<OcorrenciaDetalhesProps> = ({
  ocorrencia,
}) => {
  return (
    <div className="break-words">
      {JSON.stringify(ocorrencia)}
    </div>
  );
};

export default React.memo(OcorrenciaDetalhes);
