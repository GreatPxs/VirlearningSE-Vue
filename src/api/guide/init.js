import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderer/CSS3DRenderer.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import modelList from './modelList.js'

//创建场景
class renderModel {
  constructor(config, elementId) {
    this.config = config
    this.container = document.querySelector('#' + elementId)
    this.camera
    this.scene
    this.renderer
    this.controls
    this.loadingManager = new Three.LoadingManager()
    this.model
    this.fileLoaderMap = {
      glb: new GLTFLoader(),
      gltf: new GLTFLoader()
    }
    this.renderAnimation
    this.effectComposer
    this.outlinePass
    this.materials = {}
    this.mouse = new Three.Vector2()
    this.raycaster = new Three.Raycaster()
    this.onWindowResizesListener
    this.onMouseMoveListener
  }
  init() {
    return new Promise(async (resolve, reject) => {
      this.initRender()
      this.initCamera()
      this.initScene()
      this.initControls()
      this.addEventMoustListener()
      const load = await this.setModel({ filePath: '/public/导览.glb', fileType: 'glb' })
      this.createEffectComposer()
      this.sceneAnimation()
      resolve(load)
    })
  }
  //创建场景
  initScene() {
    this.scene = new Three.Scene()
    //this.scene.background =
  }
  //创建相机
  initCamera() {
    const { clientHeight, clientWidth } = this.container
    this.camera = new Three.PerspectiveCamera(50, clientWidth / clientHeight, 0.25, 2000)
  }
  //创建渲染器
  initRender() {
    this.renderer = new Three.WebGLRenderer({ alpha: true })
    //屏幕像素比
    this.renderer.setPixelRation(window.devicePixelRatio)
    //渲染尺寸
    const { clientHeight, clientWidth } = this.constainer
    this.renderer.setSize(clientWidth, clientHeight, true)
    this.container.appendChild(this.renderer.domElement)
  }

  //场景更新
  sceneAnimation() {
    this.renderAnimation = requestAnimationFrame(() => this.sceneAnimation())
    this.controls.update()
    this.effectComposer.render()
  }
  //监听事件
  addEventMoustListener() {
    this.onWindowResizesListener = this.onWindowResizesListener.bind(this)
    window.addEventListener('resize', this.onWindowResizesListener)
    this.onMouseClickListener = this.onMouseClickListener.bind(this)
    this.container.addEventListener('click', this.onMouseClickListener)
  }
  initControls() {
    this.controls = new OrbitControls(this.camera, this.scene)
    this.controls.enablePan = false
  }
  serModel({ filePath, fileType,scale,map,position}){
    return new Promise((resolve, reject)=>){
        const loader = this.fileLoaderMap[fileType]
        if
    }
  }
}
