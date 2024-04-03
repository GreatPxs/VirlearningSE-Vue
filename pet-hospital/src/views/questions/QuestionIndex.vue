<script setup lang="ts">
import { Select, CloseBold } from '@element-plus/icons-vue'

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

// 控制dialog是否可见
const dialogFormVisible = ref(false)

//新建题目
const form = {
  questionName: '',
  type: ''
}

//分类选项菜单
const options = [
  {
    value: '接诊',
    label: '接诊'
  },
  {
    value: '校验',
    label: '校验'
  },
  {
    value: '诊断',
    label: '诊断'
  },
  {
    value: '治疗',
    label: '治疗'
  }
]

//4个按钮
const buttonIconA = ref(false)
const buttonIconB = ref(false)
const buttonIconC = ref(false)
const buttonIconD = ref(false)

const toggleButtonStyle = (id: Number) => {
  if (id === 0) buttonIconA.value = !buttonIconA.value
  if (id === 1) buttonIconB.value = !buttonIconB.value
  if (id === 2) buttonIconC.value = !buttonIconC.value
  if (id === 3) buttonIconD.value = !buttonIconD.value
}

//测试数据
const records = ref([
  {
    id: 1,
    questionName: '炎症',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊'
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
      <el-table-column prop="questionName" label="题目" align="center" />
      <el-table-column prop="A" label="A" align="center" />
      <el-table-column prop="B" label="B" align="center" />
      <el-table-column prop="C" label="C" align="center" />
      <el-table-column prop="D" label="D" align="center" />
      <el-table-column prop="type" label="分类" align="center" />
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="primary">编辑</el-button>
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" title="新增题目" center>
      <el-form :model="form" label-width="60px">
        <el-form-item label="题目">
          <el-input v-model="form.questionName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="分类">
          <el-cascader :options="options" v-model="form.type" />
        </el-form-item>
        <el-form-item label="选项A">
          <el-input
            v-model="form.questionName"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
          <el-button
            v-if="buttonIconA"
            type="info"
            :icon="Select"
            color="#7cba59"
            @click="toggleButtonStyle(0)"
          />
          <el-button v-else type="info" :icon="CloseBold" @click="toggleButtonStyle(0)" />
        </el-form-item>

        <el-form-item label="选项B">
          <el-input
            v-model="form.questionName"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
          <el-button
            v-if="buttonIconB"
            type="info"
            :icon="Select"
            color="#7cba59"
            @click="toggleButtonStyle(1)"
          />
          <el-button v-else type="info" :icon="CloseBold" @click="toggleButtonStyle(1)" />
        </el-form-item>

        <el-form-item label="选项C">
          <el-input
            v-model="form.questionName"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
          <el-button
            v-if="buttonIconC"
            type="info"
            :icon="Select"
            color="#7cba59"
            @click="toggleButtonStyle(2)"
          />
          <el-button v-else type="info" :icon="CloseBold" @click="toggleButtonStyle(2)" />
        </el-form-item>

        <el-form-item label="选项D">
          <el-input
            v-model="form.questionName"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
          <el-button
            v-if="buttonIconD"
            type="info"
            :icon="Select"
            color="#7cba59"
            @click="toggleButtonStyle(3)"
          />
          <el-button v-else type="info" :icon="CloseBold" @click="toggleButtonStyle(3)" />
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
