<script setup lang="ts">
import { Select, CloseBold } from '@element-plus/icons-vue'

const queryCondition = ref({
  topic: '',
  type: '',
  A: '',
  B: '',
  C: '',
  D: ''
})

// 控制dialog是否可见
const dialogFormVisible = ref(false)

//新建题目
const form = {
  description: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  answer: ''
}

//答案选项菜单
const options = [
  {
    value: 'A',
    label: 'A'
  },
  {
    value: 'B',
    label: 'B'
  },
  {
    value: 'C',
    label: 'C'
  },
  {
    value: 'D',
    label: 'D'
  }
]

//测试数据
const records = ref([
  {
    id: 1,
    description: '炎症',
    optionA: '不治',
    optionB: '如治',
    optionC: '等死',
    optionD: '缓刑',
    answer: 'A'
  }
])
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input
              v-model="queryCondition.topic"
              placeholder="请输入要查询的题目内容"
              clearable
            />
          </el-form-item>
          <el-form-item label="分类">
            <el-cascader :options="options" v-model="queryCondition.type" />
          </el-form-item>
          <!-- 绑定点击函数 @click="queryUsers({ currentPage: 1 })" -->
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="dialogFormVisible = !dialogFormVisible">
          新增题目
        </el-button>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="description" label="题目" align="center" />
      <el-table-column prop="optionA" label="A" align="center" />
      <el-table-column prop="optionB" label="B" align="center" />
      <el-table-column prop="optionC" label="C" align="center" />
      <el-table-column prop="optionD" label="D" align="center" />
      <el-table-column prop="answer" label="答案" align="center" />
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="新增题目" center>
      <el-form :model="form" label-width="60px">
        <el-form-item label="题目">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>

        <el-form-item label="选项A">
          <el-input
            v-model="form.optionA"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="选项B">
          <el-input
            v-model="form.optionB"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="选项C">
          <el-input
            v-model="form.optionC"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="选项D">
          <el-input
            v-model="form.optionD"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="答案">
          <el-cascader :options="options" v-model="form.answer" size="large" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"> 新增 </el-button>
        </div>
      </template>
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
      :page-sizes="[1, 5, 10, 20, 50]"
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
