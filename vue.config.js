const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/pdv',
  transpileDependencies: [
    'vuetify'
  ]
})
