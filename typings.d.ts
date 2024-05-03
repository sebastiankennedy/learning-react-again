// 扩展 axios 配置类型
import {AxiosRequestConfig} from "axios";

declare module 'axios' {
  interface AxiosRequestConfig {
    showLoading ?: boolean
    showError ?: boolean
  }
}
