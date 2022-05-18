import { createStore, Store, useStore } from "vuex";
import login from "./login/login";
import { IRootState, IStoreType } from "./type";

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
  // store.dispatch("login/getRouteMenu");
}

export function useTyStore(): Store<IStoreType> {
  return useStore();
}

export default store;
