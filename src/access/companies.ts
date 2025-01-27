import type { Access } from 'payload'

export const companies: Access = ({ req: { user } }) => {
  return Boolean(user?.collection === 'companies')
}
