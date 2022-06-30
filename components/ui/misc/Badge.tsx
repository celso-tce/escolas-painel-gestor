import React from 'react';

type BadgeProps = {
  color?: 'success' | 'danger';
  className?: string;
  children: React.ReactNode;
};

const Badge: React.FC<BadgeProps> = (props) => {
  const bgCss
    = props.color === 'success'
      ? 'bg-green-500'
    : props.color === 'danger'
      ? 'bg-red-500'
    : 'bg-slate-400';

  const colorCss
    = props.color === 'success'
      ? 'text-white'
    : 'text-white';

  const extraCss = props.className ?? '';

  return (
    <span
      className={`px-2 py-1 font-bold rounded ${bgCss} ${colorCss} ${extraCss}`}
    >
      {props.children}
    </span>
  );
};

export default React.memo(Badge);
