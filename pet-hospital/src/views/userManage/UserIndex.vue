<script setup lang="ts">
import { timeFormatter } from '@/utils/timeHandlers'

// 默认用户头像
const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

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
  account: '',
  name: '',
  startCreateTime: '',
  endCreateTime: ''
})

//测试数据
const records = ref([
  {
    id: 1,
    name: 'xxx',
    account: '1111111111',
    createTime: '2023-12-22',
    role: ''
  }
])

// 时间选取器的时间范围
const timeRange = ref('')
// 当时间范围变化时, 修改相应的时间条件
watch(timeRange, (newTime) => {
  if (Array.isArray(newTime)) {
    queryCondition.value.startCreateTime = newTime[0].toISOString()
    queryCondition.value.endCreateTime = newTime[1].toISOString()
  } else {
    queryCondition.value.startCreateTime = ''
    queryCondition.value.endCreateTime = ''
  }
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="账号">
            <el-input v-model="queryCondition.account" placeholder="请输入账号" clearable />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="queryCondition.name" placeholder="请输入昵称" clearable />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker
              v-model="timeRange"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
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
      <el-table-column prop="id" label="用户ID" width="180" align="center" />
      <el-table-column label="头像" width="180" align="center" v-slot="{ row }">
        <el-avatar :size="50" :src="row.portrait">
          <img :src="circleUrl" alt="" />
        </el-avatar>
      </el-table-column>
      <el-table-column prop="name" label="昵称" width="180" align="center" />
      <el-table-column prop="account" label="账号" align="center" />
      <el-table-column
        prop="createTime"
        label="注册时间"
        align="center"
        :formatter="timeFormatter"
      />

      <!-- 需要绑定改变状态函数 @change="handleChange($event as 'ENABLE' | 'DISABLE', row.id)" -->
      <el-table-column label="状态" align="center" v-slot="{ row }">
        <el-switch
          v-model="row.status"
          class="mb-2"
          active-value="ENABLE"
          inactive-value="DISABLE"
          active-text="启用"
          inactive-text="禁用"
        />
      </el-table-column>

      <el-table-column label="分配权限" align="center" v-slot="{ row }">
        <el-select placeholder="" v-model="row.role">
          <el-option label="普通用户" value="" />
          <el-option label="数据管理员" :value="1" />
          <el-option label="后台管理员" :value="0" />
        </el-select>
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
