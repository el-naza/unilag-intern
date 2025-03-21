import Image from 'next/image'
import { Check } from 'lucide-react'
import Link from 'next/link'

export default function SignUpSuccess() {
  return (
    <main className="min-h-screen relative">
      {/* Background image with overlay */}
      <div className="absolute inset-x-0 top-0 z-0 h-[80vh]">
        <div className="relative w-full h-full">
          <Image
            src="/images/waiting-bg-image.jpg"
            alt="Background"
            fill
            priority
            className="object-cover"
            quality={100}
            style={{
              filter: 'brightness(0.7)',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Hero text */}
        <div className="text-center text-white mb-8 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">GET ACCESS TO INTERNS</h1>
          <h2 className="text-sm md:text-base font-normal mt-3">
            Simplifying Internship Hiring for Growing Businesses
          </h2>
        </div>

        {/* Waitlist form card */}
        <div className="bg-gradient-to-b from-gray-100 from-50% lg:from-70% flex justify-center pb-10 md:pb-32 rounded-t-3xl w-full ">
          <div className="bg-gradient-to-b from-gray-100 from-50% lg:from-70% rounded-xl w-full max-w-3xl">
            <div className="container max-w-2xl min-h-[80vh] flex items-center justify-center mb-10">
              <div className="text-center space-y-6">
                {/* Success Icon */}
                <Image
                  src="/icons/succesIcon.svg"
                  alt="envelop Icon"
                  width={35}
                  height={35}
                  className="object-contain"
                />

                {/* Success Message */}
                <div className="space-y-4 text-left">
                  <h1 className="text-3xl font-bold text-green-500">Successful</h1>
                  <div className="flex gap-2">
                    <p className="text-[15px] text-gray-600">You're on the List!</p>
                    <Image
                      src="/icons/hurray.png"
                      alt="envelop Icon"
                      width={22}
                      height={22}
                      className="object-contain mb-2"
                    />
                  </div>
                  <p className="text-gray-600 text-[15px]">
                    {`Thank you for joining the waitlist. We’re excited to have you on board and will keep you updated on the rollout date of our product. Stay tuned for exclusive updates and next steps!`}
                  </p>
                </div>

                {/* Help Text */}
                <p className="text-left text-gray-600 text-[15px]">
                  Need help? Contact us at{' '}
                  <Link href="#" className="text-blue-500 hover:text-blue-600 hover:underline">
                    Koonage@help.com
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
