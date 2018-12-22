<template>
  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    style="height: 100%;">
    <el-menu-item index="1">
      <span>Navigator One</span>
    </el-menu-item>
    <el-menu-item index="2">
      <span>Navigator Two</span>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <span>Navigator Three</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>Navigator Four</span>
    </el-menu-item>
  </el-menu>
</template>


<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
