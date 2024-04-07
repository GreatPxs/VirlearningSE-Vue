import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//创建场景
const scene = new Three.Scene()
scene.background = new Three.Color('#FFFFFF')
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
/* //光源
const pointLight = new Three.PointLight(0xffffff, 1.0)
pointLight.position.set(400, 200, 250)
scene.add(pointLight) */

// 平行光
const directionalLight = new Three.DirectionalLight(0xffffff, 1)
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50)
// 方向光默认指向xyz坐标原点
scene.add(directionalLight)

//画布尺寸
/* const v = document.getElementById('canvas')
console.log(v.width) */
const width = window.innerWidth
const height = window.innerHeight

//创建相机
const camera = new Three.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(200, 200, 200)
camera.lookAt(scene.position)

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
