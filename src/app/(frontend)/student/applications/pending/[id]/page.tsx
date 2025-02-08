import RedCancelIcon from '@/app/(frontend)/assets/icons/redcancel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Page() {
  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          <div>
            <div className="flex justify-between my-3">
              <div>
                <h5 className="text-black font-bold">Application</h5>
              </div>
              <div>
                <Link href="/student/applications/pending/1/edit">
                  <span className="text-[#0B7077]">Edit</span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-8 mb-3 gap-2">
              <div className="flex items-center">
                <Image width={40} height={40} src="/cmr-logo.png" alt="cmr-logo" />
              </div>
              <div className="col-span-7">
                <h5 className="text-black font-bold">CRM SHOPPING MALL</h5>
                <span className="text-[#8E8E93] text-xs">163889584994</span>
              </div>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-bold mb-3">Application letter</h5>
              <p className="text-[#8E8E93] mb-3">
                Dear [Hiring Manager’s Name],
                <br />
                <br />
                I am writing to express my interest in the SIWES placement opportunity at CMR
                Shopping Mall. I am currently a [your course] student at [your institution], and I
                believe this role aligns perfectly with my academic background and career
                aspirations.
                <br />
                <br />
                Enclosed are my CV and the required documents, including my SIWES approval letter
                from my institution. I am eager to contribute my skills and gain valuable experience
                in retail operations and customer service during my placement.
                <br />
                <br />
                Thank you for considering my application. I look forward to the opportunity to
                discuss how I can contribute to your team.
                <br />
                <br />
                Best regards, [Your Full Name] [Your Contact Information]
              </p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-bold mb-2">Attachments</h5>
              <div className="w-full p-4 rounded-lg border border-[#F1F1F1] rounded mb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_212_14570)">
                        <path
                          d="M19.1096 1.7832H8.09961V6.34894H21.461V4.13373C21.461 2.83752 20.4061 1.7832 19.1096 1.7832Z"
                          fill="#CED9F9"
                        />
                        <path
                          d="M12.8773 7.05157H0V2.81506C0 1.2627 1.26324 0 2.81616 0H6.93347C7.34271 0 7.73694 0.0862427 8.09509 0.248291C8.59534 0.473694 9.02509 0.845215 9.32648 1.33063L12.8773 7.05157Z"
                          fill="#1640C1"
                        />
                        <path
                          d="M24 8V21.6465C24 22.9443 22.9435 23.9999 21.6451 23.9999H2.35492C1.05652 23.9999 0 22.9443 0 21.6465V5.646H21.6451C22.9435 5.646 24 6.70197 24 8Z"
                          fill="#2354E6"
                        />
                        <path
                          d="M24 8V21.6465C24 22.9443 22.9435 23.9999 21.6451 23.9999H12V5.646H21.6451C22.9435 5.646 24 6.70197 24 8Z"
                          fill="#1849D6"
                        />
                        <path
                          d="M18.3127 14.8229C18.3127 18.3043 15.4807 21.1365 11.9996 21.1365C8.51862 21.1365 5.68652 18.3043 5.68652 14.8229C5.68652 11.342 8.51862 8.50977 11.9996 8.50977C15.4807 8.50977 18.3127 11.342 18.3127 14.8229Z"
                          fill="#E7ECFC"
                        />
                        <path
                          d="M18.3131 14.8229C18.3131 18.3043 15.481 21.1365 12 21.1365V8.50977C15.481 8.50977 18.3131 11.342 18.3131 14.8229Z"
                          fill="#CED9F9"
                        />
                        <path
                          d="M14.0344 14.9C13.9028 15.0115 13.7415 15.0659 13.5816 15.0659C13.3815 15.0659 13.1826 14.9811 13.0435 14.8159L12.7027 14.412V17.0566C12.7027 17.4448 12.3878 17.7597 11.9996 17.7597C11.6114 17.7597 11.2964 17.4448 11.2964 17.0566V14.412L10.9557 14.8159C10.7048 15.1127 10.2615 15.1506 9.96472 14.9C9.66809 14.6497 9.63 14.2062 9.88031 13.9094L11.2721 12.2594C11.4535 12.0448 11.7183 11.9214 11.9996 11.9214C12.2808 11.9214 12.5456 12.0448 12.727 12.2594L14.1188 13.9094C14.3691 14.2062 14.3311 14.6497 14.0344 14.9Z"
                          fill="#6C8DEF"
                        />
                        <path
                          d="M14.0349 14.9C13.9032 15.0115 13.7419 15.0659 13.582 15.0659C13.3819 15.0659 13.183 14.9811 13.0439 14.8159L12.7031 14.412V17.0566C12.7031 17.4448 12.3882 17.7597 12 17.7597V11.9214C12.2813 11.9214 12.546 12.0448 12.7275 12.2594L14.1193 13.9094C14.3696 14.2062 14.3315 14.6497 14.0349 14.9Z"
                          fill="#3B67E9"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_212_14570">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="ms-2">Uploaded File Title</span>
                    <span className="text-[#8E8E93] ms-2">2.4mb</span>
                  </div>
                  <div className="flex items-center">
                    <RedCancelIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
