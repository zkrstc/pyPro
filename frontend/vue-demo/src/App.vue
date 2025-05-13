<template>
  <div class="container">
    <el-row class="card-row" justify="center" :gutter="30">
      <el-col :span="6" v-for="item in cards" :key="item.title">
        <el-card class="card">
          <div class="card-header">
            <el-icon :size="24"><component :is="item.icon" /></el-icon>
            <span>{{ item.title }}</span>
          </div>
          <p class="description">{{ item.description }}</p>
          <el-button type="primary" size="large" @click="goToPage(item.link)">
            {{ item.buttonText }}
          </el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ElButton, ElCard, ElRow, ElCol, ElIcon } from 'element-plus'
import { Document, Share, Cpu } from '@element-plus/icons-vue'

const cards = [
  {
    title: '需求管理',
    description: '管理产品需求和功能点，支持版本追踪和团队协作。',
    buttonText: '进入管理',
    link: 'requirement.html',
    icon: Document
  },
  {
    title: '架构设计',
    description: '可视化建模系统架构，支持多层结构设计与组件管理。',
    buttonText: '进入设计',
    link: 'architecture.html',
    icon: Cpu
  },
  {
    title: '代码生成',
    description: '根据模型生成代码，支持多种语言和框架。',
    buttonText: '立即生成',
    link: 'codegen.html',
    icon: Share
  }
]

const goToPage = (url) => {
  window.location.href = url
}
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-row {
  max-width: 1200px;
  width: 100%;
}

.card {
  border-radius: 16px;
  min-height: 300px; /* 增加高度 */
  padding: 30px;      /* 增加内边距 */
  font-size: 18px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 24px; /* 更大字体 */
  margin-bottom: 15px;
}

.card-header .el-icon {
  margin-right: 12px;
  font-size: 28px;
}

.description {
  flex-grow: 1;
  font-size: 16px;
  color: #444;
  margin-bottom: 20px;
  line-height: 1.8;
}

.el-button {
  font-size: 16px;
  padding: 12px 28px;
}
</style>
