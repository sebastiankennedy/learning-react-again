import request from "@/utils/request";
import {SignIn, User, Dashboard, ResultData, Dept, Menu} from "@/types/api";

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
  getReportData() {
    return request.get<Dashboard.ReportData>('/order/dashboard/getReportData')
  },
  // 获取折线图数据
  getLineData() {
    return request.get<Dashboard.LineData>('/order/dashboard/getLineData')
  },
  // 获取饼图数据
  getPieCityData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieCityData')
  },
  getPieAgeData() {
    return request.get<Dashboard.PieData[]>('/order/dashboard/getPieAgeData')
  },
  // 获取雷达图数据
  getRadarData() {
    return request.get<Dashboard.RadarData>('/order/dashboard/getRadarData')
  },
  // 获取用户列表数据
  getUserList(params: User.Params) {
    return request.get<ResultData<User.UserItem>>('/users/list', params)
  },
  // 创建用户
  createUser(params: User.CreateParams) {
    return request.post('/users/create', params)
  },
  // 更新用户
  editUser(params: User.EditParams) {
    return request.post('/users/edit', params)
  },
  // 删除和批量删除用户
  delUser(params: {userIds: number[]}) {
    return request.post('/users/delete', params)
  },
  /*
   * 部门管理
   */
  // 部门列表
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>('/dept/list', params)
  },
  // 获取所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>('/users/all/list')
  },
  // 创建部门
  createDept(params: Dept.CreateParams) {
    return request.post('/dept/create', params)
  },
  // 编辑部门
  editDept(params: Dept.EditParams) {
    return request.post('/dept/edit', params)
  },
  // 删除部门
  deleteDept(params: Dept.DelParams) {
    return request.post('/dept/delete', params)
  },
  // 菜单管理
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>('/menu/list', params)
  },
  deleteMenu(params: Menu.DelParams) {
    return request.post('/menu/delete', params)
  },
  createMenu(params: Menu.CreateParams) {
    return request.post('/menu/create', params)
  },
  editMenu(params: Menu.EditParams) {
    return request.post('/menu/edit', params)
  },
  // 获取权限列表
  getPermissionList() {
    return request.get<{buttonList:string[], menuList: Menu.MenuItem[]}>('/users/getPermissionList')
  }
}
