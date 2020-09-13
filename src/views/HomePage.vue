<template>
  <div class="container">
    <TopPanel />
    <TasksList v-if="!isFetching" />
    <div v-else class="spinner">
      <Spinner />
    </div>
    <router-view :key="$route.params.id" />
    <router-link to="/new" class="btn--add">
      <img src="@/assets/img/icon-add.svg" alt="" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";

import TasksList from "@/components/tasks/TasksList.vue";
import TopPanel from "@/components/panels/TopPanel.vue";
import Spinner from "@/components/spinner/Spinner.vue";

const tasksModule = namespace("tasks");

@Component({
  components: { TasksList, TopPanel, Spinner }
})
export default class HomePage extends Vue {
  @tasksModule.Action("fetchTasks") actionFetchTasks;
  @tasksModule.State("isFetching") stateIsFetchingTasks;
  @Action("setEmail") actionSetEmail;

  created() {
    if (!localStorage.currentEmail) {
      this.$router.push("/login");
    } else {
      this.actionSetEmail(localStorage.currentEmail);
      this.actionFetchTasks();
    }
  }

  public get isFetching(): boolean {
    return this.stateIsFetchingTasks;
  }
}
</script>

<style lang="scss" scoped>
.btn--add {
  display: inline-block;
  position: fixed;
  right: 50px;
  bottom: 50px;
  width: 50px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(0.9);
  }
}
.lists {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 50px;
}
.spinner {
  display: flex;
  justify-content: center;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translateX(50%);
}
</style>
