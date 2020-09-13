import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class NetworkService {
  private static api: AxiosInstance;

  public static init() {
    NetworkService.api = axios.create({
      baseURL: "https://raysael.herokuapp.com/"
    });
  }

  private static async requestHandler(callback: () => Promise<any>) {
    const { data, status } = await callback();

    switch (status) {
      case 200:
      case 201:
        return data;
      case 401:
      case 403:
      case 500:
        return null;
    }
  }

  public static async get(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => NetworkService.api.get(url, options);
    const result = await NetworkService.requestHandler(request);
    return result;
  }

  public static async post(
    url: string,
    data: any,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => NetworkService.api.post(url, data, options);
    const result = await NetworkService.requestHandler(request);
    return result;
  }

  public static async patch(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => NetworkService.api.patch(url, options);
    const result = await NetworkService.requestHandler(request);
    return result;
  }

  public static async delete(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => NetworkService.api.delete(url, options);
    const result = await NetworkService.requestHandler(request);
    return result;
  }
}

NetworkService.init();

const GET = NetworkService.get;
const POST = NetworkService.post;
const DELETE = NetworkService.delete;
const PATCH = NetworkService.patch;

export { GET, POST, DELETE, PATCH };
export default NetworkService;
