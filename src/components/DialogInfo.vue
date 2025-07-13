<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  totalScore: number
  digit_rule: string
  limit_rule: string
  readme: string
  reset: () => void
}>()

const fabOpen = ref(false)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogContent = ref('')

function openDialog(type: string) {
  fabOpen.value = false
  dialogVisible.value = true
  if (type === 'useinfo') {
    dialogTitle.value = '使用说明'
    dialogContent.value = props.readme.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')
  } else if (type === 'digit') {
    dialogTitle.value = '分数性规则'
    dialogContent.value = props.digit_rule.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')
  } else if (type === 'limit') {
    dialogTitle.value = '限制性规则'
    dialogContent.value = props.limit_rule.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;')
  }
}

const useinfo = () => openDialog('useinfo')
const digit_info = () => openDialog('digit')
const limit_info = () => openDialog('limit')
const reset = () => props.reset()

// 响应式监听窗口变化（可选，体验更好）
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) fabOpen.value = false
})
</script>

<template>
  <!-- <div class="result" v-if="!isMobile">
    <el-button class="info" plain @click="useinfo">使用说明</el-button>
    <el-button class="info" plain @click="digit_info">分数性规则</el-button>
    <el-button class="info" plain @click="limit_info">限制性规则</el-button>
    <div class="reset">
      <el-text class="mx-1 score" size="large">最终得分: {{ totalScore.toFixed(2) }}</el-text>
      <el-button class="reset-button" type="primary" @click="reset">重置</el-button>
    </div>
  </div> -->
  <!-- 移动端悬浮球 -->
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="90vw"
    align-center
    :close-on-click-modal="true"
    class="mobile-dialog"
  >
    <div
      v-html="dialogContent"
      style="text-align: center; font-size: 1.1em; line-height: 1.8"
    ></div>
  </el-dialog>
  <div class="result">
    <div class="info">
      <el-button class="info" plain @click="useinfo">使用说明</el-button>
      <el-button class="info" plain @click="digit_info">分数性规则</el-button>
      <el-button class="info" plain @click="limit_info">限制性规则</el-button>
    </div>
    <div class="reset">
      <el-text class="mx-1 score" size="large">最终得分: {{ totalScore.toFixed(2) }}</el-text>
      <el-button class="reset-button" type="primary" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<style scoped>
.result {
  margin-left: 1%;
  /* padding: 10px 0; */
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.info {
  display: flex;
  margin-right: 5px;
  margin-top: auto;
  flex: 3;
  width: 10%;
  height: 100%;
  align-items: center;
  .el-button {
    width: 70%;
    height: 100%;
  }
}
.result.info{
  margin-left: 5px;
}
.reset {
  margin-right: 2%;
  width: 30%;
  flex: 5;
  display: flex;
  align-items: center;
  margin-left: auto;
  justify-content: flex-end;
}
.reset-button {
  width: 15% !important;
  height: 100% !important;
}
.score {
  margin-right: 10%;
}

.mobile-dialog {
  z-index: 4000;
}
.mobile-reset {
  justify-content: center;
}
@media (min-width: 769px) {
  .fab,
  .fab-btn,
  .mobile-dialog,
  .mobile-reset {
    display: none !important;
  }
}
@media (max-width: 768px) {
  .result {
    flex-direction: column !important;
    align-items: stretch;
    width: 100%;
    display: flex !important;
  }
  .info {
    width: 100% !important;
    /* margin: 0 0 8px 0; */
    display: flex;
    justify-content: center;
  }
  .reset,
  .mobile-reset {
    width: 100% !important;
    margin: 8px 0 8px 0;
    justify-content: center;
    display: flex;
  }
}
</style>
