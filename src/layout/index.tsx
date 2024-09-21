import React, {useEffect} from 'react'
import {Layout, theme, Watermark} from 'antd'
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components//SideMenu";
import {Navigate, Outlet, useLocation, useRouteLoaderData} from "react-router-dom";
import styles from './index.module.less'
import api from "@/api";
import {useStore} from "@/store";
import {IAuthLoader} from "@/router/AuthLoader";
import {searchRoute} from "@/utils";
import {routers} from "@/router";

const {Header, Content, Footer, Sider} = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  const collapsed = useStore(state => state.collapsed)
  const {pathname} = useLocation()
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  const route = searchRoute(pathname, routers)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    // 权限判断
    const data = useRouteLoaderData('layout') as IAuthLoader
    console.log('路由权限判断', data)
    console.log('当前路由路径', pathname)
    const staticPath = ['/welcome', '/403', '/404',]
    // 如果没有权限，且不在白名单中，则跳转到403页面
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to={'/403'}/>
    }
  }

  return (
    <Watermark content="React">
      <Layout>
        <Sider collapsed={collapsed}>
          <SideMenu/>
        </Sider>
        <Layout>
          <NavHeader/>
          <Content className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet></Outlet>
            </div>
            <NavFooter/>
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
