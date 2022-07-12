import React from 'react';

type OcorrenciaProsseguirProps = {
  detalhes: React.ReactNode;
  acoes: React.ReactNode;
};

const OcorrenciaProsseguir: React.FC<OcorrenciaProsseguirProps> = ({
  detalhes,
  acoes,
}) => {
  return (
    <div className="flex flex-col items-stretch">
      <div className="grow overflow-y-auto max-h-full">
        {detalhes}
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap justify-between p-2 space-y-2 sm:space-y-0">
        {acoes}
      </div>
    </div>
  );
};

export default React.memo(OcorrenciaProsseguir);
