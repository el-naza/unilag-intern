// import type { Access } from 'payload'

// export const relatedCompany: Access = ({ req: { user }, data }) => {
//   return Boolean(user?.collection === 'companies' && data.company === user.id)
// }

import type { Access } from 'payload';

export const relatedCompany: Access = ({ req: { user }, data }) => {
  if (!user) return false; 
  console.log('User Collection:', user.collection);
  console.log('Data:', data);

  return user.collection === 'companies' && data?.company === user.id;
};
