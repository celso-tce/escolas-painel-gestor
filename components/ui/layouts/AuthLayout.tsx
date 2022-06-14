import React from 'react';
import Button from '../buttons/Button';

type AuthLayoutProps = {};

const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
  const form = (
    <form>
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
      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-slate-600 text-xs font-bold mb-2"
          htmlFor="i-password"
        >
          Senha
        </label>
        <input
          type="password"
          id="i-password"
          className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded
            text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all
            duration-150"
          placeholder="Senha"
        />
      </div>
      <div className="text-center mt-6">
        <Button className="w-full uppercase">Entrar</Button>
      </div>
    </form>
  );

  const panel = (
    <div
      className="relative flex flex-col min-w-0 break-words w-full shadow-md mb-6 rounded-lg
        bg-slate-200 border-0"
    >
      <div className="flex-auto px-4 lg:px-10 py-10">
        <div className="text-slate-400 text-center mb-3 font-bold text-xs">
          Entrar com credenciais
        </div>
        {form}
      </div>
    </div>
  );

  return (
    <main>
      <section className="relative w-full h-full py-40 min-h-screen bg-slate-800">
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              {panel}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default React.memo(AuthLayout);
