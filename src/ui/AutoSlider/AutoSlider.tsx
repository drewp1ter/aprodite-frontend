'use client'
import { useState, useRef, useEffect, PropsWithChildren, Children } from 'react'
import clsx from 'clsx'
import styles from './AutoSlider.module.scss'

export interface Props extends PropsWithChildren {
  className?: string
  delay?: number
}

export function AutoSlider({ className, children, delay = 5000 }: Props) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(() => setIndex((prevIndex) => (prevIndex === Children.count(children) - 1 ? 0 : ++prevIndex)), delay)
    return () => resetTimeout()
  }, [index])

  const handleDotClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    setIndex(Number(event.currentTarget.dataset.idx))
  }

  return (
    <div className={clsx(styles.autoSlider, className)}>
      <div className={styles.slideshowSlider} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {Children.map(children, (item) => (
          <div className={styles.slide}>{item}</div>
        ))}
      </div>
      <div className={styles.slideshowDots}>
        {Children.map(children, (_, idx) => (
          <div key={idx} className={styles.slideshowDot} data-active={idx === index} data-idx={idx} onClick={handleDotClick}></div>
        ))}
      </div>
    </div>
  )
}
