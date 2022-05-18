type IFormType = "input" | "select" | "datePicker" | "password";
export default interface IFormItem {
  field: string;
  label: string;
  rules?: any[];
  placeholder?: string;
  options?: IOptions[];
  type: IFormType;
  datepicker?: any;
}

export interface IOptions {
  value: string;
  label: string;
}
