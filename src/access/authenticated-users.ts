import type { Access, AccessArgs } from 'payload'

export const authenticatedUsers: Access = ({ req: { user } }) => {
  return Boolean(user)
}
