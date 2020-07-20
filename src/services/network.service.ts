import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class NetworkService {
  private static api: AxiosInstance;

  public static init() {
    NetworkService.api = axios.create({
      baseURL: "https://api.magicthegathering.io/v1"
    });
  }

  private static async requestHandler(callback: () => Promise<any>) {
    const { data, status } = await callback();

    switch (status) {
      case 200:
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
}

NetworkService.init();

const GET = NetworkService.get;

export { GET };
export default NetworkService;
