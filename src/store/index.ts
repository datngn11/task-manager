import { cardsLists } from "./cardsList";
import { IRootState } from "./../interfaces/entities";
import Vue from "vue";
import Vuex from "vuex";

import { tasks } from "./tasks";

Vue.use(Vuex);

const state: IRootState = {
  email: ""
};

export const store = new Vuex.Store({
  state,
  mutations: {
    setEmail(state, email: string) {
      state.email = email;
    },
    removeEmail(state) {
      state.email = "";
    }
  },
  actions: {
    setEmail({ commit }, email: string) {
      commit("setEmail", email);
    },
    removeEmail({ commit }) {
      commit("removeEmail");
    }
  },
  getters: {},
  modules: {
    tasks,
    cardsLists
  },
  strict: true
});
