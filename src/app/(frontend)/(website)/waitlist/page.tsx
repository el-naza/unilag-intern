import WaitlistForm from '@/components/ui/waitlist-form'
import Image from 'next/image'

export default function WaitList() {
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
        <div className="bg-gradient-to-b from-gray-100 from-50% flex justify-center pt-5 md:pt-10 pb-10 md:pb-32 rounded-t-3xl w-full ">
          <div className="bg-gradient-to-b from-gray-100 from-50% rounded-xl p-6 md:p-10 w-full max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </main>
  )
}
