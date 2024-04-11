<script setup lang="ts">
import { adminLogout } from '@/api/adminUser/adminLogout.js'
import { useTokenAndRoleStore } from '@/stores/tokenAndRole'
import { useRouter } from 'vue-router'

import md5 from 'md5'
import { changeUserInfo } from '@/api/users/changeUserInfo'
import { useUserInfoStore } from '@/stores/userInfo'
import { updatePassword } from '@/api/adminUser/updatePassword'
//导入侧边栏折叠状态
import { isCollapse } from './collapse'

const router = useRouter()

const userInfoToken = useUserInfoStore()

//暂用表格form数据
const form = reactive({
  oldPassword: '',
  newPassword: ''
})
const dialogFormVisible = ref(false)
//提交修改的用户信息
const onSubmit = async () => {
  let oldPasswordMd5 = md5(form.oldPassword)
  let newPasswordMd5 = md5(form.newPassword)
  const data = await updatePassword(oldPasswordMd5, newPasswordMd5).then((res) => {
    //修改失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('修改失败')
      throw new Error('修改失败')
    }
    //修改成功
    return res.data
  })

  //保存修改
  userInfoToken.savepasswordMd5(newPasswordMd5.value)
  ElMessage.success('修改成功')
  dialogFormVisible.value = false
}

const nickName = window.localStorage.getItem('nickName')
//退出处理事件
const handleLogout = async () => {
  // 退出-弹窗确认  点确认:返回成功promise  点取消:返回失败promise
  await ElMessageBox.confirm('是否确认退出?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(() => {
    ElMessage.error('操作已取消')
    return new Promise(() => {}) // 取消退出操作时,阻止代码向后执行
  })

  await adminLogout().catch(() => {})
  ElMessage.success('管理员已登出')
  useTokenAndRoleStore().saveTokenAndRole('', '') // 清空 token
  // 清空用户信息
  window.localStorage.clear()
  router.push('/manage-login') // 跳转到登录页
}
</script>

<template>
  <el-header>
    <!-- 使用图标, 并进行条件渲染 -->
    <!-- 绑定事件, 控制侧边栏折叠状态 -->
    <el-icon @click="isCollapse = !isCollapse">
      <IEpFold v-if="!isCollapse" />
      <IEpExpand v-else />
    </el-icon>

    <!-- 下拉菜单,用户登录信息展示 -->
    <el-dropdown>
      <el-avatar
        :size="36"
        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="dialogFormVisible = true">修改密码</el-dropdown-item>
          <el-dropdown-item divided @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>

  <el-dialog v-model="dialogFormVisible" title="修改密码" center>
    <el-form :model="form" label-width="80px">
      <el-form-item label="原密码">
        <el-input
          v-model="form.oldPassword"
          type="text"
          autocomplete="off"
          placeholder="********************************"
          size="default"
        />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          v-model="form.newPassword"
          type="text"
          autocomplete="off"
          placeholder="********************************"
          size="default"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
/* 头部内容水平排列, 垂直居中 */
.el-header {
  display: flex;
  align-items: center;
  background-color: #eee;

  // 图标右边距
  .el-icon {
    margin-right: 17px;
  }

  .el-dropdown {
    margin-left: auto;
  }
}
</style>
