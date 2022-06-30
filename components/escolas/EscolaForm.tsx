import { Escola } from "escolas-shared";
import React from 'react';
import Button from "../ui/buttons/Button";
import Form from "../ui/forms/Form";
import FormItem from "../ui/forms/FormItem";
import FormSection from "../ui/forms/FormSection";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";
import ReactSelect from "react-select";
import { CampoObrigatorioMap, SelectUtils } from "../../lib/ui-utils";
import EscolaEnderecoForm from "./EscolaEnderecoForm";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CreateEscolaDto } from "../../lib/services/api-service";

export type EscolaFormData = CreateEscolaDto;

const camposObrigatorios: CampoObrigatorioMap<EscolaFormData> = {
  nome: { label: 'Nome' },
  tipo: { label: 'Tipo' },
  status: { label: 'Status' },
};

type EscolaFormProps = {
  editEscola: Escola | null;
  onCancelar: () => void;
  onSubmit: (formData: EscolaFormData) => void;
};

const EscolaForm: React.FC<EscolaFormProps> = ({
  editEscola,
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
    });
  }, [MySwal, onSubmit]);

  return (
    <Form onSubmit={onSubmitForm}>
      <div className="bg-slate-100 px-4 py-3">
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
      </div>

      <div className="py-3 px-4 flex justify-between border-t border-slate-300">
        <Button className="uppercase" color="success">
          {editEscola ? 'Salvar' : 'Cadastrar'}
        </Button>

        <Button className="uppercase" color="danger" onClick={onCancelar}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(EscolaForm);
