<template>
  <div class="tasks">
    <TaskItem v-for="task in tasks" :key="task._id" :task="task" />
  </div>
</template>

<script lang="ts">
import { namespace } from "vuex-class";
import { Vue, Component } from "vue-property-decorator";
import { ITasks } from "@/interfaces/entities";
import TaskItem from "./TaskItem.vue";

const tasksModule = namespace("tasks");

@Component({
  components: { TaskItem }
})
export default class TasksList extends Vue {
  @tasksModule.State("allTasks") getterTasks;

  public get tasks(): ITasks {
    return this.getterTasks;
  }
}
</script>

<style lang="scss">
.tasks {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  padding: 50px;
  @include respond-to(tablet) {
    grid-template-columns: repeat(2, 1fr);
    padding: 30px;
  }
  @include respond-to(phone) {
    grid-template-columns: 1fr;
    padding: 30px;
  }
}
</style>
