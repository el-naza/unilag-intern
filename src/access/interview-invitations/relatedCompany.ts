import type { Access } from 'payload'

export const relatedCompany: Access = async ({ req: { user, payload }, id }) => {
  if (Boolean(user?.collection === 'companies')) {
    const results = await payload.find({
      collection: 'interview-invitations',
      limit: 0,
      depth: 0,
      where: {
        company: { equals: user?.id },
        ...(id ? { id: { equals: id } } : {}),
      },
    })

    return results.totalDocs !== 0
  }

  return false
}
