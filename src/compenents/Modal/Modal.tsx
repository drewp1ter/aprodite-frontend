'use client'
import { useEffect, PropsWithChildren } from 'react'
import clsx from 'clsx'
import CloseIcon from './assets/closeIcon.svg'
import styles from './Modal.module.scss'

interface Props extends PropsWithChildren {
  className?: string
  open?: boolean
  onClose?: () => void
}

export function Modal ({ children, onClose, className, open = false }: Props) {
  const handleEscPress = (event: KeyboardEvent) => onClose && event.key === 'Escape' && onClose()

  useEffect(() => {
    window.addEventListener('keydown', handleEscPress)
    return () => window.removeEventListener('keydown', handleEscPress)
  })

  return (
    <>
      <div className={styles.backdrop} data-open={open} onClick={onClose} />
      <div className={clsx(styles.container, className)} data-open={open}>
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
        {children}
      </div>
    </>
  )
}
