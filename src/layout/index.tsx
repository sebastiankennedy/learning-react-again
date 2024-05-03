import React from 'react'
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons'
import {Layout, Menu, theme, Watermark} from 'antd'

const {Header, Content, Footer, Sider} = Layout

const App: React.FC = () => {
  const {
    token: {colorBgContainer}
  } = theme.useToken()

  return (
    <Watermark content="React">
      <Layout>
        <Sider
          breakpoint='lg'
          collapsedWidth='0'
          onBreakpoint={broken => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          侧边栏
        </Sider>
        <Layout>
          <Header style={{padding: 0, background: colorBgContainer}}>顶部区域</Header>
          <Content style={{margin: '24px 16px 0'}}>
            <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>content</div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
