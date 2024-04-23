<script setup lang="ts">
import { isCollapseInHome } from './isCollapseInHome'
import { useRouter } from 'vue-router'
import { logout } from '@/api/users/logout.js'
import { useTokenAndRoleStore } from '@/stores/tokenAndRole'
import { computed } from 'vue'

const router = useRouter()
const nickName = computed(() => window.localStorage.getItem('nickName'))
const avatar = computed(() => window.localStorage.getItem('avatar'))

//跳转至用户信息页面
const toUserInfo = () => {
  router.push({ name: 'userInfo' })
}

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

  await logout().catch(() => {})
  ElMessage.success('用户已登出')
  useTokenAndRoleStore().saveTokenAndRole('', '') // 清空 token
  // 清空用户信息
  window.localStorage.clear()
  router.push('/login') // 跳转到登录页
}
</script>

<template>
  <el-header>
    <!-- 使用图标, 并进行条件渲染 -->
    <!-- 绑定事件, 控制侧边栏折叠状态 -->
    <el-icon @click="isCollapseInHome = !isCollapseInHome">
      <IEpFold v-if="!isCollapseInHome" />
      <IEpExpand v-else />
    </el-icon>

    <!-- 下拉菜单,用户登录信息展示 -->
    <el-dropdown>
      <el-avatar :size="36" :src="avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>{{ nickName }}</el-dropdown-item>
          <el-dropdown-item @click="toUserInfo" divided>个人中心</el-dropdown-item>
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
  background-color: #f1f6fa;

  // 图标右边距
  .el-icon {
    margin-right: 17px;
  }

  .el-dropdown {
    margin-left: auto;
  }
}
</style>
@/api/users/logout.js
