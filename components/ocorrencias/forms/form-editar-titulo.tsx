import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/forms/Form";
import FormSection from "../../ui/forms/FormSection";
import Input from "../../ui/inputs/Input";
import Label from "../../ui/inputs/Label";

type FormEditarTituloProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;
};

const FormEditarTitulo: React.FC<FormEditarTituloProps> = ({
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
        const { titulo } = fieldValues;

        apiService.editarTituloOcorrencia({
          ocorrenciaId: ocorrencia.id,
          titulo: titulo.toString(),
        }).then(() => {
          onFinish();
        }).catch((err) => {
          onFinish(err);
        });
      }}
    >
      <FormSection className="lg:w-8/12 pr-4">
        <Label label="Novo Título" htmlFor="i-novo-titulo" />
        <Input
          htmlId="i-novo-titulo"
          name="titulo"
          defaultValue={ocorrencia.titulo ?? ''}
          required
        />
      </FormSection>
      <Button
        className="lg:w-4/12"
        color="success"
      >
        Salvar
      </Button>
    </Form>
  );
};

export default React.memo(FormEditarTitulo);
