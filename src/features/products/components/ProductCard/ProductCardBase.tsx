'use client'
import { Component } from 'react'

export interface Props {
  className?: string
  product: ProductDto
  onCartButtonClick?: (productId: number) => void
  onImageClick?: (productId: number) => void
}

interface State {
  readonly isImgLoaded: boolean
}

export class ProductCardBase extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = { isImgLoaded: false }
    this.handleOnImgLoad = this.handleOnImgLoad.bind(this)
  }

  handleImageClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    const { onImageClick, product } = this.props
    event.stopPropagation()
    onImageClick && onImageClick(product.id)
  }

  handleCartButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const { onCartButtonClick, product } = this.props
    event.stopPropagation()
    onCartButtonClick && onCartButtonClick(product.id)
  }

  imgLoader({ src }: any) {
    if (!src) return ''
    return `/_next/image?url=${encodeURI(src)}&w=384&q=75`
  }

  handleOnImgLoad() {
    this.setState({ isImgLoaded: true })
  }

  supplementFacts({ product, className }: Pick<Props, 'product' | 'className'>) {
    const weight = product.weight < 1 ? `${product.weight * 1000} г` : `${product.weight} кг`
    return (
      <div className={className}>
        <div>
          <small>Вес</small>
          <small>{weight}</small>
        </div>
        <div>
          <small>Ккал</small>
          <small>{product.calories}</small>
        </div>
        <div>
          <small>Б / Ж / У</small>
          <small>
            {product.proteins} г / {product.fats} г / {product.carbonhydrates} г
          </small>
        </div>
      </div>
    )
  }
}
