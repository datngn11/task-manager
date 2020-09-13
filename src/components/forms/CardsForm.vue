<template>
  <div class="container">
    <form
      class="form"
      @submit.prevent="handleSubmit"
      v-on-clickaway="hideForm"
      autocomplete="off"
    >
      <div class="form__field">
        <label for="form__title">Title</label>
        <input
          class="input"
          type="text"
          v-model.trim="cardData.title"
          id="form__title"
          v-focus
        />
        <p v-if="errors.title" class="form__message">* {{ errors.title }}</p>
      </div>
      <button type="submit" class="btn btn--submit">Submit</button>
      <span @click="hideForm" class="btn--close">
        <img src="@/assets/img/icon-close.svg" alt="Close icon" />
      </span>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mixin as clickaway } from "vue-clickaway";
import { namespace } from "vuex-class";

const cardsModule = namespace("cards");

@Component({
  mixins: [clickaway],
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
})
export default class TaskForm extends Vue {
  @cardsModule.Action("addList") actionAddList;

  cardData: any = {};
  errors = {};
  routeName: string | null | undefined;

  hideForm() {
    this.$router.push("/");
  }

  validate({ title }) {
    const errors: any = {};
    if (!title) errors.title = "Title can not be blank";

    return errors;
  }

  handleTextarea(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.errors = this.validate(this.cardData);

    if (Object.keys(this.errors).length === 0) {
      this.actionAddList(this.cardData);
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 33%;
  box-shadow: 15px 0px 40px 0px rgba(0, 0, 0, 0.5);
  @include respond-to(tablet) {
    width: 50%;
  }
  @include respond-to(phone) {
    z-index: 10;
    width: 100%;
  }
}
.form {
  position: relative;
  background-color: #fff;
  height: 100%;
  padding: 50px 15px;

  textarea {
    resize: none;
  }
  &__field {
    margin: 0 0 15px;
    &:last-of-type {
      margin: 0 0 30px;
    }
    label {
      font-size: rem(35px);
      display: inline-block;
      margin: 0 0 10px;
      font-weight: 600;
    }
  }
  .btn--close {
    display: block;
    margin: 0 auto;
    width: 100px;
    height: auto;
    @include respond-to(desktop) {
      width: 75px;
    }
    @include respond-to(tablet) {
      width: 60px;
    }
    @include respond-to(phone) {
      width: 35px;
    }
  }
  .btn--submit {
    margin-bottom: 100px;
    @include respond-to(phone) {
      margin-bottom: 60px;
    }
  }
  &__message {
    margin: 0;
    color: red;
  }
}
</style>
