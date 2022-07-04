import { Escola } from "escolas-shared";
import React from 'react';
import FormItem from "../ui/forms/FormItem";
import FormSection from "../ui/forms/FormSection";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";
import ReactSelect from "react-select";
import { SelectUtils } from "../../lib/ui-utils";
import EscolaEnderecoForm from "./EscolaEnderecoForm";
import { CreateEscolaDto } from "../../lib/services/api-service";
import ResourceForm, { BasicResourceFormProps } from "../resources/ResourceForm";

type EscolaFormProps = BasicResourceFormProps<Escola, CreateEscolaDto>;

const EscolaForm: React.FC<EscolaFormProps> = (props) => {
  const editEscola = props.editResource;

  return (
    <ResourceForm
      {...props}
      camposObrigatorios={{
        nome: { label: 'Nome' },
        tipo: { label: 'Tipo' },
        status: { label: 'Status' },
      }}
      generateFormData={(parsedValues) => ({
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
      })}
      formContent={(<>
        <FormSection header="Informações Básicas">
          <FormItem className="lg:w-8/12 px-4">
            <Label label="Nome" htmlFor="i-nome" />
            <Input htmlId="i-nome" name="nome" defaultValue={editEscola?.nome} />
          </FormItem>

          <FormItem className="lg:w-4/12 px-4">
            <Label label="Tipo" htmlFor="i-tipo" />
            <ReactSelect
              id="i-tipo"
              options={SelectUtils.tipoOptions}
              name="tipo"
              defaultValue={
                editEscola
                  ? SelectUtils.tipoOptions.find(opt => opt.value === editEscola.tipo)
                  : undefined
              }
            />
          </FormItem>

          <FormItem className="lg:w-8/12 px-4">
            <Label label="Modalidades" htmlFor="i-modalidades" />
            <Input htmlId="i-modalidades" name="modalidades"
              defaultValue={editEscola?.modalidades} />
          </FormItem>

          <FormItem className="lg:w-4/12 px-4">
            <Label label="Status" htmlFor="i-status" />
            <ReactSelect
              id="i-status"
              options={SelectUtils.statusOptions}
              name="status"
              defaultValue={
                editEscola
                  ? SelectUtils.statusOptions.find(opt => opt.value === editEscola.status)
                  : undefined
              }
            />
          </FormItem>

          <FormItem className="lg:w-6/12 px-4">
            <Label label="Endereço do QEdu" htmlFor="i-qeduUrl" />
            <Input htmlId="i-qeduUrl" name="qeduUrl"
              defaultValue={editEscola?.qeduUrl ?? undefined} />
          </FormItem>
        </FormSection>

        <FormSection header="Direção">
          <FormItem className="lg:w-6/12 px-4">
            <Label label="Nome do Diretor" htmlFor="i-diretorNome" />
            <Input htmlId="i-diretorNome" name="diretorNome"
              defaultValue={editEscola?.diretorNome ?? undefined} />
          </FormItem>

          <FormItem className="lg:w-6/12 px-4">
            <Label label="E-mail do Diretor" htmlFor="i-diretorEmail" />
            <Input htmlId="i-diretorEmail" name="diretorEmail"
              defaultValue={editEscola?.diretorEmail ?? undefined} />
          </FormItem>
        </FormSection>

        <EscolaEnderecoForm editEscola={editEscola} />
      </>)}
    />
  );
};

export default React.memo(EscolaForm);
