import Image from 'next/image'
import BellIcon from '../assets/icons/bell'
import schoolLogo from '../assets/images/school-logo.png'
import companyLogo from '../assets/images/company-logo.png'
export default function NavBar() {
  const navLinks = [
    { id: '1', title: 'All Interns' },
    { id: '2', title: 'Invitations' },
    { id: '3', title: 'All Reports' },
  ]
  return (
    <div className="flex items-center justify-between px-[100px] py-[24px] w-full">
      <div>
        <Image src={schoolLogo} alt="image" width={44} height={44} objectFit={'contain'} />
      </div>

      <div>
        <ul className="flex items-center gap-[44px] font-[400] text-[14px]">
          {navLinks && navLinks.map((n) => <li key={n.id}>{n.title}</li>)}
        </ul>
      </div>

      <div className="flex items-center gap-[54px]">
        <BellIcon />
        <div className="flex items-center gap-3">
          <Image
            src={companyLogo}
            alt="image"
            width={44}
            height={44}
            objectFit={'contain'}
            className="rounded-full"
          />
          <div>
            <p className="font-[700] text-[14px] mb-[4px]">CRM SHOPPING MALL</p>
            <p className="font-[400] text-[12px] ">CRMSHOPPING@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
