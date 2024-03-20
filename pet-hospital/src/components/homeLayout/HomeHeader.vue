<script setup lang="ts">
import { isCollapseInHome } from './isCollapseInHome'
import { useRouter } from 'vue-router'

const router = useRouter()

//跳转至用户信息页面
const toUserInfo = () => {
  router.push({ name: 'userInfo' })
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
      <el-avatar
        :size="36"
        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户昵称</el-dropdown-item>
          <el-dropdown-item @click="toUserInfo" divided>用户信息</el-dropdown-item>
          <el-dropdown-item divided>退出</el-dropdown-item>
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
