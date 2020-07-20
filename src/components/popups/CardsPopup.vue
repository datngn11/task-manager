<template>
  <div class="popup" @click.stop="$emit('hide-popup')">
    <div class="popup__container" @click.stop="">
      <div class="img-grid">
        <img
          v-for="img in imgList"
          :key="img.id"
          :src="img.src"
          @click="saveCard(img)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ICardsImg } from "@/interfaces/entities";
@Component
export default class CardsPopup extends Vue {
  saveCard(img) {
    if (this.$route.params.id) {
      this.$emit("edit-card", img.src);
      this.$emit("hide-popup");
    } else {
      this.$emit("add-card", img.id, img.src);
    }
  }

  public get imgList(): ICardsImg[] {
    return this.$store.state.cardsLists.allCardsImg;
  }
}
</script>

<style lang="scss" scoped>
.popup {
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
  z-index: 30;

  &__container {
    position: relative;
    margin: 50px 0;
    padding: 10px;
    width: 75%;
    background-color: #f4f5f7;
    border-radius: 3px;
    z-index: 15;
    overflow: hidden;
  }
}

.img-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  img {
    display: block;
    width: 100%;
    height: auto;
    cursor: pointer;
    transition: transform 0.1s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
