<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user-store'
import { getPostDetailApi, deletePostApi, updatePostApi } from '@/api/post.js'
import {
  getCommentApi,
  createCommentApi,
  updateCommentApi,
  deleteCommentApi,
} from '@/api/comment.js'
import { getFileListApi, downFileApi, deleteFileApi } from '@/api/file.js'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const post = ref({})
const commentList = ref([])
const fileList = ref([])
const newComment = ref('')
const deleteFileList = ref([])

// 날짜 양식
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.substring(0, 16).replace('T', ' ')
}

// 수정 날짜
const displayDate = (post) => {
  if (post.modDt && post.modDt !== '') {
    return '수정됨 ' + formatDate(post.modDt)
  }
  return formatDate(post.regDt)
}

// 게시글 수정 여부
const isEditing = ref(null)

// 게시글 상세 조회
const fetchPost = async () => {
  const res = await getPostDetailApi(route.params.id)
  post.value = res.data
}

// 게시글 삭제
const deletePost = async () => {
  await deletePostApi(route.params.id)
  router.push('/posts')
}

// 게시글 저장(수정 시)
const fnSave = async () => {
  if (!post.value.title) {
    alert('제목을 입력해주세요.')
    return
  }

  if (!post.value.content) {
    alert('내용을 입력해주세요.')
    return
  }

  try {
    await updatePostApi(route.params.id, post.value)

    for (const fileId of deleteFileList.value) {
      await deleteFileApi(fileId)
    }

    deleteFileList.value = []
    isEditing.value = false
    await fetchPost()
    await fetchFiles()

    alert('수정이 완료되었습니다.')
  } catch (e) {
    alert('수정에 실패했습니다. 다시 시도해주세요.')
  }
}

const goEdit = () => {
  isEditing.value = true
}

// 게시글 취소
const goDetail = () => {
  isEditing.value = false
}

// 댓글 조회
const fetchComments = async () => {
  const res = await getCommentApi(route.params.id)
  commentList.value = res.data
}

// 댓글 작성
const submitComment = async () => {
  if (!newComment.value) return
  try {
    await createCommentApi({
      postId: route.params.id,
      userId: userStore.userId,
      content: newComment.value,
    })
    newComment.value = ''
    fetchComments()

    alert('작성이 완료되었습니다.')
  } catch (e) {
    alert('작성에 실패했습니다. 다시 시도해주세요.')
  }
}

// 댓글 수정 여부
const isEditingComment = ref(false)

const goEditComment = (comment) => {
  isEditingComment.value = comment.id // true → comment.id
}

// 댓글 수정
const updateComment = async (comment) => {
  try {
    await updateCommentApi(comment.id, comment)
    isEditingComment.value = null
    fetchComments()

    alert('수정이 완료되었습니다.')
  } catch (e) {
    alert('수정에 실패했습니다. 다시 시도해주세요.')
  }
}

// 댓글 취소
const goComment = () => {
  isEditingComment.value = false
}

// 댓글 삭제
const deleteComment = async (id) => {
  try {
    await deleteCommentApi(id)
    fetchComments()

    alert('삭제가 완료 되었습니다.')
  } catch (e) {
    alert('삭제에 실패했습니다. 다시 시도해주세요.')
  }
}

// 목록으로 이동
const goList = () => {
  router.push('/posts')
}

const goMypage = () => {
  router.push(`/mypage/${post.value.userId}`)
}
// 파일 목록 조회
const fetchFiles = async () => {
  const res = await getFileListApi(route.params.id)
  fileList.value = res.data
}

