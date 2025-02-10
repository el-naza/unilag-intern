import type { Access } from 'payload'

export const relatedStudentOrCompany: Access = async ({ req: { user, payload }, id }) => {
  if (Boolean(user?.collection === 'students') || Boolean(user?.collection === 'companies')) {
    if (id) {
      const result = await payload.findByID({
        collection: 'interview-invitations',
        id,
        depth: 0,
      })

      // Validate ownership
      if (result) {
        return (
          (user?.collection === 'students' && result.student === user.id) ||
          (user?.collection === 'companies' && result.company === user.id)
        )
      }

      return false
    }

    const results = await payload.find({
      collection: 'interview-invitations',
      limit: 0,
      depth: 0,
      where: {
        ...(Boolean(user?.collection === 'students')
          ? { student: { equals: user?.id } }
          : { company: { equals: user?.id } }),
      },
    })

    return results.totalDocs !== 0
  }

  return false
}
