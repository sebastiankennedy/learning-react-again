import {Button, Table, Form, Select, Space, Modal, Input} from "antd";
import {useAntdTable} from "ahooks";
import {useForm} from "antd/es/form/Form";
import {Role, User} from "@/types/api";
import roleApi from "@/api/roleApi";
import {formatDate} from "@/utils";

export default function RoleList() {
  const [form] = useForm()
  const getTableData = async ({current, pageSize}: { current: number, pageSize: number }, formData: Role.Params) => {
    const data = await roleApi.getRoleList({...formData, pageNum: current, pageSize: pageSize});
    return {
      total: data.page.total,
      list: data.list,
    };
  }

  const {tableProps, search,} = useAntdTable(getTableData, {form, defaultPageSize: 10})

  const columns = [
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
      dataIndex: 'action',
      key: 'action',
      render: () => {
        return (
          <Space>
            <Button>编辑</Button>
            <Button>设置权限</Button>
            <Button>删除</Button>
          </Space>
        )
      }
    },
  ]

  const handleCreate = () => {

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
          rowKey='userId'
          columns={columns}
          {...tableProps}
        />
      </div>
    </div>
  )
}
