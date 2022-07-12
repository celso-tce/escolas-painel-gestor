import React, { useMemo, useState } from 'react';

interface ModalProps {
  titulo: string;
  visible: boolean;
  onClose: () => void;
  hideTitle?: boolean;
  hideBotaoFechar?: boolean;
  disableBackgroundFechar?: boolean;
  noOverflowHidden?: boolean;
  limitHeight?: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className="fixed z-40 inset-0 overflow-y-auto">
      <div className="flex sm:items-end sm:justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0 lg:pt-8">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={props.disableBackgroundFechar ? () => {} : props.onClose}
          />
        </div>
        <div
          className={`inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg mb-6
            text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl
            text-slate-700 sm:w-full ${props.noOverflowHidden ? '' : 'overflow-hidden'}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {!props.hideTitle && (
            <div className="flex justify-between items-center p-4">
              <p className="text-xl font-bold">{props.titulo}</p>
              <div className="modal-close cursor-pointer z-50" onClick={props.onClose}>
                <svg className="fill-current text-black dark:text-yellow-primary" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                </svg>
              </div>
            </div>
          )}

          <div
            style={props.limitHeight ? {
              maxHeight: '65vh',
              overflowY: 'auto',
            } : {}}
          >
            {props.children}
          </div>

          {!props.hideBotaoFechar && (
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={props.onClose}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm dark:border-yellow-400 dark:bg-transparent dark:text-yellow-400 dark:hover:border-yellow-600 dark:hover:text-yellow-600"
              >
                Fechar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
