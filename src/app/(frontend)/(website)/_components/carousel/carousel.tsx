'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const images = [
  { src: '/images/heroImage.jpg', alt: 'Two women' },
  { src: '/images/heroImage2.jpg', alt: 'People' },
  { src: '/images/heroImage3.png', alt: 'Woman' },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full md:h-[700px] h-[150px] overflow-hidden">
      {images.map((image, index) => {
        const isActive = index === currentIndex
        return (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            width={1440}
            height={500}
            className={`absolute top-0 left-0 w-full h-full md:object-cover object-contain ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              transition: 'opacity 2s ease-in-out',
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          />
        )
      })}
    </div>
  )
}
