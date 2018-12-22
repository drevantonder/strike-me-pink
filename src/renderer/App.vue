<template>
  <div id="app">
    <el-container>
      <el-aside>
        <side-nav />
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import SideNav from './components/SideNav.vue'

export default {
  name: 'app',
  components: {
    SideNav
  }
}
</script>

<style lang="scss">
body {
 margin: 0;
 font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

#app {
  height: 100vh;
  .el-container {
    height: 100%;
  }
}
</style>
