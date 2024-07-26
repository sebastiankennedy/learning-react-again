import {Menu} from 'antd'
import {DesktopOutlined, SettingOutlined, TeamOutlined} from '@ant-design/icons'
import styles from './index.module.less'
import {useLocation, useNavigate, useRouteLoaderData} from 'react-router-dom'
import Logo from '@/assets/logo.png'
import {useStore} from "@/store";
import type {MenuProps} from 'antd/lib/menu';
import React, {useEffect, useState} from "react";
import {Menu as IMenu} from 'src/types/api'
import * as Icons from '@ant-design/icons'

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const navigate = useNavigate()
  const collapsed = useStore(state => state.collapsed)
  const data: any = useRouteLoaderData('layout')
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const {pathname} = useLocation()
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined/>
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined/>,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined/>
        },
        {
          label: '部门管理',
          key: ' 4',
          icon: <TeamOutlined/>
        }
      ]
    }
  ]

  function createIcon(name?: string) {
    if (!name) return <></>
    const customerIcons: { [key: string]: any } = Icons;
    const icon = customerIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  // 递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        // 存在按钮，证明是末级菜单了
        if (item.buttons) {
          return treeList.push(
            getItem(
              item.menuName,
              item.path || index,
              createIcon(item.icon)
            )
          )
        }

        treeList.push(
          getItem(
            item.menuName,
            item.path || index,
            createIcon(item.icon),
            getTreeMenu(item.children || [], [])
          )
        )
      }
    })
    return treeList
  }

  // 初始化，获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList)
    setMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [])

  type MenuItem = Required<MenuProps>['items'][number]

  // 生成每一个菜单组件
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[] | []
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  const handleClickLogo = () => {
    navigate('/welcome')
  }

  // 点击菜单跳转
  const handleClickMenu = ({key}: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src={Logo} className={styles.img} alt={''}/>
        {collapsed ? '' : <span>慕慕货运</span>}
      </div>
      <Menu mode='inline'
            theme='dark'
            style={{width: collapsed ? '80' : 'auto'}}
            onClick={handleClickMenu}
            selectedKeys={selectedKeys}
            items={menuList}
      />
    </div>
  )
}
export default SideMenu
