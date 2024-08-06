import {Form, Input, Modal, Tree} from 'antd';
import {useEffect, useImperativeHandle, useState} from "react";
import {IAction, IModalProp} from "@/types/modal";
import {Menu, Role} from "@/types/api";
import api from "@/api";

export default function SetPermission(props: IModalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [form] = Form.useForm()
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const menuList = await api.getMenuList()
    setMenuList(menuList)
  }
  // 暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setRoleInfo(data)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  // 提交
  const handleOk = async () => {
  }

  // 取消
  const handleCancel = () => {
    // 关闭弹窗
    setVisible(false)
  }

  const onCheck = () => {

  }
  return <Modal
    title={'设置权限'}
    width={600}
    open={visible}
    okText={'确定'}
    cancelText={'取消'}
    onOk={handleOk}
    onCancel={handleCancel}
  >
    <Form labelAlign={"right"} labelCol={{span: 4}}>
      <Form.Item name={'roleName'} label={'角色名称'}>
        角色名称
      </Form.Item>
      <Form.Item name={'remark'} label={'权限'}>
        <Tree
          checkable
          onCheck={onCheck}
          checkedKeys={checkedKeys}
          treeData={menuList}
          defaultExpandAll={true}
          fieldNames={{
            title: 'menuName',
            key: '_id',
            children: 'children',
          }}
        />
      </Form.Item>
    </Form>
  </Modal>
}
