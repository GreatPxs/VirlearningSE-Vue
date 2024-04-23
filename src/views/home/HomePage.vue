<script setup lang="ts">
import HomeAside from '@/components/homeLayout/HomeAside.vue'
import HomeHeader from '@/components/homeLayout/HomeHeader.vue'
import { RouterView } from 'vue-router'
import { useUserInfoStore } from '@/stores/userInfo'

const userInfoToken = useUserInfoStore()

const nickName = userInfoToken.nickName
const avatar = userInfoToken.avatar
</script>

<template>
  <el-container>
    <HomeAside></HomeAside>
    <el-container class="header-and-main">
      <HomeHeader :nick-name="nickName" :avatar="avatar"></HomeHeader>
      <el-main class="main">
        <RouterView></RouterView>
      </el-main>
      <!-- <RouterView></RouterView> -->
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.header-and-main {
  flex-direction: column;
  height: 100vh;
}

.main {
  background-color: #fff;
}
</style>
