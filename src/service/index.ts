import TYRequest from "./request";
import localCache from "@/utils/cache";

import { BASE_URL, TIME_OUT } from "./request/config";
// 对外暴露的实例对象,service的统一出口
const tyRequest = new TYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token");
      if (token) {
        // 第一种方式在编译的时候就会报错，对象可能未未定义
        // config.headers.Authorization = token;
        config.headers = { Authorization: token };
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    }
  }
});

export default tyRequest;
