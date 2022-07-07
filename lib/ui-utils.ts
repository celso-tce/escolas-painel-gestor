import { EscolaTipo, UserRole } from "escolas-shared";
import { escolaTipos, userRoles } from "./escolas/enums";
import { Utils } from "./utils";

function assignToInputRef(ref: React.RefObject<HTMLInputElement>, value: string) {
  if (ref.current)
    ref.current.value = value;
}

export type EscolaStatusOptionType = {
  value: 1 | 0 | undefined;
  label: string;
};

const escolaStatusOptions: EscolaStatusOptionType[] = [
  { value: 1, label: 'Ativa' },
  { value: 0, label: 'Inativa' },
];

export type EscolaTipoOptionType = {
  value: EscolaTipo | undefined;
  label: string;
};

const escolaTipoOptions: EscolaTipoOptionType[] = [
  ...escolaTipos.map((escolaTipo) => (
    { value: escolaTipo, label: Utils.escolaTipoLabel(escolaTipo) }
  )),
];

export type CampoObrigatorioValidator = {
  label: string;
  /// caso retorne string = erro de validação (onde a string explica o erro)
  /// caso retorn null = não há erro de validação
  validate?: (value: string) => string | null;
};

export type CampoObrigatorioMap<ParentType = any> = Partial<Record<
  keyof ParentType,
  CampoObrigatorioValidator
>>;

export type UserRoleOptionType = {
  value: UserRole | undefined;
  label: string;
};

const userRoleOptions: UserRoleOptionType[] = [
  ...userRoles.map((userRole) => (
    { value: userRole, label: Utils.userRoleLabel(userRole) }
  )),
];

export const ReactUtils = {
  assignToInputRef,
};

export const SelectUtils = {
  escolaStatusOptions,
  escolaTipoOptions,
  userRoleOptions,
};
