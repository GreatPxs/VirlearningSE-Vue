<script setup lang="ts">
import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'

// 步骤条当前位置
const currentStep = ref(0)

//表单数据-病例信息
const caseData = ref({
  caseName: '犬瘟热我我我我 cvwv fffffffffff gggggggggggggggg ggggggggggggggggg fffffffffff',
  casePic: [
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  ],
  caseVideo: 'https://www.bilibili.com/video/BV1Zx4y1U7A6/?spm_id_from=333.1007.tianma.1-1-1.click',

  receptionName: '犬瘟热我',
  receptionPic: [
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  ],
  receptionVideo:
    'https://www.bilibili.com/video/BV1Zx4y1U7A6/?spm_id_from=333.1007.tianma.1-1-1.click',

  checkName: '犬瘟热我我我我 cvwv fffffffffff gggggggggggggggg ggggggggggggggggg fffffffffff',
  checkPic: [
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  ],
  checkVideo:
    'https://www.bilibili.com/video/BV1Zx4y1U7A6/?spm_id_from=333.1007.tianma.1-1-1.click',

  diagnosisName: '犬瘟热我我我我 cvwv fffffffffff gggggggggggggggg ggggggggggggggggg fffffffffff',
  diagnosisPic: [
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  ],
  diagnosisVideo:
    'https://www.bilibili.com/video/BV1Zx4y1U7A6/?spm_id_from=333.1007.tianma.1-1-1.click',

  treatmentName: '犬瘟热我我我我 cvwv fffffffffff gggggggggggggggg ggggggggggggggggg fffffffffff',
  treatmentPic: [
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  ],
  treatmentVideo:
    'https://www.bilibili.com/video/BV1Zx4y1U7A6/?spm_id_from=333.1007.tianma.1-1-1.click'
})

const activeIndex = reactive(['1', '1', '1', '1', '1'])
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3"> 查看病例 </span>
      </div>
    </template>
  </el-page-header>

  <el-card class="box-card">
    <template #header>
      <el-steps :space="200" :active="currentStep" simple>
        <el-step title="疾病名称" :icon="EditPen" @click="currentStep = 0" />
        <el-step title="接诊" :icon="Picture" @click="currentStep = 1" />
        <el-step title="病例检查" :icon="Tools" @click="currentStep = 2" />
        <el-step title="诊断结构" :icon="Clock" @click="currentStep = 3" />
        <el-step title="治疗方案" :icon="Document" @click="currentStep = 4" />
      </el-steps>
    </template>

    <!-- 疾病名称 -->
    <div v-show="currentStep === 0">
      <el-menu :default-active="activeIndex[0]">
        <el-menu-item index="1" @click="activeIndex[0] = '1'">文字</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[0] = '2'">图片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[0] = '3'">视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div class="words" v-show="activeIndex[0] === '1' && caseData.caseName !== ''">
          {{ caseData.caseName }}
        </div>

        <div class="picture" v-show="activeIndex[0] === '2' && caseData.casePic.length !== 0">
          <img v-for="(link, index) in caseData.casePic" :key="index" :src="link" />
        </div>

        <div class="video" v-show="activeIndex[0] === '3' && caseData.caseVideo !== ''">
          <video :src="caseData.caseVideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 接诊 -->
    <div v-show="currentStep === 1">
      <el-menu :default-active="activeIndex[1]">
        <el-menu-item index="1" @click="activeIndex[1] = '1'">文字</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[1] = '2'">图片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[1] = '3'">视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div class="words" v-show="activeIndex[1] === '1' && caseData.receptionName !== ''">
          {{ caseData.receptionName }}
        </div>

        <div class="picture" v-show="activeIndex[1] === '2' && caseData.receptionPic.length !== 0">
          <img v-for="(link, index) in caseData.receptionPic" :key="index" :src="link" />
        </div>

        <div class="video" v-show="activeIndex[1] === '3' && caseData.receptionVideo !== ''">
          <video :src="caseData.receptionVideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 病例检查 -->
    <div v-show="currentStep === 2">
      <el-menu :default-active="activeIndex[2]">
        <el-menu-item index="1" @click="activeIndex[2] = '1'">文字</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[2] = '2'">图片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[2] = '3'">视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div class="words" v-show="activeIndex[2] === '1' && caseData.checkName !== ''">
          {{ caseData.checkName }}
        </div>

        <div class="picture" v-show="activeIndex[2] === '2' && caseData.checkPic.length !== 0">
          <img v-for="(link, index) in caseData.checkPic" :key="index" :src="link" />
        </div>

        <div class="video" v-show="activeIndex[2] === '3' && caseData.checkVideo !== ''">
          <video :src="caseData.checkVideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 诊断结构 -->
    <div v-show="currentStep === 3">
      <el-menu :default-active="activeIndex[3]">
        <el-menu-item index="1" @click="activeIndex[3] = '1'">文字</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[3] = '2'">图片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[3] = '3'">视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div class="words" v-show="activeIndex[3] === '1' && caseData.diagnosisName !== ''">
          {{ caseData.diagnosisName }}
        </div>

        <div class="picture" v-show="activeIndex[3] === '2' && caseData.diagnosisPic.length !== 0">
          <img v-for="(link, index) in caseData.diagnosisPic" :key="index" :src="link" />
        </div>

        <div class="video" v-show="activeIndex[3] === '3' && caseData.diagnosisVideo !== ''">
          <video :src="caseData.diagnosisVideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 治疗方案 -->
    <div v-show="currentStep === 4">
      <el-menu :default-active="activeIndex[4]">
        <el-menu-item index="1" @click="activeIndex[4] = '1'">文字</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[4] = '2'">图片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[4] = '3'">视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div class="words" v-show="activeIndex[4] === '1' && caseData.treatmentName !== ''">
          {{ caseData.treatmentName }}
        </div>

        <div class="picture" v-show="activeIndex[4] === '2' && caseData.treatmentPic.length !== 0">
          <img v-for="(link, index) in caseData.treatmentPic" :key="index" :src="link" />
        </div>

        <div class="video" v-show="activeIndex[4] === '3' && caseData.treatmentVideo !== ''">
          <video :src="caseData.treatmentVideo" controls></video>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.box-card {
  width: auto;
  height: 600px;
  margin-top: 17px;
}

.el-step {
  cursor: pointer;
}

.el-menu {
  position: fixed;
  left: 240px;
  top: 220px;
  width: 70px;
  background-color: #fff;
}

.main {
  margin-left: 150px;
}

.words {
  width: 900px;
  margin-left: 10px;
  margin-top: 30px;
  word-wrap: break-word;
  white-space: normal;
}

img {
  width: 200px;
  height: 200px;
  margin-right: 100px;
  margin-top: 100px;
}

video {
  height: 300px;
  margin-top: 50px;
  margin-left: 150px;
}
</style>
