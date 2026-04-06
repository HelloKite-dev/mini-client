<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user-store'
import { createPostApi } from '@/api/post.js'
import { uploadFileApi } from '@/api/file.js'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const post = ref({})
const selectedFiles = ref([])

// 게시글 저장
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
    const res = await createPostApi({
      userId: userStore.userId,
      title: post.value.title,
      content: post.value.content,
    })

    const postId = res.data

    // 파일 업로드
    for (const file of selectedFiles.value) {
      try {
        await uploadFileApi(postId, file)
      } catch (e) {
        alert(`${file.name} 파일 업로드에 실패했습니다.`)
      }
    }

    alert('작성이 완료되었습니다.')
    // 상세페이지 이동
    goDetail(postId)
  } catch (e) {
    alert('작성에 실패했습니다. 다시 시도해주세요.')
  }
}

// 목록으로 이동
const goList = () => {
  router.push('/posts')
}

const goMypage = () => {
  router.push(`/mypage/${userStore.userId}`)
}

const addFile = (e) => {
  const files = Array.from(e.target.files)
  selectedFiles.value.push(...files)
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const goDetail = (id) => {
  router.push(`/posts/${id}`)
}
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 16px">
    <!-- 목록 버튼 -->
    <div style="margin-bottom: 16px; display: flex; justify-content: flex-end">
      <div class="author" @click="goMypage">{{ userStore.nickname }} 님</div>
    </div>

    <!-- 게시글 -->
    <VCard class="mb-4 pa-4">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <VTextField v-model="post.title" placeholder="제목을 입력하세요" density="compact" />
        <div>
          <VBtn @click="fnSave" variant="text">저장</VBtn>
          <VBtn @click="goList" variant="text" color="red">취소</VBtn>
        </div>
      </div>
      <VDivider class="my-4" />
      <VTextarea v-model="post.content" placeholder="내용을 입력하세요" density="compact" />

      <!-- 첨부파일 -->
      <h4 class="mb-2">첨부파일</h4>
      <input type="file" multiple @change="addFile" />
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        style="display: flex; align-items: center"
      >
        <span>📎 {{ file.name }}</span>
        <VBtn @click="removeFile(index)" icon="mdi-close" variant="text" size="small" />
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
