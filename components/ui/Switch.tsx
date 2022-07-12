import React from 'react';

type SwitchProps = {
  htmlId?: string;
  checked: boolean;
  onToggle: () => void;
};

const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <input
      id={props.htmlId}
      type="checkbox"
      checked={props.checked}
      onChange={(e) => {
        props.onToggle();
      }}
    />
  );
};

export default React.memo(Switch);
