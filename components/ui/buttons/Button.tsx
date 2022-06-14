import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  color?: 'primary' | 'danger';
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const color = props.color ?? 'primary';

  const colorCss = color === 'primary'
    ? 'bg-slate-800 active:bg-slate-600 text-white'
    : 'bg-red-800 active:bg-slate-600 text-white';

  const extraCss = props.className ?? '';

  return (
    <button
      className={'text-sm font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none'
        + ' focus:outline-none ease-linear transition-all duration-150'
        + ` ${colorCss} ${extraCss}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
