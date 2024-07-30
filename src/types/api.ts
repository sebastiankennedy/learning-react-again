// 接口类型定义
export namespace SignIn {
  export interface params {
    userName: string
    userPwd: string
  }
}

// 定义接口响应类型
export interface Result<T = any> {
  code: number,
  data: T,
  msg: string
}

// 定义接口响应类型
export interface ResultData<T = any> {
  list: T[],
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

// 定义接口分页参数
export interface PageParams {
  pageNum: number
  pageSize: number
}

// 部门管理
export namespace Dept {

  export interface Params {
    deptName?: string
  }

  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DelParams {
    _id: string
  }

  export interface DeptItem {
    _id: string
    createTime: string
    updateTIme: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
}

// 用户类型
export namespace User {
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }

  export interface UserItem {
    _id: string,
    userId: number,
    userName: string,
    userEmail: string,
    mobile: number,
    deptId: number,
    deptName: string,
    job: string,
    state: number,
    role: number,
    roleList: string,
    createId: number,
    userImg: string,
  }

  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    deptId: string
    job?: string
    state?: number
    roleList?: string[]
    userImg: string
  }

  export interface EditParams extends CreateParams {
    userId: number
  }
}

// 报表数据类型
export namespace Dashboard {
  export interface ReportData {
    driverCount: number,
    totalMoney: number,
    orderCount: number,
    cityNum: number,
  }

  // 定义折线图数据类型
  export interface LineData {
    label: string[],
    order: number[],
    money: number[],
  }

  // 定义饼图数据类型
  export interface PieData {
    value: number,
    name: string,
  }

  // 定义雷达图数据类型
  export interface RadarData {
    indicator: Array<{ name: string; max: number }>,
    data: {
      name: string
      value: number[]
    }
  }
}

export namespace Menu {
  export interface Params {
    menuName: string
    menuStatus: number
  }

  export interface CreateParams {
    menuName: string
    icon?: string
    menuType: number
    menuState: number
    menuCode?: string
    parentId?: string
    path?: string
    component?: string
    orderBy: number
  }

  export interface EditParams extends CreateParams {
    _id: string
  }

  export interface DelParams {
    _id: string
  }

  export interface MenuItem extends CreateParams {
    _id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
}

export namespace Role {
  export interface Params extends PageParams{
    roleName?: string
  }

  export interface CreateParams {
    roleName: string
    remark?: string
  }

  export interface RoleItem extends CreateParams {
    permissionList: {
      checkedKeys: string[],
    },
    updateTime: string,
    createTime: string,
  }

  export interface EditParams extends CreateParams {
    _id: string,
  }
}
