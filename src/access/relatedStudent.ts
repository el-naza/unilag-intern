import type { Access } from 'payload'

export const relatedStudent: Access = ({ req: { user }, data }) => {
  return Boolean(user?.collection === 'students' && data.student === user.id)
}
