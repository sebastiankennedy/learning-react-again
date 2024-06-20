import {Button, Form, Input, Space, Table} from "antd";
import {useEffect, useState} from "react";
import api from "@/api";
import {Dept} from "@/types/api";

export default function DeptList() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Dept.DeptItem[]>([]);
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName',
      width: 200,
    },
    {
      title: '部门负责人员',
      dataIndex: 'userName',
      key: 'userName',
      width: 150
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render() {
        return (
          <Space>
            <Button>新增</Button>
            <Button>编辑</Button>
            <Button>删除</Button>
          </Space>
        )
      }
    }
  ]

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

  return (
    <div>
      <Form className={'search-form'} layout="inline" form={form}>
        <Form.Item label={'部门名称'} name={'deptName'}>
          <Input placeholder={'部门名称'} />
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
            <Button>新增</Button>
          </div>
        </div>
        <Table bordered rowKey={'_id'} columns={columns} dataSource={data} pagination={false}/>
      </div>
    </div>
  )
}
