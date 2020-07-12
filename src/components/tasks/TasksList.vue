<template>
  <div>
    <div class="tasks">
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { ITasks } from "@/interfaces/entities";
import TaskItem from "./TaskItem.vue";

@Component({
  components: { TaskItem }
})
export default class TasksList extends Vue {
  public get tasks(): ITasks {
    return this.$store.state.tasks.allTasks;
  }
}
</script>

<style lang="scss">
.tasks {
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
