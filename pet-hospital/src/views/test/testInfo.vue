<script setup lang="ts">
import { useRouter } from 'vue-router'
import { User, DocumentAdd } from '@element-plus/icons-vue'

const router = useRouter()

// 切换用户状态的事件处理函数
// const handleChange = async (act: 'ENABLE' | 'DISABLE', userId: number) => {
//   let actions = {
//     ENABLE: { msg: '启用', fn: enableUser },
//     DISABLE: { msg: '禁用', fn: forbidUser }
//   }
//   const { data } = await actions[act].fn(userId)
//   if (data.code === '000000') {
//     ElMessage.success(`${actions[act].msg}用户成功!`)
//   } else {
//     ElMessage.error(`${actions[act].msg}用户失败~`)
//     throw new Error(`${actions[act].msg}用户失败~`)
//   }
// }

const queryCondition = ref({
  topic: '',
  type: '',
  A: '',
  B: '',
  C: '',
  D: ''
})

//测试考试数据
const records = ref([
  {
    id: 1,
    testName: '测试一',
    startTime: '2024-3-15 15:30',
    endTime: '2024-3-15 16:30',
    totalScore: 100
  },
  {
    id: 2,
    testName: '测试二',
    startTime: '2024-3-16 15:30',
    endTime: '2024-3-16 16:30',
    totalScore: 120
  }
])
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="考试">
            <el-input v-model="queryCondition.topic" placeholder="请输入考试关键字" clearable />
          </el-form-item>
          <!-- 绑定点击函数 @click="queryUsers({ currentPage: 1 })" -->
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="id" label="考试ID" align="center" />
      <el-table-column prop="testName" label="考试名称" align="center" />
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
      <el-table-column prop="totalScore" label="总分" align="center" />
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="primary" @click="router.push({ name: 'testPage' })">开始考试</el-button>
      </el-table-column>
    </el-table>

    <!-- 
      分页需要属性
      v-model:current-page="queriedResult.current"
      v-model:page-size="queriedResult.size"
      :total="queriedResult.total || 0"
      @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
     -->
    <el-pagination
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
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
</style>
