// eslint-disable-next-line vue/multi-word-component-names

<script setup lang="ts" defer="true">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import renderer from '@/api/guide/overview.js'
import { render } from 'vue'
const router = useRouter()
const webgl = ref(null)
onMounted(() => {
  renderer.domElement.style.zindex = -1
  renderer.domElement.style.top = '115px'
  renderer.domElement.style.position = 'absolute'

  //renderer.domElement.style.left = '210px'
  webgl.value.appendChild(renderer.domElement)
  //renderer.setClearAlpha(0.0)
})

</script>
<template>
  <el-button id="enter" type="primary" @click="enter">进入科室</el-button>
  <div id="canvas" ref="webgl"></div>
</template>
<style lang="scss" scoped>
/* enter {
  position: absolute;
  left: 1250px;
  z-index: 999;
} */
canvas {
  position: absolute;
  z-index: -1;
  margin: 0px;
  overflow: hidden;
  top: 0%;
  left: 0%;
  /*  background-color: aquamarine; */
}
</style>
