<script setup lang="ts">
import AppAside from './AppAside.vue'
import AppHeader from './AppHeader.vue'
import { RouterView } from 'vue-router'
import { getAdminUserInfo } from '@/api/adminUser/getAdminUserInfo'

onMounted(async () => {
  const data = await getAdminUserInfo().then((res) => {
    //获取管理员信息失败
    if (res.data.resultCode === 500) {
      ElMessage.error('获取管理员信息失败')
      throw new Error('获取管理员信息失败')
    }
    //获取管理员信息成功成功
    return res.data
  })

  window.localStorage.setItem('nickName', data.data.nickName)
  window.localStorage.setItem('loginName', data.data.loginUserName)
  window.localStorage.setItem('introduceSign', data.data.introduceSign)
})
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
