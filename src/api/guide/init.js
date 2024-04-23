import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderer/CSS3DRenderer.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import modelList from './modelList.js'
import { ElMessage } from 'element-plus'

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
    this.gridHelper
    this.axesHelper
    this.renderAnimation
    this.effectComposer
    this.outlinePass
    this.materials = {}
    this.mouse = new Three.Vector2()
    this.raycaster = new Three.Raycaster()
    this.onWindowResizesListener
    this.onMouseMoveListener
    this.css3dControls = null
    this.css2dControls = null
    this.css2dRenderer = null
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

  //创建渲染器
  initRender() {
    this.renderer = new Three.WebGLRenderer({ alpha: true })
    //屏幕像素比
    this.renderer.setPixelRation(window.devicePixelRatio)
    //渲染尺寸
    const { clientHeight, clientWidth } = this.constainer
    this.renderer.setSize(clientWidth, clientHeight, true)
    this.container.appendChild(this.renderer.domElement)

    this.css2dRenderer = new CSS2DRenderer()
    this.css2dRenderer.setSize(clientWidth, clientHeight)
    this.css2dRenderer.domElement.style.position = 'absolute'
    this.css2dRenderer.domElement.style.top = 0
    this.css2dRenderer.domElement.style.pointerEvents = 'none'
  }
  //创建相机
  initCamera() {
    const { clientHeight, clientWidth } = this.container
    this.camera = new Three.PerspectiveCamera(50, clientWidth / clientHeight, 0.25, 2000)
    const { camera } = this.config
    if (!camera) return false
    const { x, y, z } = camera
    this.camera.position.set(x, y, z)
    this.camera.updateProjectionMatrix()
  }

  //场景更新
  sceneAnimation() {
    this.renderAnimation = requestAnimationFrame(() => this.sceneAnimation())
    this.controls.update()
    this.effectComposer.render()
  }
  //监听事件
  addEventMoustListener() {
    this.onWindowResizesListener = this.onWindowResize.bind(this)
    window.addEventListener('resize', this.onWindowResizesListener)
  }
  //创建控制器
  initControls() {
    this.controls = new OrbitControls(this.camera, this.scene)
    //禁止拖动
    this.controls.enablePan = false
  }
  //模型定位缩放大小
  initSize(obj) {
    let group = obj
    group.updateMatrixWorld()
    const box = new Three.Box3().setFromObject(obj)
    const size = box.getSize(new Three.Vector3())
    const center = box.getCenter(new Three.Vector3())
    const maxSize = Math.max(size.x, size.y, size.z)
    const targetSize = 2.5
    const scale = targetSize / (maxSize > 1 ? maxSize : 0.5)
    group.scale.set(scale, scale, scale)
    this.controls.maxDistance = size.length() * 10
    this.camera.lookAt(center)
    this.camera.updateProjectionMatrix()
  }
  //加载模型
  loadModel({ filePath, fileType, map }) {
    return new Promise((resolve, reject) => {
      let loader
      if (['glb', 'gltf'].includes(fileType)) {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/gltf/')
        dracoLoader.setDecoderConfig({ type: 'js' })
        dracoLoader.preload()
        loader = new GLTFLoader.setDRACOLoader(dracoLoader)
      } else {
        loader = this.fileLoaderMap[fileType]
      }
      loader.load(
        filePath,
        (result) => {
          switch (fileType) {
            case 'glb':
              this.model = result.scene
              break
            case 'gltf':
              this.model = result.scene
              break
            default:
              break
          }
          // this.modelAnimation = result.animations || []
          // this.setModelPositionSize()
          this.scene.add(this.model)
          resolve(true)
        },
        () => {},
        (err) => {
          ElMessage.error('文件错误')
          console.log(err)
          reject()
        }
      )
    })
  }

  createEffectComposer() {
    const { clientHeight, clientWidth } = this.container
    this.effectComposer = new EffectComposer(this.renderer)
    const renderPass = new RenderPass(this.scene, this.camera)
    this.effectComposer.addPass(renderPass)
    this.outlinePass = new OutlinePass(
      new Three.Vector2(clientWidth, clientHeight),
      this.scene,
      this.camera
    )
    this.outlinePass.visibleEdgeColor = new Three.Color('#FF8C00')
    this.outlinePass.hiddenEdgeColor = new Three.Color('#8A90F3')
    this.outlinePass.edgeGlow = 2.0
    this.outlinePass.edgeThickness = 2
    this.outlinePass.edgeStrength = 4
    this.outlinePass.pulsePeriod = 0
    this.effectComposer.addPass(this.outlinePass)
    // let outputPass = new Out
  }

  onWindowResize() {
    const { clientHeight, clientWidth } = this.container
    this.camera.aspect = clientHeight / clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(clientWidth, clientHeight)
    this.css2dRenderer.setSize(clientWidth, clientHeight)
    if (this.effectComposer) {
      var pass = this.effectComposer.passes[3]
      const pixelRatio = this.renderer.getPixelRatio()
      pass.uniforms.resolution.value.set(
        1 / (clientWidth * pixelRatio),
        1 / (clientHeight * pixelRatio)
      )
      this.effectComposer.setSize(clientWidth, clientHeight)
    }
  }

  onClearModelData() {
    const { tags } = this.config
    this.scene.traverse((v) => {
      if (v.type == 'Mesh') {
        v.geometry.dispose()
        v.material.dispose()
      }
    })
    this.scene.clear()
    this.renderer.clear()
    this.renderer.dispose()
    this.camera.clear()
    if (this.gridHelper) {
      this.gridHelper.clear()
      this.gridHelper.dispose()
    }
    if (this.axesHelper) {
      this.axesHelper.clear()
      this.axesHelper.dispose()
    }
    if (this.effectComposer) this.effectComposer.dispose()
    this.container.removeEventListener('mousemove', this.onMouseMoveListener)
    window.removeEventListener('resize', this.onWindowResizesListener)

    this.config = null
    this.container = null
    this.camera = null
    this.scene = null
    this.renderer = null
    this.controls = null
    this.model = null
    this.fileLoaderMap = null
  }
}
setSceneLight(){
  const {light} = this.config
  if (!light) return false
  if (light.ambientLight){
    const ambientLight = new Three.AmbientLight(light.ambientLightColor,light.ambientLightIntensity)
    ambientLight.visible = light.ambientLight
    this.scene.add(ambientLight)
  }
}

