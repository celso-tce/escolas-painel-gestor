import { EscolaTipo, StatusOcorrencia, UserRole } from "escolas-shared";

export const escolaTipos: EscolaTipo[] = [
  'MUNICIPAL',
  'ESTADUAL',
  'FEDERAL',
];

export const userRoles: UserRole[] = [
  'ADMIN',
  'OUVIDORIA',
  'INSPETORIA',
  'GESTOR',
];

export const statusOcorrencia: string[] = [
  "RECEBIDO",
  "CANCELADO",
  "EM ANALISE",
  "AGUARDANDO GESTOR",
  "SOLICITANDO PRORROGACAO",
  "RESPONDIDO",
  "SOLUCIONADO INSPECAO",
  "SOLUCIONADO",
];
