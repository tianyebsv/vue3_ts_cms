<template>
  <div class="loginPanel">
    <n-card title="liveOnChain">
      <n-tabs
        :default-value="currentTab"
        size="large"
        justify-content="space-evenly"
        v-model:value="currentTab"
      >
        <n-tab-pane name="signin_account" tab="账户登录"
          ><LoginAccount ref="accountRef"
        /></n-tab-pane>
        <n-tab-pane name="signin_phone" tab="手机登录"
          ><LoginPhone ref="phoneRef"></LoginPhone>
        </n-tab-pane>
      </n-tabs>
      <n-button type="primary" block strong @click="loginAction"
        >登 录</n-button
      >
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import localCache from "@/utils/cache";
// import tyRequest from "@/service";
import { ref } from "vue";
// import { useStore } from "vuex";

import LoginAccount from "./cpns/LoginAccount.vue";
import LoginPhone from "./cpns/LoginPhone.vue";

export default defineComponent({
  components: {
    LoginPhone,
    LoginAccount
  },
  setup() {
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();

    const currentTab = ref("signin_account");

    const loginAction = () => {
      if (currentTab.value === "signin_account") {
        accountRef.value?.loginAccountActions();
      } else {
        phoneRef.value?.loginPhoneActions();
      }
    };

    return {
      loginAction,
      currentTab,
      accountRef,
      phoneRef
    };
  }
});
</script>

<style lang="less" scoped>
.loginPanel {
  width: 400px;
  margin: 250px auto;
}
</style>
