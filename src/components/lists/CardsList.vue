<template>
  <div class="list">
    <div class="list__header">
      <h3>{{ title }}</h3>
    </div>
    <Cards :listId="listId" :cards="list.cards" />
    <div class="list__add">
      <a @click.prevent="openCardsPopUp">+ Add new card</a>
    </div>
    <CardsPopup
      v-show="showCardsPopUp"
      @hide-popup="hideCardsPopUp"
      @add-card="addCard"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CardPopUpMixin from "@/mixins/CardPopUpMixin.vue";
import { ICardsList } from "@/interfaces/entities";
import Cards from "./Cards.vue";
import CardsPopup from "../popups/CardsPopup.vue";

const cardsModule = namespace("cards");

@Component({
  components: { CardsPopup, Cards },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
})
export default class CardsList extends CardPopUpMixin {
  @cardsModule.Action("addCard") actionAddCard;
  @Prop() list: ICardsList[];
  @Prop() title: string;
  @Prop() listId: string;
  listTitle: string;

  addCard(id: string, src: string) {
    this.actionAddCard({
      id,
      src,
      listId: this.listId
    });
    this.hideCardsPopUp();
  }
}
</script>

<style lang="scss" scoped>
.list {
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  box-shadow: 0 0 0 0.5px rgba(49, 49, 93, 0.03),
    0 2px 5px 0 rgba(49, 49, 93, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.08);
  width: 20%;
  &:not(:last-of-type) {
    margin-right: 20px;
  }

  &__header {
    padding: 18px;
    h3 {
      margin: 0;
    }
  }

  &__add {
    a {
      text-decoration: none;
      border-radius: 3px;
      color: #5e6c84;
      display: block;
      flex: 1 0 auto;
      padding: 10px;
      position: relative;
      text-decoration: none;
      margin: 8px;
      cursor: pointer;
      &:hover {
        background-color: rgba(9, 30, 66, 0.08);
        color: #172b4d;
      }
    }
  }
}
</style>
