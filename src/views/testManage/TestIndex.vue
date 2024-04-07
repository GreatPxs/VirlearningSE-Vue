<script setup lang="ts">
import { ElTable } from 'element-plus'
import { User, DocumentAdd } from '@element-plus/icons-vue'

const queryCondition = ref({
  name: ''
})

// 控制dialog考试表单是否可见
const dialogFormVisible = ref(false)

//控制dialog选择试卷表单是否可见
const dialogPaperVisible = ref(false)

//新建or编辑考试
const form = reactive({
  name: '',
  startTime: '',
  endTime: ''
})

//考试列表数据
const records = ref([
  {
    examId: 1,
    paperId: 2,
    name: '测试一',
    startTime: '2024-3-15 15:30',
    endTime: '2024-3-15 16:30'
  }
])

//测试考试所需试卷数据
const testPapers = reactive([
  {
    paperId: 1,
    name: '卷子一',
    totalNum: 10,
    totalScore: 100
  },
  {
    paperId: 2,
    name: '卷子二',
    totalNum: 5,
    totalScore: 60
  }
])
//考卷单选
const addPaper = () => {
  dialogFormVisible.value = false
  dialogPaperVisible.value = true
}
const afterAddingPaper = () => {
  console.log(currentRow.value)
  console.log(currentRow.value.paperId)
  dialogPaperVisible.value = false
  dialogFormVisible.value = true
}
const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()
const setCurrent = (row?) => {
  singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val) => {
  currentRow.value = val
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="考试">
            <el-input v-model="queryCondition.name" placeholder="请输入考试关键字" clearable />
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
      <el-table-column prop="examId" label="考试ID" align="center" />
      <el-table-column prop="paperId" label="试卷ID" align="center" />
      <el-table-column prop="name" label="考试名称" align="center" />
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
      <el-table-column label="考生" align="center" v-slot="{ row }" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button
          type="info"
          :icon="User"
          @click="$router.push({ name: 'testExaminee', params: { id: row.examId } })"
        >
          选择考生
        </el-button>
      </el-table-column>
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="添加考试" center>
      <el-form :model="form" label-width="100px">
        <el-form-item label="考试名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <!-- 绑定 @change="handleChange" -->
        <el-form-item label="开始时间">
          <div class="block">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择考试开始时间"
            />
          </div>
        </el-form-item>

        <el-form-item label="结束时间">
          <div class="block">
            <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择考试结束时间" />
          </div>
        </el-form-item>

        <el-form-item label="考卷">
          <el-button type="info" :icon="DocumentAdd" @click="addPaper"> 选择考卷 </el-button>
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
        ref="singleTableRef"
        border
        style="width: 100%"
        :data="testPapers"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="paperId" label="试卷ID" align="center" width="80px" />
        <el-table-column prop="name" label="试卷名称" align="center" />
        <el-table-column prop="totalNum" label="题目数" align="center" />
        <el-table-column prop="totalScore" label="总分" align="center" />
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
