<script setup lang="ts">
// import { timeFormatter } from '@/utils/timeHandlers'
import { getUsersList } from '@/api/userManage/getUsersList.js'
import { getUserByAccount } from '@/api/userManage/getUserByAccount.js'
import { changeUserStatus } from '@/api/userManage/changeUserStatus.js'

onMounted(() => {
  getUsersListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

// 默认用户头像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const searchCondition = reactive({
  account: ''
})

//测试数据
const records = ref([])

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getUsersListPage = async (queryCondition) => {
  const data = await getUsersList(queryCondition).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取用户列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取用户列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  records.value = data.data.list
  total.value = data.data.totalCount
  listCurrentPage.value = data.data.currPage
  listPageSize.value = data.data.pageSize
}

//刷新页面
const handleRefresh = () => {
  getUsersListPage({
    pageNumber: 1,
    pageSize: listPageSize.value
  })
  listCurrentPage.value = 1
}

//搜索查询
const getUsersInfoByAccount = async () => {
  const data = await getUserByAccount(searchCondition.account).then((res) => {
    //搜索失败
    if (res.data.state !== 200) {
      ElMessage.error('搜索失败')
      //打印数据
      console.log(res.data)
      throw new Error('搜索失败')
    }
    return res.data
  })

  console.log(data)
  //搜索成功
  if (data.data !== null) {
    ElMessage.success('搜索成功')
    records.value = records.value.splice(0, 1)
    records.value[0] = {
      userId: data.data.userId,
      filrurl: data.data.fileurl,
      nickName: data.data.nickName,
      loginName: data.data.loginName,
      lockedFlag: data.data.lockedFlag
    }
    listCurrentPage.value = 1
    total.value = 1
  } else {
    records.value = []
    listCurrentPage.value = 1
    total.value = 0
  }

  searchCondition.account = ''
  console.log(records.value)
}

// 切换用户状态的事件处理函数
const handleChange = async (act: 0 | 1, userId: number) => {
  const data = await changeUserStatus(userId, act).then((res) => {
    //切换状态失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('修改用户状态失败')
      //打印数据
      console.log(res.data)
      throw new Error('修改用户状态失败')
    }
    console.log(res.data)
    return res.data
  })

  if (act === 0) {
    ElMessage.success('启用成功')
  } else {
    ElMessage.success('封禁成功')
  }
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input v-model="searchCondition.account" placeholder="请输入账号" clearable />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="getUsersInfoByAccount">查询</el-button>
          </el-form-item>
        </el-form>
        <el-icon :size="40" class="refresh" @click="handleRefresh"><IEpRefresh /></el-icon>
      </div>
    </template>

    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="userId" label="用户ID" width="180" align="center" />
      <el-table-column label="头像" width="180" align="center" v-slot="{ row }">
        <el-avatar :size="50" :src="row.portrait">
          <img :src="circleUrl" alt="" />
        </el-avatar>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" width="180" align="center" />
      <el-table-column prop="loginName" label="账号" align="center" />

      <el-table-column label="状态" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.lockedFlag"
          class="mb-2"
          :active-value="0"
          :inactive-value="1"
          active-text="启用"
          inactive-text="禁用"
          @change="handleChange($event as 0 | 1, row.userId)"
        />
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
      @size-change="(pageSize) => getUsersListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getUsersListPage({ pageSize: listPageSize, pageNumber: currentPage })
      "
      layout="total, sizes, prev, pager, next, jumper"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.refresh:hover {
  color: #409eff;
}
</style>
