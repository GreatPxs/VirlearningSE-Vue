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
  passwordMd5.value = userInfoToken.passwordMd5
})

//暂用表格form数据
const form = reactive({
  password: ''
})

//获取表单引用,通过formRef.value获取表单实例
const formRef = ref<FormInstance>()

//提交修改的用户信息
const onSubmit = async () => {
  if (form.password === '') {
    passwordMd5.value = md5(form.password)
  } else {
    passwordMd5.value = md5(form.password)
  }

  const data = await changeUserInfo('', passwordMd5.value, '').then((res) => {
    //修改失败
    if (res.data.resultCode === 500) {
      ElMessage.error('修改失败')
      throw new Error('修改失败')
    }
    //修改成功
    return res.data
  })

  //保存修改
  userInfoToken.savepasswordMd5(passwordMd5.value)
  ElMessage.success('修改成功')
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
  height: 200px;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    padding: 30px;

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
