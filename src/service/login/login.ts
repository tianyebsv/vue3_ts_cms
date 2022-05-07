import tyRequest from "@/service";
import { UserMenu, UserInfo } from "@/store/login/type";
import { IAccount, IDataType, ILoginResult } from "./type";

enum LoginApi {
  AccountLogin = "/login",
  UserInfo = "/users/",
  UserMenus = "/role/"
}

function accountLoginRequest(account: IAccount) {
  return tyRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  });
}
function queryUserInfoById(id: number) {
  return tyRequest.get<UserInfo>({
    url: LoginApi.UserInfo + id
  });
}
function queryUserMenusByRoleId(id: number) {
  return tyRequest.get<UserMenu>({
    url: LoginApi.UserMenus + id + "/menu"
  });
}

export { accountLoginRequest, queryUserInfoById, queryUserMenusByRoleId };
