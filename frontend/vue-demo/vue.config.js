const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,  // 这是默认的 Babel 转译配置

  // 添加开发服务器配置
  devServer: {
    proxy: {
      '/api': {  // 拦截所有以 /api 开头的请求
        target: 'http://127.0.0.1:5000', // 指向你的 Flask 后端地址
        changeOrigin: true,              // 允许跨域
        pathRewrite: {
          '^/api': ''  // 将路径中的 /api 替换为空字符串
        }
      }
    }
  }
})