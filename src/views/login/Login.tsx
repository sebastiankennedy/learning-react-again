import { Button, Form, Input } from 'antd'
import styles from './index.module.less'
import {SignIn} from "@/types/api";
import api from "@/api";
import storage from "@/utils/storage";

export default function Login() {
  const onFinish = async (values: SignIn.params) => {
    const data = await api.signIn(values)
    storage.set('token', data)
    console.log('data', data)
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='userPwd' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' block htmlType='submit'>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
