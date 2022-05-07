import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { setupStore } from "./store";
import "element-plus/theme-chalk/el-loading.css";
import "normalize.css";

const app = createApp(App);
app.use(store).use(router);
setupStore();
app.mount("#app");
