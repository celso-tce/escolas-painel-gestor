import { Ocorrencia } from "escolas-shared";
import React from 'react';
import { ConfirmSwalDialog } from "../../../lib/types";
import { ApiServiceContext } from "../../../pages/_app";
import Button from "../../ui/buttons/Button";
import Form from "../../ui/forms/Form";
import FormSection from "../../ui/forms/FormSection";
import Input from "../../ui/inputs/Input";
import Label from "../../ui/inputs/Label";

type FormFinalizarOcorrenciaProps = {
  ocorrencia: Ocorrencia;
  onFinish: (error?: any) => void;
  onClose: () => void;
  showConfirmSwalDialog: (args: ConfirmSwalDialog) => void;
};

type Opcao = 'solucionar' | 'comunicar-inspecao';

const FormFinalizarOcorrencia: React.FC<FormFinalizarOcorrenciaProps> = ({
  ocorrencia,
  onFinish,
  onClose,
  showConfirmSwalDialog,
}) => {
  const [opcao, setOpcao] = React.useState<Opcao>();

  const apiService = React.useContext(ApiServiceContext);

  const finalizar = React.useCallback((mensagem: string) => {
    showConfirmSwalDialog({
      title: 'Essa é uma operação permanente.',
      text: 'Tem certeza que deseja finalizar esta ocorrência?',
      onConfirm: () => {
        const promise = opcao === 'solucionar'
          ? apiService.solucionarOcorrencia({ ocorrenciaId: ocorrencia.id, mensagem })
          : apiService.solucionarOcorrenciaInspecao({ ocorrenciaId: ocorrencia.id, mensagem });

        promise.then((result) => {
          if (result.type === 'error')
            throw result.message;

          onFinish();
        }).catch((err) => {
          onFinish(err);
        });
      },
      onCancel: () => {},
    });
  }, [apiService, opcao]);

  if (opcao !== undefined) {
    return (
      <Form
        className="flex flex-wrap items-end"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const fieldValues = Object.fromEntries(formData.entries());
          const { mensagem } = fieldValues;

          finalizar(mensagem.toString());
        }}
      >
        <div className="text-slate-500 text-sm w-full mb-1">
          {opcao === 'solucionar' ? (<>
            A solução foi aprovada.
          </>) : (<>
            Relator deve ser informado para inspeção in-loco.
          </>)}
        </div>

        <FormSection className="w-full lg:w-8/12 pr-4 mb-4">
          <Label htmlFor="i-mensagem" label="Mensagem" />
          <Input htmlId="i-mensagem" name="mensagem" required />
        </FormSection>

        <div className="flex lg:w-4/12 mb-4">
          <Button className="grow mr-1" color="success">Finalizar</Button>
          <Button className="grow" onClick={() => setOpcao(undefined)}>Cancelar</Button>
        </div>
      </Form>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch">
      <div className="pr-2 pb-2 sm:w-4/12">
        <Button
          color="success"
          className="w-full h-full"
          onClick={() => setOpcao('solucionar')}
        >
          A solução foi aprovada
          <br />(Finalizar ocorrência)
        </Button>
      </div>

      <div className="pr-2 pb-2 sm:w-4/12">
        <Button
          color="success"
          className="w-full h-full"
          onClick={() => setOpcao('comunicar-inspecao')}
        >
          Relator deve ser informado para inspeção in-loco
          <br />(Finalizar ocorrência)
        </Button>
      </div>

      <div className="pb-2 sm:w-4/12">
        <Button color="primary" className="w-full" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default React.memo(FormFinalizarOcorrencia);
