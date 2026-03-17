import api from './index.js'

// 게시글 별 댓글 조회
export const getCommentApi = async (postId) => {
	return api.get(`/api/comments/${postId}`)
}

// 댓글 작성
export const createCommentApi = async (data) => {
	return api.post('/api/comments', data)
}

// 댓글 수정
export const updateCommentApi = async (id,data) => {
	return api.put(`/api/comments/${id}`, data)
}

// 댓글 삭제
export const deleteCommentApi = async (id) => {
	return api.delete(`/api/comments/${id}`)
}