<template>
  <div class="room-page">
    <el-button id="exit" @click="$router.push({ name: 'guide' })">退出</el-button>
    <div class="roomcanvas" ref="roomTarget"></div>
    <el-button-group class="feature_group">
      <el-button id="feature">功能说明</el-button>
      <el-button id="procedure">操作流程</el-button>
      <el-button id="animation">演示动画</el-button>
    </el-button-group>

    <el-select class="rolechoose" v-model="value" placeholder="选择职业" size="large">
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
import baseModel from '@/api/guide/baseModel.js'
import modelList from '@/api/guide/modelList.js'
const value = ref([])
const route = useRoute()
const { name } = route.query
const path = ref(null)
console.log(modelList)
onBeforeMount(() => {
  for (let c of modelList) {
    if (c.name === name) {
      path.value = c.filePath
      break
    }
  }
  console.log(path.value)
})
//console.log(name)
onMounted(() => {
  // roomTarget
  // roomTarget.value.appendChild(renderer.domElement)
  // baseModel.init()
  // console.log(baseModel)
  // console.log(roomTarget.value)
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
.feature_group {
  position: absolute;
  top: 75%;
  right: 5%;
}
</style>
