<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'
import { getCaseById } from '@/api/caseManage/getCaseById'

const router = useRouter()
const route = useRoute()

//病例ID
const id = ref(0)
onBeforeMount(() => {
  id.value = parseInt(route.params.id.toString())
  console.log(id.value)
})
onMounted(() => {
  getCaseInfo()
})

// 步骤条当前位置
const currentStep = ref(0)

//病例信息
const caseData = ref({
  name: '',
  cname: '',
  animal: '',
  jzword: '',
  jzphoto: '',
  jzvideo: '',
  jcword: '',
  jcphoto: '',
  jcvideo: '',
  zdword: '',
  zdphoto: '',
  zdvideo: '',
  zlword: '',
  zlphoto: '',
  zlvideo: ''
})
const getCaseInfo = async () => {
  const data = await getCaseById(id.value).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取病例信息失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取病例信息失败')
    }
    //获取成功
    console.log(res.data)
    return res.data
  })

  caseData.value = data.data
}

//文字、图片、视频
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
        <el-step title="诊断结果" :icon="Clock" @click="currentStep = 3" />
        <el-step title="治疗方案" :icon="Document" @click="currentStep = 4" />
      </el-steps>
    </template>

    <!-- 疾病名称 -->
    <div v-show="currentStep === 0">
      <div>
        <el-card style="max-width: 480px" class="infoCard">
          <template #header>
            <div class="card-header">
              <img src="@/assets/caseName.svg" />
              <span>病例名称</span>
            </div>
          </template>
          <p>{{ caseData.cname }}</p>
        </el-card>

        <el-card style="max-width: 480px" class="infoCard">
          <template #header>
            <div class="card-header">
              <img src="@/assets/caseName.svg" />
              <span>疾病名称</span>
            </div>
          </template>
          <p>{{ caseData.name }}</p>
        </el-card>

        <el-card style="max-width: 480px" class="infoCard">
          <template #header>
            <div class="card-header">
              <img src="@/assets/animal.svg" />
              <span>宠物种类</span>
            </div>
          </template>
          <p>{{ caseData.animal }}</p>
        </el-card>
      </div>
    </div>

    <!-- 接诊 -->
    <div v-show="currentStep === 1">
      <el-menu :default-active="activeIndex[1]">
        <el-menu-item index="1" @click="activeIndex[1] = '1'">病例情况</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[1] = '2'">症状照片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[1] = '3'">接诊视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div
          class="words"
          v-show="activeIndex[1] === '1' && caseData.jzword !== null && caseData.jzword !== ''"
        >
          {{ caseData.jzword }}
        </div>

        <div
          class="picture"
          v-show="activeIndex[1] === '2' && caseData.jzphoto !== null && caseData.jzphoto !== ''"
        >
          <img :src="caseData.jzphoto" />
        </div>

        <div
          class="video"
          v-show="activeIndex[1] === '3' && caseData.jzvideo !== null && caseData.jzvideo !== ''"
        >
          <video :src="caseData.jzvideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 病例检查 -->
    <div v-show="currentStep === 2">
      <el-menu :default-active="activeIndex[2]">
        <el-menu-item index="1" @click="activeIndex[2] = '1'">检查项目</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[2] = '2'">检查照片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[2] = '3'">检查视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div
          class="words"
          v-show="activeIndex[2] === '1' && caseData.jcword !== null && caseData.jcword !== ''"
        >
          {{ caseData.jcword }}
        </div>

        <div
          class="picture"
          v-show="activeIndex[2] === '2' && caseData.jcphoto !== null && caseData.jcphoto !== ''"
        >
          <img :src="caseData.jcphoto" />
        </div>

        <div
          class="video"
          v-show="activeIndex[2] === '3' && caseData.jcvideo !== null && caseData.jcvideo !== ''"
        >
          <video :src="caseData.jcvideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 诊断结构 -->
    <div v-show="currentStep === 3">
      <el-menu :default-active="activeIndex[3]">
        <el-menu-item index="1" @click="activeIndex[3] = '1'">诊断结果</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[3] = '2'">诊断照片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[3] = '3'">诊断视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div
          class="words"
          v-show="activeIndex[3] === '1' && caseData.zdword !== null && caseData.zdword !== ''"
        >
          {{ caseData.zdword }}
        </div>

        <div
          class="picture"
          v-show="activeIndex[3] === '2' && caseData.zdphoto !== null && caseData.zdphoto !== ''"
        >
          <img :src="caseData.zdphoto" />
        </div>

        <div
          class="video"
          v-show="activeIndex[3] === '3' && caseData.zdvideo !== null && caseData.zdvideo !== ''"
        >
          <video :src="caseData.zdvideo" controls></video>
        </div>
      </div>
    </div>

    <!-- 治疗方案 -->
    <div v-show="currentStep === 4">
      <el-menu :default-active="activeIndex[4]">
        <el-menu-item index="1" @click="activeIndex[4] = '1'">治疗方案</el-menu-item>
        <el-menu-item index="2" @click="activeIndex[4] = '2'">治疗照片</el-menu-item>
        <el-menu-item index="3" @click="activeIndex[4] = '3'">治疗视频</el-menu-item>
      </el-menu>
      <div class="main">
        <div
          class="words"
          v-show="activeIndex[4] === '1' && caseData.zlword !== null && caseData.zlword !== ''"
        >
          {{ caseData.zlword }}
        </div>

        <div
          class="picture"
          v-show="activeIndex[4] === '2' && caseData.zlphoto !== null && caseData.zlphoto !== ''"
        >
          <img :src="caseData.zlphoto" />
        </div>

        <div
          class="video"
          v-show="activeIndex[4] === '3' && caseData.zlvideo !== null && caseData.zlvideo !== ''"
        >
          <video :src="caseData.zlvideo" controls></video>
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

.infoCard {
  margin-bottom: 20px;
}

.card-header {
  font-size: 20px;
  font-weight: bold;
  color: #1296db;
  display: flex;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    margin: 0px;
    margin-right: 10px;
  }
}

.el-step {
  cursor: pointer;
}

.el-menu {
  position: fixed;
  left: 240px;
  top: 220px;
  width: 95px;
  background-color: #fff;
}

.main {
  margin-left: 150px;
}

.words {
  width: 900px;
  height: 350px;
  padding: 30px;
  margin-left: 10px;
  margin-top: 20px;
  word-wrap: break-word;
  white-space: normal;

  border: 1px solid #ccc;
  border-radius: 10px;
}

.picture {
  img {
    width: 600px;
    height: 450px;
    margin-left: 150px;
  }
}

video {
  height: 400px;
  width: 600px;
  margin-top: 50px;
  margin-left: 150px;
}
</style>
