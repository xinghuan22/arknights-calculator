<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const isCollapse = ref(false)
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="app">
  <!-- 头部标题栏 -->
  <el-row>
    <el-col :span="24">
      <header class="header">
        <div class="logo">明日方舟工具箱</div>
        <div class="header-right">
          <!-- 预留位置放置其他组件 -->
        </div>
      </header>
    </el-col>
  </el-row>
  <el-row class="tac">
    <el-col :span="4">
      <h5 class="mb-2">Default colors</h5>
      <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item index="1-1">
            <RouterLink to="/" class="nav-item">首页</RouterLink>
          </el-menu-item>
          <el-menu-item index="1-2">
            <RouterLink to="/sami_naotan" class="nav-item">闹谭杯计算器</RouterLink>
          </el-menu-item>
          <el-menu-item index="1-3">
            <RouterLink to="/mizuki" class="nav-item">Mizuki</RouterLink>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
        <RouterView />
    </el-col>
  </el-row>
  </div>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: #24292e;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.logo {
  font-size: 1.5em;
  font-weight: bold;
}

.app {
  width: 100vw;  /* 使用视窗宽度 */
  min-height: 100vh;  /* 最小高度为视窗高度 */
}

.nav-item {
  color: #333;
  width: 100%;
}

/* RouterLink hover时的样式 */
.nav-item:hover {
  background-color: transparent !important;
}
</style>
