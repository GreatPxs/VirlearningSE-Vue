<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

//宠物分类选项菜单
//分类选项菜单
const options = [
  {
    value: '猫',
    label: '猫'
  },
  {
    value: '狗',
    label: '狗'
  },
  {
    value: '鸟',
    label: '鸟'
  },
  {
    value: '兔',
    label: '兔'
  }
]

//测试数据
const record = reactive([
  {
    id: 1,
    caseName: '炎症',
    date: '2024-3-12',
    imageUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    status: 1
  }
])
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <!-- 下面的el-form :model还需要绑定queryCondition，是查询条件 -->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="病种">
              <!-- 下述 需要v-model="queryCondition.courseName" 绑定条件-->
              <el-input clearable placeholder="疾病名称" />
            </el-form-item>
            <el-form-item label="宠物种类">
              <!-- 下述input 需要v-model="queryCondition.petSpecies" 绑定条件-->
              <el-select placeholder="Select" size="large" style="width: 240px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <!-- 绑定点击查询函数 @click="() => queryCourses({ currentPage: 1 }) -->
              <el-button type="primary">查询 </el-button>
            </el-form-item>
          </el-form>
          <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-create' }) -->
          <el-button type="primary" @click="$router.push({ name: 'case-create' })">
            新增病例
          </el-button>
        </div>
      </template>
      <!-- tabel需要绑定数据 :data="queriedResult.records",以下records为测试数据 -->
      <el-table :data="record" border style="width: 100%">
        <!-- prop绑定属性，如第一行 -->
        <el-table-column prop="id" label="编号" width="180" align="center" />
        <el-table-column prop="caseName" label="疾病名称" align="center" />
        <el-table-column prop="date" label="接诊时间" align="center" />
        <el-table-column prop="imageUrl" label="病状照片" align="center">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.imageUrl"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column porp="status" label="状态" align="center" v-slot="{ row }">
          <!-- el-switch需要绑定改变状态函数 @change="changeStatus($event as number, row)" -->
          <el-switch
            v-model="row.status"
            class="mb-2"
            active-text="启用"
            inactive-text="禁用"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          />
        </el-table-column>
        <el-table-column label="操作" align="center" v-slot="{}">
          <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
          <el-button type="default">编辑</el-button>
        </el-table-column>
      </el-table>
      <!-- 
        分页还需要以下属性
        v-model:current-page="queriedResult.current"
        v-model:page-size="queriedResult.size"
        :total="queriedResult.total || 0"
        @size-change="(pageSize: number) => queryCourses({ pageSize, currentPage: 1 })"
        @current-change="(currentPage: number) => queryCourses({ currentPage })"
       -->
      <el-pagination
        :page-sizes="[5, 10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-card>
  </div>
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

.el-form-item {
  margin-bottom: 0px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
