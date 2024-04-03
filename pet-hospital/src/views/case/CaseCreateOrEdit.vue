<script setup lang="ts">
import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'
import ImageUpload from '@/views/image/ImageUpload.vue'

// 步骤条当前位置
const currentStep = ref(0)

//病种数据
const options = [
  {
    value: '传染病',
    label: '传染病',
    children: [
      { value: '犬瘟热', label: '犬瘟热' },
      { value: '犬细小病毒', label: '犬细小病毒' },
      { value: '犬传染性肝炎', label: '犬传染性肝炎' },
      { value: '犬冠状病毒', label: '犬冠状病毒' },
      { value: '猫泛白细胞减少症', label: '猫泛白细胞减少症' },
      { value: '猫病毒性病气管炎', label: '猫病毒性病气管炎' },
      { value: '皮肤真菌感染', label: '皮肤真菌感染' }
    ]
  },
  {
    value: '寄生虫病',
    label: '寄生虫病',
    children: [
      { value: '蛔虫病', label: '蛔虫病' },
      { value: '钩虫病', label: '钩虫病' },
      { value: '绦虫病', label: '绦虫病' },
      { value: '球虫病', label: '球虫病' },
      { value: '疥螨虫病', label: '疥螨虫病' },
      { value: '蚤病', label: '蚤病' }
    ]
  },
  {
    value: '内科',
    label: '内科',
    children: [
      { value: '口炎', label: '口炎' },
      { value: '肠炎', label: '肠炎' },
      { value: '肠便秘', label: '肠便秘' },
      { value: '胰腺炎', label: '胰腺炎' },
      { value: '肝炎', label: '肝炎' },
      { value: '腹膜炎', label: '腹膜炎' },
      { value: '肛门腺炎', label: '肛门腺炎' },
      { value: '感冒', label: '感冒' },
      { value: '鼻炎', label: '鼻炎' },
      { value: '气管支气管炎', label: '气管支气管炎' },
      { value: '肺炎', label: '肺炎' },
      { value: '心力衰竭', label: '心力衰竭' },
      { value: '尿道感染', label: '尿道感染' },
      { value: '尿结石', label: '尿结石' },
      { value: '膀胱炎', label: '膀胱炎' },
      { value: '肾炎', label: '肾炎' },
      { value: '佝偻病', label: '佝偻病' },
      { value: '有机磷中毒', label: '有机磷中毒' },
      { value: '糖尿病', label: '糖尿病' },
      { value: '耳血肿', label: '耳血肿' },
      { value: '中耳炎', label: '中耳炎' },
      { value: '眼睑内翻', label: '眼睑内翻' },
      { value: '结膜炎', label: '结膜炎' },
      { value: '角膜炎', label: '角膜炎' }
    ]
  },
  {
    value: '外产科疾病',
    label: '外产科疾病',
    children: [
      { value: '外伤', label: '外伤' },
      { value: '外科感染', label: '外科感染' },
      { value: '骨折', label: '骨折' },
      { value: '关节脱位', label: '关节脱位' },
      { value: '湿疹', label: '湿疹' },
      { value: '皮炎', label: '皮炎' },
      { value: '脓皮病', label: '脓皮病' },
      { value: '脱毛症', label: '脱毛症' },
      { value: '趾间囊肿', label: '趾间囊肿' },
      { value: '疝', label: '疝' },
      { value: '阴道炎', label: '阴道炎' },
      { value: '阴道脱出', label: '阴道脱出' },
      { value: '子宫蓄脓', label: '子宫蓄脓' },
      { value: '难产', label: '难产' },
      { value: '乳房炎', label: '乳房炎' }
    ]
  },
  {
    value: '常用手术',
    label: '常用手术',
    children: [
      { value: '绝育', label: '绝育' },
      { value: '剖腹产', label: '剖腹产' },
      { value: '瞬膜腺增生物切除', label: '瞬膜腺增生物切除' },
      { value: '眼球摘除', label: '眼球摘除' },
      { value: '立耳术', label: '立耳术' },
      { value: '断尾术', label: '断尾术' }
    ]
  },
  {
    value: '免疫',
    label: '免疫',
    children: [
      { value: '犬', label: '犬' },
      { value: '猫免疫程序', label: '猫免疫程序' }
    ]
  }
]

//表单数据-病例信息
const caseData = ref({
  caseName: '',
  caseDetail: '',
  caseImgUrl: '',
  checkingResults: '',
  bloodRoutineUrl: '',
  bloodBiochemistry: '',
  diagnosticResults: '',
  treatmentPlan: '',
  videoUrl: ''
})

