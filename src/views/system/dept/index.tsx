import {Button, Form, Input, Modal, Space, Table} from "antd";
import {useEffect, useRef, useState} from "react";
import api from "@/api";
import {Dept} from "@/types/api";
import CreateDept from "@/views/system/dept/CreateDept";
import {IAction} from "@/types/modal";
import {ColumnsType} from "antd/es/table";
import {message} from "@/utils/AntdGlobal";
import {formatDate} from "@/utils";

export default function DeptList() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Dept.DeptItem[]>([]);

  const columns: ColumnsType<Dept.DeptItem> = [{
    title: '部门名称', dataIndex: 'deptName', key: 'deptName', width: 200,
  }, {
    title: '部门负责人员', dataIndex: 'userName', key: 'userName', width: 150
  }, {
    title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', render(updateTime) {
      return formatDate(updateTime)
    }
  }, {
    title: '创建时间', dataIndex: 'createTime', key: 'createTime', render(createTime) {
      return formatDate(createTime)
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

  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>()

  useEffect(() => {
    getDeptList()
  }, []);

  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setData(data)
  }

  const handleReset = () => {
    form.resetFields()
  }

  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  const handleSubCreate = (id: string) => {
    deptRef.current?.open('create', {parentId: id})
  }

  const handleEdit = (record: Dept.DeptItem) => {
    deptRef.current?.open('edit', record)
  }

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认', content: '确认删除当前部门吗？', onOk: () => handleDeleteSubmit(id),
    })
  }

  const handleDeleteSubmit = async (id: string) => {
    await api.deleteDept({
      _id: id
    })
    message.success('删除成功')
    getDeptList()
  }

  return (<div>
    <Form className={'search-form'} layout="inline" form={form}>
      <Form.Item label={'部门名称'} name={'deptName'}>
        <Input placeholder={'部门名称'}/>
      </Form.Item>

      <Form.Item>
        <Button type={'primary'} className={'mr10'} onClick={getDeptList}>搜索</Button>
        <Button type={'default'} onClick={handleReset}>重置</Button>
      </Form.Item>
    </Form>

    <div className={'base-table'}>
      <div className={'header-wrapper'}>
        <div className={'title'}>部门列表</div>
        <div className={'action'}>
          <Button type={'primary'} onClick={handleCreate}>新增</Button>
        </div>
      </div>
      <Table bordered rowKey={'_id'} columns={columns} dataSource={data} pagination={false}/>
    </div>

    <CreateDept mRef={deptRef} update={getDeptList}/>
  </div>)
}
