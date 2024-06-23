import {Button, Form, Input, Modal, Select, Space, Table} from "antd";
import {useEffect, useRef, useState} from "react";
import api from "@/api";
import {Menu} from "@/types/api";
import {IAction} from "@/types/modal";
import {ColumnsType} from "antd/es/table";
import {message} from "@/utils/AntdGlobal";
import {formatDate} from "@/utils";
import CreateMenu from "@/views/system/menu/CreateMenu";

export default function MenuList() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Menu.MenuItem[]>([]);

  const columns: ColumnsType<Menu.MenuItem> = [{
    title: '菜单名称', dataIndex: 'menuName', key: 'menuName',
  }, {
    title: '菜单图标', dataIndex: 'icon', key: 'icon',
  }, {
    title: '菜单类型', dataIndex: 'menuType', key: 'menuType', render(menuType: number) {
      return {
        1: '菜单', 2: '按钮', 3: '页面',
      }[menuType]
    }
  }, {
    title: '权限标识', dataIndex: 'menuCode', key: 'menuCode',
  }, {
    title: '路由地址', dataIndex: 'path', key: 'path',
  }, {
    title: '组件路径', dataIndex: 'component', key: 'component',
  }, {
    title: '创建时间', dataIndex: ' createTime', key: ' createTime', render(createTIme: string) {
      return formatDate(createTIme)
    }
  }, {
    title: '操作', key: 'action', width: 200, render(_, record) {
      return (<Space>
        <Button onClick={() => handleSubCreate(record._id)}>新增</Button>
        <Button onClick={() => handleEdit(record)}>编辑</Button>
        <Button onClick={() => handleDelete(record._id)}>删除</Button>
      </Space>)
    }
  }]

  const menuRef = useRef<{
    open: (type: IAction, data?: Menu.EditParams | { parentId: string} | {orderBy: number}) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, []);

  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleCreate = () => {
    menuRef.current?.open('create', {
      orderBy: data.length
    })
  }

  const handleSubCreate = (id: string) => {
    menuRef.current?.open('create', {parentId: id})
  }

  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认', content: '确认删除当前菜单吗？', onOk: () => handleDeleteSubmit(id),
    })
  }

  const handleDeleteSubmit = async (id: string) => {
    await api.deleteMenu({
      _id: id
    })
    message.success('删除成功')
    getMenuList()
  }

  return (<div>
    <Form className={'search-form'} layout="inline" form={form}>
      <Form.Item label={'菜单名称'} name={'menuName'}>
        <Input placeholder={'菜单名称'}/>
      </Form.Item>

      <Form.Item label={'菜单状态'} name={'menuState'} style={{width: 200}}>
        <Select>
          <Select.Option value={1}>正常</Select.Option>
          <Select.Option value={2}>停用</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type={'primary'} className={'mr10'} onClick={getMenuList}>搜索</Button>
        <Button type={'default'} onClick={handleReset}>重置</Button>
      </Form.Item>
    </Form>

    <div className={'base-table'}>
      <div className={'header-wrapper'}>
        <div className={'title'}>菜单列表</div>
        <div className={'action'}>
          <Button type={'primary'} onClick={handleCreate}>新增</Button>
        </div>
      </div>
      <Table bordered rowKey={'_id'} columns={columns} dataSource={data} pagination={false}/>
    </div>

    <CreateMenu mRef={menuRef} update={getMenuList} />

  </div>)
}
