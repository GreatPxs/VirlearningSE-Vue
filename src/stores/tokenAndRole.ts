import { defineStore } from 'pinia'

export const useTokenAndRoleStore = defineStore('token', () => {
  //初始值
  const tokenJson = ref('')
  const roleTemp = ref('')

  //计算属性
  const tokenAndRole = computed(() => {
    try {
      return {
        token: tokenJson.value || window.localStorage.getItem('TokenInfo') || '',
        role: roleTemp.value || window.localStorage.getItem('roleInfo') || ''
      }
    } catch (error) {
      ElMessage.error('token字符串未成转成对象形式')
      window.localStorage.setItem('TokenInfo', '')
      window.localStorage.setItem('roleInfo', '')
      throw Error('token字符串无法转换')
    }
  })

  //保存token和role的方法
  function saveTokenAndRole(tokenInfo: string, roleInfo: string) {
    tokenJson.value = tokenInfo
    window.localStorage.setItem('TokenInfo', tokenInfo)

    roleTemp.value = roleInfo
    window.localStorage.setItem('roleInfo', roleInfo)
  }

  {
    true // 开启数据缓存 +++++++
  }

  return { tokenAndRole, saveTokenAndRole }
})
