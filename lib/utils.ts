import axios, { Method } from "axios";
import { EscolaTipo } from "escolas-shared";
import { HttpResult } from "./types";

export const API_BASE_PATH = process.env['NEXT_PUBLIC_API_URL'] ?? '';

function apiGet(path: string, method = 'GET', body = undefined) {
  path = path.startsWith('/') ? path : ('/' + path);
  return fetch(API_BASE_PATH + path, { method, body });
}

async function fetchHelper<T>(method: Method, url: string, data?: any): Promise<HttpResult<T>> {
  console.log('@REQUEST: ' + url);

  try {
      const resultPromise = axios.request({
        method,
        url,
        data,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHRjZS5hcC5nb3YuYnIiLCJpYXQiOjE2NTY0MTQ0NDR9.tXILLH5SuEeU4dVcs-M0I18siXHduhdq0HETd4pHTDE',
        },
      });

      const result = await minDelayPromise(resultPromise, 1000);

      if (result.status === 200 || result.status === 201 || result.status === 204) {
          return {
              type: 'ok',
              code: result.status,
              payload: result.data,
          };
      }

      return {
          type: 'error',
          code: result.status,
          message: result.statusText,
      };
  } catch (err) {
      console.error(err);

      return {
          type: 'error',
          code: 500,
          message: 'Erro desconhecido.',
      };
  }
}

function minDelayPromise<T>(promise: Promise<T>, minDelayMs: number): Promise<T> {
  if (minDelayMs === 0)
      return promise;

  return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, minDelayMs)),
  ]).then(([promiseResult, _]) => {
      return promiseResult;
  });
}

function escolaTipoLabel(escolaTipo: EscolaTipo): string {
  if (escolaTipo.length <= 1)
    return escolaTipo;

  return escolaTipo[0] + escolaTipo.substring(1).toLocaleLowerCase();
}

export const Utils = {
  apiGet,
  fetchHelper,
  minDelayPromise,
  escolaTipoLabel,
};
