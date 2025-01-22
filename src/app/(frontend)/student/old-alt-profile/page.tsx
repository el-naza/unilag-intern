import { Slider } from '@/components/ui/slider'
import React from 'react';

export default async function Page() {
  return (
    <div className="bg-[#0B7077] min-h-screen relative text-white">
      <svg className="absolute top-[-50px] right-0 z-0" width="493" height="871" viewBox="0 0 493 871" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1001.28 270.483C1119.84 306.082 1250.4 337.224 1317.34 389.214C1396.18 450.45 1439.21 519.499 1383.99 567.737C1326.98 617.534 1181.12 631.598 1035.41 635.467C886.587 639.418 726.58 628.472 573.876 589.244C402.245 545.154 213.289 485.371 161.724 411.026C111.487 338.598 240.109 292.511 337.137 247.928C414.216 212.512 511.719 183.376 647.165 187.976C770.257 192.156 884.902 235.536 1001.28 270.483Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1097.69 267.372C1250.83 314.409 1312.19 392.925 1353.56 462.119C1389.59 522.376 1372.18 577.34 1308.97 620.762C1247.66 662.875 1153.09 698.594 1015.6 694.283C887.187 690.258 779.422 631.378 652.282 600.175C483.923 558.856 257.528 555.364 163.165 485.078C66.5764 413.134 152.118 343.818 242.189 294.718C323.208 250.551 469.934 241.297 619.109 236.528C774.449 231.563 944.324 220.266 1097.69 267.372Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1115.98 285.7C1270.35 318.118 1414.24 386.494 1446.67 451.153C1477.29 512.207 1334.22 537.338 1263.22 579.291C1201.89 615.535 1176.96 665.941 1065.46 676.404C938.66 688.304 773.957 681.439 645.675 637.246C521.57 594.492 524.925 528.251 466.733 470.141C401.494 404.994 215.116 326.796 289.615 281.691C365.002 236.05 589.677 302.515 742.38 303.256C877.715 303.912 976.671 256.446 1115.98 285.7Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1049.9 263.23C1192.61 302.934 1281.13 372.337 1317.54 435.158C1350.17 491.467 1272.19 529.054 1230.37 574.62C1179.26 630.323 1201.49 718.412 1050.22 726.476C898.058 734.587 741.516 655.487 587.641 608.881C432.136 561.78 220.744 527.805 162.61 457.628C104.647 387.656 237.137 342.643 331.679 299.892C406.363 266.121 511.911 250.982 633.3 244.786C767.427 237.939 911.557 224.739 1049.9 263.23Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1008.25 278.88C1112.52 316.882 1244.51 342.433 1302.67 391.803C1367.29 446.663 1355.12 499.565 1324.03 546.953C1283.42 608.841 1256.38 683.983 1102.23 697.28C937.943 711.452 729.451 667.594 561.494 612.733C400.446 560.129 277.002 486.767 230.407 412.514C187.717 344.484 257.881 291.862 329.457 242.967C398.16 196.034 467.899 135.964 623.211 144.181C773.151 152.114 876.962 231.033 1008.25 278.88Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M969.81 301.009C1118.68 343.931 1346.6 365.031 1391.3 431.237C1436.49 498.162 1219.93 508.22 1140 553.047C1074.72 589.659 1095.72 662.468 972.922 665.875C849.866 669.288 735.731 603.309 612.719 567.674C481.293 529.601 295.743 511.649 239.153 453.311C182.307 394.709 315.502 362.18 370.395 317.865C427.814 271.511 424.398 196.165 562.493 192.282C700.961 188.388 831.174 261.039 969.81 301.009Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1000.78 285.548C1107.61 320.801 1177.08 367.113 1235.22 415.722C1307.16 475.869 1400.5 539.99 1367.61 592.244C1329.76 652.375 1220.66 704.699 1055.92 700.579C896.836 696.601 759.958 622.835 614.607 573.413C486.273 529.777 337.909 493.157 271.397 433.828C198.691 368.974 178.501 296.903 254.512 252.209C327.209 209.463 489.037 211.865 637.598 218.502C761.645 224.043 887.572 248.187 1000.78 285.548Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M996.746 276.668C1121.82 315.892 1183.16 376.121 1233.61 433.008C1284.65 490.56 1322.87 549.397 1279.7 595.724C1231.9 647.025 1142.57 696.88 992.479 691.804C848.209 686.925 724.448 620.81 599.948 572.735C503.219 535.383 417.146 496.639 364.959 449.489C305.351 395.634 246.064 336.308 291.072 293.672C338.109 249.113 465.908 235.529 594.082 232.44C724 229.31 870.134 236.961 996.746 276.668Z" stroke="white"/>
      </svg>
      <div className="container">
        <nav className="relative grid grid-cols-5 gap-2 py-4 z-10">
          <div className="flex items-center">
            <img src="/unilag-logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          </div>
          <div className="flex items-center">
            <span className="font-oleo text-white text-3xl">Welcome Oni</span>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="relative w-3/4">
              <input
                type="text"
                placeholder="Search For Company"
                className="w-full outline-none text-black px-4 py-3 rounded-xl border border-black placeholder:text-black text-sm"
              />
              <svg className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_8_20342)">
                  <path d="M24.5417 18.0833H23.2908L22.8475 17.7346C24.3992 16.2621 25.3333 14.3504 25.3333 12.2708C25.3333 7.63375 20.7258 3.875 15.0417 3.875C9.3575 3.875 4.75 7.63375 4.75 12.2708C4.75 16.9079 9.3575 20.6667 15.0417 20.6667C17.5908 20.6667 19.9342 19.9046 21.7392 18.6388L22.1667 19.0004V20.0208L30.0833 26.4662L32.4425 24.5417L24.5417 18.0833ZM15.0417 18.0833C11.0992 18.0833 7.91667 15.4871 7.91667 12.2708C7.91667 9.05458 11.0992 6.45833 15.0417 6.45833C18.9842 6.45833 22.1667 9.05458 22.1667 12.2708C22.1667 15.4871 18.9842 18.0833 15.0417 18.0833Z" fill="#1E1E1E"/>
                </g>
                <defs>
                  <clipPath id="clip0_8_20342">
                    <rect width="38" height="31" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="flex items-center">
              <div className="cursor-pointer hover:bg-black p-2 rounded">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_8_20210)">
                    <path d="M9.91631 8.49935H24.083L16.9855 17.4243L9.91631 8.49935ZM6.02048 7.94685C8.88214 11.616 14.1663 18.416 14.1663 18.416V26.916C14.1663 27.6952 14.8038 28.3327 15.583 28.3327H18.4163C19.1955 28.3327 19.833 27.6952 19.833 26.916V18.416C19.833 18.416 25.103 11.616 27.9646 7.94685C28.6871 7.01185 28.0213 5.66602 26.8455 5.66602H7.13964C5.96381 5.66602 5.29798 7.01185 6.02048 7.94685Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_8_20210">
                      <rect width="34" height="34" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex items-center">
              <div className="cursor-pointer hover:bg-black p-2 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.7295 21C13.5537 21.3031 13.3014 21.5547 12.9978 21.7295C12.6941 21.9044 12.3499 21.9965 11.9995 21.9965C11.6492 21.9965 11.3049 21.9044 11.0013 21.7295C10.6977 21.5547 10.4453 21.3031 10.2695 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex items-center">
              <div className="cursor-pointer hover:bg-black p-2 rounded">
                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_8_20229)">
                    <path d="M4.625 27.75H32.375V24.6667H4.625V27.75ZM4.625 20.0417H32.375V16.9583H4.625V20.0417ZM4.625 9.25V12.3333H32.375V9.25H4.625Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_8_20229">
                      <rect width="37" height="37" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </nav>
        <main className="py-4">
          <div className="grid sm:grid-cols-6 mb-4">
            <div className="sm:col-span-5 bg-[#00000030] rounded-tl-[200px] rounded-br-[200px] p-10">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <img src="/smiling-girl.png" alt="smiling girl" />
                </div>
                <div className="flex items-center">
                <div className="grid grid-rows-3 gap-4">
                  <div className="grid grid-cols-3">
                    <div>
                      <span className="font-bold">Name:</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-3xl font-bold">I'm <span className="text-[#2157F2]">Alireza</span></span>
                      <span className="ms-4 text-[#FFE75C]">23</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                  <div>
                      <span className="font-bold">School:</span>
                    </div>
                    <div className="col-span-2">
                      <span className="">unilag</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div>
                      <span className="font-bold">Level:</span>
                    </div>
                    <div className="col-span-2">
                      <span className="">300level</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div>
                      <span className="font-bold">Bank:</span>
                    </div>
                    <div className="col-span-2">
                      <span className="">FCMB 00883888939</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3">
                    <div>
                      <span className="font-bold">Address:</span>
                    </div>
                    <div className="col-span-2">
                      <span className="">06, Ajose Adeogun Maryland Lagos State</span>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
