import request from "@/utils/request";
import {SignIn, User} from "@/types/api";

export default {
  // 账号密码登录
  signIn(params: SignIn.params) {
    return request.post('/users/login', params, {showLoading: true})
  },
  // 获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>('/users/getUserInfo')
  }
}
