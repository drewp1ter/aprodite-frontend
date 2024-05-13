export interface RequestErrorProps {
  message: string
  errors?: Record<string, string>
  code?: number
}

export class RequestError extends Error {
  errors?: Record<string, string>
  code?: number

  constructor({ message, errors, code }: RequestErrorProps) {
    super(message)
    this.errors = errors
    this.code = code
    this.name = 'RequestError'
  }
}