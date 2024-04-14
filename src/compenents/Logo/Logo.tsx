import clsx from 'clsx'
import Image from 'next/image'
import logo from './assets/logo.png'
import styles from './Logo.module.scss'

export interface Props {
  width?: number
  height?: number
  className?: string
}

export function Logo({ className, width, height }: Props) {
  const fill = width || height ? undefined : true
  return (
    <div className={clsx(className, styles.logo)}>
      <Image width={width} height={height} src={logo.src} fill={fill} alt="" />
    </div>
  )
}
