<template>
  <div class="task">
    <div class="task__header">
      <div class="task__control">
        <router-link :to="'/edit/' + task.id" class="task__control-item">
          <img src="@/assets/img/icon-edit.svg" alt="Edit icon" />
        </router-link>
        <a @click="openPopUp" class="task__control-item">
          <img src="@/assets/img/icon-delete.svg" alt="Trash can icon" />
        </a>
      </div>
    </div>
    <div class="task__body">
      <h2 class="task__title">
        {{ task.title }}
      </h2>
      <p class="task__desc">{{ task.description }}</p>
    </div>
    <ConfirmPopUp
      v-if="showPopUp"
      @remove-task="removeTask"
      @close-popup="hidePopUp"
    >
      Are you sure you want to delete this task?
    </ConfirmPopUp>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { ITask } from "@/interfaces/entities";
import ConfirmPopUp from "@/components/popups/ConfirmPopUp.vue";

@Component({
  components: { ConfirmPopUp }
})
export default class TaskItem extends Vue {
  @Prop() readonly task: ITask;

  showPopUp = false;

  openPopUp() {
    this.showPopUp = true;
  }
  hidePopUp() {
    this.showPopUp = false;
  }
  removeTask() {
    this.$store.dispatch("tasks/removeTask", this.task.id);
    this.hidePopUp;
  }
}
</script>

<style lang="scss" scoped>
.task {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 5px;

  &__header {
    background-color: $base-color;
    border-radius: 5px 5px 0 0;
    padding: 10px;
  }

  &__control {
    &-item {
      width: 25px;
      height: 25px;
      display: inline-block;
      color: #fff;
      margin-right: 10px;
      cursor: pointer;

      @include respond-to(phone) {
        width: 20px;
        height: 20px;
      }
    }
    img {
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__body {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  &__title {
    margin: 0 0 20px;
  }
  &__desc {
    margin: 0;
    word-break: break-all;
    white-space: pre-line;
    color: $main-font-color;
  }
}
</style>
