<template>
  <div class="room-page">
    <el-button id="exit" @click="$router.push({ name: 'guide' })" v-show="exitToOverview"
      >退出</el-button
    >
    <el-button
      id="return"
      @click="$router.push({ name: 'rolePage', params: { role: role } })"
      v-show="returnToRoleChoose"
      >返回</el-button
    >
    <div class="roomcanvas" ref="roomTarget"></div>
    <el-button-group class="feature_group" v-show="featureShow">
      <el-button id="feature" @click="featureDialogVisible = true">功能说明</el-button>
      <el-button id="procedure" @click="procedureDialogVisible = true">操作流程</el-button>
      <el-button id="animation" @click="animationDialogVisible = true">演示动画</el-button>
    </el-button-group>
    <el-dialog
      v-model="featureDialogVisible"
      title="功能说明"
      custom-class="content-dialog"
      center
      align-center
      draggable
    >
      <span>{{ deviceObj.feature }}</span>
    </el-dialog>
    <el-dialog
      v-model="procedureDialogVisible"
      title="操作流程"
      custom-class="content-dialog"
      center
      align-center
      draggable
    >
      <span>{{ deviceObj.procedure }}</span>
    </el-dialog>
    <el-dialog v-model="animationDialogVisible" title="演示动画" width="800" center draggable>
      <span>{{ deviceObj.animation }}</span>
    </el-dialog>
    <el-select
      class="rolechoose"
      v-model="value"
      placeholder="选择职业"
      size="large"
      :disabled="isDisabled"
    >
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
import deviceList from '@/api/guide/deviceList.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

const featureDialogVisible = ref(false)
const animationDialogVisible = ref(false)
const procedureDialogVisible = ref(false)
const isDisabled = ref(false)
const exitToOverview = ref(true)
const returnToRoleChoose = ref(false)
const featureShow = ref(false)
const roomTarget = ref(null)
const route = useRoute()
//模型名
const { name, role } = route.query
const value = ref(role)
const unavailable = {
  name: 'NON',
  role: 'NON',
  feature: '请先选择角色',
  procedure: '请先选择角色',
  animation: '请先选择角色'
}
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
const ambient = new Three.AmbientLight(0xffffff, 1.5)
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
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
const v2 = new Three.Vector2(window.innerWidth, window.innerHeight)
const outlinePass = new OutlinePass(v2, scene, camera)
outlinePass.visibleEdgeColor.set(0x00ffff)
outlinePass.edgeThickness = 4
outlinePass.edgeStrength = 6
composer.addPass(outlinePass)
//标签对象
const css2renderer = new CSS2DRenderer()
css2renderer.render(scene, camera)
css2renderer.setSize(width, height)
css2renderer.domElement.style.position = 'absolute'
css2renderer.domElement.style.top = 0
css2renderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(css2renderer.domElement)
//点击事件
var deviceObj = ref(null)
renderer.domElement.addEventListener('click', (event) => {
  scene.traverse((one) => {
    if (one.isCSS2DObject) {
      scene.remove(one)
    }
  })
  const px = event.offsetX
  const py = event.offsetY
  const x = (px / width) * 2 - 1
  const y = -(py / height) * 2 + 1
  const raycaster = new Three.Raycaster()
  raycaster.setFromCamera(new Three.Vector2(x, y), camera)
  const intersects = raycaster.intersectObjects(model.children)
  // console.log('返回对象', intersects)
  if (intersects.length > 0) {
    let obj = intersects[0].object
    console.log(obj.parent)
    if (
      obj.name != 'floor' &&
      obj.parent.name != 'Scene' &&
      obj.parent.name != '' &&
      !obj.parent.name.includes('墙') &&
      !obj.parent.name.includes('天花板') &&
      !obj.parent.name.includes('地面') &&
      !obj.parent.name.includes('椅') &&
      !obj.parent.name.includes('实验桌') &&
      !obj.parent.name.includes('大门')
    ) {
      obj = obj.parent
      console.log(value.value)
      deviceObj.value = findDevice(obj.name.replace(/[0-9]+/g, ''), value.value)
      console.log('inner', deviceObj.value)
      featureShow.value = true
      outlinePass.selectedObjects = [obj]
      /* if (innerObj.value == obj.name) {
        // console.log('already choose')
      } */
      let dom = createDiv(obj.name.replace(/[0-9]+/g, ''))
      let css2dobject = new CSS2DObject(dom)
      const v3 = new Three.Vector3()
      obj.getWorldPosition(v3)
      css2dobject.position.set(v3.x, v3.y, v3.z)
      scene.add(css2dobject)
      render()
    } else {
      // console.log('floor') /* empty */
    }
  } else {
    featureShow.value = false
    outlinePass.selectedObjects = []
    deviceObj.value = null
    console.log(deviceObj.value)
  }
})
//设备对应
function findDevice(name, role) {
  if (role == undefined) {
    return unavailable
  }
  for (let c of deviceList) {
    // console.log(c)
    if (c.name === name && c.role === role) return c
  }
}

