'use client'

import Image from 'next/image'
import ProductService from '@/services/ProductService'
import styles from './page.module.css'
import Button from '@/app/components/shared/Button/Button'
import Dropdown from '@/app/components/shared/Dropdown/Dropdown'
import LeadModal from '@/app/components/ui/LeadModal/LeadModal'
import { useEffect, useState, useCallback } from 'react'
import { type Product } from '@/types/Product'
import { useModal } from '@/hooks/useModal'
import Modal from '@/app/components/shared/Modal/Modal'
import { useProductContext } from '@/context/ProductContext'
import SkeletonProductDetail from '@/app/components/shared/Product/SkeletonProductDetail/SkeletonProductDetail'
import { ApiError } from '@/errors/ApiError'

enum ProductDetailTexts {
  BUTTON_LABEL = "I'm interested",
  DROPDOWN_LABEL = 'Click to see more',
}

export default function ProductDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const [product, setProduct] = useState<Product | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()
  const { productType } = useProductContext()

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await ProductService.getProductById(
        id,
        productType,
      )
      setProduct(fetchedProduct)
    }

    fetchProduct().catch((error) => {
      throw new ApiError(error.code, 'There was an error fetching the product:')
    })
  }, [id, productType])

  const handleModalOpen = useCallback(() => {
    openModal()
  }, [openModal])

  if (!product)
    return (
      <div className={styles.productDetailsContainer}>
        <SkeletonProductDetail />
      </div>
    )
  if (product)
    return (
      <div className={styles.productDetailsContainer}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <LeadModal productID={id} />
        </Modal>
        <div className={styles.productDetailsImage}>
          <Image src={product.imageURL} alt={product.name} fill />
        </div>
        <div className={styles.productDetailsRightBox}>
          <div className={styles.rightBoxContent}>
            <h2 className={styles.rightBoxContentTitle}>{product.name}</h2>
            <p className={styles.rightBoxContentPrice}>{`USD ${Math.ceil(
              product.price,
            )}`}</p>
            <div className={styles.rightBoxButtonWrapper}>
              <Button
                label={ProductDetailTexts.BUTTON_LABEL}
                onClick={handleModalOpen}
              />
            </div>
            <div className={styles.rightBoxDropdown}>
              <Dropdown label={ProductDetailTexts.DROPDOWN_LABEL}>
                {product.description}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    )
}
