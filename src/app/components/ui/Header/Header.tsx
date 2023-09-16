'use client'

import { useProductContext } from '@/context/ProductContext'
import styles from './Header.module.css'
import { ChevronDown, DollarSign, ShoppingBasket, User2 } from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

enum ProductTypes {
  BIKES = 'bikes',
  ACCESSORIES = 'accessories',
  APPAREL = 'apparel',
}

function Header() {
  const { setProductType, productType } = useProductContext()

  const handleProductTypeChange = useCallback(
    (type: ProductTypes) => {
      setProductType(type)
    },
    [setProductType],
  )

  return (
    <div className={styles.headerContainer}>
      <Link href="/" className={styles.tradeMark}>
        Simpli<span className={styles.tradeMarkSpan}>Muv</span>
      </Link>
      <div className={styles.navbarWrapper}>
        <div
          className={productType === ProductTypes.BIKES ? styles.active : ''}
          onClick={() => {
            handleProductTypeChange(ProductTypes.BIKES)
          }}
        >
          Bikes
        </div>
        <div
          className={
            productType === ProductTypes.ACCESSORIES ? styles.active : ''
          }
          onClick={() => {
            handleProductTypeChange(ProductTypes.ACCESSORIES)
          }}
        >
          Accesories
        </div>
        <div>Apparel</div>
      </div>
      <div className={styles.headerRightSide}>
        <div className={styles.currencySelect}>
          <DollarSign size={20} color="#999" />
          <span>USD</span>
          <ChevronDown size={25} />
        </div>
        <div>
          <ShoppingBasket size={30} />
        </div>
        <div>
          <User2 size={25} />
        </div>
      </div>
    </div>
  )
}

export default Header
