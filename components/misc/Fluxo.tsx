import { Andamento, Ocorrencia } from "escolas-shared";
import { StatusOcorrencia, TipoAndamento } from "escolas-shared/dist/common";
import React from 'react';

type FluxoProps = {
  ocorrencia: Ocorrencia & { andamentos: Andamento[] };
};

const Fluxo: React.FC<FluxoProps> = ({
  ocorrencia,
}) => {
  const content = React.useMemo(() => {
    const andamentos = ocorrencia.andamentos.sort((a1, a2) => {
      return (new Date(a1.createdAt) < new Date(a2.createdAt) ? -1 : 1) * -1; // DESC
    });

    const estadoNova: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.Recebido
        ? 'atual'
      : 'andado';

    const andamentoRejeitarNova: SetaEstado
      = andamentos.find((a) => a.tipo === TipoAndamento.EnvioParaAnalise) ? null
      : andamentos.find((a) => a.tipo === TipoAndamento.Cancelamento) ?? null;

    const estadoRejeitadoNova: EtapaEstado
      = andamentoRejeitarNova !== null ? 'atual' : null;

    const andamentoAprovar: SetaEstado
      = andamentos.find((a) => a.tipo === TipoAndamento.EnvioParaAnalise) ?? null;

    const andamentoRejeitarEmAnalise: SetaEstado
      = andamentoAprovar === null ? null
      : andamentos.find((a) => a.tipo === TipoAndamento.Cancelamento) ?? null;

    const estadoRejeitadoEmAnalise: EtapaEstado
      = andamentoRejeitarEmAnalise !== null ? 'atual' : null;

    const andamentoEncaminhar: SetaEstado
      = andamentos.find((a) => a.tipo === TipoAndamento.EnvioAoGestor) ?? null;

    const estadoEmAnalise: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.EmAnalise ? 'atual'
      : (andamentoRejeitarEmAnalise !== null || andamentoEncaminhar !== null) ? 'andado'
      : null;

    const andamentoResponder: SetaEstado
      = andamentos.find((a) => a.tipo === TipoAndamento.Resposta) ?? null;

    const andamentoSolicitarProrrogacao: SetaEstado
      = andamentos.find((a) => a.tipo === TipoAndamento.SolicitacaoDeProrrogacao) ?? null;

    const estadoAguardandoGestor: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.AguardandoGestor ? 'atual'
      : (andamentoResponder !== null || andamentoSolicitarProrrogacao !== null) ? 'andado'
      : null;

    const andamentoComunicarRelator: SetaEstado
      = andamentoResponder === null ? null
      : andamentos.find((a) => a.tipo === TipoAndamento.SolucaoInspecao) ?? null;

    const andamentoAprovarSolucao: SetaEstado
      = andamentos.find((a) => a.tipo === TipoAndamento.Solucao) ?? null;

    const estadoRespondido: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.Respondido ? 'atual'
      : (andamentoComunicarRelator !== null || andamentoAprovarSolucao !== null) ? 'andado'
      : null;

    const estadoInspecaoInLoco: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.SolucionadoInspecao ? 'atual' : null;

    const estadoSolucionado: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.Solucionado ? 'atual' : null;

    let andamentoProrrogacaoAprovada: SetaEstado = null;
    for (let idx = 0; idx < andamentos.length; idx++) {
      const curAndamento = andamentos[idx];

      if (curAndamento.tipo === TipoAndamento.EnvioAoGestor) {
        if (idx < andamentos.length - 1) { // não é o primeiro andamento cronologicamente (TEORICAMENTE sempre true)
          const prev = andamentos[idx + 1]; // andamento cronologicamente anterior
          if (prev.tipo === TipoAndamento.SolicitacaoDeProrrogacao) {
            andamentoProrrogacaoAprovada = curAndamento;
          }
        }
      }
    }

    const andamentoProrrogacaoNegada: SetaEstado
      = andamentoResponder !== null ? null
      : andamentos.find((a) => a.tipo === TipoAndamento.SolucaoInspecao) ?? null;

    const estadoSolicitandoProrrogacao: EtapaEstado
      = ocorrencia.status === StatusOcorrencia.SolicitandoProrrogacao ? 'atual'
      : andamentoSolicitarProrrogacao !== null ? 'andado'
      : null;

    return (
      <div className="px-8 pt-4 pb-8 max-w-full overflow-x-auto">
        <table className="border-collapse" cellSpacing={0} cellPadding={0}>
          <tbody>

            <tr>
              <Td><Etapa titulo="Nova" estado={estadoNova} /></Td>
              <Td><Seta dir="direita" label="Rejeitar" estado={andamentoRejeitarNova} /></Td>
              <Td><Fim titulo="Rejeitado" estado={estadoRejeitadoNova} /></Td>
            </tr>

            <tr>
              <Td><Seta dir="baixo" label="Aprovar" estado={andamentoAprovar} /></Td>
            </tr>

            <tr>
              <Td><Etapa titulo="Em Análise" estado={estadoEmAnalise} /></Td>
              <Td><Seta dir="direita" label="Rejeitar" estado={andamentoRejeitarEmAnalise} /></Td>
              <Td><Fim titulo="Rejeitado" estado={estadoRejeitadoEmAnalise} /></Td>
            </tr>

            <tr>
              <Td><Seta dir="baixo" label="Encaminhar" estado={andamentoEncaminhar} /></Td>
            </tr>

            <tr>
              <Td><Etapa titulo="Aguardando Gestor" estado={estadoAguardandoGestor} /></Td>
              <Td>
                <Seta dir="direita" label="Solicitar Prorrogação" estado={andamentoSolicitarProrrogacao} />
                <Seta dir="esquerda" label="Prorrogação Aprovada" estado={andamentoProrrogacaoAprovada} />
              </Td>
              <Td><Etapa titulo="Solicitando Prorrogação" estado={estadoSolicitandoProrrogacao} /></Td>
            </tr>

            <tr>
              <Td><Seta dir="baixo" label="Responder" estado={andamentoResponder} /></Td>
              <td></td>
              <Td><Seta dir="baixo" label="Prorrogação Negada" estado={andamentoProrrogacaoNegada} /></Td>
            </tr>

            <tr style={{ height: 1 }}>
              <Td rowSpan={2}>
                <Etapa titulo="Respondido" estado={estadoRespondido} />
              </Td>
              <Td className="pb-2">
                <Seta dir="direita" label="Comunicar Relator" estado={andamentoComunicarRelator} />
              </Td>
              <Td className="pb-2">
                <Fim titulo="Inspeção in-loco" estado={estadoInspecaoInLoco} />
              </Td>
            </tr>

            <tr>
              <Td>
                <Seta dir="direita" label="Aprovar" estado={andamentoAprovarSolucao} />
              </Td>
              <Td>
                <Fim titulo="Solucionado" estado={estadoSolucionado} />
              </Td>
            </tr>

          </tbody>
        </table>
      </div>
    );
  }, [ocorrencia]);

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
      <div className="flex items-center text-xs mr-5 mb-2">
        <div style={{ width: 24, height: 24 }}
          className="bg-red-200 border border-red-300" />&nbsp;
        Finalizado
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

type EtapaEstado = 'atual' | 'andado' | null;

function Etapa(props: {
  titulo: string;
  estado: EtapaEstado;
}) {
  const colorCss
    = props.estado === 'atual'
      ? 'bg-orange-100 border border-orange-300'
    : props.estado !== null // Andamento
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

type FimEstado = 'atual' | null;

function Fim(props: {
  titulo: string;
  estado: FimEstado;
}) {
  const colorCss = props.estado !== null
    ? 'bg-red-100 border-red-300'
    : 'bg-slate-100 border-gray-300';

  return (
    <div className={`p-4 text-xs text-center rounded-full border ${colorCss}`}>
      {props.titulo}
    </div>
  );
}

type SetaEstado = Andamento | null;

function Seta(props: {
  dir: 'baixo' | 'direita' | 'esquerda';
  label: string;
  estado: SetaEstado;
}) {
  const pipeColor = props.estado !== null
    ? 'bg-green-400'
    : 'bg-slate-300';

  const triangleColor = props.estado !== null
    ? 'var(--color-green-400)'
    : 'var(--color-slate-300)';

  const inner = props.dir === 'baixo' ? (
    <div className="relative text-xs text-slate-700 font-medium text-center text-slate-100">
      {props.label}

      <div className="absolute top-0 left-0 right-0 bottom-0 -my-0.5 flex justify-center">
        <div className="bg-white h-full" style={{ width: 4 }} />
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-slate-700">
        {props.label}
      </div>
    </div>
  ) : props.dir === 'direita' ? (
    <div className="relative text-xs text-slate-700 font-medium mb-1 text-center text-slate-100">
      {props.label}

      <div className="absolute top-0 left-0 right-0 bottom-0 -mb-1 -mx-0.5 flex items-center">
        <div className="bg-white w-full" style={{ height: 4 }} />
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-slate-700">
        {props.label}
      </div>
    </div>
  ) : (
    <div className="relative text-xs text-slate-700 font-medium mb-1 text-center text-slate-100">
      {props.label}

      <div className="absolute top-0 left-0 right-0 bottom-0 -mb-1 -mx-0.5 flex items-center">
        <div className="bg-white w-full" style={{ height: 4 }} />
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center text-slate-700">
        {props.label}
      </div>
    </div>
  );

  const before = props.dir === 'esquerda' ? (
    <div style={{
      width: '0',
      height: '0',
      borderTop: '12px solid transparent',
      borderBottom: '12px solid transparent',
      borderRight: `16px solid ${triangleColor}`,
    }} />
  ) : null;

  const after = props.dir === 'baixo' ? (
    <div style={{
      width: 0,
      height: 0,
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      borderTop: `16px solid ${triangleColor}`,
    }} />
  ) : props.dir === 'direita' ? (
    <div style={{
      width: '0',
      height: '0',
      borderTop: '12px solid transparent',
      borderBottom: '12px solid transparent',
      borderLeft: `16px solid ${triangleColor}`,
    }} />
  ) : null;

  const outerCss = props.dir === 'baixo'
    ? 'flex flex-col items-center mx-2'
    : 'flex items-center my-2';

  return (
    <div className={outerCss}>
      {before}

      <div className="grow relative">
        {props.dir === 'baixo'
          ? <PipeV color={pipeColor} />
          : <PipeH color={pipeColor} />}

        {props.label && (
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
            {inner}
          </div>
        )}
      </div>

      {after}
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
