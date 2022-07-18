import React from 'react';
import type { NextPage } from 'next';
import MainLayout from '../../components/ui/layouts/MainLayout';
import CardSettings from "../../components/ui/cards/CardSettings";

const FluxoPage: NextPage = () => {
  const content = (
    <div className="p-8 max-w-full overflow-x-auto">
      <table className="border-collapse" cellSpacing={0} cellPadding={0}>
        <tbody>

          <tr>
            <Td><Etapa titulo="Nova" /></Td>
            <Td><Direita label="Rejeitar" /></Td>
            <Td><Fim titulo="Rejeitado" /></Td>
          </tr>

          <tr>
            <Td><Abaixo label="Aprovar" /></Td>
          </tr>

          <tr>
            <Td><Etapa titulo="Em Análise" /></Td>
            <Td><Direita label="Rejeitar" /></Td>
            <Td><Fim titulo="Rejeitado" /></Td>
          </tr>

          <tr>
            <Td><Abaixo label="Encaminhar" /></Td>
          </tr>

          <tr>
            <Td><Etapa titulo="Aguardando Gestor" /></Td>
            <Td>
              <Direita label="Solicitar Prorrogação" />
              <Esquerda label="Prorrogação Aprovada" />
            </Td>
            <Td><Etapa titulo="Solicitando Prorrogação" /></Td>
            <Td><Direita label="Prorrogação Negada" /></Td>
            <Td>
              <Fim titulo="Inspeção in-loco" />
            </Td>
          </tr>

          <tr>
            <Td><Abaixo label="Responder" /></Td>
          </tr>

          <tr style={{ height: 1 }}>
            <Td rowSpan={2}>
              <Etapa titulo="Respondido" />
            </Td>
            <Td className="py-1">
              <Direita label="Aprovar" />
            </Td>
            <Td className="py-1">
              <Fim titulo="Aprovado" />
            </Td>
          </tr>

          <tr>
            <Td className="py-1">
              <Direita label={'Comunicar\nRelator'} />
            </Td>
            <Td className="py-1">
              <Fim titulo="Inspeção in-loco" />
            </Td>
          </tr>

        </tbody>
      </table>
    </div>
  );

  return (
    <MainLayout currentPage="Fluxo">
      <div className="relative">
        <CardSettings>
          {content}
        </CardSettings>
      </div>
    </MainLayout>
  );
};

function Td(props: { children: React.ReactNode; className?: string; rowSpan?: number }) {
  return (
    <td
      className={`h-full ${props.className ?? ''}`}
      rowSpan={props.rowSpan}
    >
      {props.children}
    </td>
  );
}

function Etapa(props: { titulo: string }) {
  return (
    <div
      className="h-full flex flex-wrap p-6 bg-orange-100 border border-orange-300 text-sm
        justify-center break-words items-center"
    >
      {props.titulo}
    </div>
  );
}

function Fim(props: { titulo: string }) {
  return (
    <div className="p-4 bg-red-100 border border-red-300 text-xs text-center rounded-full">
      {props.titulo}
    </div>
  );
}

function Abaixo(props: { label?: string }) {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="grow relative">
        <PipeV />

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative text-xs text-slate-700 font-bold text-center text-slate-100">
                  {props.label}

                  <div className="absolute top-0 left-0 right-0 bottom-0 -mx-0.5 flex items-center">
                    <div className="bg-slate-100 w-full" style={{ height: 18 }} />
                  </div>

                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-slate-700">
                    {props.label}
                  </div>
              </div>

          </div>
        )}
      </div>

      <div style={{
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderTop: '16px solid var(--color-green-500)',
      }} />
    </div>
  );
}

function Direita(props: { label?: string }) {
  return (
    <div className="flex items-center my-2">
      <div className="grow relative">
        <PipeH />

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative text-xs text-slate-700 font-bold mb-1 text-center text-slate-100">
                  {props.label}

                  <div className="absolute top-0 left-0 right-0 bottom-0 -mb-1 -mx-0.5 flex items-center">
                    <div className="bg-slate-100 w-full" style={{ height: 4 }} />
                  </div>

                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-slate-700">
                    {props.label}
                  </div>
              </div>

          </div>
        )}
      </div>

      <div style={{
        width: '0',
        height: '0',
        borderTop: '12px solid transparent',
        borderBottom: '12px solid transparent',
        borderLeft: '16px solid var(--color-green-500)',
      }} />
    </div>
  );
}

function Esquerda(props: { label?: string }) {
  return (
    <div className="flex items-center my-2">
      <div style={{
        width: '0',
        height: '0',
        borderTop: '12px solid transparent',
        borderBottom: '12px solid transparent',
        borderRight: '16px solid var(--color-green-500)',
      }} />

      <div className="grow relative">
        <PipeH />

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative text-xs text-slate-700 font-bold mb-1 text-center text-slate-100">
                  {props.label}

                  <div className="absolute top-0 left-0 right-0 bottom-0 -mb-1 -mx-0.5 flex items-center">
                    <div className="bg-slate-100 w-full" style={{ height: 4 }} />
                  </div>

                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-slate-700">
                    {props.label}
                  </div>
              </div>

          </div>
        )}
      </div>
    </div>
  );
}

function PipeV() {
  return <div className="bg-green-500" style={{ width: 4, minHeight: 100 }} />;
}

function PipeH() {
  return <div className="bg-green-500" style={{ height: 4, minWidth: 180 }} />;
}

export default FluxoPage;
