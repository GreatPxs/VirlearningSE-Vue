//import { ref } from 'vue'
import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//创建场景
const scene = new Three.Scene()
//创建物体
const geometry = new Three.BoxGeometry(100, 100, 100)
const material = new Three.MeshLambertMaterial({
  color: 0x00ff00
})
const mesh = new Three.Mesh(geometry, material)
scene.add(mesh)
//创建坐标系
const axesHelper = new Three.AxesHelper(100)
scene.add(axesHelper)

const pointLight = new Three.PointLight(0xffffff, 1.0)
pointLight.position.set(400, 200, 300)
scene.add(pointLight)
//画布尺寸
/* const v = document.getElementById('canvas')
console.log(v.width) */
const width = window.innerWidth
const height = window.innerHeight

//创建相机
const camera = new Three.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)

//渲染器
const renderer = new Three.WebGLRenderer()
renderer.setSize(width, height, true)
renderer.render(scene, camera)

//相机控件
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', function () {
  renderer.render(scene, camera)
})

export default renderer
