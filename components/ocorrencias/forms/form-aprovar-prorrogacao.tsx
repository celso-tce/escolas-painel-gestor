import { Ocorrencia } from "escolas-shared";
import { StatusOcorrencia } from "escolas-shared/dist/common";
import React from 'react';
import { ConfirmSwalDialog } from "../../../lib/types";
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/forms/Form";
import FormSection from "../../ui/forms/FormSection";
import Input from "../../ui/inputs/Input";
import Label from "../../ui/inputs/Label";
import OcorrenciaStatus from "../ocorrencia-status";

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
      className="flex flex-wrap items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const fieldValues = Object.fromEntries(formData.entries());
        const { mensagem } = fieldValues;

        showConfirmSwalDialog({
          title: 'Essa é uma operação permanente.',
          text: 'Tem certeza que deseja aprovar esta prorrogação?',
          onConfirm: () => {
            apiService.aprovarProrrogacao({
              ocorrenciaId: ocorrencia.id,
              mensagem: mensagem.toString(),
              prazoDias: 30, // TODO pegar de algum outro local
            }).then((response) => {
              if (response.type === 'error')
                throw response.message;

              onFinish();
            }).catch((err) => {
              onFinish(err);
            });
          },
          onCancel: () => {},
        });
      }}
    >
      <div className="w-full text-slate-500 text-sm">
        Ao aprovar a prorrogação, o Status da Ocorrência será revertido para&nbsp;
        <OcorrenciaStatus
          status={StatusOcorrencia.AguardandoGestor}
          className="font-bold"
        /> e um Andamento será gerado com a mensagem informada abaixo:
      </div>

      <FormSection className="w-full lg:w-8/12 pr-4 mb-4">
        <Label htmlFor="i-mensagem" label="Mensagem" />
        <Input htmlId="i-mensagem" name="mensagem" required />
      </FormSection>

      <div className="flex lg:w-4/12 mb-4">
        <Button className="grow mr-1" color="success">Aprovar</Button>
        <Button className="grow" onClick={onClose}>Cancelar</Button>
      </div>
    </Form>
  );
};

export default React.memo(FormAprovarOcorrencia);
