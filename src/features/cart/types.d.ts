interface ICartItem extends Pick<ProductDto, 'name' | 'price'>  {
  productId: number
  amount: number
  imgSrc: string
}