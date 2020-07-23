import { ITask } from "@/interfaces/entities";
// import { tasks as tasksData } from "@/tasks.js";
import { generate } from "shortid";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";

@Module({
  namespaced: true
})
export default class TasksList extends VuexModule {
  allTasks: ITask[] = [];

  @Mutation
  ADD_TASK(task: ITask) {
    this.allTasks.push(task);
  }
  @Mutation
  REMOVE_TASK(id: string) {
    this.allTasks = this.allTasks.filter(t => t.id != id);
  }
  @Mutation
  UPDATE_TASK(task: ITask) {
    this.allTasks = this.allTasks.map(t => (t.id === task.id ? task : t));
  }

  @Action({ commit: "ADD_TASK" })
  addTask(task: ITask) {
    return { ...task, id: generate() };
  }
  @Action({ commit: "REMOVE_TASK" })
  removeTask(id: string) {
    return id;
  }
  @Action({ commit: "UPDATE_TASK" })
  updateTask(task: ITask) {
    return task;
  }

  get taskById() {
    return (id: string) => this.allTasks.find((t: ITask) => t.id === id);
  }
}
