interface CartItem extends Pick<ProductDto, 'id' | 'name' | 'price'>  {
  amount: number
  imgSrc: string
}