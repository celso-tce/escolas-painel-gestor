import { DateTime } from "luxon";
import React from 'react';
import DateText from "../ui/displays/DateText";

type OcorrenciaPrazoProps = {
  prazo: Date;
};

const OcorrenciaPrazo: React.FC<OcorrenciaPrazoProps> = ({
  prazo,
}) => {
  const luxonPrazo = DateTime.fromJSDate(prazo);
  const isAtrasado = luxonPrazo.diffNow().milliseconds < 0;

  return (
    <div className={`${isAtrasado ? 'text-red-600 font-bold' : ''}`}>
      <DateText date={new Date(prazo)} />
      <div className={`text-xs ${isAtrasado ? 'text-red-400' : 'text-gray-400'}`}>
        <DateText date={new Date(prazo)} relative />
      </div>
    </div>
  );
};

export default React.memo(OcorrenciaPrazo);
