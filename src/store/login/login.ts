import {
  accountLoginRequest,
  queryUserInfoById,
  queryUserMenusByRoleId
} from "@/service/login/login";
import { Module } from "vuex";
import { IRootState, ILoginState, UserInfo, UserMenu } from "./type";
import localCache from "@/utils/cache";
import router from "@/router";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  // state中类型如果过于复杂，则使用any来方便初始化，后续再使用的时候再对其进行类型缩小
  state() {
    return {
      token: "",
      userInfo: "",
      userMenu: []
    };
  },
  getters: {},
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    },
    setUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo;
    },
    setUserMenu(state, userMenu: UserMenu) {
      state.userMenu = userMenu;
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      // console.log(payload);
      this.state.name = payload.name;
      this.state.password = payload.password;
      // 登录
      const loginResult = await accountLoginRequest(payload);
      commit("setToken", loginResult.data.token);
      localCache.setCache("token", loginResult.data.token);
      //获取用户信息
      const userInfoResult = await queryUserInfoById(loginResult.data.id);
      commit("setUserInfo", userInfoResult.data);
      localCache.setCache("userInfo", userInfoResult.data);
      // 获取角色的菜单
      const userMenusResult = await queryUserMenusByRoleId(
        userInfoResult.data.role.id
      );
      commit("setUserMenu", userMenusResult);
      localCache.setCache("userMenu", userMenusResult);
      // 跳转首页
      router.push("/home");
    },
    // 将缓存中的数据存放到vueX中，避免刷新没了
    loginLocal({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("setToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("setUserInfo", userInfo);
      }
      const userMenu = localCache.getCache("userMenu");
      if (userMenu) {
        commit("setUserMenu", userMenu);
      }
    }
  },
  modules: {}
};

export default loginModule;
