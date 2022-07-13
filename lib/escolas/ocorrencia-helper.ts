import { Andamento, Ocorrencia } from "escolas-shared";

function getPrazo(ocorrencia: Ocorrencia & { andamentos: Andamento[] }): Date | null {
  if (ocorrencia.andamentos.length === 0)
    return null;

  const ultimoAndamento = ocorrencia.andamentos.reduce((prev, cur) => {
    return cur.id > prev.id ? cur : prev;
  });

  return ultimoAndamento.prazoFinal;
}

export const OcorrenciaHelper = {
  getPrazo,
};
