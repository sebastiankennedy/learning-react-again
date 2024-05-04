import styles from './index.module.less'
export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.title}>欢迎光临</div>
        <div className={styles.subTitle}>React18通用后台管理系统</div>
        <div className={styles.desc}> 实现通用后台</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
