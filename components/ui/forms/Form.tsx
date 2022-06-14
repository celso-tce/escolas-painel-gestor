import React from 'react';

type FormProps = {
  children: React.ReactNode;
  className?: string;
};

const Form: React.FC<FormProps> = (props) => {
  const extraCss = props.className ?? '';

  return (
    <form className={extraCss}>
      {props.children}
    </form>
  );
};

export default React.memo(Form);
