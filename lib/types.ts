export type HttpResult<T> = {
  code: number;
  type: string;
} & (
  {
      type: 'ok';
      payload: T;
  }
  |
  {
      type: 'error';
      message: string;
  }
);

export type AsyncHttpResult<T> = Promise<HttpResult<T>>;

export type BasicModel = { id: number };
