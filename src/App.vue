<script setup lang="ts">
import { RouterView, useRoute, RouterLink } from 'vue-router'
import { computed, ref } from 'vue'
import { CalculatorOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

const isCollapse = ref(false)
// const handleCollapse = () => {
//   isCollapse.value = !isCollapse.value
// }
const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<template>
  <div class="app">
    <!-- 头部标题栏 -->
    <el-row>
      <el-col :span="24">
        <header class="header">
          <div class="logo">kissnab的明日方舟工具箱</div>
          <div class="header-right">
            <!-- 预留位置放置其他组件 -->
          </div>
        </header>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="tac">
        <!-- <h5 class="mb-2">Default colors</h5> -->
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :value="false">expand</el-radio-button>
          <el-radio-button :value="true">collapse</el-radio-button>
        </el-radio-group>
        <el-menu default-active="/readme" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-sub-menu index="1">
            <template #title>
              <CalculatorOutlined />
              <span style="font-size: medium; margin-left: 10px">集成战略计算器</span>
            </template>
            <!-- <el-menu-item index="1-1">
            <RouterLink to="/" class="nav-item">首页</RouterLink>
          </el-menu-item> -->
            <RouterLink to="/mizuki" class="nav-item">
              <el-menu-item index="/mizuki" style="font-size: medium"> 骑士杯 </el-menu-item>
            </RouterLink>
            <RouterLink to="/sami_naotan" class="nav-item">
              <el-menu-item index="/sami_naotan" style="font-size: medium">闹谭杯</el-menu-item>
            </RouterLink>
            <RouterLink to="/sagou" class="nav-item">
              <el-menu-item index="/sagou" style="font-size: medium">萨构杯2</el-menu-item>
            </RouterLink>
          </el-sub-menu>
          <RouterLink to="/readme" class="nav-item">
            <el-menu-item index="/readme" style="font-size: medium">
              <InfoCircleOutlined style="margin-right: 5px" /> 网站说明
            </el-menu-item>
          </RouterLink>
          <!-- <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item> -->
        </el-menu>
      </el-col>
      <el-col :span="20" class="content">
        <RouterView />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
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
  display: inline-block;
  width: 100%;
  height: 100%;
  /* line-height: inherit; */
  color: inherit;
  font-size: 25px;
}

.nav-item:hover {
  background-color: inherit;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-height: 100vh; /* 保证高度足够撑满视口 */
  box-sizing: border-box;
  padding-top: 40px;
}

.tac {
  padding-top: 60px;
}
</style>
