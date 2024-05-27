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

// 用户类型
export namespace User {
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
