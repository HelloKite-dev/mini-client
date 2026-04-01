// 로그인 하면 토큰이랑 유저 정보를 저장하고, 로그아웃하면 지우는 역할

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const userId = ref(null)
  const userNm = ref(null)
  const nickname = ref(null)

  function setLogin(loginData) {
    token.value = loginData.token
    userId.value = loginData.userId
    userNm.value = loginData.userNm
    nickname.value = loginData.nickname
    localStorage.setItem('token', loginData.token)
    localStorage.setItem('userId', loginData.userId)
    localStorage.setItem('userNm', loginData.userNm)
    localStorage.setItem('nickname', loginData.nickname)
  }

  function setLogout() {
    token.value = null
    userId.value = null
    userNm.value = null
    nickname.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userNm')
    localStorage.removeItem('nickname')
  }

  const isLoggedIn = () => !!token.value

  return { token, userId, userNm, nickname, setLogin, setLogout, isLoggedIn }
})
