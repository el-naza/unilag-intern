'use client'
import Kit from '../../assets/icons/kit'
import FilterIcon from '../../assets/icons/filterIcon'
import StudentCard from '../../components/Cards'
import CompanyProfileHero from '../../components/Hero/companyProfleHero'
import SearchIcon from '../../assets/icons/search'
import LocationIcon from '../../assets/icons/location'
import MainButton from '../../components/Ui/button'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'

type MapCenter = [number, number]
const SetMapCenter: React.FC<{ center: MapCenter }> = ({ center }) => {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 13)
  }, [map, center])
  return null
}

export default function MapPage() {
  const [mapCenter, setMapCenter] = useState<MapCenter>([6.5244, 3.3792])
  const [range, setRange] = useState<number>(10)
  const [location, setLocation] = useState<string>('')

  const handleSearch = () => {
    if (location) {
      console.log(`Searching for location: ${location} within ${range}km`)
      setMapCenter([6.5244, 3.3792])
    }
  }

  const students = [
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Adenike Bolrunduro',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Adenike Bolrunduro',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Adenike Bolrunduro',
    },
    {
      image:
        'https://plus.unsplash.com/premium_photo-1682089877310-b2308b0dc719?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'John Doe',
    },
  ]
  return (
    <div>
      <div className="">
        <CompanyProfileHero />
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 bg-[#195F7E]">
          {/* Input Section */}
          <div className="w-full lg:w-[279px] bg-[white] rounded-[8px] lg:ml-3">
            <div className="w-full p-4 rounded ">
              <input
                type="range"
                className="w-full accent-[#0B7077]"
                value={range}
                min={1}
                max={50}
                onChange={(e) => setRange(Number(e.target.value))}
              />
            </div>

            <div className="w-full rounded border p-4">
              <div className="flex items-center gap-2 py-2">
                <SearchIcon />
                <input type="text" placeholder="Search Job" className="w-full outline-none" />
              </div>

              <div className="flex items-center gap-2 py-2 border-t">
                <div className="w-[26px] h-[26px] rounded-full bg-[#DFE1FA] flex items-center justify-center">
                  <LocationIcon />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="mt-6">
                <MainButton
                  width="w-full"
                  title="Search Job"
                  backgroundColor="bg-[#195F7E]"
                  handleClick={handleSearch}
                />
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full lg:flex-grow h-[300px] lg:h-[447px] rounded-[20px]">
            {/* <MapContainer style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={mapCenter} />
              <SetMapCenter center={mapCenter} />
            </MapContainer> */}
          </div>
        </div>

        <div className="w-full max-w-[1600px] mx-auto mt-[171px] px-4 lg:px-[50px]">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between">
            <h2 className="font-[700] text-[30px] lg:text-[45px] text-center lg:text-left text-black">
              Recommended Student
            </h2>
            <div className="flex flex-wrap items-center gap-4 lg:gap-[30px] mt-4 lg:mt-0">
              <button className="h-[50px] w-[50px] lg:h-[67px] lg:w-[67px] rounded-full flex items-center justify-center bg-[#195F7E] border-4">
                <Kit />
              </button>
              <button className="shadow px-4 py-2 lg:px-[50px] lg:py-[15px] flex items-center gap-3 border-[#E3ECFB] font-[400] text-[12px] lg:text-[14px] text-[#717B9E] bg-[#FFFFFF] rounded-[12px]">
                <FilterIcon />
                Filter
              </button>
            </div>
          </div>
          <div className="mt-8 lg:mt-[55px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  xxl:grid-cols-4 gap-6 lg:gap-[]">
              {students.map((student, index) => (
                <StudentCard key={index} image={student.image} name={student.name} />
              ))}
            </div>
            {/* <div className="flex flex-wrap gap-6 lg:gap-[48px]">
            {students.map((student, index) => (
              <div
                key={index}
                className="w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-32px)] xl:w-[calc(25%-32px)]"
              >
                <StudentCard image={student.image} name={student.name} />
              </div>
            ))}
          </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
