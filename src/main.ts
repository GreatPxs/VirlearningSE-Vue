import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPlugin from './plugin/piniaPlugin'
import '@/styles/index.scss' //导入自定义样式

const app = createApp(App)
const store = createPinia()
store.use(
  piniaPlugin({
    key: 'pinia'
  })
)

app.use(store)
app.use(router)

app.mount('#app')
