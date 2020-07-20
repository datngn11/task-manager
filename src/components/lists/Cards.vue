<template>
  <draggable v-model="cardsById" group="cards" class="container">
    <router-link
      :to="{
        name: 'EditCard',
        params: { card: card, id: card.id, listId: listId }
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
import { ICard } from "@/interfaces/entities";
import draggable from "vuedraggable";
@Component({
  components: { draggable }
})
export default class Cards extends Vue {
  @Prop() readonly listId: string;
  @Prop() readonly cards: ICard[];

  public get cardsById(): string {
    return this.$store.getters["cardsLists/cardsListById"](this.listId);
  }
  public set cardsById(value) {
    this.$store.dispatch("cardsLists/updateCardsList", {
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
