<template>
  <draggable v-model="cardsByListId" group="cards" class="container">
    <router-link
      :to="{
        name: 'EditCard',
        params: { card: card, listId: listId }
      }"
      v-for="(card, index) in cards"
      :key="index"
      class="card"
    >
      <img :src="card.src" />
    </router-link>
  </draggable>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ICard } from "@/interfaces/entities";
import draggable from "vuedraggable";

const cardsModule = namespace("cards");

@Component({
  components: { draggable }
})
export default class Cards extends Vue {
  @cardsModule.Getter("cardsByListId") getCardsByListId;
  @cardsModule.Action("updateCardsList") actionUpdateCardsList;
  @Prop() readonly listId: string;
  @Prop() readonly cards: ICard[];

  public get cardsByListId(): string {
    return this.getCardsByListId(this.listId);
  }
  public set cardsByListId(value) {
    this.actionUpdateCardsList({
      value,
      listId: this.listId
    });
  }
}
</script>

<style lang="scss" scoped>
.card {
  display: block;
  margin: 0 10px;
  padding: 10px 0;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  &:hover {
    background-color: #f4f5f7;
  }
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  img {
    width: 80%;
    margin: 0 auto;
  }
}
</style>
