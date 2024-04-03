<script setup lang="ts">
//考试信息
const testMessage = {
  id: 1,
  testName: '测试一',
  startTime: '2024-3-15 15:30',
  endTime: '2024-3-15 16:30',
  totalScore: 100
}

//试卷ID
const paperId = ref(12)

//题目列表
const questions = reactive([
  {
    id: 1,
    questionName: '炎症',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊',
    questionScore: 10,
    checkList: []
  },
  {
    id: 2,
    questionName: '受伤',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊',
    questionScore: 10,
    checkList: []
  },
  {
    id: 3,
    questionName: '绝症',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊',
    questionScore: 10,
    checkList: []
  },
  {
    id: 4,
    questionName: '绝症',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊',
    questionScore: 20,
    checkList: []
  },
  {
    id: 5,
    questionName: '绝症',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊',
    questionScore: 30,
    checkList: []
  },
  {
    id: 6,
    questionName: '绝症',
    A: '不治',
    B: '如治',
    C: '等死',
    D: '缓刑',
    type: '接诊',
    questionScore: 20,
    checkList: []
  }
])
</script>

<template>
  <div>
    <el-card style="max-width: 100%">
      <template #header>
        <div class="card-header">
          <span>{{ testMessage.testName }}</span>
        </div>
      </template>
      <div class="message">
        <p>{{ `总分:  ${testMessage.totalScore}分` }}</p>
        <p>{{ `开始时间:  ${testMessage.startTime}` }}</p>
        <p>{{ `结束时间:  ${testMessage.endTime}` }}</p>
      </div>
    </el-card>

    <div class="question" v-for="(question, index) in questions" :key="index">
      <div class="questionTitle">
        <div class="number">{{ index + 1 }}</div>
        <div class="questionName">{{ `${question.questionName}` }}</div>
        <div>{{ `(${question.questionScore}分)` }}</div>
      </div>

      <el-checkbox-group v-model="question.checkList" class="options">
        <el-checkbox :label="`A.  ${question.A}`" value="A" />
        <el-checkbox :label="`B.  ${question.B}`" value="B" />
        <el-checkbox :label="`C.  ${question.C}`" value="C" />
        <el-checkbox :label="`D.  ${question.D}`" value="D" />
      </el-checkbox-group>
    </div>

    <div class="button">
      <el-button type="primary" size="large">提交</el-button>
      <el-button type="danger" size="large">退出</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 40px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #515151;
}

.message {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  color: #515151;
}

.number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: #7dc5eb;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 20px;
}

.question {
  margin-bottom: 20px;
}

.questionTitle {
  display: flex;
  align-items: center;
}

.questionName {
  margin-right: 10px;
}

.options {
  display: flex;
  flex-direction: column;
  margin-left: 40px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 100px;
}
</style>
