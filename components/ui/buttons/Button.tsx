import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  color?: 'primary' | 'success' | 'info' | 'danger' | 'warning';
  onClick?: () => void;
  noPadding?: boolean;
  disabled?: boolean;
  className?: string;
  title?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const color = props.color ?? 'primary';

  const colorCss
    = color === 'primary'
      ? 'bg-slate-700 hover:bg-slate-600 active:bg-slate-600 text-white'
    : color === 'success'
      ? 'bg-green-600 hover:bg-green-500 active:bg-green-500 text-white'
    : color === 'info'
      ? 'bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-500 text-white'
    : color === 'danger'
      ? 'bg-red-600 hover:bg-red-500 active:bg-red-500 text-white'
    : color === 'warning'
      ? 'bg-amber-600 hover:bg-amber-500 active:bg-amber-500 text-white'
    : 'bg-slate-500 hover:bg-slate-400 active:bg-slate-400 text-white';

  const paddingCss = props.noPadding ? '' : 'px-4 py-2';

  const disabledCss = props.disabled ? 'opacity-50' : '';

  const extraCss = props.className ?? '';

  return (
    <button
      className={`text-sm font-bold rounded shadow hover:shadow-lg outline-none focus:outline-none
        focus:underline ease-linear transition-all duration-150
        ${paddingCss} ${colorCss} ${disabledCss} ${extraCss}`}
      onClick={(e) => {
        if (props.onClick) {
          e.preventDefault();
          props.onClick();
        }
      }}
      disabled={props.disabled}
      title={props.title}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
