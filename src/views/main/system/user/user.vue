<template>
  <div class="user">
    <TyForm :formItem="formItem" v-model="field">
      <template #header><h2>高级检索</h2></template>
      <template #footer>
        <div class="footer">
          <el-button type="primary"
            ><el-icon><RefreshLeft /></el-icon>重置</el-button
          >
          <el-button
            ><el-icon><Search /></el-icon>搜索</el-button
          >
        </div>
      </template>
    </TyForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TyForm from "@/base_ui";
import formItemConfig from "./config/formItem";

export default defineComponent({
  name: "user",
  setup() {
    const field = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      time: ""
    });
    const formItem = formItemConfig;
    return { formItem, field };
  },
  components: { TyForm }
});
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
  .footer {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
