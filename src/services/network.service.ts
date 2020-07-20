import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class NetworkService {
  private static api: AxiosInstance;

  public static init() {
    NetworkService.api = axios.create({
      baseURL: "https://api.magicthegathering.io/v1"
    });
  }

  private static async refreshTokenRequest() {
    const response = await NetworkService.api.get("/user/12345", {
      baseURL: "https://some-domain.com/auth/refresh_token/"
    });
    return response?.data?.access_token;
  }

  private static async prolongSession(): Promise<void> {
    const AUTH_TOKEN = NetworkService.refreshTokenRequest();
    if (AUTH_TOKEN) {
      axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    }
  }

  private static async resendRequest(callback: () => Promise<any>) {
    const { data, status } = await callback();

    if (status === 200) {
      return data;
    }
    return null;
  }

  private static async requestHandler(callback: () => Promise<any>) {
    const { data, status } = await callback();

    switch (status) {
      case 200:
        return data;
      case 401:
        await NetworkService.prolongSession();
        return NetworkService.resendRequest(callback);
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

  public static async put(
    url: string,
    data: any,
    options?: AxiosRequestConfig
  ): Promise<any> {
    const request = () => NetworkService.api.put(url, data, options);
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
const PUT = NetworkService.put;
const DELETE = NetworkService.delete;

export { GET, POST, PUT, DELETE };
export default NetworkService;
