import { type Product } from '@/types/Product'
import ProductCard from '../ProductCard/ProductCard'
import styles from './ProductList.module.css'
import SelectComponent from '@/app/components/shared/SelectComponent/SelectComponent'
import ProductService from '@/services/ProductService'

const getProducts = async () => {
  const products = await ProductService.getProducts()
  return products
}

async function ProductList() {
  const products: Product[] = await getProducts()

  return (
    <div className={styles.productListContainer}>
      <SelectComponent />
      <div className={styles.productListWrapper}>
        {products.map((product: Product) => (
          <ProductCard
            key={product._id}
            image={product.imageURL}
            name={product.name}
            price={product.price}
            isMultiple={product?.isMultiple}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList
