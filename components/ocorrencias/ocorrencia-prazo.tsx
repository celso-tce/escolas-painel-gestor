import { DateTime } from "luxon";
import React from 'react';
import DateText from "../ui/displays/DateText";

type OcorrenciaPrazoProps = {
  prazo: Date;
  inline?: boolean;
};

const OcorrenciaPrazo: React.FC<OcorrenciaPrazoProps> = ({
  prazo,
  inline,
}) => {
  const luxonPrazo = DateTime.fromJSDate(prazo);
  const isAtrasado = luxonPrazo.diffNow().milliseconds < 0;

  if (inline) {
    return (
      <div className={`flex flex-wrap items-center ${isAtrasado ? 'text-red-600 font-bold' : ''}`}>
        <div>
          <DateText date={prazo} />&nbsp;
        </div>
        <span
          className={`text-xs whitespace-nowrap ${isAtrasado ? 'text-red-400' : 'text-gray-400'}`}>
          (<DateText date={prazo} relative />)
        </span>
      </div>
    );
  }

  return (
    <div className={`${isAtrasado ? 'text-red-600 font-bold' : ''}`}>
      <DateText date={prazo} />
      <div className={`text-xs ${isAtrasado ? 'text-red-400' : 'text-gray-400'}`}>
        <DateText date={prazo} relative />
      </div>
    </div>
  );
};

export default React.memo(OcorrenciaPrazo);
