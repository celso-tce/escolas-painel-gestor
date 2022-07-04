import { Categoria, Escola, User } from "escolas-shared";
import { AsyncHttpResult } from "../types";
import { API_BASE_PATH, Utils } from "../utils";

export interface ApiService {
  getEscolas(): AsyncHttpResult<Escola[]>;
  createEscola(data: CreateEscolaDto): AsyncHttpResult<void>;
  updateEscola(id: number, data: Partial<CreateEscolaDto>): AsyncHttpResult<Escola>;
  deleteEscola(id: number): AsyncHttpResult<void>;

  getCategorias(): AsyncHttpResult<Categoria[]>;
  createCategoria(data: CreateCategoriaDto): AsyncHttpResult<void>;
  updateCategoria(id: number, data: Partial<CreateCategoriaDto>): AsyncHttpResult<Categoria>;
  deleteCategoria(id: number): AsyncHttpResult<void>;

  getUsers(): AsyncHttpResult<User[]>;
  createUser(data: CreateUserDto): AsyncHttpResult<void>;
  updateUser(id: number, data: Partial<CreateUserDto>): AsyncHttpResult<User>;
  deleteUser(id: number): AsyncHttpResult<void>;
}

export const defaultApiService: ApiService = {
  getEscolas: () => Utils.fetchHelper('GET', API_BASE_PATH + '/escolas'),
  createEscola: (data) => Utils.fetchHelper('POST', API_BASE_PATH + '/escolas', data),
  updateEscola: (id, data) => Utils.fetchHelper('PATCH', API_BASE_PATH + `/escolas/${id}`, data),
  deleteEscola: (id) => Utils.fetchHelper('DELETE', API_BASE_PATH + `/escolas/${id}`),

  getCategorias: () => Utils.fetchHelper('GET', API_BASE_PATH + '/categorias'),
  createCategoria: (data) => Utils.fetchHelper('POST', API_BASE_PATH + '/categorias', data),
  updateCategoria: (id, data) => Utils.fetchHelper('PATCH', API_BASE_PATH + `/categorias/${id}`, data),
  deleteCategoria: (id) => Utils.fetchHelper('DELETE', API_BASE_PATH + `/categorias/${id}`),

  getUsers: () => Utils.fetchHelper('GET', API_BASE_PATH + '/users'),
  createUser: (data) => {
    const { passwordConf, ...realData } = data;
    return Utils.fetchHelper('POST', API_BASE_PATH + '/users', realData);
  },
  updateUser: (id, data) => {
    const { passwordConf, ...realData } = data;
    return Utils.fetchHelper('PATCH', API_BASE_PATH + `/users/${id}`, realData);
  },
  deleteUser: (id) => Utils.fetchHelper('DELETE', API_BASE_PATH + `/users/${id}`),
};

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

export type CreateCategoriaDto = {
  titulo: string;
  descricao: string;
};

export type CreateUserDto = {
  email: string;
  password: string;
  passwordConf: string;
  nome: string;
  role: string;
};
