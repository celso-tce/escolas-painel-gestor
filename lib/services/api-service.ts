import { Andamento, Categoria, Escola, Ocorrencia, Relato, User } from "escolas-shared";
import { AsyncHttpResult } from "../types";
import { API_BASE_PATH, Utils } from "../utils";

export type OcorrenciaWithAll = Ocorrencia & {
  escola: Escola;
  categoria: Categoria;
  andamentos: Andamento[];
  relatos: Relato[];
};

export interface ApiService {
  getEscolas(): AsyncHttpResult<Escola[]>;
  getEscolasNomes(): AsyncHttpResult<Escola[]>;
  createEscola(data: CreateEscolaDto): AsyncHttpResult<void>;
  updateEscola(id: number, data: Partial<CreateEscolaDto>): AsyncHttpResult<Escola>;
  deleteEscola(id: number): AsyncHttpResult<void>;

  getCategorias(): AsyncHttpResult<Categoria[]>;
  getCategoriasTitulos(): AsyncHttpResult<Categoria[]>;
  createCategoria(data: CreateCategoriaDto): AsyncHttpResult<void>;
  updateCategoria(id: number, data: Partial<CreateCategoriaDto>): AsyncHttpResult<Categoria>;
  deleteCategoria(id: number): AsyncHttpResult<void>;

  getUsers(): AsyncHttpResult<User[]>;
  createUser(data: CreateUserDto): AsyncHttpResult<void>;
  updateUser(id: number, data: Partial<CreateUserDto>): AsyncHttpResult<User>;
  deleteUser(id: number): AsyncHttpResult<void>;

  getOcorrencias(): AsyncHttpResult<Ocorrencia[]>;
  loadOcorrencia(id: number): AsyncHttpResult<OcorrenciaWithAll>;

  getNovasOcorrencias(): AsyncHttpResult<Ocorrencia[]>;
  editarTituloOcorrencia(args: { ocorrenciaId: number; titulo: string }): AsyncHttpResult<void>;
  rejeitarOcorrencia(args: { ocorrenciaId: number; motivo: string }): AsyncHttpResult<void>;
  aprovarOcorrencia(args: { ocorrenciaId: number }): AsyncHttpResult<void>;
  listarOcorrenciasVinculaveis(id: number): AsyncHttpResult<Ocorrencia[]>;
  vincularRelato(args: { relatoId: number; novaOcorrenciaId: number }): AsyncHttpResult<void>;

  getOcorrenciasEmAnalise(): AsyncHttpResult<Ocorrencia[]>;
  encaminharOcorrencia(args: {
    ocorrenciaId: number,
    mensagem: string,
    prazoDias: number,
  }): AsyncHttpResult<void>;

  getOcorrenciasRecebidas(): AsyncHttpResult<Array<
    Ocorrencia & { andamentos: Andamento[] }
  >>;
  solicitarProrrogacao(args: { ocorrenciaId: number; motivo: string }): AsyncHttpResult<void>;
  responderOcorrencia(args: { ocorrenciaId: number; resposta: string }): AsyncHttpResult<void>;

  getOcorrenciasRespondidas(): AsyncHttpResult<Ocorrencia[]>;
  solucionarOcorrencia(args: { ocorrenciaId: number; mensagem: string }): AsyncHttpResult<void>;
  solucionarOcorrenciaInspecao(args: { ocorrenciaId: number; mensagem: string }): AsyncHttpResult<void>;
  getSolicitacoesProrrogacao(): AsyncHttpResult<Ocorrencia[]>;
  aprovarProrrogacao(args: {
    ocorrenciaId: number,
    mensagem: string,
    prazoDias: number,
  }): AsyncHttpResult<void>;
  rejeitarProrrogacao(args: { ocorrenciaId: number; mensagem: string }): AsyncHttpResult<void>;
}

export const defaultApiService: ApiService = {
  getEscolas: () => Utils.fetchApi('GET', '/escolas'),
  getEscolasNomes: () => Utils.fetchApi('GET', '/escolas?nomes'),
  createEscola: (data) => Utils.fetchApi('POST', '/escolas', data),
  updateEscola: (id, data) => Utils.fetchApi('PATCH', `/escolas/${id}`, data),
  deleteEscola: (id) => Utils.fetchApi('DELETE', `/escolas/${id}`),

  getCategorias: () => Utils.fetchApi('GET', '/categorias'),
  getCategoriasTitulos: () => Utils.fetchApi('GET', '/categorias?titulos'),
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

  getOcorrencias: () => Utils.fetchApi('GET', '/ocorrencias'),
  loadOcorrencia: (id) => Utils.fetchApi('GET', `/ocorrencias/${id}`),

  getNovasOcorrencias: () => Utils.fetchApi('GET', '/simulate/novas-ocorrencias'),
  editarTituloOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/editar-titulo-ocorrencia', args),
  rejeitarOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/rejeitar-ocorrencia', args),
  aprovarOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/aprovar-ocorrencia', args),
  listarOcorrenciasVinculaveis: (id) => Utils.fetchApi('GET', `/simulate/listar-ocorrencias-vinculaveis/${id}`),
  vincularRelato: (args) => Utils.fetchApi('POST', '/simulate/vincular-relato', args),

  getOcorrenciasEmAnalise: () => Utils.fetchApi('GET', '/simulate/ocorrencias-analise'),
  encaminharOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/encaminhar-para-gestor', args),

  getOcorrenciasRecebidas: () => Utils.fetchApi('GET', '/simulate/ocorrencias-aguardando-gestor'),
  solicitarProrrogacao: (args) => Utils.fetchApi('POST', '/simulate/solicitar-prorrogacao-prazo', args),
  responderOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/responder-ocorrencia', args),

  getOcorrenciasRespondidas: () => Utils.fetchApi('GET', '/simulate/ocorrencias-respondidas'),
  solucionarOcorrencia: (args) => Utils.fetchApi('POST', '/simulate/solucionar', args),
  solucionarOcorrenciaInspecao: (args) => Utils.fetchApi('POST', '/simulate/comunicar-para-inspecao', args),
  getSolicitacoesProrrogacao: () => Utils.fetchApi('GET', '/simulate/solicitacoes-prorrogacao'),
  aprovarProrrogacao: (args) => Utils.fetchApi('POST', '/simulate/aprovar-prorrogacao-prazo', args),
  rejeitarProrrogacao: (args) => Utils.fetchApi('POST', '/simulate/rejeitar-prorrogacao-prazo', args),
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
