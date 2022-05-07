import { createStore } from "vuex";
import login from "./login/login";
import { IRootState } from "./login/type";

const store = createStore<IRootState>({
  state() {
    return {
      name: "",
      password: 0
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
});

// 初始化登录数据到vueX
export function setupStore() {
  store.dispatch("login/loginLocal");
}

export default store;