onSwitchModel(model) {
  return new Promise(async (reslove, reject) => {
    try {
      // 加载几何模型
      if (model.modelType && model.modelType == 'geometry') {
        // 重置"灯光"模块数据
        this.modelAnimation = []
        this.camera.fov = 80
        this.camera.updateProjectionMatrix()
        const load = await this.setGeometryModel(model)
        this.outlinePass.renderScene = this.geometryGroup
        reslove()
      } else {
        this.clearSceneModel()
        // 重置"灯光"模块数据
        this.onResettingLight({ ambientLight: true })
        this.camera.fov = 50
        this.geometryGroup.clear()
        // 加载模型
        const load = await this.setModel(model)
        this.outlinePass.renderScene = this.model
        // 模型加载成功返回 true
        reslove({ load, filePath: model.filePath })
      }
    } catch {
      reject()
    }
  })
}

function createThreeDComponent(config) {
  // 创建一个元素ID
  const elementId = 'answer' + onlyKey(5, 10)
  let modelApi = null
  return defineComponent({
    data() {
      return {
        loading: false
      }
    },
    props: ['width', 'height'],
    watch: {
      $props: {
        handler(val) {
          if (modelApi) {
            debounce(modelApi.onWindowResize(), 200)
          }
        },
        immediate: false,
        deep: true
      }
    },
    render() {
      if (this.width && this.height) {
        return h(
          <div
            v-zLoading={this.loading}
            style={{
              width: this.width - 10 + 'px',
              height: this.height - 10 + 'px',
              pointerEvents: 'none'
            }}
            id={elementId}
          ></div>
        )
      } else {
        return h(
          <div
            v-zLoading={this.loading}
            style={{ width: '100%', height: '100%' }}
            id={elementId}
          ></div>
        )
      }
    },
    async mounted() {
      this.loading = true
      modelApi = new renderModel(config, elementId)
      const load = await modelApi.init()
      if (load) {
        this.loading = false
      }
    },
    beforeUnmount() {
      modelApi.onClearModelData()
    }
  })
}
