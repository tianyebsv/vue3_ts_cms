<template>
  <div class="page-header">
    <el-icon :size="20" @click="changeFold" class="fold">
      <component :is="isFold ? ArrowRightBold : ArrowLeftBold"></component>
    </el-icon>
    <div class="content">
      <div><BreadCrumb :breadcrumb="breadcrumb" /></div>
      <div>
        <el-row class="block-col-2">
          <el-col :span="8">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <div>
                  <el-avatar>{{ userInfo.realname }} </el-avatar>
                </div>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><el-icon><cloudy /></el-icon>个人信息</el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-icon><setting /></el-icon>系统设置</el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-icon><switch-button /></el-icon
                    >退出登陆</el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-icon><watermelon /></el-icon>切换用户</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTyStore } from "@/store";
import { ArrowLeftBold, ArrowRightBold } from "@element-plus/icons-vue";
import { computed, defineComponent, ref } from "vue";
import type { Data, Datum } from "@/store/login/type";
import BreadCrumb from "@/base_ui/breadcrumb/";
import { useRoute } from "vue-router";
import { breadcrumbMenu } from "@/utils/mapMenus";

export default defineComponent({
  emits: ["foldChange"],
  setup(props, { emit }) {
    const store = useTyStore();
    const route = useRoute();

    let breadcrumb = computed(() => {
      const userMenu: Datum[] = store.state.login.userMenu.data;
      const currentPath = route.path;
      return breadcrumbMenu(userMenu, currentPath);
    });
    const userInfo: Data = store.state.login.userInfo;
    let isFold = ref(false);
    const changeFold = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    return {
      changeFold,
      isFold,
      userInfo,
      breadcrumb,
      ArrowRightBold,
      ArrowLeftBold
    };
  },
  components: { BreadCrumb }
});
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  width: 100%;
  align-items: center;

  .fold {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0px 10px;
  }
}
</style>
