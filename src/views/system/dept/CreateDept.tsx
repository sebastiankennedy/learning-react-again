import {Form, Input, Modal, Select, TreeSelect} from "antd";
import {useState} from "react";
import {IAction} from "@/types/modal";
import {Dept} from "@/types/api";

export default function CreateDept() {
  const [form] = Form.useForm();
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const handleSubmit = () => {}
  const handleCancel = () => {}
  return (
    <Modal
      title={action === 'create' ? '创建用户': '编辑用户'}
      width={800}
      open={true}
      okText={'确定'}
      cancelText={'取消'}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{span: 4}} labelAlign='right'>
        <Form.Item label={'上级部门'} name={'parentId'}>
          <TreeSelect
            placeholder={'请选择上级部门'}
            allowClear
            treeDefaultExpandAll
            fieldNames={{label: 'deptName', value: '_id'}}
            treeData={deptList}
          ></TreeSelect>
        </Form.Item>

        <Form.Item label={'部门名称'} name={'deptName'}>
          <Input placeholder={'请输入部门名称'} />
        </Form.Item>

        <Form.Item label={'负责人员'} name={'userName'}>
          <Select>
            <Select.Option value={'Jack'} key={'Jack'}>Jack</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
