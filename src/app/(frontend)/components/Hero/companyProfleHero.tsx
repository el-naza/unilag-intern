import ChatIcon from '../../assets/icons/chat'
import HumburgerIcon from '../../assets/icons/humburger'
import MainButton from '../Ui/button'
import hero from '../../assets/images/company-profile-hero.png'

export default function CompanyProfileHero() {
  return (
    <div
      style={{
        backgroundImage: `url(${hero.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '525px',
      }}
      className="px-4 md:px-[32px] lg:px-[68px]"
    >
      <div className="md:pt-[50px] pt-4 lg:pt-[113px] flex items-end justify-end">
        <button className="bg-[#0B7077] h-[52px] w-[59px] rounded-[9px] flex items-center justify-center">
          <HumburgerIcon />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between md:mt-[40px] lg:mt-[79px] gap-6">
        <div className="flex items-center gap-4 flex-col md:flex-row w-[100%]">
          <div className="h-[120px] w-[120px] md:h-[200px] md:w-[200px] lg:h-[269px] lg:w-[263px] rounded-full bg-[#0B7077] flex items-center justify-center"></div>

          <div>
            <p className="font-[700] text-[24px] md:text-[35px] lg:text-[45px] text-[#E6E8F4]">
              Orange Company
            </p>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap md:flex-wrap items-center gap-4 md:gap-[30px] lg:gap-[55px]">
          <button className="p-4 bg-[#185F7E6B] flex items-center justify-center rounded-full">
            <ChatIcon />
          </button>
          <MainButton
            title="New Application"
            fontSize="text-[14px] md:text-[16px]"
            fontWeight="font-[600]"
            width="w-full md:w-[content-fit]"
            padding="pt-[2px] px-[22px]"
          />
          <MainButton
            title="Schedule Interviews"
            fontSize="text-[14px] md:text-[16px]"
            fontWeight="font-[600]"
            width="w-full md:w-[content-fit]"
            padding="pt-[2px] px-[22px]"
          />
        </div>
      </div>
    </div>
  )
}
