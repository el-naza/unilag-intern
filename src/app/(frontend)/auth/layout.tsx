import React from 'react'
import Image from 'next/image'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Image
        src={'/images/student-image.jpeg'}
        alt="image"
        width={565}
        height={954}
        // objectFit={'contain'}
        className="fixed h-[calc(100vh_+_76px)] w-[calc(100vw_+_163px)] -z-10 object-cover"
      />
      <div className="fixed h-screen w-screen -z-10 bg-[#14141499]" />
      {children}
    </>
  )
}
