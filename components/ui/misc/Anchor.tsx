import React from 'react';

type AnchorProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Anchor: React.FC<AnchorProps> = (props) => {
  const extraCss = props.className ?? '';

  return (
    <a
      className={`text-sky-600 hover:text-sky-500 hover:underline ${extraCss}`}
      href={props.href}
      onClick={(e) => {
        if (props.onClick) {
          e.preventDefault();
          props.onClick();
        }
      }}
    >
      {props.children}
    </a>
  );
};

export default React.memo(Anchor);
