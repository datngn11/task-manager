<template>
  <div class="container">
    <TopPanel />
    <!-- <TasksList /> -->
    <div class="lists">
      <CardsList
        v-for="list in lists"
        :key="list.id"
        :listId="list.id"
        :title="list.title"
        :list="list"
      />
    </div>
    <router-view :key="$route.params.id" />
    <router-link to="/new" class="btn--add">
      <img src="@/assets/img/icon-add.svg" alt="" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import TasksList from "@/components/tasks/TasksList.vue";
import TopPanel from "@/components/panels/TopPanel.vue";
import CardsList from "@/components/lists/CardsList.vue";
import { ICardsList } from "@/interfaces/entities";
import Spinner from "@/components/spinner/Spinner.vue";

const cardsModule = namespace("cards");

@Component({
  components: { TasksList, TopPanel, CardsList, Spinner }
})
export default class HomePage extends Vue {
  @cardsModule.Action("fetchImg") actionFetchImg;
  @cardsModule.Getter("lists") getterLists;

  created() {
    if (!localStorage.currentEmail) {
      this.$router.push("/login");
    }
    this.actionFetchImg();
  }

  public get lists(): ICardsList {
    return this.getterLists;
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
.lists {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 50px;
}
</style>
