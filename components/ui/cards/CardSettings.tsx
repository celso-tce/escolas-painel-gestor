import React from 'react';

type CardSettingsProps = {
  header?: string;
  children: React.ReactNode;
  headerEnd?: React.ReactNode;
};

const CardSettings: React.FC<CardSettingsProps> = (props) => {
  return (<>
    <div className="flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-slate-100 border-0">
      {props.header && (
        <div className="rounded-t bg-white mb-0 px-4 py-4">
          <div className="text-center flex justify-between">
            <h5 className="text-base text-slate-600 font-semibold">{props.header}</h5>
            {props.headerEnd}
            {/* <button
              className="bg-slate-700 active:bg-slate-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Settings
            </button> */}
          </div>
        </div>
      )}

      {props.children}
    </div>
  </>);
};

export default React.memo(CardSettings);
