import { Button, Spin } from 'antd'
import request from '@/utils/request'
import storage from '@/utils/storage'
import { formatMoney, toLocalDate, fomratDate } from '@/utils'
export default function Welcome() {
  const handleClick = () => {
    console.log(formatMoney('1231243534.58'))
    console.log(toLocalDate(new Date(), 'yyyy-MM-dd'))
    console.log(fomratDate())
  }
  const handleStorage = (type: number) => {
    if (type === 1) {
      storage.set('age', 30)
      storage.set('user', { name: 'jack', gender: '1' })
    }
    if (type === 2) {
      console.log(storage.get('age'))
      console.log(storage.get('user'))
    }
    if (type === 3) {
      storage.remove('age')
    }
    if (type === 4) {
      storage.clear()
    }
  }
  return (
    <div className='welcome'>
      <Spin tip='加载中...'>
        <p>Welcome</p>
      </Spin>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
        <Button onClick={() => handleStorage(1)}>写入值</Button>
        <Button onClick={() => handleStorage(2)}>读取值</Button>
        <Button onClick={() => handleStorage(3)}>删除值</Button>
        <Button onClick={() => handleStorage(4)}>清空所有</Button>
      </p>
    </div>
  )
}
