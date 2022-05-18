import { ILoginState } from "./login/type";
export interface IRootState {
  name: string;
  password: number;
}

interface IRootWithModule {
  login: ILoginState;
}

export type IStoreType = IRootState & IRootWithModule;
