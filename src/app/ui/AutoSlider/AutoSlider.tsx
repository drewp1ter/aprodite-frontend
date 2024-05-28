'use client'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import styles from './AutoSlider.module.scss'

export interface Props {
  images?: ImageDto[]
  className?: string
  delay?: number
}

export function AutoSlider({ className, images, delay = 5000 }: Props) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (!images) return
    resetTimeout()
    timeoutRef.current = setTimeout(() => setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : ++prevIndex)), delay)
    return () => resetTimeout()
  }, [index])

  const handleDotClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    setIndex(Number(event.currentTarget.dataset.idx))
  }

  return (
    <div className={clsx(styles.autoSlider, className)}>
      <div className={styles.slideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {images?.map((image) => {
          return (
            <div key={image.id} className={styles.slide}>
              <Image src={image.url} alt={image.type} fill sizes="(min-width: 430px) 100vw, (min-width: 1440px) 88vw, 100vw" priority />
            </div>
          )
        })}
      </div>
      {images && images.length > 1 && (
        <div className={styles.slideshowDots}>
          {images.map((_, idx) => (
            <div key={idx} className={styles.slideshowDot} data-active={idx === index} data-idx={idx} onClick={handleDotClick}></div>
          ))}
        </div>
      )}
    </div>
  )
}