watch(value, (newValue, oldValue) => {
  if (newValue != oldValue) {
    console.log(value.value)
    if (deviceObj.value !== null) {
      deviceObj.value = findDevice(deviceObj.value.name, newValue)
      console.log(deviceObj.value)
    }
  }
})
onBeforeMount(() => {
  // console.log('modelList: ')
  // console.log(modelList)
  console.log('role: ' + role)
  console.log('name: ' + name)
  if (role !== undefined) {
    exitToOverview.value = false
    returnToRoleChoose.value = true
    isDisabled.value = true
  }
  for (let c of modelList) {
    if (c.name === name.replace(/[0-9]+/g, '')) {
      path.value = c.filePath
      camera_position.value = c.cameraPosition
      camera_lookAt.value = c.cameraLookAt
      light_position.value = c.lightPosition
      minDistance.value = c.minDistance
      maxDistance.value = c.maxDistance
      break
    }
  }
  //添加坐标系
  // scene.add(axesHelper)
  //添加环境光
  scene.add(ambient)
  directionalLight.position.set(
    light_position.value[0],
    light_position.value[1],
    light_position.value[2]
  )
  scene.add(directionalLight)
  //模型载入
  loader.load(path.value, function (gltf) {
    model.add(gltf.scene)
  })
  scene.add(model)
  // console.log(model)
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
  //禁止移动
  controls.enablePan = false
  //缩放范围
  controls.minDistance = minDistance.value
  controls.maxDistance = maxDistance.value
  controls.update()
  //自动刷新
  controls.addEventListener('change', function () {
    renderer.render(scene, camera)
  })

  //设置渲染器
  render()
  //设置后处理对象
})
//监听窗口变化
window.onresize = function () {
  const width = window.innerWidth - 350
  const height = window.innerHeight - 80
  renderer.setSize(width, height)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
//渲染循环
function render() {
  composer.render()
  //renderer.render(scene, camera)
  css2renderer.render(scene, camera)
  requestAnimationFrame(render)
}
//创建标签
function createDiv(name) {
  let dom = document.createElement('div')
  dom.style.padding = '5px 10px'
  dom.style.border = '1px solid skyblue'
  dom.style.color = 'black'
  dom.style.background = '#E6E6FA'
  dom.innerHTML = name
  return dom
}
onMounted(() => {
  roomTarget.value.appendChild(renderer.domElement)
  // console.log(role)
  // console.log(path.value)
  // console.log(model)
})
//清除画布
function clearScene() {
  cancelAnimationFrame(render)
  scene.traverse((child) => {
    if (child.material) {
      child.material.dispose()
      child = null
    }
  })
  renderer.forceContextLoss()
  renderer.dispose()
  scene.clear()
  // camera = null
  // controls = null
}
onBeforeUnmount(() => {
  clearScene()
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
// function nameJudge(name){

// }
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
.content-dialog {
  width: fit-content !important;
  max-width: 100% !important;
}
.feature_group {
  position: absolute;
  top: 75%;
  right: 5%;
}
</style>
