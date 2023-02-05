import { IHttpClient } from "@/interfaces";

export class HttpClientMock<T> implements IHttpClient {
  constructor(private returnData: T) {}

  get = async <T>(url: string): Promise<T> =>
    Promise.resolve(this.returnData as unknown as T);
}
