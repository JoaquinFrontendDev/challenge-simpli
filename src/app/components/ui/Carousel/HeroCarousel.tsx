'use client'

import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import styles from './HeroCarousel.module.css'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Stepper from './Stepper/CarouselStepper'

function HeroCarousel() {
  const images = [
    '/assets/images/hero-carousel-1.jpeg',
    '/assets/images/hero-carousel-2.jpeg',
    '/assets/images/hero-carousel-3.jpeg',
  ]

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
        {images.map((image, index) => (
          <div className={styles.carouselImageContainer} key={index}>
            <Image
              src={image}
              alt="hero-carousel-image"
              fill
              objectFit="cover"
              objectPosition="center"
            />
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
