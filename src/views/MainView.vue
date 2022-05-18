<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '52px' : '210px'">
        <NavAside :collapse="isCollapse"></NavAside>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header"
          ><NavHeader @foldChange="handleFoldChange"></NavHeader
        ></el-header>
        <el-main class="page-content"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import NavAside from "@/components/nav_aside/src/NavAside.vue";
import NavHeader from "@/components/nav_header/src/NavHeader.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const isCollapse = ref(false);
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold;
    };
    return {
      handleFoldChange,
      isCollapse
    };
  },
  components: { NavAside, NavHeader }
});
</script>

<style lang="less" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100%-48px);
}
.el-header {
  height: 48px !important;
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
