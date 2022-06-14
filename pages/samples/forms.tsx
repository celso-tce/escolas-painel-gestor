import type { NextPage } from 'next';
import Button from '../../components/ui/buttons/Button';
import CardSettings from '../../components/ui/cards/CardSettings';
import Form from '../../components/ui/forms/Form';
import FormItem from '../../components/ui/forms/FormItem';
import FormSection from '../../components/ui/forms/FormSection';
import Input from '../../components/ui/inputs/Input';
import Label from '../../components/ui/inputs/Label';
import MainLayout from '../../components/ui/layouts/MainLayout';

const Forms: NextPage = () => {
  const leftPanel = (
    <CardSettings header="Teste Formulário">
      <div className="flex-auto px-4 lg:px-10 pb-6">
        <Form>
          <FormSection header="Informações">
            <FormItem className="lg:w-6/12 px-4">
              <Label label="Nome completo" htmlFor="i-nome" />
              <Input htmlId="i-nome" placeholder="Nome completo" />
            </FormItem>

            <FormItem className="lg:w-6/12 px-4">
              <Label label="E-mail" htmlFor="i-email" />
              <Input htmlId="i-email" placeholder="E-mail" />
            </FormItem>
          </FormSection>

          <hr className="mt-6 border-b-1 border-slate-300" />

          <FormSection header="Localização">
            <FormItem className="px-4">
              <Label label="Endereço" htmlFor="i-endereco" />
              <Input htmlId="i-endereco" placeholder="Endereço" />
            </FormItem>

            <FormItem className="lg:w-4/12 px-4">
              <Label label="Cidade" htmlFor="i-cidade" />
              <Input htmlId="i-cidade" placeholder="Cidade" />
            </FormItem>

            <FormItem className="lg:w-4/12 px-4">
              <Label label="Estado" htmlFor="i-estado" />
              <Input htmlId="i-estado" placeholder="Estado" />
            </FormItem>

            <FormItem className="lg:w-4/12 px-4">
              <Label label="CEP" htmlFor="i-cep" />
              <Input htmlId="i-cep" placeholder="CEP" />
            </FormItem>
          </FormSection>

          <hr className="mt-6 border-b-1 border-slate-300" />

          <div className="mt-6">
            <Button className="uppercase">Enviar</Button>
          </div>
        </Form>
      </div>
    </CardSettings>
  );

  return (
    <MainLayout currentPage="Index">
      <div className="relative flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          {leftPanel}
        </div>
      </div>
    </MainLayout>
  );
}

export default Forms;
