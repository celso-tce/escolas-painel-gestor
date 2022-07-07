import { UserRole } from "escolas-shared";

export enum ActionPermission {
  LISTAR_OCORRENCIA_RECEBIDO,
  REJEITAR_OCORRENCIA_RECEBIDO,
  APROVAR_OCORRENCIA_RECEBIDO,
  VINCULAR_OCORRENCIA_RECEBIDO,
  LISTAR_OCORRENCIA_EM_ANALISE,
  REJEITAR_OCORRENCIA_EM_ANALISE,
  ENCAMINHAR_OCORRENCIA_EM_ANALISE,
  LISTAR_OCORRENCIAS_AGUARDANDO_GESTOR,
  // SOLICITAR_PRORROGACAO_PRAZO_AGUARDANDO_GESTOR,
  RESPONDER_OCORRENCIA_AGUARDANDO_GESTOR,
  LISTAR_OCORRENCIAS_RESPONDIDO,
  COMUNICAR_IN_LOCO_OCORRENCIA_RESPONDIDO,
  APROVAR_SOLUCAO_OCORRENCIA_RESPONDIDO,
}

export type PermissionMatrix = Record<keyof typeof ActionPermission, UserRole[]>;

export type PermissionDescriptionMap = Record<keyof typeof ActionPermission, {
  label: string;
  description?: string;
}>;

export const defaultPermissionMatrix: PermissionMatrix = {
  LISTAR_OCORRENCIA_RECEBIDO : ['OUVIDORIA'],
  REJEITAR_OCORRENCIA_RECEBIDO : ['OUVIDORIA'],
  APROVAR_OCORRENCIA_RECEBIDO : ['OUVIDORIA'],
  VINCULAR_OCORRENCIA_RECEBIDO : ['OUVIDORIA'],
  LISTAR_OCORRENCIA_EM_ANALISE : ['INSPETORIA'],
  REJEITAR_OCORRENCIA_EM_ANALISE : ['INSPETORIA'],
  ENCAMINHAR_OCORRENCIA_EM_ANALISE : ['INSPETORIA'],
  LISTAR_OCORRENCIAS_AGUARDANDO_GESTOR : ['GESTOR'],
  RESPONDER_OCORRENCIA_AGUARDANDO_GESTOR : ['GESTOR'],
  LISTAR_OCORRENCIAS_RESPONDIDO : ['INSPETORIA'],
  COMUNICAR_IN_LOCO_OCORRENCIA_RESPONDIDO : ['INSPETORIA'],
  APROVAR_SOLUCAO_OCORRENCIA_RESPONDIDO : ['INSPETORIA'],
};

export const defaultPermissionInfoMap: PermissionDescriptionMap = {
  LISTAR_OCORRENCIA_RECEBIDO : {
    label: `Listar Ocorrências com Status "Recebido"`,
  },
  REJEITAR_OCORRENCIA_RECEBIDO : {
    label: `Rejeitar Ocorrências com Status "Recebido"`,
    description: `Altera o Status de uma Ocorrência para "Cancelado"`
  },
  APROVAR_OCORRENCIA_RECEBIDO : {
    label: `Aprovar Ocorrências com Status "Recebido"`,
    description: `Altera o Status de uma Ocorrência para "Em Análise"`
  },
  VINCULAR_OCORRENCIA_RECEBIDO : {
    label: `Vincular Relatos de Ocorrências com Status "Recebido"`,
    description: `Vincula um Relato a uma Ocorrência pré-existente`
  },
  LISTAR_OCORRENCIA_EM_ANALISE : {
    label: `Listar Ocorrências com Status "Em Análise"`,
  },
  REJEITAR_OCORRENCIA_EM_ANALISE : {
    label: `Rejeitar Ocorrências com Status "Em Análise"`,
    description: `Altera o Status de uma Ocorrência para "Cancelado"`
  },
  ENCAMINHAR_OCORRENCIA_EM_ANALISE : {
    label: `Encaminhar Ocorrências com Status "Em Análise"`,
    description: `Alterar o Status de uma Ocorrência para "Aguardando Gestor"`
  },
  LISTAR_OCORRENCIAS_AGUARDANDO_GESTOR : {
    label: `Listar Ocorrências com Status "Aguardando Gestor"`,
  },
  RESPONDER_OCORRENCIA_AGUARDANDO_GESTOR : {
    label: `Responder Ocorrências com Status "Aguardando Gestor"`,
    description: `Altera o Status de uma Ocorrência para "Respondido"`,
  },
  LISTAR_OCORRENCIAS_RESPONDIDO : {
    label: `Listar Ocorrências com Status "Respondido"`,
  },
  COMUNICAR_IN_LOCO_OCORRENCIA_RESPONDIDO : {
    label: `Comunicar para Inspeção In-Loco Ocorrências com Status "Respondido"`,
    description: `Altera o Status de uma Ocorrência para "Solucionado (Em Inspeção)"`,
  },
  APROVAR_SOLUCAO_OCORRENCIA_RESPONDIDO : {
    label: `Aprovar Solução de Ocorrências com Status "Respondido"`,
    description: `Altera o Status de uma Ocorrência para "Solucionado"`,
  },
};
