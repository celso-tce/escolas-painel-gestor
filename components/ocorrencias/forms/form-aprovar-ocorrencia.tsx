import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ConfirmSwalDialog } from "../../../lib/types";
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/forms/Form";

type FormAprovarOcorrenciaProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;
  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void;
};

const FormAprovarOcorrencia: React.FC<FormAprovarOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  showConfirmSwalDialog,
}) => {
  const apiService = React.useContext(ApiServiceContext);

  return (
    <Form
      className="flex flex-wrap items-center"
      onSubmit={(e) => {
        e.preventDefault();
        showConfirmSwalDialog({
          title: 'Essa é uma operação permanente.',
          text: 'Tem certeza que deseja aprovar esta ocorrência?',
          onConfirm: () => {
            apiService.aprovarOcorrencia({
              ocorrenciaId: ocorrencia.id,
            }).then((result) => {
              if (result.type === 'error')
                throw result.message;

              onFinish();
            }).catch((err) => {
              onFinish(err);
            });
          },
          onCancel: () => {},
        });
      }}
    >
      <div className="w-full lg:w-8/12 pr-4">
        <div className="text-xs font-bold text-slate-400">Confirmação</div>
        Deseja aprovar a ocorrência e encaminhar para a Inspetoria?
      </div>

      <div className="flex lg:w-4/12">
        <Button className="grow mr-1" color="success">Aprovar</Button>
        <Button className="grow" onClick={onClose}>Cancelar</Button>
      </div>
    </Form>
  );
};

export default React.memo(FormAprovarOcorrencia);
