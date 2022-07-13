import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

type SimpleToggleableProps = {
  title: string;
  children: React.ReactNode;
};

const SimpleToggleable: React.FC<SimpleToggleableProps> = ({ title, children }) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="flex flex-col items-stretch">
      <div
        className="flex items-center cursor-pointer hover:bg-slate-200"
        onClick={(e) => setShow(!show)}
      >
        <FontAwesomeIcon icon={show ? faMinusCircle : faPlusCircle} fixedWidth />&nbsp;
        <div className="mb-0.5 font-medium text-xl select-none">
          {title}
        </div>
      </div>

      {show && children}
    </div>
  );
};

export default React.memo(SimpleToggleable);
