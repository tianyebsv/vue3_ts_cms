import { IBreadcrumb } from "@/base_ui/breadcrumb";
import { Datum } from "@/store/login/type";
import { RouteRecordRaw } from "vue-router";

// 用于绑定首次登陆时用的路由
let firstMenuUrl = "";

export function mapMenus(userMenu: Datum[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  //先去加载所有的默认routes
  const allRoute: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoute.push(route.default);
  });
  // 根据菜单获取相对应的routes
  // 通过递归调用，获得用户的routes
  const _recurseGetRoutes = (menus: Datum[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoute.find((route) => menu.url === route.path);
        if (route) {
          routes.push(route);
        }
        if (!firstMenuUrl) {
          firstMenuUrl = menu.url;
        }
      } else if (menu.type === 1) {
        if (menu.children) _recurseGetRoutes(menu.children);
      }
    }
  };
  _recurseGetRoutes(userMenu);
  return routes;
}
// 获得面包屑头的数据
export function breadcrumbMenu(userMenu: Datum[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = [];
  currentMenu(userMenu, currentPath, breadcrumb);
  return breadcrumb;
}
// 获取当前路径对应的菜单
export function currentMenu(
  userMenu: Datum[],
  currentPath: string,
  breadcrumb?: IBreadcrumb[]
): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      if (menu.children) {
        const findMenu = currentMenu(menu.children, currentPath);
        if (findMenu) {
          breadcrumb?.push({ name: menu.name, path: menu.url });
          breadcrumb?.push({ name: findMenu.name, path: findMenu.url });
          return findMenu;
        }
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export { firstMenuUrl };
