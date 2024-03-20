import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//导入AutoImport、Components
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    //以下为添加内容
    AutoImport({
      imports: ['vue'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      // 2.使用 IconsResolver({ prefix: 'i' }) 可以设置前缀, 默认是 i, 也可以不填参数
      resolvers: [ElementPlusResolver(), IconsResolver()],
      eslintrc: { enabled: true } // eslint 会报 no-undef 错误. 添加此项会生成 .eslintrc-auto-import.json
    }),
    Components({
      // 2.使用 IconsResolver 设置图标集 ep
      resolvers: [ElementPlusResolver(), IconsResolver({ enabledCollections: ['ep'] })] // 自动导入 Element Plus 组件, 图标组件
    }),
    Icons({ autoInstall: true })
  ],
  resolve: {
    alias: {
      //暂且解决不了，能正常跑
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
