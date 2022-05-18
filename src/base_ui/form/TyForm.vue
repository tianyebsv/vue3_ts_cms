<template>
  <div class="ty-form">
    <div class="header"><slot name="header"></slot></div>
    <el-form label-width="100px" class="content">
      <el-row>
        <template v-for="form in formItem" :key="form.label">
          <el-col v-bind="colLayout"
            ><el-form-item :label="form.label">
              <template v-if="form.type === 'input'"
                ><el-input
                  :placeholder="form.placeholder"
                  v-model="formData[`${form.field}`]"
              /></template>
              <template v-if="form.type === 'select'"
                ><el-select
                  :placeholder="form.placeholder"
                  style="width: 100%"
                  v-model="formData[`${form.field}`]"
                >
                  <el-option
                    v-for="option in form.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.label }}</el-option
                  >
                </el-select></template
              >
              <template v-if="form.type === 'datePicker'"
                ><el-date-picker
                  :type="form.datepicker.type"
                  :start-placeholder="form.datepicker.startPlaceholder"
                  :end-placeholder="form.datepicker.endPlaceholder"
                  v-model="
                    formData[`${form.field}`]
                  " /></template></el-form-item
          ></el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script lang="ts">
// import IOptions from "@/views/main/system/user/type/type";
import { defineComponent, PropType, ref, watch } from "vue";
import IFormItem from "./type";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItem: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 6,
        md: 8,
        sm: 12,
        xs: 24
      })
    }
  },
  emit: ["update:modelValue"],
  setup(props, { emit }) {
    // 双向绑定formData，通过watch 监听子组件中数据的改变，发送事件
    const formData = ref({ ...props.modelValue });
    watch(
      formData,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      { deep: true }
    );
    return { formData };
  }
});
</script>

<style lang="less" scoped>
.content {
  padding: 10px 20px 0 20px;
  align-items: center;
  justify-content: space-between;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>
