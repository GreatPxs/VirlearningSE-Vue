import * as Three from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import modelList from './modelList.js'

const loader = new GLTFLoader()
const model = new Three.Group()
/* filePath = modelList.find(name == '导览').filePath
console.log(filePath) */

loader.load('/导览.glb', function (gltf) {
  //console.log('gltf对象场景属性', gltf.scene)
  model.add(gltf.scene)
  // console.log(model)
  model.traverse(function (obj) {
    //console.log('名称' + obj.name)
    /* if (obj.isMesh && obj.name != 'floor') {
      obj.material.color.set(0xddffee)
    } */
  })
})

export default model
