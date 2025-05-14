<template>
    <el-form-item label="API选择">
    <el-select
      v-model="selectedApi"
      placeholder="请选择API"
      :disabled="loading"
    >
      <el-option
        v-for="option in apiOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      />
    </el-select>
  </el-form-item>
  <div>当前选中的 API：{{ selectedApi }}</div>
    <div class="chat-interface">
      <h1>AI聊天界面</h1>

      <div ref="chatContainer" class="chat-container">
        <div 
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']"
        >
          <div v-html="formattedContent(message.content)"></div>
        </div>
      </div>
      <div class="input-container">
        <input
          v-model="inputText"
          type="text"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
        >
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </template>
  <!--   { value: 'http://127.0.0.1:5000/api/requirement', label: '需求分析' },
  { value: 'http://127.0.0.1:5000/api/sound', label: '声音处理' } -->
  <script setup>
  import { ref, reactive, computed, nextTick, onMounted } from 'vue'
  const selectedApi = ref('')
  
  const apiOptions = [
    { value: 'http://127.0.0.1:5000/api/chat', label: '代码生成' },
    { value: 'http://127.0.0.1:5000/api/translate', label: '智能翻译' },
    { value: 'http://127.0.0.1:5000/api/analyze', label: '数据分析' }
];
  // 响应式数据
  const inputText = ref('')
  const messages = reactive([])
  const chatContainer = ref(null)
  const isStreaming = ref(false)
  
  // 消息格式化
  const formattedContent = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<span class="bold">$1</span>')
      .split('\n')
      .map(line => {
        if (line.startsWith('##')) {
          return `<div class="heading">${line.substring(2).trim()}</div>`
        }
        return line
      })
      .join('\n')
  }
  
  // 自动滚动到底部
  const scrollToBottom = async () => {
    await nextTick()
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  }
  
  // 发送消息
  const sendMessage = async () => {
    const message = inputText.value.trim()
    if (!message || isStreaming.value) return
  
    // 添加用户消息
    messages.push({
      role: 'user',
      content: message,
      timestamp: new Date().getTime()
    })
    
    inputText.value = ''
    await scrollToBottom()

    try {
      isStreaming.value = true
      console.log(selectedApi)
      const response = await fetch(selectedApi.value, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })
  
      // 创建AI消息对象
      const aiMessage = {
        role: 'ai',
        content: '',
        timestamp: new Date().getTime()
      }
      messages.push(aiMessage)
  
      // 处理流式数据
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
  
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
  
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              aiMessage.content += data.content
              // 触发响应式更新
              messages[messages.length - 1] = { ...aiMessage }
              await scrollToBottom()
            } catch (e) {
              console.error('解析错误:', e)
            }
          }
        }
      }
    } catch (error) {
      messages.push({
        role: 'ai',
        content: `发生错误: ${error.message}`,
        timestamp: new Date().getTime()
      })
    } finally {
      isStreaming.value = false
      await scrollToBottom()
    }
  }
  
  // 初始化滚动位置
  onMounted(scrollToBottom)
  </script>
  
  <style scoped>
  .chat-interface {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .chat-container {
    height: 400px;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    overflow-y: auto;
    background: white;
  }
  
  .input-container {
    display: flex;
    gap: 10px;
  }
  
  input {
    flex-grow: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .message {
    margin: 10px 0;
    padding: 12px;
    border-radius: 8px;
    line-height: 1.6;
  }
  
  .user-message {
    background-color: #e3f2fd;
    margin-left: 20%;
    margin-right: 5%;
  }
  
  .ai-message {
    background-color: #f5f5f5;
    margin-right: 20%;
    margin-left: 5%;
  }
  
  .bold {
    font-weight: bold;
  }
  
  .heading {
    margin: 15px 0 10px;
    font-size: 1.1em;
    color: #333;
    padding-left: 10px;
    border-left: 3px solid #007bff;
  }
  </style>