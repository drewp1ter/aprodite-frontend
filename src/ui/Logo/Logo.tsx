import Image from 'next/image'
import logo from './assets/logo.png'

export interface Props {
  width?: number
  height?: number
  className?: string
}

export function Logo({ className, width, height }: Props) {
  const fill = width || height ? undefined : true
  return (
    <div className={className}>
      <Image width={width} height={height} src={logo.src} fill={fill} alt="logo" sizes='100vh' />
    </div>
  )
}
