type RequestState = 'init' | 'pending' | 'done' | 'error'

interface BaseDto {
  id: number
  createdAt: Date
  updatedAt: Date
}

interface ImageDto extends BaseDto {
  url: string
  type: string
}

