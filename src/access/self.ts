import type { Access } from 'payload'

export const self: Access = ({ req: { user }, id }) => {
  return user?.id === id
}
