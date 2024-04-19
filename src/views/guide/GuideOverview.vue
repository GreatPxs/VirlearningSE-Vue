// eslint-disable-next-line vue/multi-word-component-names

<template>
  <el-button
    id="enter"
    type="primary"
    @click="$router.push({ name: 'guideroom', query: { name: chooseObj } })"
    >进入科室</el-button
  >
  <div id="webgl" ref="webgl"></div>
</template>

<script setup lang="ts" defer="true">
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { renderer, chooseObj, clearnModel, clearScene } from '@/api/guide/overview.js'
const router = useRouter()

const webgl = ref(null)
// let obj = ref(chooseObj.value)
// watch(chooseObj, (newValue, oldValue) => {
//   console.log('outside:' + newValue)
// })

console.log(name)

onBeforeMount(() => {
  if (location.href.indexOf('#reloaded') === -1) {
    location.href = location.href + '#reloaded'
    location.reload()
  }
})
onMounted(() => {
  webgl.value.appendChild(renderer.domElement)
  // obj.value = chooseObj.value
  // console.log('outside', obj.value)
  //console.log('outside', chooseObj)
})
onBeforeUnmount(()=>{
  clearScene()
})
</script>

<style lang="scss" scoped>
#enter {
  position: fixed;
  right: 5%;
  bottom: 10%;
  z-index: 999;
}
#canvas {
  position: relative;
  z-index: -1;
  margin: 0px;
  overflow: hidden;
  top: 1%;
  left: 1%;
}
</style>
