import { Andamento } from "escolas-shared";
import React from 'react';
import AndamentoDetalhes from "./AndamentoDetalhes";

type AndamentosTimelineProps = {
  andamentos: Andamento[];
};

const AndamentosTimeline: React.FC<AndamentosTimelineProps> = ({ andamentos }) => {
  return (
    <div className="flex flex-col items-stretch px-4 lg:px-8">
      {andamentos.map((andamento) => (
        <div key={andamento.id} className="mb-6">
          <AndamentoDetalhes andamento={andamento} />
        </div>
      ))}
    </div>
  );
};

export default React.memo(AndamentosTimeline);
