import React, {useEffect} from 'react'
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from '@ant-design/icons'
import {Layout, Menu, theme, Watermark} from 'antd'

const {Header, Content, Footer, Sider} = Layout

const App: React.FC = () => {
  const {
    token: {colorBgContainer}
  } = theme.useToken()

  // 防止删除水印实现原理
  useEffect(() => {
    const targetNode = document.getElementById('content') as HTMLDivElement
    const observer = new MutationObserver(function (mutationsList, observer) {
      console.log(mutationsList, observer)
      console.log('发生变化了。。。。')
      observer.disconnect()
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const span = document.createElement('span')
          span.innerText = 'Hello React'
          targetNode.appendChild(span)
          observer.observe(targetNode, config)
        }
      }
    })
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    }
    observer.observe(targetNode, config)
  }, [])

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
            <div style={{padding: 24, minHeight: 360, background: colorBgContainer}} id='content'>
              <span>content</span>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
