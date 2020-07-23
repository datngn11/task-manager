import { GET } from "../network.service";

export default class CardsApiService {
  async fetchAllCards() {
    const res = await GET("/cards");
    return res;
  }
}
