type RequestStatus = 'initial' | 'request' | 'success' | 'failure'

interface BaseDto {
  id: number
  createdAt: Date
  updatedAt: Date
}

interface ImageDto extends BaseDto {
  url: string
  type: string
}