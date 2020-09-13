<template>
  <div class="container">
    <TopPanel />
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
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import TopPanel from "@/components/panels/TopPanel.vue";
import CardsList from "@/components/lists/CardsList.vue";
import { ICardsList } from "@/interfaces/entities";
import Spinner from "@/components/spinner/Spinner.vue";

const cardsModule = namespace("cards");

@Component({
  components: { TopPanel, CardsList, Spinner }
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

<style lang="scss" scoped>
.lists {
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 50px;
}
</style>
