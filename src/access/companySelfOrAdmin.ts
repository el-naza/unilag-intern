import type { Access } from 'payload'

export const companySelfOrAdmin: Access = ({ req: { user }, id }) => {
  return (user?.collection === 'companies' && user?.id === id) || user?.collection === 'admins'
}
