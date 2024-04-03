<script setup lang="ts">
import { DocumentAdd } from '@element-plus/icons-vue'

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

// 控制dialog试卷表单是否可见
const dialogFormVisible = ref(false)

//控制dialog新增题目表单是否可见
const dialogQuesVisible = ref(false)

//新建题目
const form = reactive({
  paperName: '',
  examTime: 0,
  totalScore: 0
})

//测试试卷数据
const records = ref([
  {
    id: 1,
    paperName: '卷一',
    examTime: '100分钟',
    totalScore: 100
  }
])

//测试试卷所需题目数据
const testQuestions = reactive([
  {
    isChosen: false,
    id: 0,
    type: '接诊',
    question: '炎症',
    questionScore: 0
  }
])

const addQuestion = () => {
  dialogFormVisible.value = false
  dialogQuesVisible.value = true
}

const afterAddingQuestion = () => {
  dialogQuesVisible.value = false
  dialogFormVisible.value = true
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="试卷">
            <el-input v-model="queryCondition.topic" placeholder="请输入试卷关键字" clearable />
          </el-form-item>
          <!-- 绑定点击函数 @click="queryUsers({ currentPage: 1 })" -->
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">
          新增试卷
        </el-button>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="id" label="试卷ID" align="center" />
      <el-table-column prop="paperName" label="试卷名称" align="center" />
      <el-table-column prop="examTime" label="考试时间(分钟)" align="center" />
      <el-table-column prop="totalScore" label="总分" align="center" />
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="添加试卷" center>
      <el-form :model="form" label-width="100px">
        <el-form-item label="试卷名称">
          <el-input v-model="form.paperName" autocomplete="off" />
        </el-form-item>

        <!-- 绑定 @change="handleChange" -->
        <el-form-item label="用时(分钟)">
          <el-input-number v-model="form.examTime" :min="0" :max="200" />
        </el-form-item>

        <el-form-item label="总分">
          <el-input-number v-model="form.totalScore" :min="0" :max="200" />
        </el-form-item>

        <el-form-item>
          <el-button type="info" :icon="DocumentAdd" @click="addQuestion"> 添加试题 </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogQuesVisible" title="添加试题" center style="width: 70%">
      <el-table border style="width: 100%" :data="testQuestions">
        <el-table-column prop="isChosen" label="勾选" align="center" width="60px">
          <template #default="scope">
            <el-checkbox v-model="scope.row.isChosen" size="large" />
          </template>
        </el-table-column>
        <el-table-column prop="id" label="题目ID" align="center" width="80px" />
        <el-table-column prop="type" label="题目类型" align="center" width="90px" />
        <el-table-column prop="questionName" label="题目" align="center" />
        <el-table-column prop="questionScore" label="给分" align="center" width="180px">
          <template #default="scope">
            <el-input-number v-model="scope.row.questionScore" :min="1" :max="200" />
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="afterAddingQuestion"> 提交 </el-button>
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
