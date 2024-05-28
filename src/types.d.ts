type RequestState = 'init' | 'pending' | 'succeeded' | 'failed'

interface BaseDto {
  id: number
  createdAt: Date
  updatedAt: Date
}

interface ImageDto extends BaseDto {
  url: string
  type: string
}

type LoadState = 'pending' | 'success' | 'failure'