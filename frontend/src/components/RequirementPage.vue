<template>
    <div class="requirement-page">
      <!-- 标题区 -->
      <div class="header">
        <h1>需求管理</h1>
        <el-button type="primary" @click="showCreateDialog">
          <el-icon><Plus /></el-icon>
          新建需求
        </el-button>
      </div>
  
      <!-- 需求表格 -->
      <el-table :data="requirements" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="title" label="需求标题" />
        <el-table-column prop="priority" label="优先级" width="120">
          <template #default="{ row }">
            <el-tag :type="priorityMap[row.priority].type">
              {{ priorityMap[row.priority].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button size="small" @click="editRequirement(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteRequirement(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 新建需求对话框 -->
      <el-dialog v-model="dialogVisible" title="新建需求">
        <!-- 对话框内容 -->
        <el-form :model="newRequirement">
          <el-form-item label="需求标题">
            <el-input v-model="newRequirement.title" />
          </el-form-item>
          <el-form-item label="优先级">
            <el-select v-model="newRequirement.priority">
              <el-option
                v-for="item in priorityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmCreate">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  
  // 响应式数据
  const dialogVisible = ref(false)
  const requirements = ref([
    { id: 1, title: '用户登录功能', priority: 'high' },
    { id: 2, title: '数据导出功能', priority: 'medium' }
  ])
  
  const newRequirement = reactive({
    title: '',
    priority: 'medium'
  })
  
  // 优先级映射关系
  const priorityMap = {
    high: { label: '高', type: 'danger' },
    medium: { label: '中', type: 'warning' },
    low: { label: '低', type: 'success' }
  }
  
  const priorityOptions = [
    { value: 'high', label: '高优先级' },
    { value: 'medium', label: '中优先级' },
    { value: 'low', label: '低优先级' }
  ]
  
  // 方法
  const showCreateDialog = () => {
    dialogVisible.value = true
  }
  
  const confirmCreate = () => {
    requirements.value.push({
      id: requirements.value.length + 1,
      ...newRequirement
    })
    dialogVisible.value = false
    ElMessage.success('需求创建成功')
    Object.assign(newRequirement, { title: '', priority: 'medium' })
  }
  
  const deleteRequirement = (id) => {
    requirements.value = requirements.value.filter(item => item.id !== id)
    ElMessage.success('需求已删除')
  }
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  
  .el-table {
    margin-top: 20px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  }
  </style>