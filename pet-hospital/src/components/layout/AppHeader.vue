<script setup lang="ts">
import { adminLogout } from '@/api/adminUser/adminLogout.js'
import { useTokenAndRoleStore } from '@/stores/tokenAndRole'
import { useRouter } from 'vue-router'
//导入侧边栏折叠状态
import { isCollapse } from './collapse'

const router = useRouter()

const nickName = window.localStorage.getItem('nickName')

//退出处理事件
const handleLogout = async () => {
  // 退出-弹窗确认  点确认:返回成功promise  点取消:返回失败promise
  await ElMessageBox.confirm('是否确认退出?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.error('操作已取消')
    return new Promise(() => {}) // 取消退出操作时,阻止代码向后执行
  })

  await adminLogout().catch(() => {})
  ElMessage.success('管理员已登出')
  useTokenAndRoleStore().saveTokenAndRole('', '') // 清空 token
  // 清空用户信息
  window.localStorage.setItem('nickName', '')
  window.localStorage.setItem('loginName', '')
  window.localStorage.setItem('introduceSign', '')
  window.localStorage.setItem('passwordMd5', '')
  router.push('/manage-login') // 跳转到登录页
}
</script>

<template>
  <el-header>
    <!-- 使用图标, 并进行条件渲染 -->
    <!-- 绑定事件, 控制侧边栏折叠状态 -->
    <el-icon @click="isCollapse = !isCollapse">
      <IEpFold v-if="!isCollapse" />
      <IEpExpand v-else />
    </el-icon>

    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
      <el-breadcrumb-item>promotion list</el-breadcrumb-item>
      <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 下拉菜单,用户登录信息展示 -->
    <el-dropdown>
      <el-avatar
        :size="36"
        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ nickName }}</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<style lang="scss" scoped>
/* 头部内容水平排列, 垂直居中 */
.el-header {
  display: flex;
  align-items: center;
  background-color: #eee;

  // 图标右边距
  .el-icon {
    margin-right: 17px;
  }

  .el-dropdown {
    margin-left: auto;
  }
}
</style>
