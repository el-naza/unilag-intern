import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-white">
      <div className="container max-w-xl flex m-auto">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
