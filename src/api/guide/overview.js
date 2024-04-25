import * as Three from 'three'
import model from './model.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import dictionary from './dictionary.js'
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

// console.log(dictionary)
//创建场景
const scene = new Three.Scene()
scene.add(model)

// 添加平行光源
const directionalLight = new Three.DirectionalLight(0xffffff, 3.5)
directionalLight.position.set(80, 50, 30)
scene.add(directionalLight)
// 添加环境光源
const ambient = new Three.AmbientLight(0xffffff, 0.4)
scene.add(ambient)

//画布尺寸
const width = window.innerWidth - 350
const height = window.innerHeight - 80

//创建相机
const campoint = {
  x: 0,
  y: 0,
  z: -5
}
// const enter_button = document.getElementById('#enter')
// console.log(enter_button)
const camera = new Three.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(0, 80, 0)
camera.lookAt(campoint.x, campoint.y, campoint.z)
//渲染器
const renderer = new Three.WebGLRenderer({
  alpha: true
})
renderer.setSize(width, height, true)

//const inner_inpatient = model.getObjectByName('inner_inpatient')
// 后处理对象
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
const v2 = new Three.Vector2(window.innerWidth, window.innerHeight)
const outlinePass = new OutlinePass(v2, scene, camera)
outlinePass.visibleEdgeColor.set(0x00ffff)
outlinePass.edgeThickness = 4
outlinePass.edgeStrength = 6
composer.addPass(outlinePass)
//标签渲染
const css2renderer = new CSS2DRenderer()
css2renderer.render(scene, camera)
css2renderer.setSize(width, height)
css2renderer.domElement.style.position = 'absolute'
css2renderer.domElement.style.top = 0
css2renderer.domElement.style.pointerEvents = 'none'
document.body.appendChild(css2renderer.domElement)

//渲染循环
function render() {
  composer.render()
  //renderer.render(scene, camera)
  //renderPass.render(scene, camera)
  css2renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

//相机控件
const controls = new OrbitControls(camera, renderer.domElement)
//controls.enableRotate = false
controls.target.set(campoint.x, campoint.y, campoint.z)
controls.update()
controls.addEventListener('change', function () {
  renderer.render(scene, camera)
})

//监听窗口变化
window.onresize = function () {
  const width = window.innerWidth - 350
  const height = window.innerHeight - 80
  renderer.setSize(width, height)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

//监听点击事件
//let chooseObj = null
var chooseObj = ref(null)
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
    //intersects[0].object.material.color.set(0xff0000)
    let obj = intersects[0].object

    if (obj.name != 'floor'&& !obj.name.includes('Text')) {
      // console.log(dictionary)
      for (let c of dictionary) {
        if (c.name == obj.name.replace(/[0-9]+/g, '')) {
          chooseObj.value = c.name_e
          break
        }
      }
      console.log('inside', chooseObj.value)
      outlinePass.selectedObjects = [obj]
      let dom = createDiv(obj.name)
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
    outlinePass.selectedObjects = []
    chooseObj.value = null
    console.log(chooseObj.value)
  }
})

function createDiv(name) {
  let dom = document.createElement('div')
  dom.style.padding = '5px 10px'
  dom.style.border = '1px solid skyblue'
  dom.style.color = 'black'
  dom.style.background = '#E6E6FA'
  dom.innerHTML = name
  return dom
}
//gui对象
/* const gui = new GUI()
//const camFolder = gui.addFolder('相机坐标')
gui.add(directionalLight, 'intensity', 1, 10).name('光照强度')
 */
/* function clearnModel() {
  if (scene !== null && scene.children.length > 3) {
    scene.children = []
    composer.removePass(outlinePass)
    // 必须要清空当前div下的canvas不然canvas会继续叠加
    const domDiv = document.getElementById('webgl')
    if (domDiv !== null) {
      domDiv.removeChild(domDiv.firstChild)
    }
    scene.traverse((one) => {
      if (one.isCSS2DObject) {
        scene.remove(one)
      }
    })
    render()
  }
} */
function cleanCSS2DTags() {
  scene.traverse((one) => {
    if (one.isCSS2DObject) {
      scene.remove(one)
    }
  })
}
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
export { renderer, chooseObj, cleanCSS2DTags, clearScene }
