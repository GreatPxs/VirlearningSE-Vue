<script setup lang="ts">
import HomeAside from '@/components/homeLayout/HomeAside.vue'
import HomeHeader from '@/components/homeLayout/HomeHeader.vue'
import { RouterView } from 'vue-router'
import { getUserInfo } from '@/api/users/getUserInfo'
import { onMounted } from 'vue'
//import * as THREE from 'three'

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

//TODO: guide test
/* const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

function animate() {
  requestAnimationFrame(animate)

  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, camera)
}

animate() */

//test end
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
