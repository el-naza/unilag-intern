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


// HERE I WAS TRYING TO ENABLE THE STUDENT OR COMPANY TO VIEW THE INTERVIEW INVITATION  OR Internship Applications THAT WAS SENT TO THEM


// import type { Access } from 'payload';

// export const relatedStudentOrCompany: Access = async ({ req: { user, payload }, id }) => {
//   // Ensure the user is either a student or a company
//   if (user?.collection === 'students' || user?.collection === 'companies') {
//     if (id) {
//       // Fetch the document (either internship-application or interview-invitation)
//       const result = await payload.findByID({
//         collection: 'internship-applications' || 'interview-invitations', // Adjust based on the collection
//         id,
//         depth: 0,
//       });

//       // Validate ownership
//       if (result) {
//         if (user?.collection === 'students') {
//           // Check if the student owns the document
//           return result.student === user.id;
//         } else if (user?.collection === 'companies') {
//           // Check if the company owns the document
//           return result.company === user.id;
//         }
//       }

//       return false; // Document not found or ownership not validated
//     }

//     // If no ID is provided, fetch all documents related to the user
//     const results = await payload.find({
//       collection: 'internship-applications' || 'interview-invitations', // Adjust based on the collection
//       limit: 0,
//       depth: 0,
//       where: {
//         ...(user?.collection === 'students'
//           ? { student: { equals: user.id } } // Filter by student
//           : { company: { equals: user.id } }), // Filter by company
//       },
//     });

//     return results.totalDocs !== 0; // Return true if documents exist for the user
//   }

//   return false; // User is not a student or company
// };