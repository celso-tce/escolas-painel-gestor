import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type ModelStatProps = {
  icon: IconProp;
  label: string;
  value: string;
};

const ModelStat: React.FC<ModelStatProps> = (props) => {
  return (
    <div className="flex bg-white rounded-lg shadow-md mb-8">
      <div className="bg-slate-200 basis-1/4 rounded-lg flex items-center justify-center p-4">
        <FontAwesomeIcon size="4x" icon={props.icon} className="text-slate-500" />
      </div>
      <div className="grow flex flex-col justify-center p-4">
        <div className="text-sm uppercase font-semibold mb-2 text-slate-600">{props.label}</div>
        <div className="text-md text-slate-500">{props.value}</div>
      </div>
    </div>
  );
};

export default React.memo(ModelStat);
