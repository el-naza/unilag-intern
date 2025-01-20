import React from 'react'

export default async function Page() {
  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          <div>
            <div className="flex justify-between my-3">
              <div>
                <h5 className="text-black font-bold">Profile</h5>
              </div>
              <div>
                <span className="text-[#0B7077]">Banking Info</span>
              </div>
            </div>
            <div className="my-5">
              <div className="flex items-center">
                <div className="mx-auto">
                  <img className="mx-auto" src="/profile-picture.png" alt="profile-picture" />
                  <span className="font-oleo text-lg">Oni Adedolapo Ireti</span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <h5 className="text-black font-medium">Matriculation Number</h5>
              <p className="text-[#8E8E93] mb-3">1234567890</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Email</h5>
              <p className="text-[#8E8E93] mb-3">Oniadedolapo@gmail.com</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Date of Birth</h5>
              <p className="text-[#8E8E93] mb-3">04/04/2007</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Nationality</h5>
              <p className="text-[#8E8E93] mb-3">Nigerian</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">State of Origin</h5>
              <p className="text-[#8E8E93] mb-3">Lagos</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Gender</h5>
              <p className="text-[#8E8E93] mb-3">Male</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Course of Study</h5>
              <p className="text-[#8E8E93] mb-3">Mathematics</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Home Address</h5>
              <p className="text-[#8E8E93] mb-3">12 Opebi Road, Ikeja, Lagos,</p>
            </div>
            <div className="mb-3">
              <h5 className="text-black font-medium">Upload SIWES form here</h5>
              <div className="mb-3">
                <div className="w-full p-4 border-dashed border-2 border-[#195F7E] rounded mb-2">
                  <div className="text-center">
                    <div className="flex">
                      <svg
                        className="mx-auto mb-3"
                        width="42"
                        height="43"
                        viewBox="0 0 42 43"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_974_9650)">
                          <path
                            d="M33.4412 3.76709H14.1738V11.7571H37.5563V7.88051C37.5563 5.61215 35.7102 3.76709 33.4412 3.76709Z"
                            fill="#CED9F9"
                          />
                          <path
                            d="M22.5352 12.9867H0V5.57285C0 2.8562 2.21068 0.646484 4.92828 0.646484H12.1336C12.8497 0.646484 13.5396 0.797409 14.1664 1.08099C15.0418 1.47545 15.7939 2.12561 16.3213 2.97508L22.5352 12.9867Z"
                            fill="#1640C1"
                          />
                          <path
                            d="M42 14.6464V38.5277C42 40.799 40.1511 42.6463 37.8789 42.6463H4.12111C1.84891 42.6463 0 40.799 0 38.5277V10.5269H37.8789C40.1511 10.5269 42 12.3748 42 14.6464Z"
                            fill="#2354E6"
                          />
                          <path
                            d="M42 14.6464V38.5277C42 40.799 40.1511 42.6463 37.8789 42.6463H21V10.5269H37.8789C40.1511 10.5269 42 12.3748 42 14.6464Z"
                            fill="#1849D6"
                          />
                          <path
                            d="M32.0471 26.5865C32.0471 32.6789 27.0909 37.6354 20.9991 37.6354C14.9073 37.6354 9.95117 32.6789 9.95117 26.5865C9.95117 20.4951 14.9073 15.5386 20.9991 15.5386C27.0909 15.5386 32.0471 20.4951 32.0471 26.5865Z"
                            fill="#E7ECFC"
                          />
                          <path
                            d="M32.0479 26.5865C32.0479 32.6789 27.0918 37.6354 21 37.6354V15.5386C27.0918 15.5386 32.0479 20.4951 32.0479 26.5865Z"
                            fill="#CED9F9"
                          />
                          <path
                            d="M24.5612 26.7218C24.3308 26.9169 24.0485 27.0121 23.7688 27.0121C23.4185 27.0121 23.0705 26.8637 22.827 26.5747L22.2307 25.8678V30.4959C22.2307 31.1752 21.6795 31.7263 21.0002 31.7263C20.3209 31.7263 19.7698 31.1752 19.7698 30.4959V25.8678L19.1734 26.5747C18.7344 27.0941 17.9587 27.1605 17.4392 26.7218C16.9201 26.2838 16.8535 25.5077 17.2915 24.9882L19.7271 22.1008C20.0447 21.7253 20.508 21.5093 21.0002 21.5093C21.4924 21.5093 21.9558 21.7253 22.2733 22.1008L24.7089 24.9882C25.147 25.5077 25.0803 26.2838 24.5612 26.7218Z"
                            fill="#6C8DEF"
                          />
                          <path
                            d="M24.561 26.7218C24.3306 26.9169 24.0483 27.0121 23.7686 27.0121C23.4183 27.0121 23.0703 26.8637 22.8268 26.5747L22.2305 25.8678V30.4959C22.2305 31.1752 21.6793 31.7263 21 31.7263V21.5093C21.4922 21.5093 21.9555 21.7253 22.2731 22.1008L24.7087 24.9882C25.1467 25.5077 25.0801 26.2838 24.561 26.7218Z"
                            fill="#3B67E9"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_974_9650">
                            <rect
                              width="42"
                              height="42"
                              fill="white"
                              transform="translate(0 0.646484)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="mb-2">Drag your file(s) to start uploading</div>
                    <div className="text-[#8E8E93] mb-2">OR</div>
                    <div>
                      <button className="p-2 bg-white text-[#195F7E] border border-[#195F7E] font-bold rounded-md">
                        Browse files
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-[#8E8E93] text-xs">
                  Only support .jpg, .png and .svg and zip files (2mb below)
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="p-4 rounded bg-[#B3FAFF]">
                <div className="grid grid-cols-6 mb-3">
                  <img src="/bitmoji.png" alt="bitmoji" />
                  <div className="col-span-5">
                    <h5 className="text-[#0B7077] font-bold">You’re out of points?</h5>
                    <span className="text-[#48484A] font-medium">
                      Unlock more now and keep your opportunities flowing!
                    </span>
                  </div>
                </div>
                <button className="w-full rounded-lg p-3 bg-[#0B7077] text-white text-center">
                  Purchase Points
                </button>
              </div>
            </div>

            <div className="font-bold text-center mb-3">
              Powered by <span className="text-[#0B7077]">Koonage Infotech</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
