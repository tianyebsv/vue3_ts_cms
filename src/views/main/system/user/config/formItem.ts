import IFormItem from "@/base_ui/form/type";
const formItemConfig: IFormItem[] = [
  {
    field: "name",
    label: "用户名",
    type: "input",
    placeholder: "请输入用户名"
  },
  {
    field: "id",
    label: "用户id",
    type: "input",
    placeholder: "请输入用户id"
  },
  {
    field: "password",
    label: "密码",
    type: "input",
    placeholder: "请输入密码"
  },
  {
    field: "sport",
    type: "select",
    label: "我的喜好",
    placeholder: "请选择",
    options: [
      {
        value: "football",
        label: "足球"
      },
      {
        value: "basketball",
        label: "篮球"
      }
    ]
  },
  {
    field: "time",
    type: "datePicker",
    label: "日期范围",
    datepicker: {
      type: "daterange",
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间"
    }
  }
];

export default formItemConfig;
