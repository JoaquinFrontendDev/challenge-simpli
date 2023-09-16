'use client'

import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import styles from './HeroCarousel.module.css'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Stepper from './Stepper/CarouselStepper'
import { imageCarouselData } from '@/constants/ImageData'

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className={styles.carousel}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showArrows={false}
        onChange={setActiveIndex}
        renderIndicator={(clickHandler, isSelected, index, label) => null}
        showStatus={false}
      >
        {imageCarouselData.map((image, index) => (
          <div className={styles.carouselImageContainer} key={index}>
            <Image src={image} alt="hero-carousel-image" fill />
          </div>
        ))}
      </Carousel>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Stepper currentStep={activeIndex} />
      </div>
    </div>
  )
}

export default HeroCarousel
