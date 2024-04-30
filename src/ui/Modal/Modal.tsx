'use client'
import { useState, PropsWithChildren, useEffect } from 'react'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import CloseIcon from './assets/closeIcon.svg'
import styles from './Modal.module.scss'
import { withStopPropagation, preventScroll } from '@/lib'

interface Props extends PropsWithChildren {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export function Modal({ children, onClose, className, isOpen = false }: Props) {
  const handleEscPress = (event: KeyboardEvent) => onClose && event.key === 'Escape' && onClose()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    return isOpen ? preventScroll() : undefined
  }, [isOpen])

  useEffectOnce(() => {
    setMounted(true)
    window.addEventListener('keydown', handleEscPress)
    return () => window.removeEventListener('keydown', handleEscPress)
  })

  const modal = (
    <>
      <div className={styles.backdrop} onClick={withStopPropagation(onClose)} onScroll={(event) => console.log('21')} />
      <div className={clsx(styles.container, className)}>
        <CloseIcon className={styles.closeIcon} onClick={withStopPropagation(onClose)} />
        {children}
      </div>
    </>
  )

  if (!isOpen || !mounted) return null

  return createPortal(modal, document.body)
}
