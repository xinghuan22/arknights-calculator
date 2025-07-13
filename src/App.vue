<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, ref } from 'vue'
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue'
import { ElDrawer } from 'element-plus'

import AppMenu from './components/AppMenu.vue'

const isCollapse = ref(false)
const drawerVisible = ref(false)

const menu_style = computed(() => {
  return isCollapse.value ? DArrowRight : DArrowLeft
})

// 判断是否为移动端
const isMobile = computed(() => window.innerWidth <= 768)
// window.addEventListener('resize', () => {
//   isMobile.value = window.innerWidth <= 768
// })

// 菜单点击后关闭 Drawer
function handleMenuClick(path: string) {
  drawerVisible.value = false
}

function handleCollapse() {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <div class="app">
    <!-- 头部标题栏 -->
    <el-row>
      <el-col :span="24">
        <header class="header">
          <!-- 手机端显示菜单按钮 -->
          <el-button
            v-if="isMobile"
            icon="Menu"
            @click="drawerVisible = true"
            class="menu-button"
            circle
          />
          <!-- PC端显示折叠按钮 -->
          <el-button v-else :icon="menu_style" @click="handleCollapse" class="menu-button" circle />
          <div class="logo">kissnab的明日方舟工具箱</div>
          <div class="header-right"></div>
        </header>
      </el-col>
    </el-row>
    <el-row>
      <!-- PC端侧边栏 -->
      <el-col :span="4" class="tac" v-if="!isMobile">
        <AppMenu :is-collapse="isCollapse" />
      </el-col>
      <!-- 手机端 Drawer 菜单 -->
      <el-drawer
        v-model="drawerVisible"
        direction="ltr"
        size="70%"
        :with-header="false"
        class="mobile-drawer"
      >
        <AppMenu :is-collapse="isCollapse" @menu-click="handleMenuClick" />
      </el-drawer>
      <el-col :span="20" class="content">
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
  width: 100vw; /* 使用视窗宽度 */
  min-height: 100vh; /* 最小高度为视窗高度 */
}

.nav-item {
  /* display: inline-block; */
  /* width: 100%;
  height: 100%; */
  line-height: inherit;
  color: inherit;
  /* font-size: 25px; */
}

.nav-item:hover {
  background-color: inherit;
}

@media (min-width: 1024px) {
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    box-sizing: border-box;
    /* margin-top: 60px; */
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 900;
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
}

.tac {
  padding-top: 60px;
}

.menu-button {
  margin-right: 10px;
  background-color: #24292e;
  color: white;
  border: none;
}

.menu-button:hover {
  background-color: #434445;
  color: white;
}

@media (max-width: 768px) {
  .header {
    height: 48px;
    padding: 0 10px;
    font-size: 1em;
    top: env(safe-area-inset-top, 0);
    left: 0px;
    right: 0px;
    position: fixed;
    z-index: 999;
  }
  .app {
    width: 100vw;
    min-height: 100vh;
  }
  .el-row {
    flex-direction: column !important;
  }
  .el-col {
    width: 100% !important;
    max-width: 100% !important;
    flex: none !important;
  }
  .tac {
    display: none;
  }
  .mobile-drawer {
    z-index: 2000;
  }
  .nav-item {
    font-size: 18px;
    padding: 8px 0;
  }
  .content {
    margin-top: 48px;
    box-sizing: border-box;
    min-height: calc(100vh - 48px);
  }
}
</style>
