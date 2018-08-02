<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #686868;
  /* margin-top: 60px; */
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  /*增加头部适配层*/

  body {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  #app {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
  }
  /* @supports (bottom: constant(safe-area-inset-bottom)) {
    body {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
    #app {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
  } */
}
</style>
