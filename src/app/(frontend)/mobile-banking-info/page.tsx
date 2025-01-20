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

            <div className="grid grid-cols-2 gap-4 mb-16">
              <div className="col-span-2">
                <h5 className="text-black mb-2">Bank Account Number</h5>
                <input
                  className="w-full placeholder:text-[#ECECEC] p-2 border border-[#FAFAFA] rounded mb-2"
                  placeholder="0000 0000 0000"
                />
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
