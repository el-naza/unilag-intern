import { Slider } from '@/components/ui/slider'
import React from 'react';

export default async function Page() {
  return (
    <div className="bg-[#195F7E] min-h-screen relative text-white">
      <svg className="absolute top-[-50px] right-0 z-0" width="355" height="835" viewBox="0 0 355 835" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M1001.28 234.483C1119.84 270.082 1250.4 301.224 1317.34 353.214C1396.18 414.45 1439.22 483.499 1383.99 531.737C1326.98 581.534 1181.13 595.598 1035.41 599.467C886.588 603.418 726.581 592.472 573.877 553.244C402.246 509.154 213.29 449.371 161.725 375.026C111.488 302.598 240.11 256.511 337.138 211.928C414.217 176.512 511.72 147.376 647.166 151.976C770.258 156.156 884.903 199.536 1001.28 234.483Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1097.69 231.372C1250.83 278.409 1312.19 356.925 1353.56 426.119C1389.59 486.376 1372.18 541.34 1308.97 584.762C1247.67 626.875 1153.09 662.594 1015.6 658.283C887.188 654.258 779.422 595.378 652.283 564.175C483.924 522.856 257.529 519.364 163.166 449.078C66.5774 377.134 152.119 307.818 242.19 258.718C323.209 214.551 469.935 205.297 619.11 200.528C774.45 195.563 944.325 184.266 1097.69 231.372Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1115.98 249.7C1270.35 282.118 1414.24 350.494 1446.67 415.153C1477.29 476.207 1334.22 501.338 1263.22 543.291C1201.89 579.535 1176.96 629.941 1065.46 640.404C938.661 652.304 773.958 645.439 645.676 601.246C521.571 558.492 524.926 492.251 466.734 434.141C401.495 368.994 215.117 290.796 289.616 245.691C365.003 200.05 589.678 266.515 742.381 267.256C877.716 267.912 976.672 220.446 1115.98 249.7Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1049.9 227.23C1192.61 266.934 1281.13 336.337 1317.54 399.158C1350.18 455.467 1272.19 493.054 1230.38 538.62C1179.26 594.323 1201.49 682.412 1050.22 690.476C898.059 698.587 741.517 619.487 587.642 572.881C432.137 525.78 220.745 491.805 162.611 421.628C104.648 351.656 237.138 306.643 331.68 263.892C406.364 230.121 511.912 214.982 633.301 208.786C767.428 201.939 911.558 188.739 1049.9 227.23Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1008.25 242.88C1112.53 280.882 1244.51 306.433 1302.67 355.803C1367.29 410.663 1355.13 463.565 1324.03 510.953C1283.43 572.841 1256.38 647.983 1102.23 661.28C937.944 675.452 729.452 631.594 561.495 576.733C400.447 524.129 277.003 450.767 230.408 376.514C187.717 308.484 257.882 255.862 329.458 206.967C398.161 160.034 467.9 99.9641 623.212 108.181C773.152 116.114 876.963 195.033 1008.25 242.88Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M969.811 265.009C1118.68 307.931 1346.6 329.031 1391.3 395.237C1436.49 462.162 1219.93 472.22 1140 517.047C1074.72 553.659 1095.72 626.468 972.923 629.875C849.867 633.288 735.732 567.309 612.72 531.674C481.294 493.601 295.744 475.649 239.154 417.311C182.308 358.709 315.503 326.18 370.396 281.865C427.815 235.511 424.399 160.165 562.494 156.282C700.962 152.388 831.175 225.039 969.811 265.009Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1000.78 249.548C1107.61 284.801 1177.08 331.113 1235.22 379.722C1307.16 439.869 1400.5 503.99 1367.61 556.244C1329.76 616.375 1220.66 668.699 1055.92 664.579C896.837 660.601 759.959 586.835 614.608 537.413C486.274 493.777 337.91 457.157 271.398 397.828C198.692 332.974 178.502 260.903 254.513 216.209C327.21 173.463 489.037 175.865 637.599 182.502C761.646 188.043 887.573 212.187 1000.78 249.548Z" stroke="white"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M996.747 240.668C1121.82 279.892 1183.16 340.121 1233.61 397.008C1284.65 454.56 1322.87 513.397 1279.7 559.724C1231.9 611.025 1142.57 660.88 992.48 655.804C848.21 650.925 724.449 584.81 599.949 536.735C503.22 499.383 417.147 460.639 364.96 413.489C305.352 359.634 246.065 300.308 291.073 257.672C338.11 213.113 465.909 199.529 594.083 196.44C724.001 193.31 870.135 200.961 996.747 240.668Z" stroke="white"/>
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
          <div className="grid sm:grid-cols-2 mb-4">
            <div>
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <img src="/smiling-woman.png" alt="smiling woman" />
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="grid grid-rows-4 gap-1">
                    <div>
                      <span className="text-3xl font-bold">Oni <span className="text-[#FFE75C]">Adedolapo</span> Ireti</span>
                      <span className="ms-4 text-[#FFE75C]">23</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <span className="">unilag 300level</span>
                      </div>
                      <div>
                        <span className="">Computer Science</span>
                      </div>
                    </div>
                    <div>
                      <span>06, Ajose Adeogun Maryland Lagos State</span>
                    </div>
                    <div className="flex">
                      <div className="bg-[#FFD836] text-[#195F7E] px-4 py-2 rounded-2xl">
                        <span>0 Duration</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-5 rounded-xl bg-[#0B7077] gap-2 p-5 mb-4">
            <div className="col-span-4 self-center">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <a href="#" className="relative group block text-center">
                    <span className="text-xl">Google Map Search</span>
                    <svg className="absolute w-full left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity" width="310" height="21" viewBox="0 0 310 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.99999C172.744 27.5442 277.394 13.8101 308.5 4" stroke="#FFD836" strokeWidth="8"/>
                    </svg>
                  </a>
                </div>
                <div>
                  <a href="#" className="relative group block text-center">
                    <span className="text-xl">Pending</span>
                    <svg className="absolute w-full left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity" width="310" height="21" viewBox="0 0 310 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.99999C172.744 27.5442 277.394 13.8101 308.5 4" stroke="#FFD836" strokeWidth="8"/>
                    </svg>
                  </a>
                </div>
                <div>
                  <a href="#" className="relative group block text-center">
                    <span className="text-xl">Approved</span>
                    <svg className="absolute w-full left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity" width="310" height="21" viewBox="0 0 310 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.99999C172.744 27.5442 277.394 13.8101 308.5 4" stroke="#FFD836" strokeWidth="8"/>
                    </svg>
                  </a>
                </div>
                <div>
                  <a href="#" className="relative group block text-center">
                    <span className="text-xl">History</span>
                    <svg className="absolute w-full left-0 top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity" width="310" height="21" viewBox="0 0 310 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.99999C172.744 27.5442 277.394 13.8101 308.5 4" stroke="#FFD836" strokeWidth="8"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="z-10">
              <button className="text-[#0B7077] bg-white rounded px-4 py-2">
                Report Page
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-5 gap-4">
            <div className="">
              <div className="bg-white rounded-xl mb-4 p-5 grid grid-cols-6">
                <Slider className="col-span-5" defaultValue={[33]} max={100} step={1} />
                <span className="text-sm text-black text-right">km</span>
              </div>
              <div className="bg-white rounded-xl mb-4">
                <div className="relative border-b py-2">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 19C15.9183 19 19.5 15.4183 19.5 11C19.5 6.58172 15.9183 3 11.5 3C7.08172 3 3.5 6.58172 3.5 11C3.5 15.4183 7.08172 19 11.5 19Z" stroke="#7F879E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21.4999 21.0004L17.1499 16.6504" stroke="#7F879E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Job"
                    className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                  />
                </div>
                <div className="relative py-2">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.5" cy="13" r="13" fill="#DFE1FA"/>
                    <g clipPath="url(#clip0_8_20249)">
                      <path d="M13.4583 6.41602C10.7171 6.41602 8.5 8.6331 8.5 11.3743C8.5 15.0931 13.4583 20.5827 13.4583 20.5827C13.4583 20.5827 18.4167 15.0931 18.4167 11.3743C18.4167 8.6331 16.1996 6.41602 13.4583 6.41602ZM13.4583 13.1452C12.4808 13.1452 11.6875 12.3518 11.6875 11.3743C11.6875 10.3968 12.4808 9.60352 13.4583 9.60352C14.4358 9.60352 15.2292 10.3968 15.2292 11.3743C15.2292 12.3518 14.4358 13.1452 13.4583 13.1452Z" fill="#195F7E"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_8_20249">
                        <rect width="17" height="17" fill="white" transform="translate(4.5 5)"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <input
                    type="text"
                    placeholder="Location"
                    className="indent-7 outline-none text-black w-full px-4 py-3 border-0 placeholder:text-[#7F879E] text-sm"
                  />
                </div>
                <div className="pb-1 mx-1">
                  <button className="bg-[#195F7E] rounded-xl p-4 w-full">
                    Search Job
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <iframe className="w-full rounded-xl" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7193.3143200417435!2d-100.28889498759587!3d25.649501748537784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662bfbef1c51a37%3A0x2aeb9d19e4fbb44b!2sCentro%20Deportivo%20Borregos%20II!5e0!3m2!1sen!2sng!4v1736921701249!5m2!1sen!2sng" width="600" height="450" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
