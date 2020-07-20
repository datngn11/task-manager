import { GET } from "./network.service";

export class MtgApiService {
  get(url) {
    return GET(url);
  }
}
