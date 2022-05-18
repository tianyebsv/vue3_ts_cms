const { defineConfig } = require("@vue/cli-service");

const Icons = require("unplugin-icons/webpack");
const IconsResolver = require("unplugin-icons/resolver");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const { NaiveUiResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  /**
   * 三种配置方式
   * 1、 通过vue cli对应的属性修改webpack配置
   * 2、 通过configureWebpack 修改
   * 3、 通过chainWebpack 链式修改
   */
  transpileDependencies: true,
  outputDir: "./dist",

  configureWebpack: {
    plugins: [
      // ElementPlus按需自动引入
      AutoImport({
        resolvers: [
          NaiveUiResolver(),
          ElementPlusResolver(),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon"
          })
        ]
      }),
      Components({
        resolvers: [
          NaiveUiResolver(),
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"]
          }),
          ElementPlusResolver()
        ]
      }),
      Icons({
        autoInstall: true
      })
    ],
    devServer: {
      proxy: {
        "/api": {
          target: "http://152.136.185.210:5000",
          pathRewrite: {
            "^/api": ""
          },
          changeOrigin: true
        }
      }
    }
  }
});
