<template>
  <div class="popup" @click="$emit('close-popup')">
    <div class="popup__container" @click.stop="">
      <p><slot></slot></p>
      <div class="popup__buttons">
        <span @click="$emit('remove-task')">Yes</span>
        <span @click="$emit('close-popup')">No</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(94, 110, 141, 0.75);

  &__container {
    position: relative;
    top: 30%;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    text-align: center;
    z-index: 20;
    p {
      margin: 0;
      padding: 40px 30px;
    }
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      width: 50%;
      padding: 15px;
      color: #fff;
      cursor: pointer;
      &:first-child {
        background-color: #ff4a41;
        &:hover {
          background-color: #ee4037;
        }
      }
      &:last-child {
        background-color: #b6bece;
        &:hover {
          background-color: #a4acbb;
        }
      }
    }
  }
}
</style>
