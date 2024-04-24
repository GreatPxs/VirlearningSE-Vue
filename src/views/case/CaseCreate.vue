<script setup lang="ts">
import { EditPen, Tools, Picture, Clock, Document } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { useRouter } from 'vue-router'

import { addCase } from '@/api/caseManage/addCase.js'

const router = useRouter()

// 步骤条当前位置
const currentStep = ref(0)
//病种
const diseaseOptions = [
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
//宠物种类
const animalOptions = [
  {
    value: '猫',
    label: '猫'
  },
  {
    value: '狗',
    label: '狗'
  },
  {
    value: '鸟',
    label: '鸟'
  },
  {
    value: '兔',
    label: '兔'
  },
  {
    value: '其他',
    label: '其他'
  }
]

//表单数据-病例信息
const form = ref({
  name: '',
  animal: '',
  cname: '',
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
const formRef = ref()

//提交病例
const onSubmit = async () => {
  const data = await addCase(form.value).then((res) => {
    console.log(res)
    //添加失败
    if (res.data.state !== 200) {
      console.log(res.data)
      ElMessage.error('添加病例失败')

      throw new Error('添加病例失败')
    }
    return res
  })

  console.log(data)
  ElMessage.success('添加病例成功')
  router.push({ name: 'caseIndex' })
}

//文件上传URL
const uploadAction = 'http://114.55.135.87:28018/upload'

//接诊视频处理
const beforejzVideoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isVideo = rawFile.type === 'video/mp4' || rawFile.type === 'video/avi'
  const isLt100M = rawFile.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessage.error('请上传视频文件!')
  }
  if (!isLt100M) {
    ElMessage.error('上传视频大小不能超过100MB!')
  }
  return isVideo && isLt100M
}
const handlejzVideoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.jzvideo = response.data
  console.log(form.value.jzvideo)
}

//检查视频处理
const beforejcVideoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isVideo =
    rawFile.type === 'video/mp4' || rawFile.type === 'video/avi' || rawFile.type === 'video/mpg'
  const isLt100M = rawFile.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessage.error('请上传mp4、avi、mpg格式视频文件!')
  }
  if (!isLt100M) {
    ElMessage.error('上传视频大小不能超过100MB!')
  }
  return isVideo && isLt100M
}
const handlejcVideoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.jcvideo = response.data
  console.log(form.value.jcvideo)
}

//诊断视频处理
const beforezdVideoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isVideo =
    rawFile.type === 'video/mp4' || rawFile.type === 'video/avi' || rawFile.type === 'video/mpg'
  const isLt100M = rawFile.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessage.error('请上传mp4、avi、mpg格式视频文件!')
  }
  if (!isLt100M) {
    ElMessage.error('上传视频大小不能超过100MB!')
  }
  return isVideo && isLt100M
}
const handlezdVideoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.zdvideo = response.data
  console.log(form.value.zdvideo)
}

//治疗视频处理
const beforezlVideoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isVideo =
    rawFile.type === 'video/mp4' || rawFile.type === 'video/avi' || rawFile.type === 'video/mpg'
  const isLt100M = rawFile.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessage.error('请上传mp4、avi、mpg格式视频文件!')
  }
  if (!isLt100M) {
    ElMessage.error('上传视频大小不能超过100MB!')
  }
  return isVideo && isLt100M
}
const handlezlVideoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.zlvideo = response.data
  console.log(form.value.zlvideo)
}

//接诊照片处理
const handlejzPhotoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.jzphoto = response.data
  console.log(form.value.jzphoto)
}
const beforejzPhotoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.error('Photo must be JPG、JPEG、PNG、WEBP format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Photo size can not exceed 2MB!')
    return false
  }
  return true
}

//检查照片处理
const handlejcPhotoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.jcphoto = response.data
  console.log(form.value.jcphoto)
}
const beforejcPhotoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.error('Photo must be JPG、JPEG、PNG、WEBP format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Photo size can not exceed 2MB!')
    return false
  }
  return true
}

//诊断照片处理
const handlezdPhotoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.zdphoto = response.data
  console.log(form.value.zdphoto)
}
const beforezdPhotoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.error('Photo must be JPG、JPEG、PNG、WEBP format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Photo size can not exceed 2MB!')
    return false
  }
  return true
}

