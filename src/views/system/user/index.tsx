import {Button, Form, Input, Select, Space, Table} from "antd";
import {ColumnType} from "antd/es/table";
import {PageParams, User} from "@/types/api";
import {useEffect, useState} from "react";
import api from '@/api'
import {formatDate} from "@/utils";

export default function UserList() {
  // 实例化查询表单
  const [form] = Form.useForm()
  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  })

  // 搜索
  const handleSearch = () => {
    // 搜索时必须从第一页开始，对比查询参数
    getUserList({
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }

  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue();
    const data = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: pagination.pageSize
    })

    const list = Array.from({length: 50}).fill({}).map((item: any) => {
      item = {...data.list[0]}
      item.userId = Math.random()
      return item
    })

    setData(list)
    setTotal(list.length)
    setPagination({
      current: params.pageNum,
      pageSize: params.pageSize
    })
  }

  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize]);

  /*const dataSource = [
    {
      _id: '',
      userId: 0,
      userName: '',
      userEmail: '',
      mobile: 0,
      deptId: 0,
      deptName: '',
      job: '',
      state: 0,
      role: 0,
      roleList: '',
      createId: 0,
      userImg: '',
    }
  ]*/

  const columns: ColumnType<User.UserItem> = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          1: '在职',
          2: '离职',
          3: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions',
      render(record, values) {
        return (
          <Space>
            <Button type={"text"}>编辑</Button>
            <Button type={"text"}>删除</Button>
          </Space>
        )
      }
    }
  ];


  return (
    <div className="user-list">
      <div className="search-form">
        <Form className='search-form' form={form} layout='inline' initialValues={{state: 0}}>
          <Form.Item name='userId' label='用户ID'>
            <Input placeholder='请输入用户ID'/>
          </Form.Item>

          <Form.Item name='userName' label='用户名称'>
            <Input placeholder='请输入用户名称'/>
          </Form.Item>

          <Form.Item name='state' label='状态'>
            <Select style={{width: 120}}>
              <Select.Option value={0}>所有</Select.Option>
              <Select.Option value={1}>在职</Select.Option>
              <Select.Option value={2}>试用期</Select.Option>
              <Select.Option value={3}>离职</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type='primary'>搜索</Button>
              <Button type='default'>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>

      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">
            用户列表
          </div>
          <div className="action">
            <Button type='primary'>新增</Button>
            <Button type='primary' danger={true}>批量删除</Button>
          </div>
        </div>

        <Table
          bordered
          rowSelection={{type: 'checkbox'}}
          rowKey='userId'
          dataSource={data}
          columns={columns}
          pagination={
            {
              position: ['bottomRight'],
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: total,
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: function (total) {
                return `总共 ${total}条`
              },
              onChange: (page, pageSize) => {
                setPagination({
                  current: page,
                  pageSize: pageSize
                })
              }
            }
          }
        />
      </div>
    </div>
  )
}
