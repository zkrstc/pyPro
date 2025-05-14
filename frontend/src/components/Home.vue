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
            <el-button type="primary" size="large" @click="goToPage(item)">
              {{ item.buttonText }}
            </el-button>
            
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div>
      <!-- <RouterLink 
        to="/requirement" 
        active-class="change"
      >
        跳转到Hello页面
      </RouterLink>
      <RouterLink 
        to="/codegen" 
        active-class="change"
      >
        跳转到Hello页面
      </RouterLink>
      <router-view></router-view> -->
    </div>
  </template>
  
  <script setup>
  
  import { useRouter } from 'vue-router'  // Make sure this import is here
  import { ElButton, ElCard, ElRow, ElCol, ElIcon } from 'element-plus'
  import { Document, Share, Cpu } from '@element-plus/icons-vue'
  
  const router = useRouter() 
  const cards = [
    {
      title: '需求管理',
      description: '管理产品需求和功能点，支持版本追踪和团队协作。',
      buttonText: '进入管理',
      link: 'requirement',
      icon: Document
    },
    {
      title: '架构设计',
      description: '可视化建模系统架构，支持多层结构设计与组件管理。',
      buttonText: '进入设计',
      link: 'architecture',
      icon: Cpu
    },
    {
      title: '代码生成',
      description: '根据模型生成代码，支持多种语言和框架。',
      buttonText: '立即生成',
      link: 'modulegen',
      icon: Share
    },
    {
      title: 'AI智能对话',
      description: '对话生成各种需求，架构',
      buttonText: '立即生成',
      link: 'modulegen',
      icon: Share
    }
  ]
  
  const goToPage = async (item) => {
    try {
      await router.push({ path: item.link })
      console.log('333')
    } catch (error) {
      console.error('路由跳转失败:', error)
    }
  }
  
  </script>
  
  <style scoped>
  .container {
    display: flex;
    justify-content: center;
    padding: 60px 20px;
  }
  
  .card-row {
    max-width: 1200px;
    width: 100%;
  }
  
  .card {
    border-radius: 16px;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .card-header {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .card-header el-icon,
  .card-header .el-icon {
    margin-right: 10px;
  }
  
  .description {
    flex-grow: 1;
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
    line-height: 1.6;
  }
  </style>
  