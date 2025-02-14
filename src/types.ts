import { Company as GeneratedCompany } from './payload-types'

export interface Company
  extends Omit<GeneratedCompany, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string
  createdAt?: string
  updatedAt?: string
}
