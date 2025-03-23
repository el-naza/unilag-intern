import type { Access } from 'payload'

export const relatedStudentOrCompany: Access = ({ req: { user, method }, data }) => {
  if (!user) {
    console.log('Access denied: No user authenticated.')
    return false
  }

  if (user.collection === 'companies') {
    if (method === 'GET') {
      return {
        company: { equals: user.id },
      }
    } else {
      // For create, update, and delete, use `data`
      return data?.company === user.id
    }
  } else if (user.collection === 'students') {
    if (method === 'GET') {
      return {
        student: { equals: user.id },
      }
    } else {
      // For create, update, and delete, use `data`
      return data?.student === user.id
    }
  } else {
    console.log('Access denied: User is not from the companies or students collection.')
    return false
  }
}
