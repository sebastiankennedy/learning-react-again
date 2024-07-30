import {Form, Input, Modal} from 'antd';
import {useImperativeHandle, useState} from "react";
import {IAction, IModalProp} from "@/types/modal";
import {Role} from "@/types/api";
import roleApi from "@/api/roleApi";
import {message} from "@/utils/AntdGlobal";

export default function CreateRole(props: IModalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [form] = Form.useForm()

  // 暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  // 提交
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = form.getFieldsValue()
      if (action === 'create') {
        await roleApi.createRole(params)
      } else {
        await roleApi.editRole(params)
      }
      message.success('操作成功')
      // 关闭弹窗
      handleCancel()
      // 重新调用父组件传递过来的方法，刷新列表
      props.update()
    }
  }

  // 取消
  const handleCancel = () => {
    // 重置表单
    form.resetFields()
    // 关闭弹窗
    setVisible(false)
  }
  return <Modal
    title={action === 'create' ? '新增角色' : '编辑角色'}
    width={600}
    open={visible}
    okText={'确定'}
    cancelText={'取消'}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <Form form={form} labelAlign={"right"} labelCol={{span: 4}}>
      {/* 记得加上隐藏域 */}
      <Form.Item name={'_id'} hidden>
        <Input/>
      </Form.Item>
      <Form.Item name={'roleName'} label={'角色名称'} rules={[{required: true, message: '请输入角色名称'}]}>
        <Input placeholder={'请输入角色名称'}/>
      </Form.Item>
      <Form.Item name={'remark'} label={'备注'}>
        <Input.TextArea placeholder={'请输入备注'}/>
      </Form.Item>
    </Form>
  </Modal>
}
