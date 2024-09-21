import { useRouteLoaderData } from 'react-router'
import { IAuthLoader } from '@/router/AuthLoader'
import { useStore } from '@/store'
import { Button } from 'antd'

export default function AuthButton (props: any) {
  // 获取当前用户按钮权限
  const data = useRouteLoaderData('layout') as IAuthLoader
  const role = useStore(state => state.userInfo.role)

  // 如果没有权限，保留原来功能
  if (!props.auth) {
    return <Button {...props}>{props.children}</Button>
  }

  console.log('当前用户按钮权限', data.buttonList)
  console.log('当前用户角色类型', role)
  // 有权限或者为超级管理员，则显示按钮
  if (data.buttonList.includes(props.auth) || role === 1) {
    return <Button {...props}>{props.children}</Button>
  }

  return <></>
}
