<script setup lang="ts">
//导入类型说明
import { FormInstance, FormRules } from 'element-plus'

//暂用表格form数据
const form = reactive({
  account: '',
  password: '',
  confirmedPassword: ''
})

//为表单定义校验规则
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 6, max: 18, message: '账号长度为6~18位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { min: 6, max: 18, message: '密码长度为6~18位', trigger: 'blur' }
  ],
  confirmedPassword: [
    { required: true, message: '请重复密码', trigger: 'change' },
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
    <div class="showPage">
      <div class="welcome">
        <img src="@/assets/hospital.svg" alt="" />
      </div>
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
            <p>账户注册</p>
          </div>
          <!-- 使用account规则 -->
          <el-form-item label="账号" prop="account" label-width="79px">
            <el-input type="text" v-model="form.account" />
          </el-form-item>

          <!-- 使用password规则 -->
          <el-form-item label="密码" prop="password" label-width="79px">
            <el-input type="text" v-model="form.password" />
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmedPassword" label-width="79px">
            <el-input type="text" v-model="form.confirmedPassword" />
          </el-form-item>

          <el-form-item>
            <el-button color="#67C23A" size="small" :round="true">
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
