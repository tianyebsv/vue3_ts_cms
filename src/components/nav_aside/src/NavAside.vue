<template>
  <div class="nav-aside">
    <div class="logo">
      <img class="img" src="~@/assets/logo.svg" alt="logo" /><span
        class="title"
        v-if="!collapse"
        >TS+VUE3</span
      >
    </div>

    <el-menu
      :default-active="defaultRoute"
      class="el-menu-vertical-demo"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <el-sub-menu
        v-for="item in userMenu.data"
        :key="item.id"
        :index="item.id + ''"
      >
        <template #title>
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="cItem in item.children"
          :key="cItem.id"
          :index="cItem.url"
          @Click="guideClick(cItem)"
        >
          <span>{{ cItem.name }}</span>
        </el-menu-item></el-sub-menu
      ></el-menu
    >
  </div>
</template>

<script lang="ts">
import { useTyStore } from "@/store";
import { Datum, UserMenu } from "@/store/login/type";

import { computed, ComputedRef, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useTyStore();
    const router = useRouter();
    const route = useRoute();
    let defaultRoute = route.path;

    const userMenu: ComputedRef<UserMenu> = computed(() => {
      return store.state.login.userMenu;
    });

    const guideClick = (cItem: Datum) => {
      router.push({
        path: cItem.url ?? "/notFound"
      });
    };
    return {
      userMenu,
      guideClick,
      defaultRoute
    };
  }
});
</script>

<style lang="less" scoped>
.nav-aside {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }
  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
