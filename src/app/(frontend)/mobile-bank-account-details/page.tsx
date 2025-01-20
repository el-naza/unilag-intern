import React from 'react'

export default async function Page() {
  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          <div>
            <div className="flex justify-between my-3">
              <div>
                <h5 className="text-black font-bold">Banking Info</h5>
              </div>
            </div>
            <div className="my-5">
              <h5 className="text-[#48484A]">Account Details</h5>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <img src="/gtb-large.png" alt="gtb-large" />
                    <div>
                      <h5 className="font-medium text-[#1A1A1A]">Precious Fredrick</h5>
                      <span className="text-[#8E8E93]">1234 5678 9012</span>
                    </div>
                  </div>
                </div>
                <span className="text-[#FF3B30] pointer">Remove</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
