<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import LoginForm from "@/components/forms/LoginForm.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: { LoginForm }
})
export default class LoginPage extends Vue {
  created() {
    if (localStorage.currentEmail) {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  @include respond-to(phone) {
    align-content: center;
  }
}
</style>
