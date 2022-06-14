import type { NextPage } from 'next';
import Button from '../../components/ui/buttons/Button';
import CardSettings from '../../components/ui/cards/CardSettings';
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
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="i-nome"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  id="i-nome"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
                    duration-150"
                  placeholder="Nome completo"
                />
              </div>
            </div>

            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="i-email"
                >
                  E-mail
                </label>
                <input
                  type="text"
                  id="i-email"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
                    duration-150"
                  placeholder="E-mail"
                />
              </div>
            </div>

          </div>

          <hr className="mt-6 border-b-1 border-slate-300" />

          <h6 className="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">Localização</h6>
          <div className="flex flex-wrap">

            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="i-endereco"
                >
                  Endereço
                </label>
                <input
                  type="text"
                  id="i-endereco"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
                    duration-150"
                  placeholder="Endereço"
                />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="i-cidade"
                >
                  Cidade
                </label>
                <input
                  type="text"
                  id="i-cidade"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
                    duration-150"
                  placeholder="Cidade"
                />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="i-estado"
                >
                  Estado
                </label>
                <input
                  type="text"
                  id="i-estado"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
                    duration-150"
                  placeholder="Estado"
                />
              </div>
            </div>

            <div className="w-full lg:w-4/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-slate-600 text-xs font-bold mb-2"
                  htmlFor="i-cep"
                >
                  CEP
                </label>
                <input
                  type="text"
                  id="i-cep"
                  className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
                    text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
                    duration-150"
                  placeholder="CEP"
                />
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
