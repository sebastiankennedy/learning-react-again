import request from "@/utils/request";
import {ResultData, Role} from "@/types/api";

export default {
  getRoleList(params: Role.Params) {
    // 返回一个 ResultData 对象，Role.RoleItem[] 对应 ResultData 的 data 属性
    return request.get<ResultData<Role.RoleItem>>('/roles/list', params)
  }
}
