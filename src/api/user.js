import api from './index.js'

// 회원가입
export const memberApi = async (data) => {
	return await api.post('/api/users', data)
}

// 로그인
export const loginApi = async (data) => {
	return await api.post('/api/users/login', data)
}