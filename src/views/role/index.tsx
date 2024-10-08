import {Button, Table, Form, Select, Space, Modal, Input} from "antd";
import {useAntdTable} from "ahooks";
import {useForm} from "antd/es/form/Form";
import {Role, User} from "@/types/api";
import roleApi from "@/api/roleApi";
import {formatDate} from "@/utils";
import CreateRole from "@/views/role/CreateRole";
import SetPermission from "@/views/role/SetPermission";
import {useRef} from "react";
import {IAction} from "@/types/modal";
import {ColumnsType} from "antd/es/table";
import {message} from "@/utils/AntdGlobal";

export default function RoleList() {
  const [form] = useForm()
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>()

  const permissionRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>()
  const getTableData = async ({current, pageSize}: { current: number, pageSize: number }, formData: Role.Params) => {
    const data = await roleApi.getRoleList({...formData, pageNum: current, pageSize: pageSize});
    return {
      total: data.page.total,
      list: data.list,
    };
  }

  const {tableProps, search,} = useAntdTable(getTableData, {form, defaultPageSize: 10})
  // 定义一个行字段类型
  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render(updateTime: string) {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button onClick={() => handleEdit(record)}>编辑</Button>
            <Button onClick={() => handleSetPermission(record)}>设置权限</Button>
            <Button onClick={() => handleDelete(record._id)}>删除</Button>
          </Space>
        )
      }
    },
  ]

  const handleEdit = (data: Role.RoleItem) => {
    roleRef.current?.open('edit', data)
  }

  const handleCreate = () => {
    roleRef.current?.open('create')
  }

  // 删除确认
  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: '删除角色',
      content: <span>确定要删除该角色吗？</span>,
      async onOk() {
        await roleApi.delRole({_id: _id})
        message.success('删除成功')
        search.submit()
      }
    })
  }

  const handleSetPermission = (record: Role.RoleItem) => {
    permissionRef.current?.open('edit', record)
  }

  return (
    <div className="role-wrap">
      <Form form={form} className={'search-form'} layout={'inline'}>
        <Form.Item name={'roleName'} label={'角色名称'}>
          <Input placeholder={'请输入角色名称'}/>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type={'primary'} className={'mr10'} onClick={search.submit}>搜索</Button>
            <Button type={'default'} onClick={search.reset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>新增</Button>
          </div>
        </div>
        <Table
          bordered
          rowKey='_id'
          columns={columns}
          {...tableProps}
        />
      </div>
      <CreateRole mRef={roleRef} update={search.submit}/>
      <SetPermission mRef={permissionRef} update={search.submit}/>
    </div>
  )
}
