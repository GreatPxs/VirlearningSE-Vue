<script setup lang="ts">
import { User, DocumentAdd } from '@element-plus/icons-vue'

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

// 默认用户头像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const queryCondition = ref({
  topic: '',
  type: '',
  A: '',
  B: '',
  C: '',
  D: ''
})

// 控制dialog考试表单是否可见
const dialogFormVisible = ref(false)

//控制dialog选择试卷表单是否可见
const dialogPaperVisible = ref(false)

//控制dialog选择用户表单是否可见
const dialogUserVisible = ref(false)

//新建题目
const form = reactive({
  testName: '',
  startTime: '',
  endTime: ''
})

//测试考试数据
const records = ref([
  {
    id: 1,
    testName: '测试一',
    startTime: '2024-3-15 15:30',
    endTime: '2024-3-15 16:30',
    totalScore: 100
  }
])

//测试考试所需试卷数据
const testPapers = reactive([
  {
    id: 0,
    paperName: '卷子一',
    examTime: 100,
    totalScore: 0
  },
  {
    id: 1,
    paperName: '卷子二',
    examTime: 100,
    totalScore: 0
  }
])

//测试考试选择学生数据
const testUsers = reactive([
  {
    id: 0,
    isChosen: false,
    name: '张三',
    account: 'wegwebbbr1214'
  }
])

//测试：考卷单选
const selectedRow = ref(null)
const handleSelectionChange = (selectedRowKeys, selectedRows) => {
  if (selectedRowKeys.length > 0) {
    selectedRow.value = testPapers.find((row) => row.id === selectedRowKeys[0])
  } else {
    selectedRow.value = null
  }
}

const addPaper = () => {
  dialogFormVisible.value = false
  dialogUserVisible.value = false
  dialogPaperVisible.value = true
}

const chooseUsers = () => {
  dialogFormVisible.value = false
  dialogPaperVisible.value = false
  dialogUserVisible.value = true
}

const afterAddingPaper = () => {
  dialogPaperVisible.value = false
  dialogUserVisible.value = false
  dialogFormVisible.value = true
}

const afterChoosingUsers = () => {
  dialogPaperVisible.value = false
  dialogUserVisible.value = false
  dialogFormVisible.value = true
}
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

        <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">
          新增考试
        </el-button>
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
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="添加考试" center>
      <el-form :model="form" label-width="100px">
        <el-form-item label="考试名称">
          <el-input v-model="form.testName" autocomplete="off" />
        </el-form-item>

        <!-- 绑定 @change="handleChange" -->
        <el-form-item label="开始时间">
          <el-input v-model="form.startTime" />
        </el-form-item>

        <el-form-item label="结束时间">
          <el-input v-model="form.endTime" />
        </el-form-item>

        <el-form-item>
          <el-button type="info" :icon="DocumentAdd" @click="addPaper"> 选择考卷 </el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="info" :icon="User" @click="chooseUsers"> 选择考生 </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogPaperVisible" title="选择试卷" center style="width: 70%">
      <el-table
        border
        row-key="id"
        style="width: 100%"
        :data="testPapers"
        highlight-current-row
        @current-change="handleSelectionChange"
      >
        <el-table-column prop="id" align="center" width="80px" type="selection" />
        <el-table-column prop="id" label="试卷ID" align="center" width="80px" />
        <el-table-column prop="paperName" label="试卷名称" align="center" />
        <el-table-column prop="examTime" label="时长(分钟)" align="center" />
        <el-table-column prop="totalScore" label="总分" align="center" width="180px">
          <template #default="scope">
            <el-input-number v-model="scope.row.questionScore" :min="1" :max="200" />
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="afterAddingPaper"> 提交 </el-button>
        </div>
      </template>

      <el-pagination
        :page-sizes="[5, 10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-dialog>

    <el-dialog v-model="dialogUserVisible" title="选择考生" center style="width: 70%">
      <el-table border style="width: 100%" :data="testUsers">
        <el-table-column prop="isChosen" label="勾选" align="center" width="60px">
          <template #default="scope">
            <el-checkbox v-model="scope.row.isChosen" size="large" />
          </template>
        </el-table-column>
        <el-table-column prop="id" label="用户ID" align="center" width="80px" />
        <el-table-column label="头像" width="180" align="center" v-slot="{ row }">
          <el-avatar :size="50" :src="row.portrait">
            <img :src="circleUrl" alt="" />
          </el-avatar>
        </el-table-column>
        <el-table-column prop="name" label="昵称" align="center" />
        <el-table-column prop="account" label="账号" align="center" />
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="afterChoosingUsers"> 提交 </el-button>
        </div>
      </template>

      <el-pagination
        :page-sizes="[5, 10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-dialog>

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
