import { Categoria } from "escolas-shared";
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
import { CreateCategoriaDto } from "../../lib/services/api-service";

export type CategoriaFormData = CreateCategoriaDto;

const camposObrigatorios: CampoObrigatorioMap<CategoriaFormData> = {
  titulo: { label: 'Título' },
  descricao: { label: 'Descrição' },
};

type CategoriaFormProps = {
  editCategoria: Categoria | null;
  onCancelar: () => void;
  onSubmit: (formData: CategoriaFormData) => void;
};

const CategoriaForm: React.FC<CategoriaFormProps> = ({
  editCategoria,
  onCancelar,
  onSubmit,
}) => {
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

    onSubmit({
      titulo: parsedValues['titulo'],
      descricao: parsedValues['descricao'],
    });
  }, [MySwal, onSubmit]);

  return (
    <Form onSubmit={onSubmitForm}>
      <div className="bg-slate-100 px-4 py-3">
        <FormSection header="Informações">
          <FormItem className="lg:w-8/12 px-4">
            <Label label="Título" htmlFor="i-titulo" />
            <Input htmlId="i-titulo" name="titulo" defaultValue={editCategoria?.titulo} />
          </FormItem>

          <FormItem className="lg:w-12/12 px-4">
            <Label label="Descrição (TODO textarea)" htmlFor="i-tipo" />
            <Input htmlId="i-descricao" name="descricao"
              defaultValue={editCategoria?.descricao} />
          </FormItem>
        </FormSection>
      </div>

      <div className="py-3 px-4 flex justify-between border-t border-slate-300">
        <Button className="uppercase" color="success">
          {editCategoria ? 'Salvar' : 'Cadastrar'}
        </Button>

        <Button className="uppercase" color="danger" onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(CategoriaForm);
