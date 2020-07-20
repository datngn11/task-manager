<template>
  <div class="popup" @click.stop="$emit('hide-popup')">
    <div class="popup__container" @click.stop="">
      <p><slot></slot></p>
      <div class="popup__buttons">
        <span @click="$emit('remove-task')">Yes</span>
        <span @click="$emit('hide-popup')">No</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmPopUp"
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 30;

  &__container {
    position: relative;
    top: 30%;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    text-align: center;
    z-index: 30;
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
        border-radius: 0 0 0 3px;
        background-color: #ff4a41;
        &:hover {
          background-color: #ee4037;
        }
      }
      &:last-child {
        border-radius: 0 0 3px 0;
        background-color: #5a6268;
        &:hover {
          background-color: #494f53;
        }
      }
    }
  }
}
</style>
