<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { CalculatorOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const activeMenu = computed(() => router.currentRoute.value.path)
const emit = defineEmits(['menu-click'])

function handleMenuClick(path: string) {
  router.push(path)
  emit('menu-click', path)
}

const props = defineProps<{
  isCollapse: boolean
}>()
</script>

<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="props.isCollapse"
    @select="handleMenuClick"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><CalculatorOutlined /></el-icon>
        <span>集成战略计算器</span>
      </template>
      <el-menu-item index="/mizuki">骑士杯</el-menu-item>
      <el-menu-item index="/sami_naotan">闹谭杯</el-menu-item>
      <el-menu-item index="/sagou">萨构杯2</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/readme">
      <el-icon><InfoCircleOutlined /></el-icon>
      <template #title>使用说明</template>
    </el-menu-item>
  </el-menu>
</template>



<style scoped>
</style>
