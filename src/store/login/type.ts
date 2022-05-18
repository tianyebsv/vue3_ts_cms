// vueX 在创建state时，ts的类型检测对其要求过于严格，可以在主类型中使用any类型
export interface ILoginState {
  token: string;
  userInfo: any;
  userMenu: any;
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
}

export interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: Date;
  updateAt: Date;
  leader: string;
}

export interface Data {
  id: number;
  name: string;
  realname?: string;
  cellphone?: number;
  enable: number;
  createAt: Date;
  updateAt: Date;
  role: Role;
  department: Department;
}

export interface UserInfo {
  code: number;
  data: Data;
}
//菜单类型
// export interface Child2 {
//   id: number;
//   url: any;
//   name: string;
//   sort: any;
//   type: number;
//   parentId: number;
// }

// export interface Child {
//   id: number;
//   url: string;
//   name: string;
//   sort: number;
//   type: number;
//   children: Child2[];
// }

export interface Datum {
  id: number;
  name: string;
  type: number;
  url: string;
  icon?: string;
  sort: number;
  children?: Datum[];
  parentId?: number;
  permission?: string;
}

export interface UserMenu {
  code: number;
  data: Datum[];
}
