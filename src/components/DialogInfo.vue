<script setup lang="ts">

import { ElMessageBox } from 'element-plus'

const props = defineProps<{
  totalScore: number
  digit_rule: string
  limit_rule: string
  readme: string
  reset: () => void
}>()

const info = (msg: string, title: string) => {
  ElMessageBox.alert(msg.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'), title, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: 'OK',
    customStyle: {
      'max-width': '40%'
    }
  })
}
const useinfo = () => {
  info(props.readme, '使用说明')
}
const digit_info = () => {
  info(props.digit_rule, '分数性规则')
}
const limit_info = () => {
  info(props.limit_rule, '限制性规则')
}
const reset = () => {
  props.reset()
}
</script>

<template>
  <div class="result">
    <el-button class="info" plain @click="useinfo">使用说明</el-button>
    <el-button class="info" plain @click="digit_info">分数性规则</el-button>
    <el-button class="info" plain @click="limit_info">限制性规则</el-button>
    <div class="reset">
      <el-text class="mx-1 score" size="large"
        >最终得分: {{ (totalScore).toFixed(2) }}</el-text
      >
      <el-button class="reset-button" type="primary" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<style scoped>
.result {
  margin-left: 1%;
  padding: 10px 0;
  height: auto;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.info {
  margin-left: auto;
  margin-right: 5px;
  margin-top: auto;
  flex: 1;
  width: 10%;
  height: 10%;
  align-items: center;
  .el-button {
    width: 70%;
    height: 100%;
  }
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
  margin-right: 3%;
}
</style>
