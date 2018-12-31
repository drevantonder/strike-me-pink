<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oxygen');

body {
 margin: 0;
 font-family: 'Oxygen', sans-serif;
}

#app {
  height: 100vh;
  .el-container {
    height: 100%;
  }
}
</style>
