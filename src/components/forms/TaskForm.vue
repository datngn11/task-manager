<template>
  <div class="container">
    <form class="form" @submit.prevent="handleSubmit" v-on-clickaway="hideForm">
      <div class="form__field">
        <label for="form__title">Title</label>
        <input
          class="input"
          type="text"
          v-model.trim="taskData.title"
          id="form__title"
          v-focus
        />
        <p v-if="errors.title" class="form__message">* {{ errors.title }}</p>
      </div>
      <div class="form__field" v-if="!isCreatingList">
        <label for="form__desc">Description</label>
        <textarea
          class="input"
          rows="7"
          id="form__desc"
          v-model.trim="taskData.description"
          @keyup="handleTextarea"
        />
        <p v-if="errors.description" class="form__message">
          * {{ errors.description }}
        </p>
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
import { ITask } from "@/interfaces/entities";

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
  taskData: any = {};
  errors = {};
  isCreatingList = false;
  routeName: string | null | undefined;

  created() {
    this.routeName = this.$router.currentRoute.name;
    if (this.routeName === "EditTask") {
      this.taskData = { ...this.taskById };
    }
    if (this.routeName === "NewList") {
      this.isCreatingList = true;
    }
  }

  hideForm() {
    this.$router.push("/");
  }

  validate({ title, description }) {
    const errors: any = {};
    if (!title) errors.title = "Title can not be blank";
    if (!description && !this.isCreatingList)
      errors.description = "Description can not be blank";
    return errors;
  }

  handleTextarea(e) {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.errors = this.validate(this.taskData);

    if (Object.keys(this.errors).length === 0) {
      if (this.routeName === "EditTask") {
        this.$store.dispatch("tasks/updateTask", this.taskData);
        this.$router.push("/");
      } else if (this.routeName === "NewTask") {
        this.$store.dispatch("tasks/addTask", this.taskData);
        this.$router.push("/");
      } else if (this.routeName === "NewList") {
        this.$store.dispatch("cardsLists/addList", this.taskData);
        this.$router.push("/");
      }
    }
  }

  public get taskById(): ITask {
    return this.$store.getters["tasks/taskById"](this.$route.params.id);
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
