import Image from 'next/image'
import backgroundImage from '../assets/images/compoany-auth-bg.png'
import womanOnRed from '../assets/images/woman-on-red.png'
import StarIcon from '../assets/icons/start'
export default function CompanyAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[100vh] w-full flex items-center">
      <div className="w-[50%] border relative">
        <Image
          src={backgroundImage}
          alt="image"
          width={0}
          height={0}
          // objectFit={'contain'}
          className=" h-[calc(100vh)] w-[calc(100vw)]"
        />
        <div className="bg-[#0B7077] h-[238px] absolute z-10 bottom-0 py-[49px] px-[14px] flex items-start justify-between w-full">
          <div>
            <h2 className="text-[#FFFFFF] font-[700] text-[30px] leaing-[40px] max-w-[454px]">
              Why You should buy gift cards ?
            </h2>
            <div className="mt-[28px] flex items-center gap-1">
              <StarIcon />
              <p className="font-[400] text-[12px] leading-[16px] text-[#FFFFFF] max-w-[456px]">
                Teachers don’t get lost in the grid view and have a dedicated Podium space.
              </p>
            </div>
          </div>
          <div>
            {' '}
            <Image src={womanOnRed} alt="image" width={180} height={180} objectFit={'contain'} />
          </div>
        </div>
      </div>
      <div
        className="min-h-screen flex items-center justify-center w-[50%]"
        style={{
          background: `linear-gradient(to bottom, rgba(64, 138, 126, 0.12), white, rgba(64, 138, 126, 0.12))`,
        }}
      >
        <div className="max-w-[420px] px-[20px]">{children}</div>
      </div>
    </div>
  )
}
