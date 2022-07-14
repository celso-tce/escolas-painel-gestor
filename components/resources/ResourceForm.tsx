import React from 'react';
import Button from "../ui/buttons/Button";
import Form from "../ui/forms/Form";
import { CampoObrigatorioMap, CampoObrigatorioValidator } from "../../lib/ui-utils";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BasicModel } from "../../lib/types";

export type BasicResourceFormProps<TModel extends BasicModel, TFormData> = {
  editResource: TModel | null;
  onCancelar: () => void;
  onSubmit: (formData: TFormData) => void;
};

export type ExtraResourceFormProps<TModel extends BasicModel, TFormData> = {
  camposObrigatorios: CampoObrigatorioMap<TFormData>;
  formContent: React.ReactNode;
  /// retorno de string = erro (onde a string é a mensagem para mostrar)
  generateFormData: (parsedValues: Record<string, string>) => TFormData | string;
};

export type ResourceFormProps<TModel extends BasicModel, TFormData> =
  BasicResourceFormProps<TModel, TFormData> & ExtraResourceFormProps<TModel, TFormData>;

function ResourceForm<TModel extends BasicModel, TFormData>({
  editResource,
  onCancelar,
  onSubmit,
  camposObrigatorios,
  formContent,
  generateFormData,
}: ResourceFormProps<TModel, TFormData>): React.ReactElement {
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

    const filtros: Array<[string, CampoObrigatorioValidator]> = Object.entries(camposObrigatorios);

    const missingList = filtros.filter(([campoKey, campoInfo]) => {
      if (campoInfo === undefined)
        return false;

      const fieldValue = parsedValues[campoKey];
      return !fieldValue || fieldValue === '';
    }).map(([_, campoInfo]) => {
      return campoInfo.label;
    });

    if (missingList.length > 0) {
      MySwal.fire({
        icon: 'error',
        title: 'Por favor, preencha todos os campos obrigatórios:',
        text: missingList.join(', '),
      });

      return;
    }

    const result = generateFormData(parsedValues);

    if (typeof result === 'string') {
      MySwal.fire({
        icon: 'error',
        title: 'Falha na validação:',
        text: result,
      });

      return;
    }

    onSubmit(result);
  }, [MySwal, onSubmit, camposObrigatorios, generateFormData]);

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
