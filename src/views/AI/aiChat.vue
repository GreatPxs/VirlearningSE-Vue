<script setup lang="ts">
import { getAiChat } from '@/api/aiChat/getAiChat'
import { getAiChatLocal } from '@/api/aiChat/getAiChatLocal'

//输入框内容
const inputContent = ref('')
//id为0表示用户信息,id为1表示ai回答
const messages = ref([
  {
    id: 1,
    message: '你好,欢迎使用AI助手大模型咨询！'
  }
])
//加载中
const isLoading = ref(false)
const sendMessage = async () => {
  if (isLoading.value) {
    ElMessage.success('请上次回答结束后,再咨询AI助手')
    return
  }
  isLoading.value = true
  messages.value.push({
    id: 0,
    message: inputContent.value
  })
  const data = await getAiChat(inputContent.value).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取AI回答失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取AI回答失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  inputContent.value = ''
  messages.value.push({
    id: 1,
    message: data.data
  })

  isLoading.value = false
}

//输入框内容
const inputContentLocal = ref('')
//id为0表示用户信息,id为1表示ai回答
const messagesLocal = ref([
  {
    id: 1,
    message: '你好,欢迎使用AI助手本地知识库咨询！'
  }
])
//加载中
const isLoadingLocal = ref(false)
const sendMessageLocal = async () => {
  if (isLoadingLocal.value) {
    ElMessage.success('请上次回答结束后,再咨询AI助手')
    return
  }
  isLoadingLocal.value = true
  messagesLocal.value.push({
    id: 0,
    message: inputContentLocal.value
  })
  const data = await getAiChatLocal(inputContentLocal.value).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取AI回答失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取AI回答失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  inputContentLocal.value = ''
  messagesLocal.value.push({
    id: 1,
    message: data.data
  })

  isLoadingLocal.value = false
}

const activeIndex = ref('1')

//切换事件
const handleClick = () => {}

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
  <el-tabs v-model="activeIndex" class="tabs" type="card" @tab-click="handleClick">
    <el-tab-pane label="大模型" name="1"></el-tab-pane>
    <el-tab-pane label="知识库" name="2"></el-tab-pane>
  </el-tabs>
  <div class="father" v-show="activeIndex === '1'">
    <div class="robot">
      <img src="@/assets/robot2.svg" />
      <p>大模型</p>
    </div>
    <img
      src="@/assets/history.svg"
      class="history"
      @click="$router.push({ name: 'chatHistory' })"
    />
    <div class="content">
      <el-scrollbar>
        <div class="message" v-for="(message, index) in messages" :key="index">
          <div class="pack pack_user" v-if="message.id === 0">
            <div class="userMessage">{{ message.message }}</div>
          </div>
          <div class="pack" v-else>
            <div class="aiMessage">{{ message.message }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="foot">
      <div class="userInput">
        <textarea v-model="inputContent" maxlength="200" rows="4" class="searchInput"></textarea>
        <el-icon size="20px" class="applyButton" @click="sendMessage" v-show="!isLoading"
          ><IEpPosition
        /></el-icon>
        <el-icon size="20px" class="loadButton" v-show="isLoading"><IEpLoading /></el-icon>
      </div>
    </div>
  </div>

  <div class="father" v-show="activeIndex === '2'">
    <div class="robot">
      <img src="@/assets/robot2.svg" />
      <p>知识库</p>
    </div>
    <img
      src="@/assets/history.svg"
      class="history"
      @click="$router.push({ name: 'chatHistory' })"
    />
    <div class="content">
      <el-scrollbar>
        <div class="message" v-for="(message, index) in messagesLocal" :key="index">
          <div class="pack pack_user" v-if="message.id === 0">
            <div class="userMessage">{{ message.message }}</div>
          </div>
          <div class="pack" v-else>
            <div class="aiMessage">{{ deleteUselessCode(message.message) }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="foot">
      <div class="userInput">
        <textarea
          v-model="inputContentLocal"
          maxlength="200"
          rows="4"
          class="searchInput"
        ></textarea>
        <el-icon size="20px" class="applyButton" @click="sendMessageLocal" v-show="!isLoadingLocal"
          ><IEpPosition
        /></el-icon>
        <el-icon size="20px" class="loadButton" v-show="isLoadingLocal"><IEpLoading /></el-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 50px;
  height: 50px;
}

.tabs {
  position: fixed;
  right: 60px;
  top: 90px;
}

.robot {
  display: flex;
  align-items: center;
  margin-left: 30px;

  p {
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
    color: #515151;
  }
}

.history {
  width: 40px;
  height: 40px;
  position: fixed;
  left: 250px;
  bottom: 40px;
}

.history:hover {
  transform: scale(1.2);
}

.content {
  padding: 30px;
  width: 70%;
  height: 490px;

  position: fixed;
  right: 50px;
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

.foot {
  width: 70%;
  position: fixed;
  bottom: 20px;
  right: 100px;
}

.userInput {
  width: 100%;
  height: 100%;
  position: relative;
}

.searchInput {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #515151;
  width: 100%;
  resize: none;
}

.applyButton {
  position: absolute;
  bottom: 10px;
  right: 0px;
}

.loadButton {
  position: absolute;
  bottom: 10px;
  right: 0px;
}

.applyButton:hover {
  transform: scale(1.4);
}
</style>
