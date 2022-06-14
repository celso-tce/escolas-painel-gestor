import type { NextPage } from 'next';
import Button from '../../components/ui/buttons/Button';
import CardSettings from '../../components/ui/cards/CardSettings';
import Input from '../../components/ui/inputs/Input';
import Label from '../../components/ui/inputs/Label';
import MainLayout from '../../components/ui/layouts/MainLayout';

const Forms: NextPage = () => {
  const leftPanel = (
    <CardSettings header="Teste Formulário">
      <div className="flex-auto px-4 lg:px-10 pb-6">
        <form>
          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">Informações</h6>

          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <Label label="Nome completo" htmlFor="i-nome" />
                <Input htmlId="i-nome" placeholder="Nome completo" />
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <Label label="E-mail" htmlFor="i-email" />
                <Input htmlId="i-email" placeholder="E-mail" />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-slate-300" />

          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">Localização</h6>

          <div className="flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <Label label="Endereço" htmlFor="i-endereco" />
                <Input htmlId="i-endereco" placeholder="Endereço" />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <Label label="Cidade" htmlFor="i-cidade" />
                <Input htmlId="i-cidade" placeholder="Cidade" />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <Label label="Estado" htmlFor="i-estado" />
                <Input htmlId="i-estado" placeholder="Estado" />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <Label label="CEP" htmlFor="i-cep" />
                <Input htmlId="i-cep" placeholder="CEP" />
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-slate-300" />

          <div className="mt-6">
            <Button className="uppercase">Enviar</Button>
          </div>
        </form>
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
