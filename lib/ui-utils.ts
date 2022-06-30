import { EscolaTipo } from "escolas-shared";
import { escolaTipos } from "./types";
import { Utils } from "./utils";

function assignToInputRef(ref: React.RefObject<HTMLInputElement>, value: string) {
  if (ref.current)
    ref.current.value = value;
}

export type StatusOptionType = {
  value: 1 | 0 | undefined;
  label: string;
};

const statusOptions: StatusOptionType[] = [
  { value: 1, label: 'Ativa' },
  { value: 0, label: 'Inativa' },
];

export type TipoOptionType = {
  value: EscolaTipo | undefined;
  label: string;
};

const tipoOptions: TipoOptionType[] = [
  ...escolaTipos.map((escolaTipo) => (
    { value: escolaTipo, label: Utils.escolaTipoLabel(escolaTipo) }
  )),
];

export type CampoObrigatorioMap<ParentType = any> = Partial<Record<
  keyof ParentType,
  {
    label: string;
    /// caso retorne string = erro de validação (onde a string explica o erro)
    /// caso retorn null = não há erro de validação
    validate?: (value: string) => string | null;
  }
>>;

export const ReactUtils = {
  assignToInputRef,
};

export const SelectUtils = {
  statusOptions,
  tipoOptions,
};
