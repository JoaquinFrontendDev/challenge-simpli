import Image from 'next/image'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  image: string
  name: string
  price: number
  isMultiple?: boolean
}

function ProductCard({ image, name, price, isMultiple }: ProductCardProps) {
  return (
    <div className={styles.cardWrapper}>
      {isMultiple && <div className={styles.behindCard}></div>}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image src={image} alt={name} layout="fill" objectFit="contain" />
        </div>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.productPrice}>{`$${price}`}</p>
        <button className={styles.ctaButton}>Ver más</button>
      </div>
    </div>
  )
}

export default ProductCard
