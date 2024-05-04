import React, {useEffect} from 'react'
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons'
import {Layout, theme, Watermark} from 'antd'
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components//SideMenu";
import {Outlet} from "react-router-dom";
import styles from './index.module.less'

const {Header, Content, Footer, Sider} = Layout

const App: React.FC = () => {
  return (
    <Watermark content="React">
      <Layout>
        <Sider>
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
