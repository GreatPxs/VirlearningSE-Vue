import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import modelList from './modelList.js'


export default class baseModel {
  camposition = { x: 0, y: 0, z: -5 }
  dom = null
  scene = null
  constructor(dom) {
    this.camposition = {
      x: 0,
      y: 0,
      z: -5
    }
    this.dom = document.querySelector('.roomcanvas')
    var domRect = this.dom.getBoundingClientRect()
    this.width = domRect.width
    this.height = domRect.height
    //场景
    // this.scene = this.initScene()
    this.scene = new Three.Scene()
    //摄像机
    this.camera = this.initCamera()
    //灯光
    //平行光源
    this.directionalLight = new Three.DirectionalLight(0xffffff, 3.5)
    this.directionalLight.position.set(80, 50, 30)
    this.scene.add(this.directionalLight)
    //环境光源
    this.ambient = new Three.AmbientLight(0xffffff, 0.4)
    this.scene.add(this.ambient)
    // this.directionalLight
    // this.ambient
    //渲染器
    this.renderer = this.initRenderer()
    this.render()
    //控制器
    // this.controls = this.initControls()
    // this.setSceneLight()
  }
  // //初始化场景
  // initScene() {
  //   this.scene = new Three.Scene()
  // }
  // //初始化光源
  // setSceneLight() {
  //   //平行光源
  //   this.directionalLight = new Three.DirectionalLight(0xffffff, 3.5)
  //   this.directionalLight.position.set(80, 50, 30)
  //   this.scene.add(this.directionalLight)
  //   //环境光源
  //   this.ambient = new Three.AmbientLight(0xffffff, 0.4)
  //   this.scene.add(this.ambient)
  // }

  //初始化相机
  initCamera() {
    this.camera = new Three.PerspectiveCamera(30, this.width / this.height, 1, 3000)
    this.camera.position.set(0, 80, 0)
    this.camera.lookAt(this.camposition.x, this.camposition.y, this.camposition.z)
  }

  //初始化渲染器
  initRenderer() {
    this.renderer = new Three.WebGLRenderer({ alpha: true })
    // //屏幕像素比
    // this.renderer.setPixelRation(window.devicePixelRatio)
    //渲染尺寸
    this.renderer.setSize(this.width, this.height, true)
    this.dom.appendChild(this.renderer.domElement)
    // this.render()
  }
  //初始化控制器
  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(this.camposition.x, this.camposition.y, this.camposition.z)
    this.controls.update()
    this.controls.addEventListener('change', function () {
      this.renderer.render(this.scene, this.camera)
    })
  }
  render() {
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render)
  }
}

