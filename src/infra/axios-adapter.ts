import { IHttpClient } from "@/interfaces";
import { API } from "@/config";
import { AxiosRequestConfig } from "axios";

export class AxiosAdapter implements IHttpClient {
  async get<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    const response = await API.get(url, params);
    return response.data;
  }
}
