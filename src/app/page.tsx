import HeroCarousel from './components/ui/Carousel/HeroCarousel'
import ProductList from './components/shared/Product/ProductList/ProductList'
import Newsletter from './components/ui/Newsletter/Newsletter'
import Footer from './components/ui/Footer/Footer'

export default async function Home() {
  return (
    <main style={{ maxWidth: '100vw', position: 'relative', width: '100%' }}>
      <HeroCarousel />
      <ProductList />
      <Newsletter />
      <Footer />
    </main>
  )
}
