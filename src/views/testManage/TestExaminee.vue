<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getExamUser } from '@/api/testManage/getExamUser'
import { getNoExamUser } from '@/api/testManage/getNoExamUserList'
import { deleteExamUser } from '@/api/testManage/deleteExamUser'
import { addExamUser } from '@/api/testManage/addExamUser'
// 默认用户头像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

onMounted(() => {
  getExamUserList({
    pageNumber: listSelectedCurrentPage.value,
    pageSize: listSelectedPageSize.value
  })

  getNoExamUserList({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//切换事件
const handleClick = () => {
  getExamUserList({
    pageNumber: listSelectedCurrentPage.value,
    pageSize: listSelectedPageSize.value
  })

  getNoExamUserList({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}

const route = useRoute()
//考试ID
const examId = ref(0)
onBeforeMount(() => {
  examId.value = parseInt(route.params.id.toString())
  console.log(examId.value)
})
const activeIndex = ref('1')

//已选用户信息
const selectedRecords = ref([])
//已选用户页查询
const listSelectedCurrentPage = ref(1)
const listSelectedPageSize = ref(10)
const selectedTotal = ref(0)
const getExamUserList = async (queryCondition) => {
  const data = await getExamUser(examId.value, queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取考生列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取考生列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  selectedRecords.value = data.data.list
  selectedTotal.value = data.data.totalCount
  listSelectedCurrentPage.value = data.data.currPage
  listSelectedPageSize.value = data.data.pageSize
}
//删除已选用户
const deleteUserById = async (id) => {
  const data = await deleteExamUser(examId.value, id).then((res) => {
    //删除失败
    if (res.data.state !== 200) {
      ElMessage.error('删除失败')
      //打印数据
      console.log(res.data)
      throw new Error('删除失败')
    }
    return res.data
  })

  //删除成功
  console.log(data)
  ElMessage.success('删除成功')

  //删除成功后,需要重新获取已选用户列表
  getExamUserList({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}

const records = ref([
  {
    userId: 2,
    fileurl: '',
    nickName: '用户2',
    loginName: '18565953717'
  }
]) //可选用户信息
//可选用户页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getNoExamUserList = async (queryCondition) => {
  const data = await getNoExamUser(examId.value, queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取可选考生列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取可选考生列表失败')
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
//添加用户
const addUserById = async (id) => {
  const data = await addExamUser(examId.value, id).then((res) => {
    //添加失败
    if (res.data.state !== 200) {
      ElMessage.error('添加失败')
      //打印数据
      console.log(res.data)
      throw new Error('添加失败')
    }
    return res.data
  })

  //添加成功
  console.log(data)
  ElMessage.success('添加成功')

  //添加成功后,需要重新获取题目列表
  getNoExamUserList({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <el-tabs v-model="activeIndex" class="demo-tabs" type="card" @tab-click="handleClick">
        <el-tab-pane label="已选用户" name="1"></el-tab-pane>
        <el-tab-pane label="添加用户" name="2"></el-tab-pane>
      </el-tabs>
    </template>
  </el-page-header>

  <el-card class="box-card" v-show="activeIndex === '1'">
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="selectedRecords">
      <el-table-column prop="userId" label="用户ID" align="center" />
      <el-table-column label="头像" width="180" align="center" v-slot="{ row }">
        <el-avatar :size="50" :src="row.fileurl">
          <img :src="row.fileurl !== null && row.fileurl != '' ? row.fileurl : circleUrl" alt="" />
        </el-avatar>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" align="center" />
      <el-table-column prop="loginName" label="账号" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button type="danger" @click="deleteUserById(row.userId)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listSelectedCurrentPage"
      v-model:page-size="listSelectedPageSize"
      :total="selectedTotal || 0"
      @size-change="(pageSize) => getExamUserList({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getExamUserList({ pageSize: listSelectedPageSize, pageNumber: currentPage })
      "
    />
  </el-card>

  <el-card class="box-card" v-show="activeIndex === '2'">
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="userId" label="用户ID" align="center" />
      <el-table-column label="头像" width="180" align="center" v-slot="{ row }">
        <el-avatar :size="50" :src="row.fileurl">
          <img :src="circleUrl" alt="" />
        </el-avatar>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" align="center" />
      <el-table-column prop="loginName" label="账号" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button type="primary" @click="addUserById(row.userId)">添加</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
      @size-change="(pageSize) => getNoExamUserList({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getNoExamUserList({ pageSize: listPageSize, pageNumber: currentPage })
      "
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
  margin-top: 25px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}
</style>
