import api from './index.js'

// 회원가입
export const memberApi = async (data) => {
  return await api.post('/api/users', data)
}

// 로그인
export const loginApi = async (data) => {
  return await api.post('/api/users/login', data)
}

// 회원 조회
export const getUserApi = async (userId) => {
  return await api.get(`/api/users/${userId}`)
}

// 아이디 중복체크
export const checkUserIdApi = async (userId) => {
  return await api.get(`/api/users/check/${userId}`)
}

// 닉네임 중복체크
export const checkNicknameApi = async (nickname) => {
  return await api.get(`/api/users/check/nickname/${nickname}`)
}

// 이메일 중복체크
export const checkUserEmailApi = async (userEmail) => {
  return await api.get(`/api/users/check/email/${userEmail}`)
}

// 비밀번호 업데이트
export const updateUserPwApi = async (data) => {
  return await api.put('/api/users/password', data)
}

// 비밀번호 초기화
export const resetUserPwApi = async (data) => {
  return await api.put('/api/users/reset-password', data)
}

// 닉네임 변경
export const updateNicknameApi = async (data) => {
  return await api.put('/api/users/nickname', data)
}
