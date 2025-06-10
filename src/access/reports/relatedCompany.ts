import type { FieldAccess } from 'payload'

export const relatedCompany: FieldAccess = ({
  req: { user, method = '' },
  data = { company: '' },
}) => {
  if (!user) {
    console.log('Access denied: No user authenticated.')
    return false
  }

  if (user.collection === 'companies') {
    if (method === 'GET') {
      return {
        'employment.company': { equals: user.id },
      } as any as boolean
    } else {
      // For create, update, and delete, use `data`
      return data?.company === user.id
    }
  } else {
    console.log('Access denied: User is not the company')
    return false
  }
}
