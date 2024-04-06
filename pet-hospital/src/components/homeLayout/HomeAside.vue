<script setup lang="ts">
import { isCollapseInHome } from './isCollapseInHome'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <el-aside>
    <!-- collapse控制是否折叠, unique-opended表示是否只能同时展开一个子菜单 添加router属性 -->
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapseInHome" unique-opened router>
      <!-- 添加logo -->
      <a href="/" class="logo">
        <img src="@/assets/hospital.svg" alt="" />
        <h1></h1>
      </a>

      <el-menu-item @click="router.push({ name: 'guide' })">
        <el-icon><IEpView /></el-icon> <span>医院导览</span>
      </el-menu-item>

      <el-menu-item @click="router.push({ name: 'chooseRole' })">
        <el-icon><IEpPieChart /></el-icon> <span>职能扮演</span>
      </el-menu-item>

      <el-menu-item @click="router.push({ name: 'caseStudy' })">
        <el-icon><IEpNotebook /></el-icon> <span>病例学习</span>
      </el-menu-item>

      <el-menu-item @click="router.push({ name: 'testInfo' })">
        <el-icon><IEpTickets /></el-icon> <span>试题测试</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style lang="scss">
.el-aside {
  background-color: #f1f6fa;
  height: 100vh;
  width: auto;
}

// 设置logo样式
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  height: 80px;
  img {
    width: 50px;
    height: 50px;
  }
}

// 设置菜单样式
.el-menu {
  background-color: #f1f6fa;
  border-right: none;
  width: 200px;
  &.el-menu--collapse {
    width: 60px;
    & h1 {
      display: none;
    }
  }
}
</style>
