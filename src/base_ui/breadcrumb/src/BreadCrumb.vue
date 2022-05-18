<template>
  <div>
    <el-breadcrumb separator="/"
      ><template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IBreadcrumb } from "../type";

export default defineComponent({
  props: {
    breadcrumb: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped></style>
