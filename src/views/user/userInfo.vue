<script setup lang="ts">
//导入类型说明
import { FormInstance } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { changeUserInfo } from '@/api/users/changeUserInfo'
import { useUserInfoStore } from '@/stores/userInfo'
import md5 from 'md5'

const userInfoToken = useUserInfoStore()
const passwordMd5 = ref('')

onBeforeMount(() => {
  form.avatar = userInfoToken.avatar
  form.nickName = userInfoToken.nickName
  passwordMd5.value = userInfoToken.passwordMd5
})

const uploadAction = ref(
  'http://114.55.135.87:28018/api/v1/user/file?id :=' + window.localStorage.getItem('userId')
)

//暂用表格form数据
const form = reactive({
  avatar: '', // 用户头像的URL
  nickName: '',
  password: ''
})

//获取表单引用,通过formRef.value获取表单实例
const formRef = ref<FormInstance>()

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('照片必须为JPG格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('照片不超过2MB!')
    return false
  }
  return true
}

const handleAvatarUploadSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.avatar = response.data
  userInfoToken.saveAvatar(form.avatar)
  console.log(form.avatar)
}

//提交修改的用户信息
const onSubmit = async () => {
  if (form.password !== '' || form.password !== null) {
    passwordMd5.value = md5(form.password)
  }

  //昵称判断
  if (form.nickName === '' || form.nickName === null) {
    ElMessage.error('昵称不能为空')
    throw Error
  }

  if (form.nickName.length >= 16) {
    ElMessage.error('昵称长度不超过16')
    throw Error
  }

  const specialCharRegex = /[!@#$%个&*( ),.?":{}|<>]/

  if (specialCharRegex.test(form.nickName)) {
    ElMessage.error('昵称不能含特殊字符')
    throw Error
  }

  //判断密码是否正确
  const isOk = ref(false)
  const regex_password = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/
  if (form.password === '' || form.password === null) isOk.value = true

  if (!isOk.value) {
    if (!regex_password.test(form.password)) {
      ElMessage.error('密码格式错误')
      throw Error
    }
  }

  const data = await changeUserInfo(form.nickName, passwordMd5.value, '').then((res) => {
    //修改失败
    if (res.data.resultCode === 500) {
      ElMessage.error('修改失败')
      throw new Error('修改失败')
    }
    //修改成功
    return res.data
  })

  //保存修改
  userInfoToken.saveNickName(form.nickName)
  userInfoToken.savepasswordMd5(passwordMd5.value)
  ElMessage.success('修改成功')

  //刷新页面
  history.go(0)
}
</script>

<template>
  <div class="personal-center">
    <img src="@/assets/personal-center.svg" />
    <div>个人中心</div>
  </div>
  <div class="user-info-page">
    <div class="form">
      <!-- action需要绑定后端上传接口url -->
      <el-form :model="form" label-position="left" label-width="60px" size="large" ref="formRef">
        <el-form-item label-width="0px">
          <el-upload
            class="avatar-uploader"
            :action="uploadAction"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarUploadSuccess"
            :show-file-list="false"
          >
            <!-- <img v-if="form.avatar" :src="form.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <div class="avatar">
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <img v-else src="@/assets/plus.svg" />
              <p>点击头像修改</p>
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input type="text" v-model="form.nickName" placeholder="长度不超16,不含特殊符号" />
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
  height: 670px;
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
  margin-bottom: 20px;

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

.personal-center {
  position: fixed;
  left: 250px;
  top: 100px;
  display: flex;
  align-items: center;

  img {
    width: 70px;
    height: 70px;
    margin-right: 10px;
  }

  div {
    font-size: 25px;
    font-weight: bold;
    color: #515151;
  }
}
</style>
