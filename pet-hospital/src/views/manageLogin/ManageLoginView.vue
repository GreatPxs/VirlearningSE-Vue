<script setup lang="ts">
//导入类型说明
import { FormInstance, FormRules } from 'element-plus'

//暂用表格form数据
const form = reactive({
  account: '',
  password: ''
})

//为表单定义校验规则
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, max: 18, message: '管理员账号长度为18位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 18, message: '密码长度为6~18位', trigger: 'blur' }
  ]
})

//获取表单引用,通过formRef.value获取表单实例
const formRef = ref<FormInstance>()

const onSubmit = async () => {
  //提交时校验是否满足rules规则
  await formRef.value?.validate().catch((err) => {
    ElMessage.error('表单校验失败..')
    throw err
  })

  console.log('登录成功')
}
</script>

<template>
  <div class="login">
    <div class="form">
      <!-- 绑定校验规则rules, 添加引用标识formRef -->
      <el-form
        :model="form"
        label-position="left"
        label-width="60px"
        size="large"
        :rules="rules"
        ref="formRef"
      >
        <div class="first-row">
          <img src="@/assets/hospital.svg" alt="" />
          <p>虚拟宠物医院后台管理系统</p>
        </div>
        <!-- 使用account规则 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="form.account" />
        </el-form-item>

        <!-- 使用password规则 -->
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="form.password" />
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
</style>
