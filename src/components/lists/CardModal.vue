<template>
  <div class="modal" @click.stop="closeModal">
    <div class="modal__container" @click.stop="">
      <div class="modal__content">
        <span class="modal-btn modal-btn--primary" @click="openCardsPopUp"
          >Change Card</span
        >
        <img :src="currentCard.src" alt="" />
      </div>
      <div class="modal__buttons">
        <span class="modal-btn modal-btn--red" @click="openConfirmPopUp">
          Remove
        </span>
        <span class="modal-btn modal-btn--grey" @click="closeModal">Close</span>
        <span class="modal-btn modal-btn--primary" @click="updateCard">
          Apply
        </span>
      </div>
      <div class="modal-close" @click="closeModal">
        <img src="@/assets/img/icon-close.svg" alt="" />
      </div>
    </div>
    <ConfirmPopUp
      v-if="showConfirmPopUp"
      @remove-task="removeCard"
      @hide-popup="hideConfirmPopUp"
    >
      Are you sure you want to remove this card?
    </ConfirmPopUp>
    <CardsPopup
      v-show="showCardsPopUp"
      @hide-popup="hideCardsPopUp"
      @edit-card="editCard"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from "vue-property-decorator";
import { ICard } from "../../interfaces/entities";
import CardPopUpMixin from "@/mixins/CardPopUpMixin.vue";
import ConfirmPopUpMixin from "@/mixins/ConfirmPopUpMixin.vue";
import ConfirmPopUp from "@/components/popups/ConfirmPopUp.vue";
import CardsPopup from "../popups/CardsPopup.vue";

@Component({
  components: { ConfirmPopUp, CardsPopup }
})
export default class CardModal extends Mixins(
  CardPopUpMixin,
  ConfirmPopUpMixin
) {
  @Prop() readonly card!: ICard;
  @Prop() readonly listId!: string;
  currentCard: ICard;

  created() {
    this.currentCard = { ...this.card };
  }

  closeModal() {
    this.$router.push("/");
  }

  removeCard() {
    this.$store.dispatch("cardsLists/removeCard", {
      id: this.card.id,
      listId: this.listId
    });
    this.$router.push("/");
  }

  editCard(src) {
    this.currentCard = { ...this.currentCard, src };
  }
  updateCard() {
    this.$store.dispatch("cardsLists/updateCard", {
      card: this.currentCard,
      listId: this.listId
    });
    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
  overflow-y: auto;
  z-index: 10;

  &__container {
    position: relative;
    margin: 100px 0;
    padding: 15px;
    width: 33%;
    background-color: #f4f5f7;
    border-radius: 3px;
    z-index: 15;
    overflow: hidden;
  }

  &__content {
    padding: 25px;
    text-align: center;

    img {
      width: 50%;
      margin: 20px auto;
    }
  }
  &__buttons {
    display: flex;
  }

  &-btn {
    display: inline-block;
    padding: 10px 15px;
    border-radius: 3px;
    color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:not(:last-child) {
      margin-right: 10px;
    }
    &--primary {
      background-color: $base-color;
      &:hover {
        background-color: $base-color-darker;
      }
    }
    &--red {
      background-color: #ff4a41;
      &:hover {
        background-color: #ee4037;
      }
    }
    &--grey {
      background-color: #5a6268;
      &:hover {
        background-color: #494f53;
      }
    }
    &:first-child {
      margin-right: auto;
    }
  }
  &-close {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
}
</style>
