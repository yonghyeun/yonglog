export type Error = {
  message: string;
  status: number;
};

export type QueryParameter = Record<string, string>;
export type Header = Record<string, string>;
export type RequestOptions = {
  additionalHeader?: Header;
  queryParameter?: QueryParameter;
  body?: any;
};

export type RequestInfo = {
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH';
  additionalHeaders?: Header;
  // TODO 추후 body 타입 지정하기
  body?: T;
};

export type HTTPResponse<T> = {
  status: number;
  data: T;
};

export type Issue = {
  id: number;
  number: number;
  title: string;
  body: string;
  comments: number;
  reactions: Record<string, number>;
};

export type Comment = {
  userName: string;
  avatarUrl: string;
  createAt: string;
  body: string;
};
