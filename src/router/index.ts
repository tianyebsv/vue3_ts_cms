import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import localCache from "@/utils/localCache";
import { firstMenuUrl } from "@/utils/mapMenus";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "main"
  },
  {
    path: "/main",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "main" */ "@/views/MainView.vue"),
    children: []
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/login/LoginView.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () =>
      import(
        /* webpackChunkName: "notFound" */ "@/views/not-found/NotFound.vue"
      )
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// 判断是否登录
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache("token");
    if (!token) {
      return "/login";
    }
    if (to.path === "/main") {
      return firstMenuUrl;
    }
  }
});

export default router;
