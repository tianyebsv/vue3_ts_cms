const { defineConfig } = require("@vue/cli-service");

const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  /**
   * 三种配置方式
   * 1、 通过vue cli对应的属性修改webpack配置
   * 2、 通过configureWebpack 修改
   * 3、 通过chainWebpack 链式修改
   */
  transpileDependencies: true,
  outputDir: "./build",
  configureWebpack: {
    plugins: [
      // ElementPlus按需自动引入
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});
