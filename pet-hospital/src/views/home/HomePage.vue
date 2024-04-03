<script setup lang="ts">
import HomeAside from '@/components/homeLayout/HomeAside.vue'
import HomeHeader from '@/components/homeLayout/HomeHeader.vue'
import { RouterView } from 'vue-router'
import { getUserInfo } from '@/api/users/getUserInfo'

onMounted(async () => {
  const data = await getUserInfo().then((res) => {
    //获取用户信息失败
    if (res.data.resultCode === 500) {
      ElMessage.error('获取用户信息失败')
      throw new Error('获取用户信息失败')
    }
    //获取用户信息成功成功
    return res.data
  })

  window.localStorage.setItem('nickName', data.data.nickName)
  window.localStorage.setItem('loginName', data.data.loginName)
  window.localStorage.setItem('introduceSign', data.data.introduceSign)
})
</script>

<template>
  <el-container>
    <HomeAside></HomeAside>
    <el-container class="header-and-main">
      <HomeHeader></HomeHeader>
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
