<script setup lang="ts">
import HomeAside from '@/components/homeLayout/HomeAside.vue'
import HomeHeader from '@/components/homeLayout/HomeHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <el-container>
    <HomeAside></HomeAside>
    <el-container class="header-and-main">
      <HomeHeader></HomeHeader>
      <el-main class="main">
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}

.main {
  background-color: #f3f3f3;
}
</style>
