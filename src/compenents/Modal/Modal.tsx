'use client'
import { useEffect, PropsWithChildren } from 'react'
import clsx from 'clsx'
import CloseIcon from './assets/closeIcon.svg'
import styles from './Modal.module.scss'

interface Props extends PropsWithChildren {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export function Modal ({ children, onClose, className, isOpen = false }: Props) {
  const handleEscPress = (event: KeyboardEvent) => onClose && event.key === 'Escape' && onClose()

  useEffect(() => {
    window.addEventListener('keydown', handleEscPress)
    return () => window.removeEventListener('keydown', handleEscPress)
  })

  if (!isOpen) return null

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={clsx(styles.container, className)}>
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
        {children}
      </div>
    </>
  )
}
