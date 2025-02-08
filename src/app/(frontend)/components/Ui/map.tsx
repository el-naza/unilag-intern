'use client'

import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

interface MapComponentProps {
  defaultCenter?: [number, number]
  defaultRange?: number
}

function SetMapCenter({ center }: { center: [number, number] }) {
  const map = useMap()
  map.setView(center)
  return null
}

export default function MapComponent({
  defaultCenter = [6.5244, 3.3792],
  defaultRange = 10,
}: MapComponentProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter)
  const [range, setRange] = useState<number>(defaultRange)
  const [location, setLocation] = useState<string>('')

  const handleSearch = () => {
    alert(`Search for location: ${location}`)
  }

  return (
    <div className="flex items-center border h-full">
      <div className="w-[279px] p-4">
        <div className="w-full mb-4">
          <label className="block mb-2 font-bold text-gray-700">Range (km):</label>
          <input
            type="range"
            className="w-full accent-[#0B7077]"
            min="1"
            max="100"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
          />
          <p className="text-sm text-gray-500 mt-2">Selected range: {range} km</p>
        </div>

        <div className="w-full rounded border p-4">
          <div className="flex items-center gap-2 py-2">
            <input
              type="text"
              placeholder="Search Location"
              className="w-full outline-none border p-2 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            className="mt-4 w-full bg-[#195F7E] text-white py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="h-[447px] flex-grow relative rounded-[20px] overflow-hidden">
        <MapContainer style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={mapCenter} />
          <SetMapCenter center={mapCenter} />
        </MapContainer>
      </div>
    </div>
  )
}
