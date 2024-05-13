import request from "@/utils/request";
import {SignIn, User, Dashboard} from "@/types/api";

export default {
  // 账号密码登录
  signIn(params: SignIn.params) {
    return request.post<string>('/users/login', params, {showLoading: true})
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  },
  // 获取工作台汇总数据
  getReportData () {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  }
}
