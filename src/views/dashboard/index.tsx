import {Descriptions} from 'antd'
import styles from './index.module.less'

export default function DashBoard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img className={styles.userImg} src="" alt="avatar"/>
        <Descriptions title="User Info">
          <Descriptions.Item label="姓名">路易斯</Descriptions.Item>
          <Descriptions.Item label="状态">在职</Descriptions.Item>
          <Descriptions.Item label="手机号">15089940511</Descriptions.Item>
          <Descriptions.Item label="岗位">后端工程师</Descriptions.Item>
          <Descriptions.Item label="部门">后端</Descriptions.Item>
        </Descriptions>
      </div>

      <div className={styles.report}>
        <div className={styles.card}>
          <div className="title">司机数量</div>
          <div className={styles.data}>100个</div>
        </div>

        <div className={styles.card}>
          <div className="title">总流水</div>
          <div className={styles.data}>1000元</div>
        </div>

        <div className={styles.card}>
          <div className="title">总订单</div>
          <div className={styles.data}>2000单</div>
        </div>

        <div className={styles.card}>
          <div className="title">开通城市</div>
          <div className={styles.data}>50座</div>
        </div>
      </div>
    </div>
  )
}
