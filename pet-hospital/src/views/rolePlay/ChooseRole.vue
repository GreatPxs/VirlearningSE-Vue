<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const getImg = (name) => {
  return `/src/assets/${name}.svg`
}

const roles = reactive([
  {
    roleName: '前台',
    roleIcon: getImg('reception'),
    flowChart: ''
  },
  {
    roleName: '医助',
    roleIcon: getImg('assistance'),
    flowChart: ''
  },
  {
    roleName: '兽医',
    roleIcon: getImg('veterinary'),
    flowChart: ''
  }
])
</script>

<template>
  <div class="title">
    <img src="@/assets/actor.svg" />
    <p>选择职能</p>
  </div>
  <div class="content">
    <el-card style="max-width: 150px" v-for="(role, index) in roles" :key="index">
      <img :src="role.roleIcon" alt="图片加载失败" style="width: 100%" />
      <template #footer>
        <el-button color="#1aaba8" @click="router.push({ name: 'rolePage' })">{{
          role.roleName
        }}</el-button>
      </template>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: bold;
  color: #737478;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 160px;

  position: relative;

  left: 40px;
  top: 40px;
  img {
    width: 60px;
    height: 60px;
  }
}

.content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  margin-top: 160px;
}

.el-button {
  width: 100%;
  text-align: center;
  font-size: 20px;
}
</style>
