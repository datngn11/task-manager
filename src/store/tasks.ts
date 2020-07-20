import { ITasks, ITask } from "@/interfaces/entities";
import { tasks as tasksData } from "@/tasks.js";
import { generate } from "shortid";

const state: ITasks = {
  allTasks: tasksData
};

const mutations = {
  removeTask(state: ITasks, id: string) {
    state.allTasks = state.allTasks.filter(t => t.id != id);
  },
  addTask(state: ITasks, task: ITask) {
    state.allTasks.push(task);
  },
  updateTask(state: ITasks, task: ITask) {
    state.allTasks = state.allTasks.map(t => (t.id === task.id ? task : t));
  }
};

const actions = {
  removeTask({ commit }, id: string) {
    commit("removeTask", id);
  },
  addTask({ commit }, task: ITask) {
    commit("addTask", { ...task, id: generate() });
  },
  updateTask({ commit }, task: ITask) {
    commit("updateTask", task);
  }
};

const getters = {
  taskById: (state: ITasks) => (id: string) => {
    return state.allTasks.find((t: ITask) => t.id === id);
  }
};

export const tasks = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
