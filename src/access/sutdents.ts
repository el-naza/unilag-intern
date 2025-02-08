import type { Access } from 'payload'

export const students: Access = ({ req: { user } }) => {
  return Boolean(user?.collection === 'students')
}
