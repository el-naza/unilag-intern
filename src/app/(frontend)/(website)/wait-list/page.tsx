import WaitlistForm from '@/components/ui/waitlist-form'
import Image from 'next/image'

export default function Home() {
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
          <h1 className="text-3xl md:text-4xl font-medium leading-tight">
            Empowering students to discover opportunities, gain mentorship, and shape their future.
          </h1>
        </div>

        {/* Waitlist form card */}
        <div className="bg-gray-100 flex justify-center p-6 md:p-10 rounded-t-3xl w-full ">
          <div className="bg-gray-100 rounded-xl p-6 md:p-10 w-full max-w-md">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </main>
  )
}
