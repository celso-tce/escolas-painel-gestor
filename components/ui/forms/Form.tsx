import React from 'react';

type FormProps = {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<FormProps> = (props) => {
  const extraCss = props.className ?? '';

  return (
    <form className={extraCss} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};

export default React.memo(Form);