// 파일 다운로드
const downFile = async (file) => {
  const res = await downFileApi(file.fileId)
  const url = window.URL.createObjectURL(new Blob([res.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', file.fileNm)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

// 파일 삭제
const fileDelete = (file) => {
  deleteFileList.value.push(file.fileId)
  fileList.value = fileList.value.filter((f) => f.fileId !== file.fileId) // 화면에서 제거
}

onMounted(() => {
  fetchPost()
  fetchComments()
  fetchFiles()
})
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 16px">
    <!-- 목록 버튼 -->
    <div style="margin-bottom: 16px">
      <VBtn @click="goList" variant="text">← 목록으로</VBtn>
      <div class="author" @click="goMypage">{{ userStore.nickname }} 님</div>
    </div>

    <!-- 게시글 -->
    <VCard class="mb-4 pa-4">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <h2 v-if="!isEditing">{{ post.title }}</h2>
        <VTextField v-else v-model="post.title" />
        <!-- 작성자만 수정/삭제 보임 -->
        <div v-if="userStore.userId === post.userId">
          <VBtn v-if="!isEditing" @click="goEdit" variant="text">수정</VBtn>
          <VBtn v-if="!isEditing" @click="deletePost" variant="text" color="red">삭제</VBtn>
          <VBtn v-if="isEditing" @click="fnSave" variant="text">저장</VBtn>
          <VBtn v-if="isEditing" @click="goDetail" variant="text" color="red">취소</VBtn>
        </div>
      </div>
      <div v-if="post.id" style="color: gray; font-size: 14px; margin: 8px 0">
        작성자:
        <span class="author" @click="goMypage">
          {{ post.nickname }}
        </span>
        | 조회수: {{ post.viewCount }} | {{ displayDate(post) }}
      </div>
      <VDivider class="my-4" />
      <div v-if="!isEditing">{{ post.content }}</div>
      <VTextarea v-else v-model="post.content" />
    </VCard>

    <!-- 첨부파일 -->
    <VCard class="mb-4 pa-4" v-if="fileList.length > 0">
      <h4 class="mb-2">첨부파일</h4>
      <div
        v-for="file in fileList"
        :key="file.fileId"
        style="cursor: pointer; display: flex; align-items: center"
      >
        <span @click="downFile(file)">📎 {{ file.fileNm }}</span>
        <VBtn
          v-if="isEditing"
          @click="fileDelete(file)"
          icon="mdi-close"
          variant="text"
          size="small"
        />
      </div>
    </VCard>

    <!-- 댓글 -->
    <VCard class="pa-4">
      <h4 class="mb-4">댓글 {{ commentList.length }}</h4>
      <div v-for="comment in commentList" :key="comment.id" class="mb-3">
        <div style="font-weight: bold">{{ comment.nickname }}</div>
        <div v-if="isEditingComment !== comment.id">{{ comment.content }}</div>
        <VTextField v-else v-model="comment.content" />
        <div style="color: gray; font-size: 12px">{{ displayDate(comment) }}</div>
        <VBtn
          v-if="isEditingComment !== comment.id && userStore.userId === comment.userId"
          @click="goEditComment(comment)"
          variant="text"
          >수정</VBtn
        >
        <VBtn
          v-if="
            !isEditingComment &&
            (userStore.userId === comment.userId || userStore.userId === post.userId)
          "
          @click="deleteComment(comment.id)"
          variant="text"
          color="red"
          >삭제</VBtn
        >
        <VBtn v-if="isEditingComment === comment.id" @click="updateComment(comment)" variant="text"
          >저장</VBtn
        >
        <VBtn v-if="isEditingComment === comment.id" @click="goComment" variant="text" color="red"
          >취소</VBtn
        >
        <VDivider class="mt-2" />
      </div>

      <!-- 댓글 작성 -->
      <div style="display: flex; gap: 8px; margin-top: 16px">
        <VTextField v-model="newComment" placeholder="댓글을 입력하세요" density="compact" />
        <VBtn @click="submitComment">등록</VBtn>
      </div>
    </VCard>
  </div>
</template>

<style>
.author {
  cursor: pointer;
}
.author:hover {
  font-weight: bolder;
  text-decoration: underline;
}
</style>
