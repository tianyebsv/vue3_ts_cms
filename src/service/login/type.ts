export interface ILoginResult {
  id: number;
  token: string;
  userInfo: any;
}
export interface IAccount {
  name: string;
  password: number;
}

export interface IDataType<T = any> {
  code: string;
  data: T;
}
