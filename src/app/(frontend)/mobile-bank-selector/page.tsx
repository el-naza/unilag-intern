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
              <h5 className="font-oleo text-lg">Connect your Bank Account</h5>
              <p className="text-[#8E8E93] mb-3">
                Securely connect your bank account to receive payments seamlessly.
              </p>
            </div>

            <div className="mb-3">
              <h5 className="text-black font-medium mb-2">Select Bank</h5>
              <div className="grid gap-2">
                <div className="flex items-center gap-2 hover:bg-[#B3FAFF] rounded p-4 ps-2">
                  <img src="/gtb.png" alt="gtb" />
                  <span>GT Bank</span>
                </div>
                <div className="flex items-center gap-2 hover:bg-[#B3FAFF] rounded p-4 ps-2">
                  <img src="/access.png" alt="access" />
                  <span>Access Bank</span>
                </div>
              </div>
            </div>
            <div className="my-5">
              <div className="grid grid-cols-3">
                <button className="w-full rounded-lg p-3 bg-[#0B7077] text-white text-center">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
