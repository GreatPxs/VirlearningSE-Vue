<script setup lang="ts">
import { adminLogin } from '@/api/adminUser/adminLogin.js'
import { useTokenAndRoleStore } from '@/stores/tokenAndRole'
import { useRouter, useRoute } from 'vue-router'
import md5 from 'md5'

const store = useTokenAndRoleStore()
const router = useRouter()
const route = useRoute()

//提交按钮状态
const isLoading = ref(false)

//暂用表格form数据
const form = reactive({
  userName: '',
  password: ''
})

const onSubmit = async () => {
  //开始请求,置为true
  isLoading.value = true

  // 使用 md5 库
  const passwordMd5 = md5(form.password)

  const data = await adminLogin(form.userName, passwordMd5).then((res) => {
    //登录失败
    if (res.data.resultCode === 500) {
      ElMessage.error('登录信息有误')
      //登录失败,置为false
      isLoading.value = false
      throw new Error('登录信息有误')
    }
    //登录成功
    return res.data
  })

  console.log(data)
  //保存接口请求返回的token信息
  store.saveTokenAndRole(data.data, data.message)
  //保存md5
  window.localStorage.setItem('passwordMd5', passwordMd5)

  //结束请求,置为false
  isLoading.value = false

  //登录成功
  ElMessage.success('登录成功')
  router.push((route.query.redirect as string) || '/admin')
}
</script>

<template>
  <img src="@/assets/back.svg" class="back" @click="$router.push({ name: 'login' })" />
  <div class="login">
    <div class="form">
      <!-- 绑定校验规则rules, 添加引用标识formRef -->
      <el-form :model="form" label-position="left" label-width="60px" size="large">
        <div class="first-row">
          <img src="@/assets/hospital.svg" alt="" />
          <p>虚拟宠物医院后台管理系统</p>
        </div>

        <el-form-item label="账号">
          <el-input type="text" v-model="form.userName" placeholder="请输入管理员账号" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="text" v-model="form.password" placeholder="请输入密码" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  background-color: #eee;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

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

      .first-row {
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 20px;
          font-weight: bold;
          color: #4671c6;
        }
        img {
          width: 40px;
          height: 40px;
          margin-right: 17px;
        }
      }

      .el-form-item {
        padding-top: 30px;
      }

      .el-button {
        width: 100%;
      }
    }
  }
}

.back {
  width: 60px;
  height: 60px;
  position: fixed;
  left: 50px;
  top: 50px;
}

.back:hover {
  transform: scale(1.5);
}
</style>
@/stores/tokenAndRole @/api/users/adminLogin.js @/api/adminUser/adminLogin.js
