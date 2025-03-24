import type { Access } from 'payload'

export const studentSelfOrAdmin: Access = ({ req: { user }, id }) => {
  return (user?.collection === 'students' && user?.id === id) || user?.collection === 'admins'
}
