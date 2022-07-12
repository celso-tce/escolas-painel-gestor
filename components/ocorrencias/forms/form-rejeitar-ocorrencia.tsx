import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/forms/Form";
import FormSection from "../../ui/forms/FormSection";
import Input from "../../ui/inputs/Input";
import Label from "../../ui/inputs/Label";

type FormRejeitarOcorrenciaProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;
};

const FormRejeitarOcorrencia: React.FC<FormRejeitarOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
}) => {
  const apiService = React.useContext(ApiServiceContext);

  return (
    <Form
      className="flex flex-wrap items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fieldValues = Object.fromEntries(formData.entries());
        const { motivo } = fieldValues;

        apiService.rejeitarOcorrencia({
          ocorrenciaId: ocorrencia.id,
          motivo: motivo.toString(),
        }).then(() => {
          onFinish();
        }).catch((err) => {
          onFinish(err);
        });
      }}
    >
      <FormSection className="w-full lg:w-8/12 pr-4 mb-4">
        <Label htmlFor="i-motivo" label="Motivo" />
        <Input htmlId="i-motivo" name="motivo" required />
      </FormSection>

      <div className="flex lg:w-4/12 mb-4">
        <Button className="grow mr-1" color="danger">Rejeitar</Button>
        <Button className="grow" onClick={onClose}>Cancelar</Button>
      </div>
    </Form>
  );
};

export default React.memo(FormRejeitarOcorrencia);
