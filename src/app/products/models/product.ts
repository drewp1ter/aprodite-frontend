import {formatPrice } from '@/lib'

export class Product {
  readonly id: number 
  readonly name: string 
  readonly description: string
  readonly price: string
  readonly weight: number
  readonly calories: number
  readonly proteins: number
  readonly fats: number
  readonly flags: number
  readonly carbonhydrates: number
  readonly measureUnit: string
  readonly images: ImageDto[]
  readonly createdAt: Date
  readonly updatedAt: Date

  constructor(partial: Partial<Product>) {
    this.id = partial.id || -1
    this.name = partial.name || ''
    this.description = partial.description || ''
    this.price = partial.price || '0'
    this.weight = partial.weight || 0
    this.calories = partial.calories || 0
    this.proteins = partial.proteins || 0
    this.fats = partial.fats || 0
    this.flags = partial.flags || 0
    this.carbonhydrates = partial.carbonhydrates || 0
    this.measureUnit = partial.measureUnit || ''
    this.images = partial.images || []
    this.updatedAt = new Date(partial.updatedAt || '')
    this.createdAt = new Date(partial.createdAt || '')
  }

  get weightFormated(): string {
    return this.weight < 1 ? `${Math.round(this.weight * 1000)} г` : `${this.weight} кг`
  }

  get priceFormated(): string {
    return formatPrice(this.price)
  }

  static createFromDto(product: ProductDto): Product {
    return new Product(product)
  }
}