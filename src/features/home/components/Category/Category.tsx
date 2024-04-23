'use client'
import { useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Category.module.scss'

export interface Props {
  className?: string
  title: string
  imgSrc: string
  url: string
}

export function Category({ className, title, imgSrc, url }: Props) {
  const [isImgLoaded, setIsImgLoaded] = useState(false)

  const handleOnImgLoad = () => setIsImgLoaded(true)

  return (
    <Link className={clsx(styles.category, className)} href={url} data-loaded={isImgLoaded}>
      <Image fill src={imgSrc} alt={title} loader={imgLoader} onLoad={handleOnImgLoad} onError={() => {}}  />
      <h3>{title}</h3>
    </Link>
  )
}

function imgLoader({ src }: any) {
  if (!src) return ''
  return `/_next/image?url=${encodeURI(src)}&w=384&q=75`
}