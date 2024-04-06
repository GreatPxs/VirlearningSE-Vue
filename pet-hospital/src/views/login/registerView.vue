<script setup lang="ts">
//导入类型说明
import { FormInstance, FormRules } from 'element-plus'
import { register } from '@/api/users/register'
import router from '@/router'

//注册按钮状态
const isLoading = ref(false)

//暂用表格form数据
const form = reactive({
  loginName: '',
  password: '',
  confirmedPassword: ''
})

//获取表单引用,通过formRef.value获取表单实例
const formRef = ref<FormInstance>()

const onRegister = async () => {
  //开始请求,置为true
  isLoading.value = true

  //判断重复密码是否与密码相同
  if (form.confirmedPassword !== form.password) {
    ElMessage.error('重复密码错误')
    //校验失败,置为false
    isLoading.value = false
    throw Error
  }

  //请求注册接口
  const data = await register(form).then((res) => {
    //注册失败
    if (res.data.resultCode === 500) {
      ElMessage.error('注册信息有误')
      //注册失败,置为false
      isLoading.value = false

      //打印数据
      console.log(res.data)

      throw new Error('注册信息有误')
    }
    //注册成功
    return res.data
  })

  //注册成功,置为false
  isLoading.value = false

  //注册成功
  ElMessage.success('注册成功')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="login">
    <div class="showPage">
      <div class="welcome">
        <img src="@/assets/hospital.svg" alt="" />
      </div>
      <div class="form">
        <el-form :model="form" label-position="left" label-width="60px" size="large" ref="formRef">
          <div class="first-row">
            <p>账户注册</p>
          </div>
          <el-form-item label="手机号" label-width="79px">
            <el-input type="text" v-model="form.loginName" placeholder="请输入手机号" />
          </el-form-item>

          <el-form-item label="密码" label-width="79px">
            <el-input type="text" v-model="form.password" placeholder="数字、字母,长度8~20位" />
          </el-form-item>

          <el-form-item label="确认密码" label-width="79px">
            <el-input type="text" v-model="form.confirmedPassword" placeholder="重复密码" />
          </el-form-item>

          <el-form-item>
            <el-button
              color="#67C23A"
              size="small"
              :round="true"
              :isLoading="isLoading"
              @click="onRegister"
            >
              <p>注册</p>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-image: url('@/assets/register_background.jpg');
  background-size: cover;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  .showPage {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    border: 2px solid #8a8a8a;
    border-radius: 20px;

    background: rgba(255, 255, 255, 0.2);

    box-shadow: 2px 2px 5px 3px #dae7fa;

    .welcome {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 40px;

      img {
        width: 200px;
        height: 200px;
      }
    }

    .form {
      border: 1px solid #ccc;
      border-radius: 10px;

      background: rgba(255, 255, 255, 0.6);

      display: flex;
      justify-content: center;
      align-items: center;

      .el-form {
        padding: 20px;
        .first-row {
          display: flex;
          justify-content: center;
          align-items: center;
          p {
            font-size: 20px;
            font-weight: bold;
            color: #4671c6;
          }
        }

        .el-form-item {
          padding-top: 10px;

          p {
            font-weight: bold;
            color: #e6e6e6;
          }
        }

        .el-form-item:last-child {
          padding-top: 0px;
        }

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
