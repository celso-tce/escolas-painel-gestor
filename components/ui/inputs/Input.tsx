import React from 'react';

type InputProps = {
  type?: 'text' | 'password';
  htmlId?: string;
  placeholder?: string;
  className?: string;
};

const Input: React.FC<InputProps> = (props) => {
  const type = props.type ?? 'text';

  const extraCss = props.className ?? '';

  return (
    <input
      type={type}
      id={props.htmlId}
      className={'border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded'
        + ' text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all'
        + ' duration-150'
        + ` ${extraCss}`}
      placeholder={props.placeholder}
    />
  );
};

export default React.memo(Input);
