import React from 'react';

type FluxoProps = {};

const Fluxo: React.FC<FluxoProps> = (props) => {
  const content = (
    <div className="px-8 pt-4 pb-8 max-w-full overflow-x-auto">
      <table className="border-collapse" cellSpacing={0} cellPadding={0}>
        <tbody>

          <tr>
            <Td><Etapa titulo="Nova" andado /></Td>
            <Td><Direita label="Rejeitar" /></Td>
            <Td><Fim titulo="Rejeitado" /></Td>
          </tr>

          <tr>
            <Td><Abaixo label="Aprovar" andado /></Td>
          </tr>

          <tr>
            <Td><Etapa titulo="Em Análise" andado /></Td>
            <Td><Direita label="Rejeitar" /></Td>
            <Td><Fim titulo="Rejeitado" /></Td>
          </tr>

          <tr>
            <Td><Abaixo label="Encaminhar" andado /></Td>
          </tr>

          <tr>
            <Td><Etapa titulo="Aguardando Gestor" atual /></Td>
            <Td>
              <Direita label="Solicitar Prorrogação" />
              <Esquerda label="Prorrogação Aprovada" />
            </Td>
            <Td><Etapa titulo="Solicitando Prorrogação" /></Td>
          </tr>

          <tr>
            <Td><Abaixo label="Responder" /></Td>
            <td></td>
            <Td><Abaixo label="Prorrogação Negada" /></Td>
          </tr>

          <tr style={{ height: 1 }}>
            <Td rowSpan={2}>
              <Etapa titulo="Respondido" />
            </Td>
            <Td className="pb-2">
              <Direita label="Comunicar Relator" />
            </Td>
            <Td className="pb-2">
              <Fim titulo="Inspeção in-loco" />
            </Td>
          </tr>

          <tr>
            <Td>
              <Direita label="Aprovar" />
            </Td>
            <Td>
              <Fim titulo="Solucionado" />
            </Td>
          </tr>

        </tbody>
      </table>
    </div>
  );

  const legenda = (
    <div className="flex flex-wrap px-4 mt-4">
      <div className="flex items-center text-xs mr-5 mb-2">
        <div style={{ width: 24, height: 24 }}
          className="bg-slate-200 border border-slate-300" />&nbsp;
        Não Percorrido
      </div>
      <div className="flex items-center text-xs mr-5 mb-2">
        <div style={{ width: 24, height: 24 }}
          className="bg-green-200 border border-green-300" />&nbsp;
        Percorrido
      </div>
      <div className="flex items-center text-xs mr-5 mb-2">
        <div style={{ width: 24, height: 24 }}
          className="bg-orange-200 border border-orange-300" />&nbsp;
        Estado Atual
      </div>
    </div>
  );

  return (
    <div className="flex flex-col bg-white rounded">
      {legenda}
      {content}
    </div>
  );
};

function Td(props: {
  children: React.ReactNode;
  className?: string;
  rowSpan?: number;
}) {
  return (
    <td
      className={`h-full ${props.className ?? ''}`}
      rowSpan={props.rowSpan}
    >
      {props.children}
    </td>
  );
}

function Etapa(props: {
  titulo: string;
  andado?: true;
  atual?: true;
}) {
  const colorCss =
    props.atual
      ? 'bg-orange-100 border border-orange-300'
    : props.andado
      ? 'bg-green-100 border border-green-300'
    : 'bg-gray-100 border border-slate-300';

  return (
    <div
      className={`h-full flex flex-wrap p-6 text-sm justify-center break-words items-center
        ${colorCss}`}
    >
      {props.titulo}
    </div>
  );
}

function Fim(props: {
  titulo: string;
  atual?: boolean;
}) {
  const colorCss = props.atual ? 'bg-red border-red-300' : 'bg-slate-100 border-gray-300';

  return (
    <div className={`p-4 text-xs text-center rounded-full border ${colorCss}`}>
      {props.titulo}
    </div>
  );
}

function Abaixo(props: {
  label?: string;
  andado?: true;
}) {
  const pipeColor = props.andado ? 'bg-green-500' : 'bg-slate-300';
  const triangleColor = props.andado ? 'var(--color-green-500)' : 'var(--color-slate-300)';

  return (
    <div className="flex flex-col items-center mx-2">
      <div className="grow relative">
        <PipeV color={pipeColor} />

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative text-xs text-slate-700 font-medium text-center text-slate-100">
                  {props.label}

                  <div className="absolute top-0 left-0 right-0 bottom-0 -my-0.5 flex justify-center">
                    <div className="bg-white h-full" style={{ width: 4 }} />
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
        borderTop: `16px solid ${triangleColor}`,
      }} />
    </div>
  );
}

function Direita(props: {
  label?: string;
  andado?: true;
}) {
  const pipeColor = props.andado ? 'bg-green-500' : 'bg-slate-300';
  const triangleColor = props.andado ? 'var(--color-green-500)' : 'var(--color-slate-300)';

  return (
    <div className="flex items-center my-2">
      <div className="grow relative">
        <PipeH color={pipeColor} />

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative text-xs text-slate-700 font-medium mb-1 text-center text-slate-100">
                  {props.label}

                  <div className="absolute top-0 left-0 right-0 bottom-0 -mb-1 -mx-0.5 flex items-center">
                    <div className="bg-white w-full" style={{ height: 4 }} />
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
        borderLeft: `16px solid ${triangleColor}`,
      }} />
    </div>
  );
}

function Esquerda(props: {
  label?: string;
  andado?: true;
}) {
  const pipeColor = props.andado ? 'bg-green-500' : 'bg-slate-300';
  const triangleColor = props.andado ? 'var(--color-green-500)' : 'var(--color-slate-300)';

  return (
    <div className="flex items-center my-2">
      <div style={{
        width: '0',
        height: '0',
        borderTop: '12px solid transparent',
        borderBottom: '12px solid transparent',
        borderRight: `16px solid ${triangleColor}`,
      }} />

      <div className="grow relative">
        <PipeH color={pipeColor} />

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
              <div className="relative text-xs text-slate-700 font-medium mb-1 text-center text-slate-100">
                  {props.label}

                  <div className="absolute top-0 left-0 right-0 bottom-0 -mb-1 -mx-0.5 flex items-center">
                    <div className="bg-white w-full" style={{ height: 4 }} />
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

function PipeV(props: { color: string }) {
  return <div className={`${props.color}`} style={{ width: 4, minHeight: 100 }} />;
}

function PipeH(props: { color: string }) {
  return <div className={`${props.color}`} style={{ height: 4, minWidth: 180 }} />;
}

export default React.memo(Fluxo);
