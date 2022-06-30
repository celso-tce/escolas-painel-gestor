import { AsyncHttpResult } from "../types";
import { Utils } from "../utils";

export type CEPPayload = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};

export interface CEPService {
  loadCep(cep: string): AsyncHttpResult<CEPPayload>;
}

export const defaultCEPService: CEPService = {
  loadCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return Utils.fetchHelper('GET', url);
  }
};
