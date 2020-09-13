import { ITask } from "@/interfaces/entities";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";
import apiService from "@/services/api.service";

@Module({
  namespaced: true
})
export default class TasksList extends VuexModule {
  isFetching = false;
  allTasks: ITask[] = [];

  @Mutation
  ADD_TASK(task: ITask) {
    this.allTasks.push(task);
  }
  @Mutation
  REMOVE_TASK(id: string) {
    this.allTasks = this.allTasks.filter(t => t._id != id);
  }
  @Mutation
  UPDATE_TASK(task: ITask) {
    this.allTasks = this.allTasks.map(t => (t._id === task._id ? task : t));
  }
  @Mutation
  FETCH_TASKS(res) {
    this.allTasks = res;
  }
  @Mutation
  HANDLE_FETCH(value: boolean) {
    this.isFetching = value;
  }

  @Action({ commit: "ADD_TASK" })
  async addTask(task: ITask) {
    const res = await apiService.addTask({
      ...task,
      author: this.context.rootState.email
    });
    return res;
  }
  @Action({ commit: "REMOVE_TASK" })
  removeTask(id: string) {
    apiService.removeTask(id);
    return id;
  }
  @Action({ commit: "UPDATE_TASK" })
  async updateTask(task: ITask) {
    const res = await apiService.editTask(task);
    return res;
  }
  @Action({ commit: "FETCH_TASKS" })
  async fetchTasks() {
    this.context.commit("HANDLE_FETCH", true);
    try {
      const res = await apiService.fetchAllTasks(this.context.rootState.email);
      return res;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.context.commit("HANDLE_FETCH", false);
    }
  }

  get taskById() {
    return (id: string) => this.allTasks.find((t: ITask) => t._id === id);
  }
}
