import api from './index.js'

// 파일 다운로드
export const downFileApi = async (postId) => {
	return await api.get(`/api/files/${postId}`)
}

// 파일 업로드
export const uploadFileApi= async (postId, file) => {
	const formData = new FormData()
	formData.append('postId', postId)
	formData.append('file', file)
	return await api.post('/api/files', formData, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})
}

// 파일 목록 조회
export const getFileListApi = async (postId) => {
	return await api.get(`/api/files/post/${postId}`)
}