import { ValidationError } from 'payload'

export type ValidationErrors = {
  errors: [ValidationError]
}
