import {Form, Input, Modal, Select, TreeSelect, Upload, UploadFile, UploadProps} from "antd";
import {useEffect, useImperativeHandle, useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import storage from "@/utils/storage";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {message} from "@/utils/AntdGlobal";
import {IAction, IModalProp} from "@/types/modal";
import {Dept, Role, User} from "@/types/api";
import api from "@/api";
import roleApi from "@/api/roleApi";

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState<boolean>(false)
  const [action, setAction] = useState<IAction>()
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([])

  useEffect(() => {
    getDeptList()
    getRoleList()
  }, [])

  // 获取部门列表
  const getDeptList = async () => {
    const data = await api.getDeptList()
    setDeptList(data)
  }

  // 获取角色列表
  const getRoleList = async () => {
    const data = await roleApi.getAllRoleList()
    setRoleList(data)
  }

  useImperativeHandle(props.mRef, () => {
    return {
      // 暴漏子组件 open 方法
      open
    }
  })

  // 调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
      setImg(data.userImg)
    }
  }
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    console.log(valid)
    if (valid) {

      const params = {
        ...form.getFieldsValue(),
        userImg: img
      }

      if (action === 'create') {
        const data = await api.createUser(params)
        console.log('用户创建', data)
        message.success('创建成功')
        props.update()
      } else {
        const data = await api.editUser(params)
        console.log('用户更新', data)
        message.success('更新成功')
      }
      await handleCancel()

    }
  }

  const handleCancel = async () => {
    setVisible(false)
    form.resetFields()
  }

  // 上传头像之前，接口处理
  const beforeUpload = async (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }

    const isLt500k = file.size / 1024 / 1024 < 0.5
    if (!isLt500k) {
      message.error('Image must smaller than 2MB!')
    }

    return isJpgOrPng && isLt500k
  }

  // 上传之后，图片处理
  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      setLoading(false)
      const {code, data, message} = info.file.response
      if (code === 0) {
        setImg(data.file)
      } else {
        message.error(message)
      }
      return
    } else if (info.file.status === 'error') {
      setLoading(false)
      message.error('服务器异常，请稍后重试')
    }


  }

  return (
    <Modal
      title="创建用户"
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={'确定'}
      cancelText={'取消'}
    >
      <Form form={form} labelCol={{span: 4}} labelAlign='right'>
        <Form.Item name={'userId'} style={{display: "none"}}>
          <Input/>
        </Form.Item>
        <Form.Item label="用户名称" name={'userName'} rules={[{required: true, message: '请输入用户名称'}]}>
          <Input placeholder='请输入用户名称'></Input>
        </Form.Item>

        <Form.Item label="用户邮箱" name={'userEmail'} rules={[{required: true, message: '请输入用户邮箱'}]}>
          <Input placeholder='请输入用户邮箱'></Input>
        </Form.Item>

        <Form.Item label="手机号码" name={'mobile'}>
          <Input type={'number'} placeholder='请输入手机号码'></Input>
        </Form.Item>

        <Form.Item label="部门" name={'deptId'} rules={[
          {required: true, message: '请选择部门'}
        ]}>
          <TreeSelect
            placeholder="请选择部门"
            allowClear
            treeDefaultExpandAll
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            fieldNames={{label: 'deptName', value: '_id'}}
            treeData={deptList}
          />
        </Form.Item>

        <Form.Item label="岗位" name={'job'}>
          <Input placeholder='请输入岗位'></Input>
        </Form.Item>

        <Form.Item label="状态" name={'state'}>
          <Select>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label={'角色'} name={'roleList'}>
          <Select placeholder={'请选择角色'}>
            {
              roleList.map(item => {
                return <Select.Option key={item._id} value={item._id}>{item.roleName}</Select.Option>
              })
            }
          </Select>
        </Form.Item>

        <Form.Item label={'用户头像'}>
          <Upload
            listType={'picture-circle'}
            showUploadList={false}
            headers={
              {
                Authorization: 'Bearer ' + storage.get('token'),
                icode: 'E2E36D751E757130'
              }
            }
            action={'/api/users/upload'}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {img ? (
              <img src={img} style={{width: '100%', borderRadius: '100%'}} alt={''}/>
            ) : (
              <div>
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div style={{marginTop: 5}}>上传头像</div>
              </div>
            )}

          </Upload>
        </Form.Item>
      </Form>

    </Modal>
  )
}

export default CreateUser
