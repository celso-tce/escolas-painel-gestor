import React from 'react';

type FormItemProps = {
  children: React.ReactNode;
  className?: string;
};

const FormItem: React.FC<FormItemProps> = (props) => {
  const extraCss = props.className;

  return (
    <div className={'relative w-full mb-3 ' + extraCss}>
      {props.children}
    </div>
  );
};

export default React.memo(FormItem);
