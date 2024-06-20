import {Menu} from 'antd'
import {DesktopOutlined, SettingOutlined, TeamOutlined} from '@ant-design/icons'
import styles from './index.module.less'
import {useNavigate} from 'react-router-dom'
import Logo from '@/assets/logo.png'
import {useStore} from "@/store";

const SideMenu = () => {
  const collapsed = useStore(state => state.collapsed)
  const navigate = useNavigate()
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
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src={Logo} className={styles.img} />
        {collapsed ?  '' : <span>慕慕货运</span>}
      </div>
      <Menu defaultSelectedKeys={['1']} mode='inline' theme='dark' items={items}
            style={{width: collapsed ? '80': 'auto'}}
      />
    </div>
  )
}
export default SideMenu