const formRef = ref()

const uploadAction = 'https://your-upload-api.com/upload' // 替换为你的上传API

//提交视频表单
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      // 执行上传逻辑
    } else {
      ElMessageBox.alert('表单验证失败')
      return false
    }
  })
}

//视频上传前检测
const beforeUpload = (file) => {
  const isVideo = file.type === 'video/mp4' || file.type === 'video/avi'
  const isLt100M = file.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessageBox.alert('请上传视频文件!')
  }
  if (!isLt100M) {
    ElMessageBox.alert('上传视频大小不能超过 100MB!')
  }
  return isVideo && isLt100M
}

//视频上传成功
const handleSuccess = (response, file, fileList) => {
  // 假设上传成功后返回的数据结构是 { status: 'success', url: '视频URL' }
  if (response.status === 'success') {
    caseData.value.videoUrl = response.url // 将视频URL保存到videoUrl中
    ElMessageBox.alert('视频上传成功')
  } else {
    ElMessageBox.alert('视频上传失败')
  }
}

//视频上传视频
const handleError = (err, file, fileList) => {
  ElMessageBox.alert('视频上传失败')
}

// 表单数据-课程信息
const course = ref({
  // 基本信息
  courseName: '',
  brief: '',
  teacherDTO: {
    teacherName: '',
    position: '',
    description: ''
  },
  previewFirstField: '',
  previewSecondField: '',
  sortNum: 0,
  // 课程图片
  courseListImg: '',
  courseImgUrl: '',
  // 销售信息
  discounts: 0,
  price: 0,
  sales: 0,
  discountsTag: '',
  // 秒杀活动
  activityCourse: true,
  activityCourseDTO: {
    beginTime: '',
    endTime: '',
    amount: 0,
    stock: 0
  },
  // 课程详情
  courseDescriptionMarkDown: 'i miss you',
  status: 0
})
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3"> 创建病例 </span>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button type="primary" class="ml-2">保存</el-button>
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
    <el-form :model="course" label-width="120" size="large" ref="formRef">
      <!-- 疾病名称 -->
      <div v-show="currentStep === 0">
        <el-form-item label="疾病名称">
          <el-cascader :options="options" v-model="caseData.caseName" />
        </el-form-item>
      </div>
      <!-- 接诊 -->
      <div v-show="currentStep === 1">
        <el-form-item label="病例基本情况">
          <el-input
            v-model="caseData.caseDetail"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="症状图片">
          <ImageUpload v-model="caseData.caseImgUrl" />
        </el-form-item>
      </div>
      <!-- 病例检查 -->
      <div v-show="currentStep === 2">
        <el-form-item label="检查项目及结果" label-width="140px">
          <el-input
            v-model="caseData.checkingResults"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="血常规检查结果" label-width="140px">
          <ImageUpload v-model="caseData.bloodRoutineUrl" />
        </el-form-item>
        <el-form-item label="血液生化检查结果" label-width="140px">
          <ImageUpload v-model="caseData.bloodBiochemistry" />
        </el-form-item>
      </div>
      <!-- 诊断结构 -->
      <div v-show="currentStep === 3">
        <el-form-item label="诊断结果">
          <el-input
            v-model="caseData.diagnosticResults"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </div>
      <!-- 治疗方案 -->
      <div v-show="currentStep === 4">
        <el-form-item label="治疗方案">
          <el-input
            v-model="caseData.treatmentPlan"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
        <el-form-item label="手术视频">
          <el-upload
            :action="uploadAction"
            :on-success="handleSuccess"
            :on-error="handleError"
            :before-upload="beforeUpload"
          >
            <template v-slot:trigger>
              <el-button size="small" type="primary">选择视频</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">只能上传mp4/avi文件，且不超过100MB</div>
            </template>
          </el-upload>
          <div v-if="caseData.videoUrl">
            <video controls>
              <source :src="caseData.videoUrl" type="video/mp4" />
              您的浏览器不支持Video标签。
            </video>
          </div>
        </el-form-item>
      </div>
      <div class="form-bottom-btn">
        <el-button v-show="currentStep !== 0" @click="currentStep--">上一步</el-button>
        <el-button v-show="currentStep !== 4" @click="currentStep++">下一步</el-button>
        <el-button v-show="currentStep === 4" type="primary">保存</el-button>
      </div>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
  margin-top: 17px;
}

.el-step {
  cursor: pointer;
}

.form-bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  padding: 0px 180px 0px 0px;
}
</style>
../image/ImageUpload.vue
