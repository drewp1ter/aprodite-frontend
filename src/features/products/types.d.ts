interface ProductDto extends BaseDto {
  name: string
  description: string
  price: string
  weight: number
  calories: number
  proteins: number
  fats: number
  flags: number
  carbonhydrates: number
  measureUnit: string
  images: ImageDto[]
}