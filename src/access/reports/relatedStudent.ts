import type { Access } from 'payload'

export const relatedStudent: Access = async ({ req: { user, payload }, id }) => {
  if (Boolean(user?.collection === 'students')) {
    const results = await payload.find({
      collection: 'reports',
      limit: 0,
      depth: 0,
      where: {
        student: { equals: user?.id },
        ...(id ? { id: { equals: id } } : {}),
      },
    })

    return results.totalDocs !== 0
  }

  return false
}
