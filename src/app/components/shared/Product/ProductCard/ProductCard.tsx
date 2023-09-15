'use client'

import Image from 'next/image'
import styles from './ProductCard.module.css'
import Link from 'next/link'

interface ProductCardProps {
  image: string
  name: string
  price: number
  isMultiple?: boolean
  id?: string
}

function ProductCard({
  image,
  name,
  price,
  isMultiple = false,
  id,
}: ProductCardProps) {
  return (
    <div className={styles.cardWrapper}>
      {isMultiple && <div className={styles.behindCard}></div>}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image src={image} alt={name} layout="fill" />
        </div>
        <h2 className={styles.productName}>{name}</h2>
        <p className={styles.productPrice}>{`$${price}`}</p>
        <Link className={styles.ctaButton} href={`products/${id}`}>
          Ver más
        </Link>
      </div>
    </div>
  )
}

export default ProductCard
