<script setup lang="ts">
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <el-container>
    <AppAside></AppAside>
    <el-container class="header-and-main">
      <AppHeader></AppHeader>
      <el-main>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
//控制header和main的布局方向
.header-and-main {
  flex-direction: column;
  height: 100vh;
}
</style>
