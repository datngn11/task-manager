module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/scss/common.scss";`
      }
    }
  }
};
