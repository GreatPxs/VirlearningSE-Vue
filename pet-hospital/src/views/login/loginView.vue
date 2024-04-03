<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { login } from '@/api/users/login.js'
import { useTokenAndRoleStore } from '@/stores/tokenAndRole.js'
import md5 from 'md5'

const router = useRouter()
const route = useRoute()
const store = useTokenAndRoleStore()

//暂用表格form数据
const form = reactive({
  loginName: '',
  password: ''
})

//登录按钮状态
const isLoading = ref(false)

const onSubmit = async () => {
  //开始请求,置为true
  isLoading.value = true

  // 使用 md5 库
  const passwordMd5 = md5(form.password)

  const data = await login(form.loginName, passwordMd5).then((res) => {
    //登录失败
    if (res.data.resultCode === 500) {
      ElMessage.error('登录信息有误')
      //登录失败,置为false
      isLoading.value = false

      //打印数据
      console.log(res.data)

      throw new Error('登录信息有误')
    }
    //登录成功
    return res.data
  })

  //打印数据
  console.log(data)
  //保存接口请求返回的token信息
  store.saveTokenAndRole(data.data, data.message)
  //保存md5
  window.localStorage.setItem('passwordMd5', passwordMd5)

  //结束请求,置为false
  isLoading.value = false

  //登录成功
  ElMessage.success('登录成功')
  router.push((route.query.redirect as string) || '/')
}

const toRegister = () => {
  router.push({ name: 'register' })
}
</script>

<template>
  <div class="login">
    <div class="showPage">
      <div class="welcome">
        <img src="@/assets/hospital.svg" alt="" />
      </div>
      <div class="form">
        <el-form :model="form" label-position="left" label-width="60px" size="large">
          <div class="first-row">
            <p>实习生登录</p>
          </div>

          <el-form-item label="账号">
            <el-input type="text" v-model="form.loginName" placeholder="请输入手机号" />
          </el-form-item>

          <el-form-item label="密码">
            <el-input type="text" v-model="form.password" placeholder="请输入密码" />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              size="large"
              :round="true"
              :isLoading="isLoading"
            >
              <p>登录</p>
            </el-button>
          </el-form-item>

          <el-form-item @click="toRegister">
            <el-button color="#707070" size="small" :round="true">
              <p>没有账户？现在注册</p>
            </el-button>
          </el-form-item>

          <a href="/manage-login">
            <el-icon><IEpDArrowRight /></el-icon>
            <p>管理员通道</p>
          </a>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-image: url('@/assets/background.jpg');
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

        a {
          text-decoration: none;
          display: flex;
          align-items: center;
          color: #0061b2;
        }
      }
    }
  }
}
</style>
@/stores/tokenAndRole.js @/api/users/login.js
