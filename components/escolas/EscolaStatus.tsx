import React from 'react';
import Badge from "../ui/misc/Badge";

type EscolaStatusProps = {
  status: number;
};

const EscolaStatus: React.FC<EscolaStatusProps> = ({ status }) => {
  return (
    <Badge color={status === 0 ? 'danger' : 'success'}>
      {status === 0 ? 'Inativa' : 'Ativa'}
    </Badge>
  );
};

export default React.memo(EscolaStatus);
