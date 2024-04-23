<script setup lang="ts">
import { ElTable } from 'element-plus'
import { useRouter } from 'vue-router'
import { getUserExamHistory } from '@/api/test/getUserExamHistory'
import { getUserExamTodo } from '@/api/test/getUserExamTodo'

const router = useRouter()

//用户ID
const userId = ref(0)
onBeforeMount(() => {
  userId.value = parseInt(window.localStorage.getItem('userId'))
  console.log(userId.value)
})

onMounted(() => {
  getUserExamTodoList({
    pageNumber: 1,
    pageSize: listPageSize.value
  })

  getUserExamHistoryList({
    pageNumber: 1,
    pageSize: listSecondPageSize.value
  })
})

//切换事件
const handleClick = () => {
  getUserExamTodoList({
    pageNumber: 1,
    pageSize: listPageSize.value
  })

  getUserExamHistoryList({
    pageNumber: 1,
    pageSize: listSecondPageSize.value
  })
}

//待参加考试列表数据
const records = ref([])
//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getUserExamTodoList = async (queryCondition) => {
  const data = await getUserExamTodo(userId.value, queryCondition).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取已参加考试列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取已参加考试列表失败')
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

const secondRecords = ref([]) //已参加或结束考试列表数据
//页查询
const listSecondCurrentPage = ref(1)
const listSecondPageSize = ref(10)
const secondTotal = ref(0)
const getUserExamHistoryList = async (queryCondition) => {
  const data = await getUserExamHistory(userId.value, queryCondition).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取待考考试列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取待考考试列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  secondRecords.value = data.data.list
  secondTotal.value = data.data.totalCount
  listSecondCurrentPage.value = data.data.currPage
  listSecondPageSize.value = data.data.pageSize
}

const activeIndex = ref('1')

//参加考试
const participateIn = (examId, paperId, name, startTime, endTime, limitTime) => {
  //判断考试是否开始
  const now = new Date().valueOf()
  const begin = new Date(startTime).valueOf()
  const end = new Date(endTime).valueOf()
  const endByLimitTime = new Date(now + limitTime * 1000).valueOf()
  console.log(`now-${now}`)
  console.log(`begin-${begin}`)
  console.log(`end-${end}`)
  if (now < begin) {
    ElMessageBox.alert('考试暂未开始', '提示', {
      confirmButtonText: 'OK'
    })

    return
  }

  if (now > end) {
    ElMessageBox.alert('考试已经结束', '提示', {
      confirmButtonText: 'OK'
    })

    return
  }

  window.localStorage.setItem('begin', begin.toString())
  // window.localStorage.setItem('end', end.toString())
  if (end < endByLimitTime) {
    window.localStorage.setItem('end', end.toString())
  } else {
    window.localStorage.setItem('end', endByLimitTime.toString())
  }
  window.localStorage.setItem('name', name)
  window.localStorage.setItem('startTime', startTime)
  window.localStorage.setItem('endTime', endTime)
  router.push({
    name: 'testPage',
    params: {
      examId: examId,
      paperId: paperId
    }
  })
}

//查阅试卷
const checkTest = (examId, paperId, name, startTime, endTime) => {
  window.localStorage.setItem('name', name)
  window.localStorage.setItem('startTime', startTime)
  window.localStorage.setItem('endTime', endTime)
  router.push({
    name: 'testResult',
    params: {
      examId: examId,
      paperId: paperId
    }
  })
}
</script>

<template>
  <el-tabs v-model="activeIndex" class="demo-tabs" type="card" @tab-click="handleClick">
    <el-tab-pane label="待参加考试" name="1"></el-tab-pane>
    <el-tab-pane label="已参加考试" name="2"></el-tab-pane>
  </el-tabs>
  <el-card class="box-card" v-show="activeIndex === '1'">
    <el-table :data="records" border style="width: 100%">
      <el-table-column prop="examId" label="考试ID" width="180" align="center" />
      <el-table-column prop="name" label="考试名称" width="180" align="center" />
      <el-table-column label="考试时长" align="center" v-slot="{ row }" width="180px">
        <p>{{ row.limitTime / 60 }}分钟</p>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button
          type="primary"
          @click="
            participateIn(
              row.examId,
              row.paperId,
              row.name,
              row.startTime,
              row.endTime,
              row.limitTime
            )
          "
          >进入考试</el-button
        >
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
      @size-change="(pageSize) => getUserExamTodoList({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getUserExamTodoList({ pageSize: listPageSize, pageNumber: currentPage })
      "
    />
  </el-card>

  <el-card class="box-card" v-show="activeIndex === '2'">
    <el-table :data="secondRecords" border style="width: 100%">
      <el-table-column prop="examId" label="考试ID" width="180" align="center" />
      <el-table-column prop="name" label="考试名称" width="180" align="center" />
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button
          type="primary"
          @click="checkTest(row.examId, row.paperId, row.name, row.startTime, row.endTime)"
          >查阅成绩</el-button
        >
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listSecondCurrentPage"
      v-model:page-size="listSecondPageSize"
      :total="secondTotal || 0"
      @size-change="(pageSize) => getUserExamHistoryList({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getUserExamHistoryList({ pageSize: listSecondPageSize, pageNumber: currentPage })
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
  margin-bottom: 14px;
}

.box-card {
  width: auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.demo-form-inline {
  .el-form-item {
    margin: 0px;
  }

  .searchInput {
    margin-right: 25px;
  }
}
.refresh {
  margin-right: 40px;
}
.refresh:hover {
  color: #409eff;
}
</style>
