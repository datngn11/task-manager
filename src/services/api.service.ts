import NetworkService from "./network.service";
import CardsApiService from "./api/cards";
import { use } from "typescript-mix";

interface ApiService extends NetworkService, CardsApiService {}

class ApiService {
  @use(CardsApiService) this!: ApiService;
}

const apiService = new ApiService();

export default apiService;
