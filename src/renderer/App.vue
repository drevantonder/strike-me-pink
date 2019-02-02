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

html {
  overflow: hidden;
  min-height:100%;
  position:relative;
  margin-top: 12px;
}

body {
  margin: 0;
  font-family: 'Oxygen', sans-serif;
  height:100%;
}

#app {
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  overflow:hidden;
}
</style>
