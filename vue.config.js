module.exports = {
  devServer: {
    open: true,
    // path:8888,
    proxy: {
      // 配置的代理规则，，，只要是以 /api开头的url地址都会被代理
      // https://localhost:8081/api/login
      // https://localhost:3000/api/login
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        // 代理到https协议下
        secure: true
      }
    }
  },
  // 覆盖webpack的配置参数
  configureWebpack: {
    // 排除依赖项
    externals: {
      // 参数1：排除的模块名
      // 参数2： 全局变量名
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios'
    }
  }
}
