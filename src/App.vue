<template>
  <div id="app">
    <portal-target name="root" />
    <main-component />
  </div>
</template>

<script>
import Main from './components/Main.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    MainComponent: Main
  },

  created () {
    this.init()
  },

  methods: mapActions(['init'])
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Oxygen');

html {
  overflow: hidden;
  min-height:100%;
  position:relative;
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
}
</style>
