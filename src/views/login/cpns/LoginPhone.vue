<template>
  <div>
    <n-form :model="formValue" :rules="rules" ref="phoneRef">
      <n-form-item-row label="手机号码" path="phone">
        <n-input placeholder="请输入手机号码" v-model:value="formValue.phone" />
      </n-form-item-row>
      <n-form-item-row
        label="验证码"
        path="valiCode"
        :show-require-mark="false"
      >
        <n-input
          placeholder="请输入验证码"
          v-model:value="formValue.valiCode"
        />
        <n-button class="code">获取验证码</n-button>
      </n-form-item-row>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { FormInst } from "naive-ui";
export default defineComponent({
  setup() {
    const phoneRef = ref<FormInst | null>(null);
    const formValue = ref({
      phone: "",
      valiCode: ""
    });
    const loginPhoneActions = () => {
      console.log("111");
      phoneRef.value?.validate((error) => {
        if (!error) {
          console.log("派发action动作");
        }
      });
    };
    const rules = {
      phone: [
        {
          required: true,
          message: "请输入正确的手机号码",
          trigger: "blur"
        }
      ],
      valiCode: [
        {
          required: true,
          message: "请输入正确的验证码",
          trigger: "blur"
        }
      ]
    };

    return {
      phoneRef,
      formValue,
      rules,
      loginPhoneActions
    };
  }
});
</script>

<style lang="less" scoped>
.code {
  margin-left: 8px;
}
</style>
