import { Andamento, Ocorrencia } from "escolas-shared";

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

export const OcorrenciaHelper = {
  getPrazo,
  getUltimoAndamento,
};
