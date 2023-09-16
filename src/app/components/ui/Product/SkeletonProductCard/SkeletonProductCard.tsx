import styles from './SkeletonProductCard.module.css'

const SkeletonProductCard = () => {
  return (
    <div className={`${styles.skeletonCard} ${styles.skeletonPulse}`}></div>
  )
}

export default SkeletonProductCard
