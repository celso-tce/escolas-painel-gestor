import { Categoria, Escola, Ocorrencia, User } from "escolas-shared";
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

  getNovasOcorrencias(): AsyncHttpResult<Ocorrencia[]>;
  editarTituloOcorrencia(args: { ocorrenciaId: number, titulo: string }): AsyncHttpResult<void>;
}

export const defaultApiService: ApiService = {
  getEscolas: () => Utils.fetchApi('GET', '/escolas'),
  createEscola: (data) => Utils.fetchApi('POST', '/escolas', data),
  updateEscola: (id, data) => Utils.fetchApi('PATCH', `/escolas/${id}`, data),
  deleteEscola: (id) => Utils.fetchApi('DELETE', `/escolas/${id}`),

  getCategorias: () => Utils.fetchApi('GET', '/categorias'),
  createCategoria: (data) => Utils.fetchApi('POST', '/categorias', data),
  updateCategoria: (id, data) => Utils.fetchApi('PATCH', `/categorias/${id}`, data),
  deleteCategoria: (id) => Utils.fetchApi('DELETE', `/categorias/${id}`),

  getUsers: () => Utils.fetchApi('GET', '/users'),
  createUser: (data) => {
    const { passwordConf, ...realData } = data;
    return Utils.fetchApi('POST', '/users', realData);
  },
  updateUser: (id, data) => {
    const { passwordConf, ...realData } = data;
    return Utils.fetchApi('PATCH', `/users/${id}`, realData);
  },
  deleteUser: (id) => Utils.fetchApi('DELETE', `/users/${id}`),

  getNovasOcorrencias: () => Utils.fetchApi('GET', '/simulate/novas-ocorrencias'),
  editarTituloOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/editar-titulo-ocorrencia', args),
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
