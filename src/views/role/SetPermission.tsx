import {Form, Input, Modal, Tree} from 'antd';
import {useEffect, useImperativeHandle, useState} from "react";
import {IAction, IModalProp} from "@/types/modal";
import {Menu, Role} from "@/types/api";
import api from "@/api";
import roleApi from "@/api/roleApi";
import {message} from "@/utils/AntdGlobal";

export default function SetPermission(props: IModalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [form] = Form.useForm()
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permissionList, setPermissionList] = useState<Role.Permission>()

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
    if (permissionList) {
      const data = await roleApi.updatePermission(permissionList)
      message.success('权限设置成功')
      handleCancel()
      props.update()
    }
  }

  // 取消
  const handleCancel = () => {
    // 关闭弹窗
    setVisible(false)
    setPermissionList(undefined)
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue)

    const checkedKeys: string[] = []
    const parentKeys: string[] = []
    item.checkedNodes.map((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        // 如果是菜单，则添加到 checkedKeys，作为最终权限节点存储进去
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })

    setPermissionList({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys: checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys),
      }
    })
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
      <Form.Item label={'角色名称'}>角色名称</Form.Item>
      <Form.Item label={'权限'}>
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
