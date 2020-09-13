import { GET, POST, PATCH, DELETE } from "../network.service";

export default class TasksApiService {
  async fetchAllTasks(author: string) {
    const res = await GET(`/todo?author=${author}`);
    return res;
  }

  async addTask(task) {
    const res = await POST("/todo", task);
    return res;
  }

  async editTask(task) {
    const res = await PATCH(`/todo/${task._id}`, task);
    return res;
  }

  removeTask(id: string) {
    return DELETE(`/todo/${id}`);
  }
}
