<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__avatar">
      <img src="@/assets/img/icon-user.png" alt="User Avatar" />
    </div>
    <div class="form__field">
      <label class="form__label" for="email" autocomplete="off">Email:</label>
      <input
        type="text"
        v-model.trim="inputText"
        id="email"
        class="input"
        placeholder="Your email"
      />
      <p v-if="errors.email" class="form__message">* {{ errors.email }}</p>
    </div>
    <button type="submit" class="btn btn--submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class LoginForm extends Vue {
  @Action("setEmail") actionSetEmail;
  errors = {};
  inputText = "";

  validate(email) {
    const errors: any = {};
    const regex = /[\w.+-]+@[\w9-]+\.[\w-.]+/;
    if (!email) errors.email = "Email can not be blank";
    if (email && !email.match(regex)) errors.email = "Email must be valid";
    return errors;
  }

  handleSubmit() {
    this.errors = this.validate(this.inputText);

    if (Object.keys(this.errors).length === 0) {
      this.actionSetEmail(this.inputText);
      localStorage.setItem("currentEmail", this.inputText);
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 40%;
  box-sizing: border-box;
  padding: 50px 15px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.2);
  background: #fff;
  @include respond-to(tablet) {
    width: 70%;
  }
  @include respond-to(phone) {
    padding: 0 15px;
    width: 100%;
    box-shadow: none;
  }
  &__avatar {
    width: 33%;
    margin: 0 auto 50px;
    @include respond-to(phone) {
      width: 50%;
    }
  }

  &__field {
    margin: 0 0 20px;
  }
  &__label {
    display: inline-block;
    margin: 0 0 15px;
  }

  &__message {
    color: red;
  }
}
</style>
