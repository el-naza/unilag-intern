import { Jost, Palanquin } from 'next/font/google'
import { Schibsted_Grotesk } from 'next/font/google'
import Image from 'next/image'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jost',
})

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-schibstedGrotesk',
})

export default function InternType() {
  return (
    <div className={`${jost.className} px-[149px] py-16`}>
      <section className="border-[#486DE5] border-[2px] py-6 rounded-2xl">
        <p className="text-[#4172F0] text-[14.35px] font-medium border-[1px] border-[#E9E9E9] px-3 py-0.5 w-[100px] rounded-3xl text-center mx-auto">
          1st Year
        </p>
        <h1
          className={`${schibstedGrotesk.className} font-semibold text-center text-[40px] pt-6 text-[#292929]`}
        >
          You've selected the starter Plan
        </h1>
        <p className="text-[#525252]   font-medium text-xl text-center">
          Perfect for institutions with up to 200 students
        </p>
        <p
          className={`${schibstedGrotesk.className} font-bold text-center text-[36px] py-2 text-[#292929]`}
        >
          &#8358;100,000/year
        </p>
      </section>
      <section className="pt-8">
        <div className="grid grid-cols-[40%_60%] gap-8 items-start">
          <div className="text-[#525252] p-6 border-[1px] border-[#E9E9E9] rounded-xl">
            <h2 className="font-semibold text-[26px]">What's Included</h2>
            <p className="text-[22px]">Everything you get with the starter plan</p>
            <div className="pt-[16px] text-[18px] flex flex-col gap-[7.17px]">
              <div className="flex gap-[11px]">
                <Image src="/icons/check-icon.svg" alt="Check Icon" width={18} height={18} />
                <p className="font-normal ">Up to 200 students</p>
              </div>
              <div className="flex gap-[11px]">
                <Image src="/icons/check-icon.svg" alt="Check Icon" width={18} height={18} />
                <p>3 coordinators</p>
              </div>
              <div className="flex gap-[11px]">
                <Image src="/icons/check-icon.svg" alt="Check Icon" width={18} height={18} />
                <p>Certificate generator</p>
              </div>
              <div className="flex gap-[11px]">
                <Image src="/icons/check-icon.svg" alt="Check Icon" width={18} height={18} />
                <p>Basic analytics</p>
              </div>
              <div className="flex gap-[11px]">
                <Image src="/icons/check-icon.svg" alt="Check Icon" width={18} height={18} />
                <p>Email support</p>
              </div>
            </div>
          </div>
          <form className="text-[#525252] p-6 border-[1px] border-[#E9E9E9] rounded-xl">
            <h2 className="font-semibold text-[26px]">School Information</h2>
            <p className="pb-3 text-[22px]">Tell us about your institution</p>

            <div className="pb-4 flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#1E1E1E] text-[16px]">
                School Name
              </label>
              <input
                type="text"
                placeholder="University of Excellence"
                className="text-[16px] text-[#B3B3B3] py-3 px-4 border-[1px] border-[#E9E9E9] rounded-[8px]"
              />
            </div>
            <div className="pb-4 flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#1E1E1E] text-[16px]">
                School Email
              </label>
              <input
                type="text"
                placeholder="admin@university.edu"
                className="text-[16px] text-[#B3B3B3] py-3 px-4 border-[1px] border-[#E9E9E9] rounded-[8px]"
              />
            </div>
            <div className="pb-4 flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#1E1E1E] text-[16px]">
                Institution Type
              </label>
              <input
                type="text"
                placeholder="Select your school"
                className="text-[16px] text-[#B3B3B3] py-3 px-4 border-[1px] border-[#E9E9E9] rounded-[8px]"
              />
            </div>
            <div className="pb-4 flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#1E1E1E] text-[16px]">
                Coordinator's Full Name
              </label>
              <input
                type="text"
                placeholder="Dr. John Smith"
                className="text-[16px] text-[#B3B3B3] py-3 px-4 border-[1px] border-[#E9E9E9] rounded-[8px]"
              />
            </div>
            <div className="pb-4 flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#1E1E1E] text-[16px]">
                Coordinator's Email
              </label>
              <input
                type="text"
                placeholder="coordinator@university.edu"
                className="text-[16px] text-[#B3B3B3] py-3 px-4 border-[1px] border-[#E9E9E9] rounded-[8px]"
              />
            </div>
            <div className="pb-4 flex flex-col gap-2">
              <label htmlFor="" className="font-medium text-[#1E1E1E] text-[16px]">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+234 800 123 4567"
                className="text-[16px] text-[#B3B3B3] py-3 px-4 border-[1px] border-[#E9E9E9] rounded-[8px]"
              />
            </div>
            <div className="flex flex-col items-center py-6 border-[2px] border-[#D6D6D6] border-dashed rounded-[12px]">
              <Image src="/icons/upload-icon.svg" alt="upload" width={48} height={48} />
              <p className="text-[#7B7B7B] font-medium font-manrope text-[16px]">
                Click to upload or drag and drop
              </p>
              <p className="text-[#818080] font-manrope text-[14px]">PNG, JPG up to 2MB</p>
            </div>
          </form>
        </div>
        <div className="pt-8">
          <div className="py-[25.33px] px-6 border-[2px] border-[#E9E9E9CC] rounded-[16px]">
            <div className="flex justify-between items-center">
              <div className="pb-6">
                <div className="flex gap-2 pb-2 items-center">
                  <Image
                    src="/images/credit-card.png"
                    alt="Credit Card"
                    width={24}
                    height={16.43}
                  />
                  <h2 className={`text-2xl font-bold ${schibstedGrotesk.className}text-[#292929]`}>
                    &#8358;Total:100,000/year
                  </h2>
                </div>
                <p className="text-[#525252] text-[20px]">Billed annually . Cancel anytime</p>
              </div>
              <p className="text-[#4172F0] text-[14.35px] font-medium border-[1px] border-[#E9E9E9] px-3 py-0.5 w-[100px] rounded-3xl text-center ">
                1st Year
              </p>
            </div>
            <button className="bg-[#4172F0] justify-center rounded-[8px] flex text-white gap-2 py-[13px] w-full">
              <Image src="/icons/white-card.svg" alt="Credit Card" width={24} height={16.43} />
              <p>Continue to Payment</p>
            </button>
            <p className="text-center text-[#525252] text-[16px] pt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
