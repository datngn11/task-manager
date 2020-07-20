<template>
  <header class="header">
    <div class="email">
      <span> {{ currentEmail }} </span>
    </div>
    <router-link to="/newList" class="add-list-btn">Add list</router-link>
    <span @click="logout" class="logout">Log Out</span>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class TopPanel extends Vue {
  currentEmail = localStorage.currentEmail;

  logout() {
    delete localStorage.currentEmail;
    this.$router.push("/login");
    this.$store.dispatch("removeEmail");
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 9px 3px rgba(41, 41, 41, 0.25);
  background-color: #fff;
  color: $main-font-color;
}
.add-list-btn {
  text-decoration: none;
  color: $main-font-color;
  padding: 15px;
  &:hover {
    background: #f1f1f1;
  }
}

.logout {
  display: inline-block;
  padding: 5px 15px;
  background-color: $base-color;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: $base-color-darker;
  }
}
</style>
