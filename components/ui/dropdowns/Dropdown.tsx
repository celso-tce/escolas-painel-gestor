import React from 'react';

type DropdownProps = {
  htmlId?: string;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (<>
    Removido! Use o pacote react-select
  </>);
};

export default React.memo(Dropdown);
