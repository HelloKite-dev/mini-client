import api from './index.js'

// 게시글 전체 조회
export const getPostsApi = async () => {
	return await api.get('/api/posts')
}

// 게시글 상세 조회
export const getPostDetailApi = async (id) => {
	return await api.get(`/api/posts/${id}`)
}

// 게시글 작성
export const createPostApi = async (data) => {
	return await api.post('/api/posts', data)
}

// 게시글 수정
export const updatePostApi = async (id, data) => {
	return await api.put(`/api/posts/${id}`,  data)
}

// 게시글 삭제
export  const deletePostApi = async (id) => {
	return await api.delete(`/api/posts/${id}`)
}