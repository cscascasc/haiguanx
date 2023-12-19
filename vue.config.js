const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_BASE_URL,
        // target: 'http://192.168.2.30:9601',
        // target: 'http://10.84.99.39:9601',
        // target: 'http://192.168.2.192:9601',
        // target: 'http://10.84.1.222:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    client: {
      overlay: false
    }
  },
})
