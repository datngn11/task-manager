<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("./styles/scss/normalize.scss");
.app {
  width: 100%;
  height: 100%;
  background: url("assets/img/bg-main.jpg") center no-repeat;
  background-size: cover;
}
</style>
