import ChevronIcon from '../../assets/icons/chevron'
import CompanyProfileHero from '../../components/Hero/companyProfleHero'
import MainButton from '../../components/Ui/button'
import Calendar from '../../components/Ui/calendar'
import studentPhoto from '.././../assets/images/happy-smile.svg'
import Image from 'next/image'

export default function Schedule() {
  return (
    <div>
      <CompanyProfileHero />
      <div className="w-full max-w-[1600px] mx-auto mt-[40px] md:mt-[80px] px-4 lg:px-[50px] flex flex-col lg:flex-row items-start justify-between gap-10">
        <div className="w-full lg:w-[45%] text-black">
          <h3 className="font-[700] text-[28px] md:text-[35px] lg:text-[45px] mb-[20px] lg:mb-[51px] text-center">
            Schedule students
          </h3>
          <div className="flex items-center gap-[10px] md:gap-[23px] justify-center">
            <button className="h-[70px] md:h-[100px] w-[70px] md:w-[126px] rounded-[11px] bg-[#F4EBEF] flex items-center justify-center">
              <ChevronIcon />
            </button>
            <div className="flex items-center justify-center">
              <figure className="h-[200px] md:h-[300px] lg:h-[400px] w-[200px] md:w-[300px] lg:w-[400px] rounded-[360px] border">
                <Image
                  src={studentPhoto}
                  alt="Student"
                  layout="responsive"
                  width={400}
                  height={400}
                  className="object-cover rounded"
                />
              </figure>
            </div>
            <button className="rotate-180 h-[70px] md:h-[100px] w-[70px] md:w-[126px] rounded-[11px] bg-[#F4EBEF] flex items-center justify-center">
              <ChevronIcon />
            </button>
          </div>
          <div className="flex items-center justify-center flex-col gap-[8px] mt-3 text-center">
            <h3 className="font-[700] text-[24px] md:text-[30px] lg:text-[40px] capitalize">
              Oni Adedolapo
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4 font-[700] text-[12px] md:text-[14px]">
              <p>Unilag</p>
              <p>Engineering</p>
            </div>
            <p className="font-[700] text-[12px] md:text-[14px]">
              06, AJOSE ADEOGUN MARY LAGOS STATE
            </p>
            <div className="mt-[20px] lg:mt-[51px]">
              <MainButton
                title="Resend Invite"
                fontSize="text-[14px] md:text-[16px]"
                fontWeight="font-[600]"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[45%] border border-[#DED8D8] rounded-[13px] p-[20px] md:p-[30px] lg:p-[42px] flex items-center flex-col h-auto lg:h-[1053px]">
          <h4 className="font-[700] text-[16px] md:text-[20px] mb-[30px] md:mb-[50px] lg:mb-[76px] text-center text-black">
            Dates with scheduled Interviews
          </h4>
          <div className="w-full flex items-center justify-center">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  )
}
