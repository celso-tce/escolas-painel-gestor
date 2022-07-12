import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/forms/Form";
import FormSection from "../../ui/forms/FormSection";
import Input from "../../ui/inputs/Input";
import Label from "../../ui/inputs/Label";

type FormAprovarOcorrenciaProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;
};

const FormAprovarOcorrencia: React.FC<FormAprovarOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
}) => {
  const apiService = React.useContext(ApiServiceContext);

  return (
    <Form
      className="flex flex-wrap items-center"
      onSubmit={(e) => {
        e.preventDefault();
        apiService.aprovarOcorrencia({
          ocorrenciaId: ocorrencia.id,
        }).then(() => {
          onFinish();
        }).catch((err) => {
          return err;
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
