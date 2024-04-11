<script setup lang="ts">
//导入侧边栏折叠状态
import { isCollapse } from './collapse'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <el-aside>
    <el-scrollbar>
      <!-- collapse控制是否折叠, unique-opended表示是否只能同时展开一个子菜单 添加router属性 -->
      <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened router>
        <!-- 添加logo -->
        <a href="/aside" class="logo">
          <img src="@/assets/hospital.svg" alt="" />
          <h1>后台管理</h1>
        </a>

        <el-menu-item @click="router.push({ name: 'users' })">
          <el-icon><IEpMonitor /></el-icon> <span>用户管理</span>
        </el-menu-item>

        <el-menu-item @click="router.push({ name: 'caseIndex' })">
          <el-icon><IEpEdit /></el-icon> <span>病例管理</span>
        </el-menu-item>

        <el-sub-menu index="5">
          <template #title>
            <el-icon> <IEpSchool /> </el-icon> <span>医院管理</span>
          </template>
          <el-menu-item @click="router.push({ name: 'roomIndex' })">
            <span>科室管理</span>
          </el-menu-item>
          <el-menu-item @click="router.push({ name: 'rolesIndex' })">
            <span>员工管理</span>
          </el-menu-item>
          <el-menu-item @click="router.push({ name: 'drugIndex' })">
            <span>药物管理</span>
          </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="6">
          <template #title>
            <el-icon> <IEpDocumentAdd /> </el-icon> <span>测试管理</span>
          </template>
          <el-menu-item @click="router.push({ name: 'questionIndex' })">
            <span>题库管理</span>
          </el-menu-item>
          <el-menu-item @click="router.push({ name: 'testPaperIndex' })">
            <span>试卷管理</span>
          </el-menu-item>
          <el-menu-item @click="router.push({ name: 'testIndex' })">
            <span>考试管理</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss">
.el-aside {
  background-color: #eee;
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
    width: 40px;
    height: 40px;
  }
}

// 设置菜单样式
.el-menu {
  background-color: #eee;
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
