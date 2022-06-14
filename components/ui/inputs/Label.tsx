import React from 'react';

type LabelProps = {
  label: string;
  htmlFor?: string;
};

const Label: React.FC<LabelProps> = (props) => {
  return (
    <label
      className="block uppercase text-slate-600 text-xs font-bold mb-2"
      htmlFor={props.htmlFor}
    >
      {props.label}
    </label>
  );
};

export default React.memo(Label);
