'use client'
import { PropsWithChildren, useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import clsx from 'clsx'
import styles from './FullScreen.module.scss'
import { preventScroll } from '@/lib'

export interface Props extends PropsWithChildren {
  className?: string
  isOpen?: boolean
}

export function FullScreen({ className, children, isOpen }: Props) {
  const [mounted, setMounted] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    
    if (elementRef.current) {
      const style = getComputedStyle(elementRef.current)
      if (style.display === 'none' ) return
    }

    const allowScroll = preventScroll()
    const restoreHeaderBackground = setHeaderTransparent()

    return () => {
      restoreHeaderBackground()
      allowScroll()
    }
  }, [isOpen])

  useEffectOnce(() => {
    setMounted(true)
  })

  const element = <div ref={elementRef} className={clsx(styles.fullScreen, className)} data-opened={isOpen}>{children}</div>

  if (!mounted) return null

  return createPortal(element, document.body)
}

function setHeaderTransparent() {
  const header = document.getElementById('header')
  let headerBackgroundColor = 'unset'
  if (header) {
    headerBackgroundColor = header.style.backgroundColor
    header.style.backgroundColor = 'transparent'
  }

  return function () {
    if (header) {
      header.style.backgroundColor = headerBackgroundColor
    }
  }
}
