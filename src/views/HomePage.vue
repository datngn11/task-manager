<template>
  <div class="container">
    <TopPanel />
    <TasksList />
    <router-view :key="$route.params.id" />
    <router-link to="/new" class="btn--add">
      <img src="@/assets/img/icon-add.svg" alt="" />
    </router-link>
  </div>
</template>

<script lang="ts">
import TasksList from "@/components/tasks/TasksList.vue";
import TopPanel from "@/components/panels/TopPanel.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { TasksList, TopPanel }
})
export default class HomePage extends Vue {
  created() {
    if (!localStorage.currentEmail) {
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss" scopedSlot>
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
</style>
