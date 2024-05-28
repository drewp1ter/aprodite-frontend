'use client'
import { useState, PropsWithChildren, useEffect } from 'react'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import CloseIcon from './assets/closeIcon.svg'
import styles from './Modal.module.scss'
import { preventScroll } from '@/lib'

interface Props extends PropsWithChildren {
  className?: string
  isOpen?: boolean
  onClose?: () => void
}

export function Modal({ children, onClose, className, isOpen = false }: Props) {
  const [mounted, setMounted] = useState(false)
  const [animationState, setAnimationState] = useState<'opened' | 'closed' | 'closing'>('closed')

  useEffect(() => {
    setAnimationState(isOpen ? 'opened' : 'closed')
    return isOpen ? preventScroll() : undefined
  }, [isOpen])

  const handleClose: React.MouseEventHandler<HTMLElement> = (event) => {
    {
      event.stopPropagation()
      setAnimationState('closing')
      setTimeout(() => {
        onClose && onClose()
      }, 300)
    }
  }

  const handleEscPress = (event: any) => event.key === 'Escape' && handleClose(event)

  useEffectOnce(() => {
    setMounted(true)
    window.addEventListener('keydown', handleEscPress)
    return () => window.removeEventListener('keydown', handleEscPress)
  })

  const modal = (
    <div className={clsx(styles.backdrop, className)} onClick={handleClose} data-state={animationState}>
      <div className={styles.container}>
        <CloseIcon className={styles.closeIcon} onClick={handleClose} />
        {children}
      </div>
    </div>
  )

  if (!mounted) return null

  return createPortal(modal, document.body)
}
