import {Descriptions, Card, Button} from 'antd'
import {LegacyRef, useEffect, useState} from 'react'
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
    renderLineChart()
    renderPieChart1()
    renderPieChart2()
    renderRadarChart()
  }, [lineChart, pieChartCity, pieChartAge, radarChart])


  const getReportData = async () => {
    const data = await api.getReportData()
    setReport(data)
  }

  // 加载折线图数据
  const renderLineChart = async() => {
    if (!lineChart) return
    const data = await api.getLineData()
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
        data: data.label
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order
        },
        {
          name: '流水',
          type: 'line',
          data: data.money
        }
      ]
    })
  }

  // 加载饼图
  const renderPieChart1 = async() => {
    if (!pieChartCity) return
    const data = await api.getPieCityData()
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
          data: data
        }
      ]
    })
  }

  const renderPieChart2 = async() => {
    if (!pieChartAge) return
    const data = await api.getPieAgeData()
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
          data: data
        }
      ]
    })
  }

  // 加载雷达图
  const renderRadarChart = async() => {
    if (!radarChart) return;
    const data = await api.getRadarData()
    radarChart?.setOption({
      // title: {
      //   text: '司机模型诊断',
      //   left: 'center'
      // },
      legend: {
        data: ['司机模型诊断']
      },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: '模型诊断',
          type: 'radar',
          data: data.data
        }
      ]
    })
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
          <div ref={lineRef as LegacyRef<HTMLDivElement>} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='司机分布' extra={<Button type='primary'>刷新</Button>}>
          <div className={styles.pieChart}>
            <div ref={pieChartCityRef as LegacyRef<HTMLDivElement>} className={styles.itemPie}></div>
            <div ref={pieChartAgeRef as LegacyRef<HTMLDivElement>} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card title='模型诊断' extra={<Button type='primary'>刷新</Button>}>
          <div ref={radarChartRef as LegacyRef<HTMLDivElement>} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
