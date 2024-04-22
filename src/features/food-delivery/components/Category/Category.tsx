'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import Placeholder from './assets/placeholder.svg'
import styles from './Category.module.scss'

export interface Props {
  className?: string
  title: string
  imgSrc: string
  url: string
}

type ImgLoadStatus = 'init' | 'ok' | 'error'

export function Category({ className, title, imgSrc, url }: Props) {
  const [imgLoadStatus, setImgLoadStatus] = useState<ImgLoadStatus>('init')

  const imgLoader=({ src }: any) => {
    if (!src) return ''
    return `/_next/image?url=${encodeURI(src)}&w=384&q=75`
  }

  const handleOnImgLoad = () => {
    setImgLoadStatus('ok')
  }

  const handleOnImgError = () => {
    setImgLoadStatus('error')
  }

  return (
    <Link className={clsx(styles.category, className)} href={url} data-status={imgLoadStatus}>
      <Placeholder />
      <Image fill src={imgSrc} alt={title} loader={imgLoader} onLoad={handleOnImgLoad} onError={handleOnImgError}  />
      <h3>{title}</h3>
    </Link>
  )
}
