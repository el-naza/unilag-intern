import { ValidationError } from 'payload'

export type ValidationErrors = {
  errors: [ValidationError]
}

export type ErrorResponse = {
  message: string
}

export type ServiceResponse<T> = {
  success?: boolean
  status?: number
  data?: T | ValidationError
}
