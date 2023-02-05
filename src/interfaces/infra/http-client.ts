export interface IHttpClient {
  get<T>(url: string, params?: any): Promise<T>;
}
