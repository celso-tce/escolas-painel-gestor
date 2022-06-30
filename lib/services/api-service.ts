import { Escola } from "escolas-shared";
import { AsyncHttpResult } from "../types";
import { API_BASE_PATH, Utils } from "../utils";

export type CreateEscolaDto = {
  nome: string;
  tipo: string;
  status: number;
  modalidades: string;
  diretorNome?: string;
  diretorEmail?: string;
  qeduUrl?: string;
  postalCode?: string;
  endereco?: string;
  complemento?: string;
  cidade?: string;
  bairro?: string;
};

export interface ApiService {
  getEscolas(): AsyncHttpResult<Escola[]>;
  createEscola(data: CreateEscolaDto): AsyncHttpResult<void>;
  updateEscola(id: number, data: Partial<CreateEscolaDto>): AsyncHttpResult<Escola>;
  deleteEscola(id: number): AsyncHttpResult<void>;
}

export const defaultApiService: ApiService = {
  getEscolas() {
    const url = API_BASE_PATH + '/escolas';
    return Utils.fetchHelper('GET', url);
  },

  createEscola(data) {
    const url = API_BASE_PATH + '/escolas';
    return Utils.fetchHelper('POST', url, data);
  },

  updateEscola(id, data) {
    const url = API_BASE_PATH + `/escolas/${id}`;
    return Utils.fetchHelper('PATCH', url, data);
  },

  deleteEscola(id) {
    const url = API_BASE_PATH + `/escolas/${id}`;
    return Utils.fetchHelper('DELETE', url);
  },
};
