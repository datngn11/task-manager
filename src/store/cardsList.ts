import { ICardsList, ICardsLists, ICardsImg } from "@/interfaces/entities";
import { GET } from "@/services/network.service";
import { generate } from "shortid";
const state: ICardsLists = {
  allLists: [],
  allCardsImg: []
};

const mutations = {
  addList(state: ICardsLists, list: ICardsList) {
    state.allLists.push(list);
  },
  fetchImg(state: ICardsLists, img: ICardsImg) {
    state.allCardsImg.push(img);
  },
  addCard(state: ICardsLists, { id, src, listId }) {
    state.allLists.find(l => l.id === listId)?.cards.push({ id, src });
  },
  removeCard(state: ICardsLists, { id, listId }) {
    state.allLists.forEach(l => {
      if (l.id === listId) {
        l.cards = l.cards.filter(c => c.id != id);
      }
    });
  },
  updateCard(state: ICardsLists, { card, listId }) {
    state.allLists.forEach(l => {
      if (l.id === listId) {
        l.cards = l.cards.map(c => (c.id === card.id ? card : c));
      }
    });
  },
  updateLists(state: ICardsLists, payload) {
    state.allLists = payload;
  },
  updateCardsList(state: ICardsLists, { value, listId }) {
    state.allLists.forEach(l => {
      if (l.id === listId) {
        l.cards = value;
      }
    });
  }
};

const actions = {
  addList({ commit }, payload: ICardsList) {
    commit("addList", { id: generate(), title: payload.title, cards: [] });
  },
  addCard({ commit }, payload) {
    commit("addCard", {
      id: payload.id,
      src: payload.src,
      listId: payload.listId
    });
  },
  removeCard({ commit }, id: string) {
    commit("removeCard", id);
  },
  updateCard({ commit }, payload) {
    commit("updateCard", payload);
  },
  updateLists({ commit }, payload) {
    commit("updateLists", payload);
  },
  updateCardsList({ commit }, payload) {
    commit("updateCardsList", payload);
  },
  fetchImg({ commit }) {
    GET("/cards").then(res => {
      res.cards.forEach(c => {
        if (c.imageUrl) {
          commit("fetchImg", { id: c.id, src: c.imageUrl });
        }
      });
    });
  }
};
const getters = {
  listById: (state: ICardsLists) => (listId: string) => {
    return state.allLists.find(l => l.id === listId);
  },
  cardsListById: (state: ICardsLists) => (listId: string) => {
    return state.allLists.find(l => l.id === listId)?.cards;
  }
};

export const cardsLists = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
