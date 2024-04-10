// eslint-disable-next-line vue/multi-word-component-names
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import renderer from '@/api/guide/overview.js'
const router = useRouter()
const webgl = ref(null)
onMounted(() => {
  webgl.value.appendChild(renderer.domElement)
})
</script>

<template>
  <!--  <div ref="webgl"></div> -->
  <div id="canvas" ref="webgl"></div>
</template>

<style lang="scss" scoped>
canvas {
  margin: 0px;
  overflow: hidden;
  /* background-color: aquamarine; */
}
</style>
