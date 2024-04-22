import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

function Error404() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }

  return (
    <Result
      status={404}
      title='404'
      subTitle='抱歉，找不到有页面'
      extra={
        <Button type='primary' onClick={handleClick}>
          返回首页
        </Button>
      }
    />
  )
}

export default Error404
