import NetworkService from "./network.service";

import TasksApiService from "./api/tasks";
import { use } from "typescript-mix";

interface ApiService extends NetworkService, TasksApiService {}

class ApiService {
  @use(TasksApiService) this!: ApiService;
}

const apiService = new ApiService();

export default apiService;
