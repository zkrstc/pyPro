<template>
  <div class="app-container">
    <!-- 公共导航区域 -->
    <nav class="global-nav">
      <router-link to="/">首页</router-link>
      <router-link to="/requirement">需求分析</router-link>
      <router-link to="/architecture">架构设计</router-link>
      <router-link to="/modulegen">模块代码</router-link>
      <router-link to="/codegen">智能对话</router-link>
    </nav>

    <!-- 主体内容区域 -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// 可选：如果需要响应式逻辑
import { ref } from 'vue'
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.global-nav {
  background: #2c3e50;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    
    &.router-link-active {
      color: #42b983;
      border-bottom: 2px solid;
    }
  }
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>