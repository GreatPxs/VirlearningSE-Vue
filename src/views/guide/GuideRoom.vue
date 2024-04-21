<template>
  <div class="room-page">
    <el-button id="exit" @click="$router.push({ name: 'guide' })">退出</el-button>
    <div class="roomcanvas" ref="roomTarget"></div>
    <el-button-group class="feature_group">
      <el-button id="feature">功能说明</el-button>
      <el-button id="procedure">操作流程</el-button>
      <el-button id="animation">演示动画</el-button>
    </el-button-group>

    <el-select class="rolechoose" v-model="value" placeholder="选择职业" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        @change="handleChange"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as Three from 'three'
// import baseModel from '@/api/guide/baseModel.js'
import modelList from '@/api/guide/modelList.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
const value = ref([])
const roomTarget = ref(null)
const route = useRoute()
//模型名
const { name } = route.query
//模型路径
const path = ref(null)
//场景
const scene = new Three.Scene()
//环境光
const ambient = new Three.AmbientLight(0xffffff, 0.4)
// const directionLight = new Three.DirectionLight(0xffffff, 3.5)
//模型加载器
const loader = new GLTFLoader()
const model = new Three.Group()
//画布大小
const width = window.innerWidth - 350
const height = window.innerHeight - 80
//摄像机

const camera = new Three.PerspectiveCamera(30, width / height, 1, 3000)
const camera_position = ref(null)
const camera_lookAt = ref(null)
//渲染器
const renderer = new Three.WebGLRenderer({
  alpha: true
})
renderer.setSize(width, height, true)

//后处理对象
// const composer = new EffectComposer(renderer)
onBeforeMount(() => {
  // console.log('modelList: ')
  // console.log(modelList)
  console.log('name: ' + name)
  for (let c of modelList) {
    if (c.name === name) {
      path.value = c.filePath
      camera_position.value = c.cameraPosition
      camera_lookAt.value = c.cameraLookAt
      // console.log(camera_position.value)
      // console.log(camera_lookAt.value)
      break
    }
  }
  //添加环境光
  scene.add(ambient)
  // scene.add(directionLight)
  //载入模型
  loader.load(path.value, function (gltf) {
    model.add(gltf.scene)
  })
  scene.add(model)
  //设置相机
  camera.position.set(camera_position.value[0], camera_position.value[1], camera_position.value[2])
  camera.lookAt(camera_lookAt.value[0], camera_lookAt.value[1], camera_lookAt.value[2])
  //设置渲染器
  render()
  //设置后处理对象
})
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
onMounted(() => {
  roomTarget.value.appendChild(renderer.domElement)
  // console.log(path.value)
  // console.log(model)
})
const options = [
  {
    value: 'veterinary',
    label: '兽医'
  },
  {
    value: 'assistance',
    label: '医助'
  },
  {
    value: 'reception',
    label: '前台'
  }
]
const handleChange = (value) => {
  console.log(value)
}
</script>
<style lang="scss" scoped>
.room-page {
  position: relative;
}
.roomcanvas {
  height: 780px;
  z-index: -1;
}
.rolechoose {
  z-index: 2;
  position: absolute;
  top: 5%;
  right: 5%;
  width: 140px;
  height: 32px;
}
.feature_group {
  position: absolute;
  top: 75%;
  right: 5%;
}
</style>
