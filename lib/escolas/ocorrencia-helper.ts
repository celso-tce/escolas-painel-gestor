import { Andamento, Ocorrencia } from "escolas-shared";
import { DateTime } from "luxon";

export const limiteProrrogacaoDias = 10; // TODO pegar isso de algum banco de configurações

function getPrazo(ocorrencia: Ocorrencia & { andamentos: Andamento[] }): Date | null {
  const ultimoAndamento = getUltimoAndamento(ocorrencia);

  if (ultimoAndamento === null)
    return null;

  return ultimoAndamento.prazoFinal;
}

function getUltimoAndamento(ocorrencia: Ocorrencia & { andamentos: Andamento[] }): Andamento | null {
  if (ocorrencia.andamentos.length === 0)
    return null;

  return ocorrencia.andamentos.reduce((prev, cur) => {
    return cur.id > prev.id ? cur : prev;
  });
}

export type SituacaoPrazo = 'erroneo' | 'normal' | 'atraso' | 'atraso-prorrogavel';

function getSituacaoPrazo(ocorrencia: Ocorrencia & { andamentos: Andamento[] }): SituacaoPrazo {
  const andamento = getUltimoAndamento(ocorrencia);

  if (andamento === null) {
    console.error(`Esta ocorrência não possui andamento mas se encontra nesse status?`);
    console.error(ocorrencia);
    return 'erroneo';
  }

  const prazo = andamento.prazoFinal;

  if (prazo === null) {
    console.error(`Esta ocorrência não possui prazo mas se encontra nesse status?`);
    console.error(ocorrencia);
    return 'erroneo';
  }

  const isAtrasada = DateTime.fromJSDate(new Date(prazo)).diffNow().milliseconds < 0;

  if (!isAtrasada) {
    return 'normal';
  }

  const diffDias = DateTime.fromJSDate(prazo).diffNow('days').days;
  const diffDiasAbsolute = Math.abs(diffDias); // converte para um número POSITIVO

  if (diffDiasAbsolute > limiteProrrogacaoDias) { // já passou do limite para prorrogação
    return 'atraso';
  }

  return 'atraso-prorrogavel';
}

export const OcorrenciaHelper = {
  getPrazo,
  getUltimoAndamento,
  getSituacaoPrazo,
};
