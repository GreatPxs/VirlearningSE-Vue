<script setup lang="ts">
//导入类型说明
import { FormInstance } from 'element-plus'
import { changeUserInfo } from '@/api/users/changeUserInfo'
import md5 from 'md5'

//暂用表格form数据
const form = reactive({
  avatar: '', // 用户头像的URL
  avatarList: [], // 用于显示已选择的文件列表
  nickName: window.localStorage.getItem('nickName') || '我',
  password: ''
})

//获取表单引用,通过formRef.value获取表单实例
const formRef = ref<FormInstance>()

const beforeAvatarUpload = (file) => {
  // 在这里可以添加一些逻辑，比如检查文件类型、大小等
  // 如果文件不符合要求，返回false阻止上传
  return true
}

const handleUploadSuccess = (response, file, fileList) => {
  // 上传成功后的处理
  // 假设你的服务器返回了图片的URL，你可以将其赋值给form.avatar
  form.avatar = response.url
  form.avatarList = fileList
}

const handleUploadError = (err, file, fileList) => {
  // 上传失败的处理
  console.error('上传头像失败:', err)
}

const handleExceed = (files, fileList) => {
  // 文件超过限制的处理
  console.error('选择的文件超过了限制!')
}

// 使用 md5 库
let passwordMd5 = window.localStorage.getItem('passwordMd5')
if (form.password === '') {
  passwordMd5 = md5(form.password)
}

//提交修改的用户信息
const onSubmit = async () => {
  passwordMd5 = md5(form.password)
  const data = await changeUserInfo(form.nickName, passwordMd5, '').then((res) => {
    //修改失败
    if (res.data.resultCode === 500) {
      ElMessage.error('修改失败')
      throw new Error('修改失败')
    }
    //修改成功
    return res.data
  })

  window.localStorage.setItem('nickName', form.nickName)
  window.localStorage.setItem('passwordMd5', passwordMd5)
  ElMessage.success('修改成功')
}
</script>

<template>
  <div class="user-info-page">
    <div class="form">
      <!-- action需要绑定后端上传接口url -->
      <el-form :model="form" label-position="left" label-width="60px" size="large" ref="formRef">
        <el-form-item label-width="0px">
          <el-upload
            class="avatar-uploader"
            action="/your-upload-url"
            :before-upload="beforeAvatarUpload"
            :on-success="handleUploadSuccess"
            :on-error="handleUploadError"
            :file-list="form.avatarList"
            :auto-upload="false"
            :limit="1"
            :on-exceed="handleExceed"
            :show-file-list="false"
          >
            <!-- <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <div class="avatar">
              <img src="@/assets/plus.svg" />
              <p>点击头像修改</p>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input type="text" v-model="form.nickName" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input
            type="text"
            v-model="form.password"
            placeholder="********************************"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-info-page {
  display: flex;
  height: 747px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.form {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 400px;
  height: 400px;

  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    padding: 30px;

    .el-form-item:first-child {
      .avatar-uploader {
        padding-left: 100px;
        .avatar {
          display: flex;
          flex-direction: column;
          align-items: center;

          p {
            font-weight: bold;
            color: #515151;
          }

          img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
          }
        }
      }
    }

    .el-form-item {
      margin-top: 20px;
    }

    .el-button {
      width: 100%;
    }
  }
}
</style>
