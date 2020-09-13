<template>
  <div class="task">
    <div class="task__header">
      <div class="task__control">
        <router-link :to="'/edit/' + task._id" class="task__control-item">
          <img src="@/assets/img/icon-edit.svg" alt="Edit icon" />
        </router-link>
        <a @click="openConfirmPopUp" class="task__control-item">
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
      v-if="showConfirmPopUp"
      @remove-task="removeTask"
      @hide-popup="hideConfirmPopUp"
    >
      Are you sure you want to remove this task?
    </ConfirmPopUp>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ITask } from "@/interfaces/entities";
import ConfirmPopUpMixin from "@/mixins/ConfirmPopUpMixin.vue";
import ConfirmPopUp from "@/components/popups/ConfirmPopUp.vue";

const tasksModule = namespace("tasks");

@Component({
  components: { ConfirmPopUp }
})
export default class TaskItem extends ConfirmPopUpMixin {
  @tasksModule.Action("removeTask") actionRemoveTask;
  @Prop() readonly task: ITask;

  removeTask() {
    this.actionRemoveTask(this.task._id);
    this.hideConfirmPopUp();
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
