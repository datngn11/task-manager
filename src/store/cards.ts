import { ICardsList, ICardsImg } from "@/interfaces/entities";
import { generate } from "shortid";
import apiService from "@/services/api.service";
import { VuexModule, Module, Action, Mutation } from "vuex-module-decorators";

@Module({
  namespaced: true
})
export default class CardsList extends VuexModule {
  isFetching = false;
  allLists: ICardsList[] = [];
  allCardsImg: ICardsImg[] = [];

  @Mutation
  ADD_LIST(list: ICardsList) {
    this.allLists.push(list);
  }
  @Mutation
  ADD_CARD({ id, src, listId }) {
    this.allLists.find(l => l.id === listId)?.cards.push({ id, src });
  }
  @Mutation
  REMOVE_CARD({ id, listId }) {
    this.allLists.forEach(l => {
      if (l.id === listId) {
        l.cards = l.cards.filter(c => c.id != id);
      }
    });
  }
  @Mutation
  UPDATE_CARD({ card, listId }) {
    this.allLists.forEach(l => {
      if (l.id === listId) {
        l.cards = l.cards.map(c => (c.id === card.id ? card : c));
      }
    });
  }
  @Mutation
  UPDATE_LISTS(payload) {
    this.allLists = payload;
  }
  @Mutation
  UPDATE_CARDS_LIST({ value, listId }) {
    this.allLists.forEach(l => {
      if (l.id === listId) {
        l.cards = value;
      }
    });
  }
  @Mutation
  HANDLE_FETCH(value: boolean) {
    this.isFetching = value;
  }
  @Mutation
  FETCH_IMG(res: any) {
    res.cards.forEach(c => {
      if (c.imageUrl) {
        this.allCardsImg.push({ id: generate(), src: c.imageUrl });
      }
    });
  }

  @Action({ commit: "ADD_LIST" })
  addList(payload: ICardsList) {
    return { id: generate(), title: payload.title, cards: [] };
  }
  @Action({ commit: "ADD_CARD" })
  addCard({ id, src, listId }) {
    return { id, src, listId };
  }
  @Action({ commit: "REMOVE_CARD" })
  removeCard(id: string) {
    return id;
  }
  @Action({ commit: "UPDATE_CARD" })
  updateCard(payload) {
    return payload;
  }
  @Action({ commit: "UPDATE_LISTS" })
  updateLists(payload) {
    return payload;
  }
  @Action({ commit: "UPDATE_CARDS_LIST" })
  updateCardsList(payload) {
    return payload;
  }
  @Action({ commit: "FETCH_IMG" })
  async fetchImg() {
    this.context.commit("HANDLE_FETCH", true);
    try {
      const res = await apiService.fetchAllCards();
      return res;
    } catch (err) {
      throw new Error(err);
    } finally {
      this.context.commit("HANDLE_FETCH", false);
    }
  }

  get lists(): ICardsList[] {
    return this.allLists;
  }
  get imgList(): ICardsImg[] {
    return this.allCardsImg;
  }
  get cardsByListId() {
    return (listId: string) => this.allLists.find(l => l.id === listId)?.cards;
  }
}
