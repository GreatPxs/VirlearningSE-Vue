import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const loader = new GLTFLoader()
const model = new Three.Group()
loader.load('/public/overview.gltf', function (gltf) {
  //console.log('gltf对象场景属性', gltf.scene)
  model.add(gltf.scene)
  //console.log(model)
  model.traverse(function (obj) {
    //console.log('名称' + obj.name)
    if (obj.isMesh && obj.name != 'floor') {
      obj.material.color.set(0xddffee)
    }
  })
})

export default model
