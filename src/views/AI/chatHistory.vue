<script setup lang="ts">
import { getChatHistory } from '@/api/aiChat/getChatHistory'

const messages = ref([
  {
    answer: '你好，可以查询AI对话历史记录',
    t_question: ''
  }
])

const isLoading = ref(false)

const form = ref({
  startTime: '',
  endTime: ''
})

// 处理开始日期时间选择器的变化
const handleStartDateTimeChange = (value) => {
  // 将日期对象转换为字符串格式
  form.value.startTime = value ? value.format('yyyy-MM-dd HH:mm:ss') : ''
}
// 处理开始日期时间选择器的变化
const handleEndDateTimeChange = (value) => {
  // 将日期对象转换为字符串格式
  form.value.endTime = value ? value.format('yyyy-MM-dd HH:mm:ss') : ''
}

const getHistory = async () => {
  isLoading.value = true
  const data = await getChatHistory(form.value).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('这段日期无AI对话记录')

      //打印数据
      console.log(res.data)

      isLoading.value = false

      throw new Error('这段日期无AI对话记录')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  messages.value = data.data
  messages.value.reverse()

  isLoading.value = false
}

//去除特殊符号
const deleteUselessCode = (str) => {
  let ans = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '*' || str[i] === '^') continue
    else if (str[i] === '[') {
      for (let j = i + 1; j < str.length; j++) {
        if (str[j] === ']') {
          i = j
          break
        }
      }
    } else ans += str[i]
  }
  return ans
}
</script>

<template>
  <div class="father">
    <div class="header">
      <img src="@/assets/return.svg" class="return" @click="$router.go(-1)" />
      <span>AI对话记录</span>
    </div>
    <el-form :inline="true" :model="form" class="timeForm">
      <el-form-item label="开始时间">
        <div class="block">
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="对话开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="handleStartDateTimeChange"
          />
        </div>
      </el-form-item>

      <el-form-item label="结束时间">
        <div class="block">
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="对话结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            @change="handleEndDateTimeChange"
          />
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" color="#393030" :loading="isLoading" @click="getHistory"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <div class="content">
      <el-scrollbar>
        <div class="message" v-for="(message, index) in messages" :key="index">
          <div class="pack pack_user" v-show="message.t_question !== ''">
            <div class="userMessage">{{ message.t_question }}</div>
          </div>
          <div class="pack">
            <div class="aiMessage">{{ deleteUselessCode(message.answer) }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;

  span {
    font-size: 20px;
    font-weight: bold;
    color: #393030;
    margin-left: 20px;
  }
}

img {
  width: 35px;
  height: 35px;
}

.return {
  margin-left: 30px;
}

.return:hover {
  transform: scale(1.2);
}

.timeForm {
  margin-top: 30px;
  margin-left: 250px;
}

.history {
  width: 40px;
  height: 40px;
  position: fixed;
  left: 250px;
  bottom: 40px;
}

.content {
  padding: 30px;
  width: 70%;
  height: 490px;

  position: fixed;
  right: 100px;
  bottom: 20px;
}

.pack {
  margin-bottom: 20px;
}

.pack_user {
  width: 100%;
  direction: rtl;
}

.userMessage {
  width: max-content;
  max-width: 700px;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  margin-right: 20px;

  color: #fff;
  background-color: #393030;
  border-radius: 10px;
  border: 1px solid #393030;

  box-shadow: 2px 2px 3px #bfbfbf;
}

.aiMessage {
  max-width: 700px;
  width: max-content;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  color: black;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #bfbfbf;

  box-shadow: 2px 2px 3px #bfbfbf;
}
</style>
