import React, {useEffect} from 'react'
import {Layout, theme, Watermark} from 'antd'
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components//SideMenu";
import {Outlet} from "react-router-dom";
import styles from './index.module.less'
import api from "@/api";
import {useStore} from "@/store";

const {Header, Content, Footer, Sider} = Layout

const App: React.FC = () => {
  const updateUserInfo = useStore(state => state.updateUserInfo)
  const collapsed = useStore(state => state.collapsed)
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  useEffect(() => {
    getUserInfo();
  }, []);

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
