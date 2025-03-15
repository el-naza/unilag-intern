// import type { Access } from 'payload'

// export const relatedStudentOrCompany: Access = async ({ req: { user, payload }, id }) => {
//   if (Boolean(user?.collection === 'students') || Boolean(user?.collection === 'companies')) {
//     if (id) {
//       const result = await payload.findByID({
//         collection: 'interview-invitations',
//         id,
//         depth: 0,
//       })

//       // Validate ownership
//       if (result) {
//         return (
//           (user?.collection === 'students' && result.student === user.id) ||
//           (user?.collection === 'companies' && result.company === user.id)
//         )
//       }

//       return false
//     }

//     const results = await payload.find({
//       collection: 'interview-invitations',
//       limit: 0,
//       depth: 0,
//       where: {
//         ...(Boolean(user?.collection === 'students')
//           ? { student: { equals: user?.id } }
//           : { company: { equals: user?.id } }),
//       },
//     })

//     return results.totalDocs !== 0
//   }

//   return false
// }



// HERE I WAS TRYING TO ENABLE THE STUDENT OR COMPANY TO VIEW THE INTERVIEW INVITATION  OR Internship Applications THAT WAS SENT TO THEM


import type { Access } from 'payload';

export const relatedStudentOrCompany: Access = async ({ req: { user, payload }, id }, collection) => {
  if (!user) return false; 
  const isStudent = user.collection === 'students';
  const isCompany = user.collection === 'companies';

  if (!isStudent && !isCompany) return false; 
  if (id) {
  
    const collectionsToCheck = ['interview-invitations', 'internship-applications'];
    let result = null;

    for (const coll of collectionsToCheck) {
      result = await payload.findByID({
        collection: coll,
        id,
        depth: 0,
      });

      if (result) break; 
    }

    if (!result) return false; 

    
    return (
      (isStudent && result.student === user.id) ||
      (isCompany && result.company === user.id)
    );
  }

  // For read access, filter documents based on student or company ownership
  return {
    or: [
      isStudent ? { student: { equals: user.id } } : null,
      isCompany ? { company: { equals: user.id } } : null,
    ].filter(Boolean),
  };
};


