import React from 'react';
import Button from "../ui/buttons/Button";
import Form from "../ui/forms/Form";
import FormItem from "../ui/forms/FormItem";
import FormSection from "../ui/forms/FormSection";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";
import ReactSelect from "react-select";
import { CampoObrigatorioMap, SelectUtils } from "../../lib/ui-utils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BasicModel } from "../../lib/types";

export type BasicResourceFormProps<TModel extends BasicModel, FormData extends {}> = {
  editResource: TModel | null;
  onCancelar: () => void;
  onSubmit: (formData: FormData) => void;
};

export type ExtraResourceFormProps<TModel extends BasicModel, FormData extends {}> = {
  camposObrigatorios: CampoObrigatorioMap<FormData>;
  formContent: React.ReactNode;
  generateFormData: (parsedValues: Record<string, string>) => FormData;
};

export type ResourceFormProps<TModel extends BasicModel, FormData extends {}> =
  BasicResourceFormProps<TModel, FormData> & ExtraResourceFormProps<TModel, FormData>;

function ResourceForm<TModel extends BasicModel, FormData extends {}>({
  editResource,
  onCancelar,
  onSubmit,
  camposObrigatorios,
  formContent,
  generateFormData,
}: ResourceFormProps<TModel, FormData>): React.ReactElement {
  const MySwal = withReactContent(Swal);

  const onSubmitForm = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const parsedValues: Record<string, string> = {};

    for (const [fieldKey, fieldValue] of Object.entries(fieldValues)) {
      const value = fieldValue.toString().trim();

      if (value)
        parsedValues[fieldKey] = value;
    }

    const missingList = Object.entries(camposObrigatorios).filter(([campoKey]) => {
      const fieldValue = parsedValues[campoKey];
      return !fieldValue || fieldValue === '';
    }).map(([_, campoInfo]) => {
      return (campoInfo as { label: string }).label;
    });

    if (missingList.length > 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Por favor, preencha todos os campos obrigatórios:',
        text: missingList.join(', '),
      });

      return;
    }

    /*onSubmit({
      nome: parsedValues['nome'],
      tipo: parsedValues['tipo'],
      status: +parsedValues['status'],
      modalidades: parsedValues['modalidades'] ?? '',
      diretorNome: parsedValues['diretorNome'],
      diretorEmail: parsedValues['diretorEmail'],
      qeduUrl: parsedValues['qeduUrl'],
      postalCode: parsedValues['cep'],
      endereco: parsedValues['endereco'],
      complemento: parsedValues['complemento'],
      cidade: parsedValues['cidade'],
      bairro: parsedValues['bairro'],
    });*/
    onSubmit(generateFormData(parsedValues));
  }, [MySwal, onSubmit]);

  return (
    <Form onSubmit={onSubmitForm}>
      <div className="bg-slate-100 px-4 py-3">
        {formContent}
      </div>

      <div className="py-3 px-4 flex justify-between border-t border-slate-300">
        <Button className="uppercase" color="success">
          {editResource ? 'Salvar' : 'Cadastrar'}
        </Button>

        <Button className="uppercase" color="danger" onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default ResourceForm;
