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
  return (
    <Link className={clsx(styles.category, className)} href={url}>
      <Image fill src={imgSrc} alt="" />
      <h3>{title}</h3>
    </Link>
  )
}
