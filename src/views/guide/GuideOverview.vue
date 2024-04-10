// eslint-disable-next-line vue/multi-word-component-names
<template>
  <!--  <div ref="webgl"></div> -->
  <div id="canvas" ref="webgl"></div>
  <!--   <div id="inpatient">住院部</div>
  <div id="document">档案室</div>
  <div id="consult1">诊室1</div> -->
</template>

<script setup lang="ts" defer="true">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import renderer from '@/api/guide/overview.js'
const router = useRouter()
const webgl = ref(null)

onMounted(() => {
  webgl.value.appendChild(renderer.domElement)
  renderer.setClearAlpha(0.0)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '70px'
  renderer.domElement.style.left = '210px'
})
</script>
<style lang="scss" scoped>
canvas {
  z-index: -1;
  margin: 0px;
  overflow: hidden;
  /*  background-color: aquamarine; */
}
</style>
