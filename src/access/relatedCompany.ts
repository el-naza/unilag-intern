import type { Access } from 'payload'

export const relatedCompany: Access = ({ req: { user }, data }) => {
  return Boolean(user?.collection === 'companies' && data.company === user.id)
}
