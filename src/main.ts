import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { setupStore } from "./store";
import "element-plus/theme-chalk/el-loading.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import {
//   Monitor,
//   Setting,
//   Goods,
//   ChatLineRound
// } as ElementPlusIconsVue from "@element-plus/icons-vue";
import "normalize.css";

const app = createApp(App);
app.use(store);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
setupStore();
app.use(router);
app.mount("#app");
