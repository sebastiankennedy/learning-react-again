import {Button, Form, Input, message} from 'antd'
import styles from './index.module.less'
import {SignIn} from "@/types/api";
import api from "@/api";
import storage from "@/utils/storage";
import {useState} from "react";
import {useStore} from "@/store";

export default function Login() {
  const [loading, setLoading] = useState(false)
  const updateToken = useStore(state => state.updateToken)

  const onFinish = async (values: SignIn.params) => {
    try {
      setLoading(true)
      const data = await api.signIn(values)
      setLoading(false)

      updateToken(data)
      storage.set('token', data)
      message.success('登录成功')

      const params = new URLSearchParams(location.search)
      // 保证 storage 写入成功之后再进行跳转
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome'
      })
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{remember: true}} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{required: true, message: 'Please input your username!'}]}>
            <Input/>
          </Form.Item>

          <Form.Item name='userPwd' rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password/>
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit' loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
