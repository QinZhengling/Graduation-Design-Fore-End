const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   allowedHosts: "all",
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost:8088', // 后端 API 地址
  //       ws: true,
  //       changeOrigin: true, // 是否改变域名
  //       pathRewrite: {
  //         '^/': '' // 这里可以使用正则表达式
  //       }
  //     }
  //   }
  // },
  devServer: {
    port: 9529, // 启动端口号
    // open: true // 启动后是否自动打开网页
  }
})