import React from 'react';

type FormSectionProps = {
  header?: string;
  children: React.ReactNode;
  className?: string;
};

const FormSection: React.FC<FormSectionProps> = (props) => {
  const extraCss = props.className ?? '';

  return (<div className={'mt-3 ' + extraCss}>
    {props.header !== undefined && (
      <h6 className="text-slate-400 text-sm mb-6 font-bold uppercase">{props.header}</h6>
    )}
    <div className="flex flex-wrap">
      {props.children}
    </div>
  </div>);
};

export default React.memo(FormSection);
