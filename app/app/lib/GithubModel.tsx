import type { QueryParameter, Header, RequestOptions } from '@/types/api';

/**
 * 생성자를 사용하지 않고 사용 가능한 static class
 */
export default class GithubAPI {
  static BASE_URL: string = 'https://api.github.com';
  static baseHeader: Header = {
    'Content-Type': 'application/json',
  };

  static setHeaders(headers: Header) {
    return { ...GithubAPI.baseHeader, ...headers };
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
  ): Promise<T> {
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
  ): Promise<T> {
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
      throw error;
    }
  }
}
