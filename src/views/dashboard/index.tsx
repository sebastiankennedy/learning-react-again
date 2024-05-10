import {Descriptions, Card, Button} from 'antd'
import styles from './index.module.less'
import * as echarts from 'echarts'
import {useEffect} from 'react'

export default function DashBoard() {
  useEffect(() => {
    const lineChartDom = document.getElementById('lineChart')
    const chartInstance = echarts.init(lineChartDom as HTMLElement)
    chartInstance.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 50,
        right: 50,
        bottom: 20
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: [10, 20, 30, 50, 60, 70, 80, 90, 100, 110, 120, 120]
        },
        {
          name: '流水',
          type: 'line',
          data: [1000, 2000, 3000, 5000, 600, 800, 2000, 3200, 1100, 1200, 6000, 5000]
        }
      ]
    })
  }, [])

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

      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div id="lineChart" className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div id="pieChartCity" className={styles.itemChart}></div>
          <div id="pieChartAge" className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div id="radarChart" className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
