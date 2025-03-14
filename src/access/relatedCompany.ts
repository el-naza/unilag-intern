// import type { Access } from 'payload'

// export const relatedCompany: Access = ({ req: { user }, data }) => {
//   return Boolean(user?.collection === 'companies' && data.company === user.id)
// }

// import type { Access } from 'payload'

// export const relatedCompany: Access = ({ req: { user }, data }) => {
//   console.log('data', data)
//   console.log('user', user)
//   console.log('Data:', data)

//   if (!user) return false
//   console.log('User Collection:', user.collection)
//   // console.log('Data:', data)

//   return user.collection === 'companies' && data?.company === user.id
// }



//THIS IS AN UPDATE FOR THE RELATED COMPANY ACCESS CONTROL FUNCTION
import type { Access } from 'payload';

export const relatedCompany: Access = ({ req: { user, method }, data }) => {

  if (!user) {
    console.log('Access denied: No user authenticated.');
    return false;
  }

  if (user.collection !== 'companies') {
    console.log('Access denied: User is not from the companies collection.');
    return false;
  }

  if (method === 'GET') {
    return {
      company: { equals: user.id },
    };
  }

  // For create, update, and delete, use `data`
  return data?.company === user.id;
};
