/**
 * 封装一个 axios request类，后续项目直接通过实例化我这个封装类，来创建axios实例
 * 方便后续可能替换axios这个第三方服务，只需修改这里的文件就可以
 */
import axios, { AxiosInstance } from "axios";
import { ElLoading } from "element-plus";

import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import { TYRequestConfig, TYRequestInterceptors } from "./type";

class TYRequest {
  instance: AxiosInstance;
  interceptors?: TYRequestInterceptors;
  loading?: LoadingInstance;
  // loadingInstance?: ;
  constructor(config: TYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        this.loading = ElLoading.service({
          target: document.body,
          lock: true,
          text: "正在加载中...",
          background: "rgba(0,0,0,0.5)"
        });
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();

        return res.data;
      },
      (err: any) => {
        this.loading?.close();
        return err;
      }
    );
  }
  request<T>(config: TYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      config.headers = config.headers ? config.headers : {};
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  }
  get<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: TYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default TYRequest;
