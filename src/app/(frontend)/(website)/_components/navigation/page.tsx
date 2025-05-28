import Image from 'next/image'
import { Jost } from 'next/font/google'

const jost = Jost({
  subsets: ['latin'],
  weight: ['500'], // Choose the weights you need
  variable: '--font-jost',
})

export default function Navigation() {
  return (
    <div
      className={`mx-[149px] mt-[12px] flex justify-between bg-[#DCE7FD] ${jost.className} rounded-[12px] py-6 px-16 items-center`}
    >
      <div className="flex gap-x-20">
        <a href="/">
          <Image
            src="/images/logo.png"
            alt="Logo of Intrn"
            width={72}
            height={20}
            className="w-18 h-5"
          />
        </a>
        <ul className="text-base flex gap-x-8">
          <li>
            <a href="/schoolPortals">School Portals</a>
          </li>
          <li>
            <a href="/companies">Companies</a>
          </li>
          <li>
            <a href="/aboutUs">About Us</a>
          </li>
        </ul>
      </div>

      <div>
        <button className="bg-[#1E2763] py-2 px-5 rounded-[100px] text-white">Sign Up</button>
      </div>
    </div>
  )
}
