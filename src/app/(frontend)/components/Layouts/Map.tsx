'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { LatLngBounds, LatLngExpression, LatLngTuple } from 'leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo } from 'react'
import { Company } from '@/payload-types'

interface MapProps {
  companies: Company[]
  zoom?: number
}

const defaults: { zoom: number; center: LatLngExpression } = {
  zoom: 19,
  center: [9.0563, 7.4985],
}

const Map = ({ zoom = defaults.zoom, companies }: MapProps) => {
  const companiesWithLocation = useMemo(
    () => companies.filter((company) => company.location.latitude && company.location.longitude),
    [companies],
  )

  const positions = useMemo<LatLngExpression[] | LatLngTuple[]>(
    () =>
      companiesWithLocation.map((company) => [
        company.location.latitude,
        company.location.longitude,
      ]),
    [companiesWithLocation],
  )

  const center = useMemo(() => (positions.length ? positions[0] : defaults.center), [positions])

  const MapCentralizer = ({ positions }: { positions: LatLngExpression[] | LatLngTuple[] }) => {
    const map = useMap()

    useEffect(() => {
      if (positions.length) {
        const bounds = new LatLngBounds(positions as LatLngExpression[] | LatLngTuple[])
        map.fitBounds(bounds, { padding: [50, 50] })
      }
    }, [map, positions])

    return null
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      className="w-full min-h-[400px] lg:h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapCentralizer positions={positions} />

      {companiesWithLocation.map((company, index) => (
        <Marker
          key={`position-${index}`}
          position={[company.location.latitude, company.location.longitude]}
          draggable={false}
        >
          <Popup>
            <div className="grid gap-2">
              <div className="font-medium">{company.name}</div>
              <div>{company.description}</div>
              <div className="text-right">
                <Link href={`/student/companies/${company.id}`}>
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
