<template>
  <div>
    <n-form :model="formValue" :rules="rules" ref="accountRef">
      <n-form-item-row label="用户名" path="name" show-require-mark>
        <n-input placeholder="请输入用户名" v-model:value="formValue.name" />
      </n-form-item-row>
      <n-form-item-row label="密码" path="password" show-require-mark>
        <n-input
          placeholder="请输入密码"
          v-model:value="formValue.password"
          type="password"
        />
      </n-form-item-row>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ref } from "vue";
import { FormInst } from "naive-ui";
import { useStore } from "vuex";

import localCache from "@/utils/cache";

export default defineComponent({
  setup() {
    const store = useStore();
    const accountRef = ref<FormInst | null>(null);
    const formValue = ref({
      name: localCache.getCache("name") || "",
      password: ""
    });
    const loginAccountActions = () => {
      accountRef.value?.validate((error) => {
        if (!error) {
          localCache.setCache("name", formValue.value.name);
          store.dispatch("login/loginAction", formValue.value);
          formValue.value.password = "";
        }
      });
    };

    const rules = {
      user: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        password: {
          required: true,
          message: "请输入密码",
          trigger: ["input", "blur"]
        }
      }
    };
    return {
      accountRef,
      formValue,
      rules,
      loginAccountActions
    };
  }
});
</script>

<style lang="less" scoped></style>
