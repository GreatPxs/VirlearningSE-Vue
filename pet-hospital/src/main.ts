import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '@/styles/index.scss' //导入自定义样式

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
