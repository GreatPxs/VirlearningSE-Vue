<script setup lang="ts">
import { useRoute } from 'vue-router'
// 默认用户头像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const route = useRoute()
//考试ID
const examId = ref(0)
onBeforeMount(() => {
  examId.value = parseInt(route.params.id.toString())
  console.log(examId.value)
})
const activeIndex = ref('1')

//已选用户信息
const selectedRecords = ref([
  {
    userId: 1,
    fileurl: '',
    nickName: '昵称',
    loginName: '18565953718'
  }
])
//已选用户页查询
const listSelectedCurrentPage = ref(1)
const listSelectedPageSize = ref(10)
const selectedTotal = ref(0)
// const getDrugListPage = async (queryCondition) => {
//   const data = await getDrugList(queryCondition).then((res) => {
//     console.log(res)
//     //获取失败
//     if (res.data.resultCode !== 200) {
//       ElMessage.error('获取药物列表失败')

//       //打印数据
//       console.log(res.data)

//       throw new Error('获取药物列表失败')
//     }
//     //获取成功

//     console.log(res.data)
//     return res.data
//   })

//   record.value = data.data.list
//   total.value = data.data.totalCount
//   listCurrentPage.value = data.data.currPage
//   listPageSize.value = data.data.pageSize
// }

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
// const getDrugListPage = async (queryCondition) => {
//   const data = await getDrugList(queryCondition).then((res) => {
//     console.log(res)
//     //获取失败
//     if (res.data.resultCode !== 200) {
//       ElMessage.error('获取药物列表失败')

//       //打印数据
//       console.log(res.data)

//       throw new Error('获取药物列表失败')
//     }
//     //获取成功

//     console.log(res.data)
//     return res.data
//   })

//   record.value = data.data.list
//   total.value = data.data.totalCount
//   listCurrentPage.value = data.data.currPage
//   listPageSize.value = data.data.pageSize
// }
const queryCondition = ref({
  //添加用户搜索条件
  name: ''
})
//条件搜索
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <el-tabs v-model="activeIndex" class="demo-tabs" type="card">
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
          <img :src="circleUrl" alt="" />
        </el-avatar>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" align="center" />
      <el-table-column prop="loginName" label="账号" align="center" />
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 
      分页需要属性
      @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
     -->
    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listSelectedCurrentPage"
      v-model:page-size="listSelectedPageSize"
      :total="selectedTotal || 0"
    />
  </el-card>

  <el-card class="box-card" v-show="activeIndex === '2'">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="用户账号">
            <el-input
              v-model="queryCondition.name"
              placeholder="请输入要查询的用户账号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
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
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <el-button type="primary">添加</el-button>
      </el-table-column>
    </el-table>

    <!-- 
      分页需要属性
      @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
     -->
    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
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
