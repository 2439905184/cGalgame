const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  lintOnSave: false,
  devServer: {
    port: 8966,
    client: {
      overlay: false,
    },
  },
  chainWebpack: config =>{
    config.plugin('html')
      .tap(args => {
        args[0].title = "GalGame";
        return args;
      })
  }
})
