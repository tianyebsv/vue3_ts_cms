import { AxiosRequestConfig, AxiosResponse } from "axios";

interface TYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (req: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

interface TYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TYRequestInterceptors<T>;
}

export { TYRequestConfig, TYRequestInterceptors };
