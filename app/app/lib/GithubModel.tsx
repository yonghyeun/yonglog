import type {
  QueryParameter,
  Header,
  RequestOptions,
  HTTPResponse,
} from '@/types/api';

export default class GithubAPI {
  private static BASE_URL = 'https://api.github.com';
  private static baseHeader: Header = {
    Authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  };

  private static setHeaders(headers: Header) {
    return { ...this.baseHeader, ...headers };
  }

  private static setURL(endPoint: string, queryParameter: QueryParameter) {
    if (Object.keys(queryParameter).length === 0) {
      return `${this.BASE_URL}${endPoint}`;
    }
    const searchParams = new URLSearchParams(queryParameter).toString();
    return `${this.BASE_URL}${endPoint}?${searchParams}`;
  }

  static async GET<T>(
    endPoint: string,
    requestOptions: RequestOptions,
  ): Promise<HTTPResponse<T>> {
    const { additionalHeader, queryParameter } = requestOptions;
    const url = this.setURL(endPoint, queryParameter || {});
    const headers = this.setHeaders(additionalHeader || {});

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async POST<T>(
    endPoint: string,
    requestOptions: RequestOptions,
  ): Promise<HTTPResponse<T>> {
    const { additionalHeader, queryParameter, body } = requestOptions;
    const url = this.setURL(endPoint, queryParameter || {});
    const headers = this.setHeaders(additionalHeader || {});

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      console.log('URL: ', url);
      console.log('Headers: ', headers);
      console.log('Body: ', JSON.stringify(body));
      throw error;
    }
  }
}
