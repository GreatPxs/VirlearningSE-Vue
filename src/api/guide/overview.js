import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
//创建场景
const scene = new Three.Scene()
scene.background = new Three.Color('#CCCCCC')

//GLTF加载器
const loader = new GLTFLoader()
loader.load('/public/overview.gltf', function (gltf) {
  console.log('控制台查看加载gltf文件返回的对象结构', gltf)
  console.log('gltf对象场景属性', gltf.scene)
  scene.add(gltf.scene)
})

/* // 递归遍历所有模型节点批量修改材质
gltf.scene.traverse(function (obj) {
  if (obj.isMesh) {
    //判断是否是网格模型
    console.log('模型节点', obj)
    console.log('模型节点名字', obj.name)
  }
}) */

//创建物体
/* const geometry = new Three.BoxGeometry(100, 100, 100)
const material = new Three.MeshLambertMaterial({
  color: 0x00ff00
})
const mesh = new Three.Mesh(geometry, material)
scene.add(mesh) */
//创建坐标系
/* const axesHelper = new Three.AxesHelper(30)
scene.add(axesHelper) */
/* //光源
const pointLight = new Three.PointLight(0xffffff, 1.0)
pointLight.position.set(400, 200, 250)
scene.add(pointLight) */

// 平行光
const directionalLight = new Three.DirectionalLight(0xffffff, 5.5)
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 50, 0)
// 方向光默认指向xyz坐标原点
scene.add(directionalLight)

//画布尺寸
/* const v = document.getElementById('canvas')
console.log(v.width) */
const width = window.innerWidth
const height = window.innerHeight

//创建相机
const obj = {
  x: 0,
  y: 0,
  z: -5
}

const camera = new Three.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(0, 80, 0)
camera.lookAt(obj.x, obj.y, obj.z)

//渲染器
const renderer = new Three.WebGLRenderer()
renderer.setSize(width, height, true)
renderer.render(scene, camera)

//相机控件
const controls = new OrbitControls(camera, renderer.domElement)
//controls.enableRotate = false
controls.target.set(obj.x, obj.y, obj.z)
controls.update()
controls.addEventListener('change', function () {
  renderer.render(scene, camera)
})

//监听窗口变化
window.onresize = function () {
  const width = window.innerWidth
  const height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

//gui对象
const gui = new GUI()
//const camFolder = gui.addFolder('相机坐标')
gui.add(directionalLight, 'intensity', 0, 10)
/* camFolder.close()
camFolder.add(obj, 'x').min(-50).max(50).step(1).name('相机x坐标')
camFolder.add(obj, 'y').min(-50).max(50).step(1).name('相机y坐标')
camFolder.add(obj, 'z').min(-50).max(50).step(1).name('相机z坐标') */

export default renderer
