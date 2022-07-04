import { Categoria } from "escolas-shared";
import React from 'react';
import { CreateCategoriaDto } from "../../lib/services/api-service";
import ResourceForm, { BasicResourceFormProps } from "../resources/ResourceForm";
import FormItem from "../ui/forms/FormItem";
import FormSection from "../ui/forms/FormSection";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";

type CategoriaFormProps = BasicResourceFormProps<Categoria, CreateCategoriaDto>;

const CategoriaForm: React.FC<CategoriaFormProps> = (props) => {
  return (
    <ResourceForm
      {...props}
      camposObrigatorios={{
        titulo: { label: 'Título' },
        descricao: { label: 'Descrição' },
      }}
      generateFormData={(parsedValues) => ({
        titulo: parsedValues['titulo'],
        descricao: parsedValues['descricao'],
      })}
      formContent={(<>
        <FormSection header="Informações">
          <FormItem className="lg:w-8/12 px-4">
            <Label label="Título" htmlFor="i-titulo" />
            <Input htmlId="i-titulo" name="titulo" defaultValue={props.editResource?.titulo} />
          </FormItem>

          <FormItem className="lg:w-12/12 px-4">
            <Label label="Descrição (TODO textarea)" htmlFor="i-tipo" />
            <Input htmlId="i-descricao" name="descricao"
              defaultValue={props.editResource?.descricao} />
          </FormItem>
        </FormSection>
      </>)}
    />
  );
};

export default React.memo(CategoriaForm);
