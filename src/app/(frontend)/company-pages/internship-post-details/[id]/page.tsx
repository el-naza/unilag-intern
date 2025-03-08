'use client'
import { useParams, useRouter } from 'next/navigation'
import NavBar from '../../../common/nav-bar'
import ArrowIcon from '../../../assets/icons/arrow'
import Image from 'next/image'
import invitationImage from '../../../assets/images/initation-image.png'
import TimeIcon from '../../../assets/icons/time'
import { ReactNode, useEffect, useState } from 'react'
import CalenderIcon from '../../../assets/icons/calander'
import OutlineLocation from '../../../assets/icons/outlineLocation'
import CareerIcon from '../../../assets/icons/career'
import PersonsIcon from '../../../assets/icons/persons'
import InvitationCard from '../../../components/Cards/invitationCard'
import fetchDocs from '@/services/fetchDocs'
import Loader from '@/app/(frontend)/components/Layouts/Loader'
import fetchDoc from '@/services/fetchDoc'

export default function InvitiationDetails() {
  const router = useRouter()

  interface DataItem {
    title: string
    value: string
    icon: ReactNode
  }

  const { id: postId }: { id: string } = useParams()
  const [studentDetails, setStudentDetails] = useState<any>({})
  const [postLoading, setPostLoading] = useState<boolean>(true)

  const fetchStudentDetails = async () => {
    const res: any = await fetchDoc('internships', postId)
    setStudentDetails(res)
    setPostLoading(false)
  }

  useEffect(() => {
    if (postId) {
      fetchStudentDetails()
    }
  }, [postId])

  const data: DataItem[] = [
    {
      title: 'Post Date',
      value: studentDetails?.createdAt
        ? new Date(studentDetails.createdAt).toLocaleDateString()
        : 'N/A',
      icon: <TimeIcon />,
    },
    {
      title: 'Duration',
      value:
        studentDetails?.startDate && studentDetails?.endDate
          ? `${new Date(studentDetails.startDate).toLocaleDateString()} - ${new Date(studentDetails.endDate).toLocaleDateString()}`
          : 'N/A',
      icon: <CalenderIcon />,
    },
    {
      title: 'Location',
      value: studentDetails?.location || 'N/A',
      icon: <OutlineLocation />,
    },
    {
      title: 'Career Area',
      value: studentDetails?.company?.courseArea?.[0] || 'N/A',
      icon: <CareerIcon />,
    },
    {
      title: 'Total Applications',
      value: studentDetails?.applicants?.length ?? 0,
      icon: <PersonsIcon />,
    },
  ]

  const [loading, setLoading] = useState<boolean>(true)
  const [internshipPosts, setInternshipPosts] = useState<any[]>([])

  const fetchInternshipPosts = async () => {
    try {
      const res: any = await fetchDocs('internships')

      if (res?.docs) {
        setInternshipPosts(res.docs)
      } else {
        console.warn('No internship data found:', res)
      }
    } catch (error) {
      console.error('Error fetching internship posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInternshipPosts()
  }, [])

  return (
    <div>
      <nav className="w-full bg-[#FAFAFA99]">
        <NavBar fill="#0B7077" />
      </nav>
      <div className=" max-w-[866px] m-auto lg:mt-[58px] ">
        <button
          className="flex items-center gap-[6px] font-[400] text-[14px] p-[24px] lg:p-0"
          onClick={() => router.back()}
        >
          <ArrowIcon />
          Back
        </button>

        <div className="gap-5 lg:flex-row md:flex-row px-[10px] py-[6px]">
          <h3 className="font-[700] text-[14px] mb-[20px] px-4 lg:px-0">Invitation Details</h3>
          {postLoading ? (
            <Loader height="auto" background="transparent" />
          ) : (
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 px-4 lg:px-0">
              <div className="h-[217px] w-full sm:w-[310px] border relative overflow-hidden">
                <Image src={invitationImage} alt="image" layout="fill" objectFit="cover" />
              </div>

              <div className="max-w-full lg:max-w-[536px]">
                <h3 className="font-[700] text-[16px] mb-4">Description</h3>
                <p className="font-[400] text-[14px] text-[#48484A] mb-4">
                  {studentDetails.postDescription}
                </p>

                <div className="mt-6 flex items-center justify-start flex-wrap gap-6 ">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      className="text-[14px] font-[400] text-start w-full sm:w-[150px] mb-4"
                    >
                      {item.icon}
                      <p className="text-[#0B7077] my-2">{item.title}</p>
                      <p className="text-[#48484A]">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="font-[700] text-[16px] mb-4">Requirements</h3>
                  <div className="font-[400] text-[14px] text-[#48484A] flex flex-col gap-4 leading-[20px]">
                    <p>{studentDetails.jobDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-[20px] pb-[100px]">
            <h4 className="font-[700] text-[14px]">Application</h4>{' '}
            {loading ? (
              <Loader height="auto" background="transparent" />
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[14px] max-h-[500px] overflow-y-auto scrollbar-hide "
                style={{ scrollbarWidth: 'none' }}
              >
                {internshipPosts &&
                  internshipPosts.map((post) => (
                    <InvitationCard
                      key={post.id}
                      invitation={{
                        id: post.id,
                        title: post.company.name,
                        description: post.postDescription || post.description,
                        date: new Date(post.startDate).toLocaleDateString(),
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


// THIS CODE IS TO ENABLE CACHEING OF DATA  FOR 5 MINS ONCE IT LOADS, BUT AM HAVING VALIDATOR ERROR ON IT 

// 'use client'
// import { useParams, useRouter } from 'next/navigation'
// import { useQuery } from '@tanstack/react-query'
// import NavBar from '../../../common/nav-bar'
// import ArrowIcon from '../../../assets/icons/arrow'
// import Image from 'next/image'
// import invitationImage from '../../../assets/images/initation-image.png'
// import TimeIcon from '../../../assets/icons/time'
// import { ReactNode } from 'react'
// import CalenderIcon from '../../../assets/icons/calander'
// import OutlineLocation from '../../../assets/icons/outlineLocation'
// import CareerIcon from '../../../assets/icons/career'
// import PersonsIcon from '../../../assets/icons/persons'
// import InvitationCard from '../../../components/Cards/invitationCard'
// import fetchDocs from '@/services/fetchDocs'
// import Loader from '@/app/(frontend)/components/Layouts/Loader'
// import fetchDoc from '@/services/fetchDoc'

// export default function InvitiationDetails() {
//   interface Company {
//     id: string;
//     name: string;
//     cac: string;
//     courseAreas?: string[];
//     location?: { longitude: number; latitude: number };
//     phone: string;
//     hasSetPassword: boolean;
//     address: string;
//     description: string;
//     email: string;
//     createdAt: string;
//     updatedAt: string;
//     loginAttempts: number;
//   }
  
//   interface StudentDetails {
//     id: string;
//     company: Company;
//     postDescription: string;
//     jobDescription: string;
//     location: string;
//     startDate: string;
//     endDate: string;
//     status: string;
//     createdAt: string;
//     updatedAt: string;
//   }
  
//   interface ValidationErrors {
//     message: string;
//   }
  
//   const router = useRouter()
//   const { id: postId }: { id: string } = useParams()

//   const {
//     data: studentDetails,
//     isLoading: isStudentLoading,
//     isError: isStudentError,
//   } = useQuery<StudentDetails | ValidationErrors>({
//     queryKey: ['studentDetails', postId],
//     queryFn: () => fetchDoc('internships', postId),
//     staleTime: 1000 * 60 * 5,
//   })
  

//   // Fetch student details using React Query
//   // const {
//   //   data: studentDetails,
//   //   isLoading: isStudentLoading,
//   //   isError: isStudentError,
//   // } = useQuery({
//   //   queryKey: ['studentDetails', postId], // Unique key for caching
//   //   queryFn: () => fetchDoc('internships', postId),
//   //   staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
//   // })

//   // Fetch internship posts using React Query
//   const {
//     data: internshipPosts,
//     isLoading: isPostsLoading,
//     isError: isPostsError,
//   } = useQuery({
//     queryKey: ['internshipPosts'], // Unique key for caching
//     queryFn: () => fetchDocs('internships'),
//     staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
//   })

//   interface DataItem {
//     title: string
//     value: string
//     icon: ReactNode
//   }

//   const data: DataItem[] = [
//     {
//       title: 'Post Date',
//       value: studentDetails?.createdAt 
//         ? new Date(studentDetails.createdAt).toLocaleDateString()
//         : 'N/A',
//       icon: <TimeIcon />,
//     },
//     {
//       title: 'Duration',
//       value:
//         studentDetails?.startDate && studentDetails?.endDate
//           ? `${new Date(studentDetails.startDate).toLocaleDateString()} - ${new Date(studentDetails.endDate).toLocaleDateString()}`
//           : 'N/A',
//       icon: <CalenderIcon />,
//     },
//     {
//       title: 'Location',
//       value: studentDetails?.location || 'N/A',
//       icon: <OutlineLocation />,
//     },
//     {
//       title: 'Career Area',
//       value: studentDetails?.company?.courseArea?.[0] || 'N/A',
//       icon: <CareerIcon />,
//     },
//     {
//       title: 'Total Applications',
//       value: studentDetails?.applicants?.length ?? 0,
//       icon: <PersonsIcon />,
//     },
//   ]

//   return (
//     <div>
//       <nav className="w-full bg-[#FAFAFA99]">
//         <NavBar fill="#0B7077" />
//       </nav>
//       <div className=" max-w-[866px] m-auto lg:mt-[58px] ">
//         <button
//           className="flex items-center gap-[6px] font-[400] text-[14px] p-[24px] lg:p-0"
//           onClick={() => router.back()}
//         >
//           <ArrowIcon />
//           Back
//         </button>

//         <div className="gap-5 lg:flex-row md:flex-row px-[10px] py-[6px]">
//           <h3 className="font-[700] text-[14px] mb-[20px] px-4 lg:px-0">Invitation Details</h3>
//           {isStudentLoading ? (
//             <Loader height="auto" background="transparent" />
//           ) : (
//             <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 px-4 lg:px-0">
//               <div className="h-[217px] w-full sm:w-[310px] border relative overflow-hidden">
//                 <Image src={invitationImage} alt="image" layout="fill" objectFit="cover" />
//               </div>

//               <div className="max-w-full lg:max-w-[536px]">
//                 <h3 className="font-[700] text-[16px] mb-4">Description</h3>
//                 <p className="font-[400] text-[14px] text-[#48484A] mb-4">
//                   {studentDetails?.postDescription}
//                 </p>

//                 <div className="mt-6 flex items-center justify-start flex-wrap gap-6 ">
//                   {data.map((item, index) => (
//                     <div
//                       key={index}
//                       className="text-[14px] font-[400] text-start w-full sm:w-[150px] mb-4"
//                     >
//                       {item.icon}
//                       <p className="text-[#0B7077] my-2">{item.title}</p>
//                       <p className="text-[#48484A]">{item.value}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6">
//                   <h3 className="font-[700] text-[16px] mb-4">Requirements</h3>
//                   <div className="font-[400] text-[14px] text-[#48484A] flex flex-col gap-4 leading-[20px]">
//                     <p>{studentDetails?.jobDescription}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="mt-[20px] pb-[100px]">
//             <h4 className="font-[700] text-[14px]">Application</h4>
//             {isPostsLoading ? (
//               <Loader height="auto" background="transparent" />
//             ) : (
//               <div
//                 className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[14px] max-h-[500px] overflow-y-auto scrollbar-hide "
//                 style={{ scrollbarWidth: 'none' }}
//               >
//                 {internshipPosts &&
//                   internshipPosts.map((post) => (
//                     <InvitationCard
//                       key={post.id}
//                       invitation={{
//                         id: post.id,
//                         title: post.company.name,
//                         description: post.postDescription || post.description,
//                         date: new Date(post.startDate).toLocaleDateString(),
//                       }}
//                     />
//                   ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }