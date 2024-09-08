import { Header, RequestInfo } from '@/types/api';

export default class GithubAPIModel {
  token: string;
  headers: Header;

  static BASE_URL: string = 'https://api.github.com';
  constructor(token: string) {
    this.token = token;
    this.headers = this.init();
  }

  init(): Header {
    if (this.token) {
      return {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `token ${this.token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      };
    }
    return {
      'Content-Type': 'application/json',
      Accept: 'application/vnd.github.html+json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    };
  }

  static setURL(endPoint: string) {
    return `${GithubAPIModel.BASE_URL}${endPoint}`;
  }

  /**
   * try catch block 은 사용처에서 하도록 하자
   */
  async fetching<T>(endPoint: string, requestOptions: RequestInfo): Promise<T> {
    const { method, additionalHeaders, body } = requestOptions;
    const URL = GithubAPIModel.setURL(endPoint);
    const headers = { ...this.headers, ...additionalHeaders };

    const response = await fetch(URL, {
      method,
      headers,
      body,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.text}`);
    }

    const data = await response.json();

    return data;
  }

  async GET<T>(
    endPoint: string,
    additionalHeaders?: RequestInfo['additionalHeaders'],
  ) {
    return await this.fetching<T>(endPoint, {
      method: 'GET',
      additionalHeaders,
    });
  }

  async POST<T>(endPoint: string, requestOptions: Omit<RequestInfo, 'method'>) {
    return await this.fetching<T>(endPoint, {
      method: 'POST',
      ...requestOptions,
    });
  }
}
