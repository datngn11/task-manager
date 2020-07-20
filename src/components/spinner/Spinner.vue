<template>
  <div>
    <div class="bt-spinner"></div>
  </div>
</template>

<script>
export default {
  name: "Spinner"
};
</script>

<style lang="scss">
.bt-spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: transparent;
  border: 3px solid #222;
  border-top-color: $base-color;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
