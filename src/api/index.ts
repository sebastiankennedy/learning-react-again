import request from "@/utils/request";
import {SignIn} from "@/types/api";

export default {
  signIn(params: SignIn.params) {
    return request.post('/users/login', params, {showLoading: true})
  }
}