//治疗照片处理
const handlezlPhotoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.value.zlphoto = response.data
  console.log(form.value.zlphoto)
}
const beforezlPhotoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.error('Photo must be JPG、JPEG、PNG、WEBP format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Photo size can not exceed 2MB!')
    return false
  }
  return true
}
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <div class="flex items-center">
        <span class="text-large font-600 mr-3"> 创建病例 </span>
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
    <el-form :model="form" label-width="120" size="large" ref="formRef">
      <!-- 疾病名称 -->
      <div v-show="currentStep === 0">
        <el-form-item label="病例名称">
          <el-input
            v-model="form.cname"
            style="width: 400px"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入病例名"
          />
        </el-form-item>
        <el-form-item label="疾病名称">
          <el-cascader :options="diseaseOptions" v-model="form.name" />
        </el-form-item>
        <el-form-item label="宠物种类">
          <el-cascader :options="animalOptions" v-model="form.animal" />
        </el-form-item>
      </div>
      <!-- 接诊 -->
      <div v-show="currentStep === 1">
        <el-form-item label="病例基本情况">
          <el-input
            v-model="form.jzword"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入接诊病例情况"
          />
        </el-form-item>
        <el-form-item label="症状图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handlejzPhotoSuccess"
            :before-upload="beforejzPhotoUpload"
          >
            <img v-if="form.jzphoto" :src="form.jzphoto" class="photo" />
            <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="接诊视频">
          <el-upload
            action="http://114.55.135.87:28018/upload"
            :on-success="handlejzVideoSuccess"
            :before-upload="beforejzVideoUpload"
          >
            <el-button type="primary">点击上传视频</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- 病例检查 -->
      <div v-show="currentStep === 2">
        <el-form-item label="检查项目详情">
          <el-input
            v-model="form.jcword"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入检查项目详情"
          />
        </el-form-item>
        <el-form-item label="检查照片">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handlejcPhotoSuccess"
            :before-upload="beforejcPhotoUpload"
          >
            <img v-if="form.jcphoto" :src="form.jcphoto" class="photo" />
            <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="检查视频">
          <el-upload
            action="http://114.55.135.87:28018/upload"
            :on-success="handlejcVideoSuccess"
            :before-upload="beforejcVideoUpload"
          >
            <el-button type="primary">点击上传视频</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- 诊断结果 -->
      <div v-show="currentStep === 3">
        <el-form-item label="诊断结果">
          <el-input
            v-model="form.zdword"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入诊断结果"
          />
        </el-form-item>
        <el-form-item label="诊断照片">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handlezdPhotoSuccess"
            :before-upload="beforezdPhotoUpload"
          >
            <img v-if="form.zdphoto" :src="form.zdphoto" class="photo" />
            <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="诊断视频">
          <el-upload
            action="http://114.55.135.87:28018/upload"
            :on-success="handlezdVideoSuccess"
            :before-upload="beforezdVideoUpload"
          >
            <el-button type="primary">点击上传视频</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <!-- 治疗方案 -->
      <div v-show="currentStep === 4">
        <el-form-item label="治疗方案">
          <el-input
            v-model="form.zlword"
            style="width: 400px"
            :autosize="{ minRows: 3, maxRows: 6 }"
            type="textarea"
            placeholder="请输入治疗方案"
          />
        </el-form-item>
        <el-form-item label="治疗照片">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :show-file-list="false"
            :on-success="handlezlPhotoSuccess"
            :before-upload="beforezlPhotoUpload"
          >
            <img v-if="form.zlphoto" :src="form.zlphoto" class="photo" />
            <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="治疗视频">
          <el-upload
            action="http://114.55.135.87:28018/upload"
            :on-success="handlezlVideoSuccess"
            :before-upload="beforezlVideoUpload"
          >
            <el-button type="primary">点击上传视频</el-button>
          </el-upload>
        </el-form-item>
      </div>
      <div class="form-bottom-btn">
        <el-button v-show="currentStep !== 0" @click="currentStep--">上一步</el-button>
        <el-button v-show="currentStep !== 4" @click="currentStep++">下一步</el-button>
        <el-button v-show="currentStep === 4" type="primary" @click="onSubmit">新增</el-button>
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

.avatar-uploader .photo {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
../image/ImageUpload.vue
