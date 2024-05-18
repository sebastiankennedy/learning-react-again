import {Descriptions, Card, Button} from 'antd'
import * as echarts from 'echarts'
import {useEffect, useState} from 'react'
import styles from './index.module.less'
import {useStore} from "@/store";
import {formatMoney, formatNum, formatState} from "@/utils";
import api from '@/api'
import {Dashboard} from "@/types/api";
import {useCharts} from "@/hook/useCharts";

export default function DashBoard() {
  const userInfo = useStore(state => state.userInfo)
  const [report, setReport] = useState<Dashboard.ReportData>()

  const [lineRef, lineChart] = useCharts()
  const [pieChartCityRef, pieChartCity] = useCharts()
  const [pieChartAgeRef, pieChartAge] = useCharts()
  const [radarChartRef, radarChart] = useCharts()

  useEffect(() => {
    lineChart?.setOption({
      // title: {
      //   text: '订单和流水走势图'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '流水']
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

    pieChartCity?.setOption({
      title: {
        text: '司机城市分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: [
            {value: 335, name: '北京'},
            {value: 310, name: '上海'},
            {value: 274, name: '广州'},
            {value: 235, name: '杭州'},
            {value: 400, name: '武汉'}
          ]
        }
      ]
    })

    pieChartAge?.setOption({
      title: {
        text: '司机年龄分布',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data: [
            {value: 30, name: '北京'},
            {value: 40, name: '上海'},
            {value: 60, name: '广州'},
            {value: 20, name: '杭州'},
            {value: 35, name: '武汉'}
          ]
        }
      ]
    })

    radarChart?.setOption({
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center'
      // },
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: [
          {name: '服务态度', max: 10},
          {name: '在线时长', max: 600},
          {name: '接单率', max: 100},
          {name: '评分', max: 5},
          {name: '关注度', max: 10000}
        ]
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: [
            {
              value: [8, 300, 80, 4, 9000],
              name: '司机模型诊断'
            }
          ]
        }
      ]
    })
  }, [lineChart, pieChartCity, pieChartAge, radarChart])


  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  useEffect(() => {
    getReportData()
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          alt=''
          className={styles.userImg}
        />
        <Descriptions title='欢迎新同学，每天都要开心！'>
          <Descriptions.Item label='用户ID'>{userInfo._id}</Descriptions.Item>
          <Descriptions.Item label='邮箱'>{userInfo.userEmail}</Descriptions.Item>
          <Descriptions.Item label='状态'>{formatState(userInfo.state)}</Descriptions.Item>
          <Descriptions.Item label='手机号'>{userInfo.mobile}</Descriptions.Item>
          <Descriptions.Item label='岗位'>{userInfo.job}</Descriptions.Item>
          <Descriptions.Item label='部门'>{userInfo.deptName}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>司机数量</div>
          <div className={styles.data}>{formatNum(report?.driverCount)}</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总流水</div>
          <div className={styles.data}>{formatMoney(report?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className='title'>总订单</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className='title'>开通城市</div>
          <div className={styles.data}>{formatNum(report?.cityNum)}座</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card title='订单和流水走势图' extra={<Button type='primary'>刷新</Button>}>
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div ref={pieChartCityRef} className={styles.itemPie}></div>
            <div ref={pieChartAgeRef} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarChartRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
