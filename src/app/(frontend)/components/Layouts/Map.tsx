'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression, LatLngTuple } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface MapProps {
  positions: LatLngExpression[] | LatLngTuple[]
  zoom?: number
}

const defaults = {
  zoom: 19,
}

const Map = ({ zoom = defaults.zoom, positions }: MapProps) => {
  const [mapPositions, setMapPositions] = useState<LatLngExpression[]>(positions)

  useEffect(() => {
    setMapPositions(positions)
  }, [positions]) // Update map when positions change

  return (
    <MapContainer
      center={positions[0]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      className="rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapPositions.map((position: LatLngExpression | LatLngTuple, index: number) => (
        <Marker key={`position-${index}`} position={position} draggable={false}>
          <Popup>
            <div className="grid gap-2">
              <div className="font-medium">Company Name</div>
              <div>Company description</div>
              <div className="text-right">
                <Link href={'/student'}>
                  <Button size="sm">Apply</Button>
                </Link>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default Map
