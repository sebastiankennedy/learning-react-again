import api from "@/api";
import {getMenuPath} from "@/utils";

export default async function AuthLoader() {
  const data = await api.getPermissionList()
  const menuPathList = getMenuPath(data.menuList)
  console.log('Menu List：', data.menuList)
  console.log('Button List：', data.buttonList)
  console.log('Menu Path List：', menuPathList)

  return {
    buttonList: data.buttonList,
    menuList: data.menuList,
    menuPathList,
  }
}
