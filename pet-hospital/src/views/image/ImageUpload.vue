<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import type { UploadProgressEvent, UploadProps } from 'element-plus'

// 声明属性
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
// 声明事件消息
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// 保存图片内存中的临时地址
const imageUrl = ref('')
watchEffect(() => {
  imageUrl.value = props.modelValue
})

// 是否显示进度条
const isShowProgress = ref(false)

// 回调: 图片上传成功后
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  //   course.value.courseListImg = response.data.name
  emits('update:modelValue', response.data.name)
}

// 回调: 图片上传之前-检查
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  isShowProgress.value = true
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

// 上传进度值
const percentage = ref(0)
// 上传组件的进度改变回调函数
const handleProgress = (evt: UploadProgressEvent) => {
  percentage.value = Math.floor(evt.percent)
}
</script>

<template>
  <el-progress v-show="isShowProgress" type="circle" :percentage="percentage" :width="178" />
  <el-upload
    v-show="!isShowProgress"
    class="avatar-uploader"
    action="/boss/course/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-progress="handleProgress"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" @load="isShowProgress = false" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
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
