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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const value = ref([])
const roomTarget = ref(null)
const route = useRoute()
//模型名
const { name } = route.query
//模型参数
const camera_position = ref(null)
const camera_lookAt = ref(null)
const light_position = ref(null)
const minDistance = ref(null)
const maxDistance = ref(null)
//模型路径
const path = ref(null)
//场景
const scene = new Three.Scene()
//环境光
const ambient = new Three.AmbientLight(0xffffff, 1.0)
//const spotLight = new Three.SpotLight(0xffffff, 1.0)
const directionalLight = new Three.DirectionalLight(0xffffff, 1.5)

//模型加载器
const loader = new GLTFLoader()
const model = new Three.Group()
//画布大小
const width = window.innerWidth - 350
const height = window.innerHeight - 80
//坐标系
const axesHelper = new Three.AxesHelper(20)
//摄像机

const camera = new Three.PerspectiveCamera(30, width / height, 1, 3000)

//渲染器
const renderer = new Three.WebGLRenderer({
  alpha: true
})
//相机控件
const controls = new OrbitControls(camera, renderer.domElement)
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
      light_position.value = c.lightPosition
      minDistance.value = c.minDistance
      maxDistance.value = c.maxDistance
      console.log(light_position.value)
      // console.log(camera_position.value)
      // console.log(camera_lookAt.value)
      break
    }
  }
  //添加坐标系
  scene.add(axesHelper)
  //添加环境光
  scene.add(ambient)
  //spotLight.position.set(light_position.value[0], light_position.value[1], light_position.value[2])
  /* spotLight.target.position.set(
    camera_lookAt.value[0],
    camera_lookAt.value[1],
    camera_lookAt.value[2]
  ) */
  directionalLight.position.set(light_position.value[0], light_position.value[1], light_position.value[2])
  scene.add(directionalLight)
  //scene.add(spotLight)
  // scene.add(directionLight)
  //载入模型
  // loader.load(attributes.path, function (gltf) {
  //   model.add(gltf.scene)
  // })
  loader.load(path.value, function (gltf) {
    model.add(gltf.scene)
  })
  scene.add(model)
  console.log(model)
  //设置相机
  camera.position.set(camera_position.value[0], camera_position.value[1], camera_position.value[2])
  camera.lookAt(camera_lookAt.value[0], camera_lookAt.value[1], camera_lookAt.value[2])
  //设置控件
  controls.target.set(camera_lookAt.value[0], camera_lookAt.value[1], camera_lookAt.value[2])
  //阻尼
  // controls.enableDamping = true
  // controls.dampingFactor = 0.05
  //拖动速度
  controls.rotateSpeed = 0.15
  //缩放范围
  controls.minDistance = minDistance.value
  controls.maxDistance = maxDistance.value
  controls.update()
  controls.addEventListener('change', function () {
    renderer.render(scene, camera)
  })

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
