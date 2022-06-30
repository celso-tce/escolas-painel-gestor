import { Escola } from "escolas-shared";
import React from 'react';
import { ReactUtils } from "../../lib/ui-utils";
import { CEPServiceContext } from "../../pages/_app";
import Button from "../ui/buttons/Button";
import FormItem from "../ui/forms/FormItem";
import FormSection from "../ui/forms/FormSection";
import Input from "../ui/inputs/Input";
import Label from "../ui/inputs/Label";

type EscolaEnderecoFormProps = {
  editEscola: Escola | null;
};

const EscolaEnderecoForm: React.FC<EscolaEnderecoFormProps> = ({ editEscola }) => {
  const [carregandoCep, setCarregandoCep] = React.useState(false);

  const cepInputRef = React.useRef<HTMLInputElement>(null);
  const cidadeInputRef = React.useRef<HTMLInputElement>(null);
  const enderecoInputRef = React.useRef<HTMLInputElement>(null);
  const bairroInputRef = React.useRef<HTMLInputElement>(null);
  const complementoInputRef = React.useRef<HTMLInputElement>(null);

  const cepService = React.useContext(CEPServiceContext);

  const onCarregarCep = React.useCallback(() => {
    const cepInput = cepInputRef.current;
    const cep = cepInput?.value.trim();

    if (!cep)
      return;

    setCarregandoCep(true);

    cepService.loadCep(cep).then(result => {
      if (result.type === 'error') {
        // TODO handle error
        return;
      }

      const payload = result.payload;

      ReactUtils.assignToInputRef(cidadeInputRef, payload.localidade);
      ReactUtils.assignToInputRef(enderecoInputRef, payload.logradouro);
      ReactUtils.assignToInputRef(bairroInputRef, payload.bairro);
      ReactUtils.assignToInputRef(complementoInputRef, payload.complemento);
    }).finally(() => {
      setCarregandoCep(false);
    });
  }, [cepService]);

  return (
    <FormSection header="Localização">
      <FormItem className="px-4">
        <Label label="CEP" htmlFor="i-cep" />
        <div className="flex space-x-4">
          <Input htmlId="i-cep" name="cep" disabled={carregandoCep}
            placeholder="Apenas números" inputRef={cepInputRef}
            defaultValue={editEscola?.postalCode ?? undefined} />

          <Button onClick={onCarregarCep} disabled={carregandoCep}>
            Carregar&nbsp;dados
          </Button>
        </div>
      </FormItem>

      <FormItem className="lg:w-4/12 px-4">
        <Label label="Cidade" htmlFor="i-cidade" />
        <Input htmlId="i-cidade" name="cidade" disabled={carregandoCep}
          inputRef={cidadeInputRef} defaultValue={editEscola?.cidade ?? undefined} />
      </FormItem>

      <FormItem className="lg:w-8/12 px-4">
        <Label label="Endereço" htmlFor="i-endereco" />
        <Input htmlId="i-endereco" name="endereco" disabled={carregandoCep}
          inputRef={enderecoInputRef} defaultValue={editEscola?.endereco ?? undefined} />
      </FormItem>

      <FormItem className="lg:w-6/12 px-4">
        <Label label="Bairro" htmlFor="i-bairro" />
        <Input htmlId="i-bairro" name="bairro" disabled={carregandoCep}
          inputRef={bairroInputRef} defaultValue={editEscola?.bairro ?? undefined} />
      </FormItem>

      <FormItem className="lg:w-6/12 px-4">
        <Label label="Complemento" htmlFor="i-complemento" />
        <Input htmlId="i-complemento" name="complemento" disabled={carregandoCep}
          inputRef={complementoInputRef} defaultValue={editEscola?.complemento ?? undefined} />
      </FormItem>
    </FormSection>
  );
};

export default React.memo(EscolaEnderecoForm);
