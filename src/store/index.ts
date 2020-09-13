import Vue from "vue";
import Vuex from "vuex";
import { IRootState } from "./../interfaces/entities";

import CardsList from "./cards";

Vue.use(Vuex);

const state: IRootState = {
  email: ""
};

export const store = new Vuex.Store({
  state,
  mutations: {
    SET_EMAIL(state, email: string) {
      state.email = email;
    },
    REMOVE_EMAIL(state) {
      state.email = "";
    }
  },
  actions: {
    setEmail({ commit }, email: string) {
      commit("SET_EMAIL", email);
    },
    removeEmail({ commit }) {
      commit("REMOVE_EMAIL");
    }
  },
  getters: {},
  modules: {
    cards: CardsList
  },
  strict: true
});
