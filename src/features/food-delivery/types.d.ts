interface ProductDto extends BaseDto {
  name: string
  price: string
  weight: number
  calories: number
  proteins: number
  fats: number
  carbonhydrates: number
  imgSrc: string
}

interface ImageDto extends BaseDto {
  url: string
  type: string
}
interface CategoryDto extends BaseDto {
  name: string
  description: string
  images: ImageDto[]
}