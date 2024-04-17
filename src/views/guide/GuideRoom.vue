<template>
  <div class="room-page">
    <el-button id="exit" @click="$router.push({ name: 'guide' })">退出</el-button>

    <el-button-group id="feature_group">
      <el-button id="feature">功能说明</el-button>
      <el-button id="procedure">操作流程</el-button>
      <el-button id="animation">演示动画</el-button>
    </el-button-group>

    <el-select
      id="rolechoose"
      v-model="value"
      placeholder="选择职业"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const value = ref('')

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
</script>
<style lang="scss" scoped>

</style>