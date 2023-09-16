import styles from './SkeletonProductDetail.module.css'

const SkeletonProductDetail = () => {
  return (
    <div className={styles.detailWrapper}>
      <div className={`${styles.leftSkeleton} ${styles.skeletonPulse}`}></div>
      <div className={`${styles.rightSkeleton} ${styles.skeletonPulse}`}></div>
    </div>
  )
}

export default SkeletonProductDetail
