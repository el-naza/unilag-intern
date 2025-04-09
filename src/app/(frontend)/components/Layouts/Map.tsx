'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Company } from '@/payload-types'
import CompanyRecommendedCard from '../Cards/CompanyRecommendedCard'

interface MapProps {
  companies: Company[]
}

const defaults = {
  center: { lat: 9.0563, lng: 7.4985 },
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string

const Map = ({ companies }: MapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [zoom, setZoom] = useState<number>(14) // Default zoom level

  const companiesWithLocation = useMemo(
    () => companies.filter((company) => company.location.latitude && company.location.longitude),
    [companies],
  )

  const positions = useMemo(
    () =>
      companiesWithLocation.map((company) => ({
        lat: company.location.latitude,
        lng: company.location.longitude,
      })),
    [companiesWithLocation],
  )

  const center = useMemo(() => (positions.length ? positions[0] : defaults.center), [positions])

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map

    if (positions.length) {
      const bounds = new google.maps.LatLngBounds()
      positions.forEach((pos) => bounds.extend(pos))
      map.fitBounds(bounds)

      google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        setZoom(map.getZoom() ?? 14) // Update zoom dynamically
      })
    }
  }

  useEffect(() => {
    if (!mapRef.current || positions.length === 0) return

    const bounds = new google.maps.LatLngBounds()
    positions.forEach((pos) => bounds.extend(pos))

    mapRef.current.fitBounds(bounds)

    google.maps.event.addListenerOnce(mapRef.current, 'bounds_changed', () => {
      setZoom(mapRef.current?.getZoom() ?? 14)
    })
  }, [positions])

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        center={center}
        zoom={zoom} // Dynamically updated zoom
        onLoad={handleMapLoad}
        mapContainerClassName="w-full min-h-[400px] lg:h-full"
      >
        {companiesWithLocation.map((company, index) => (
          <Marker
            key={index}
            position={{ lat: company.location.latitude, lng: company.location.longitude }}
            onClick={() => setSelectedCompany(company)}
          />
        ))}

        {selectedCompany && (
          <InfoWindow
            position={{
              lat: selectedCompany.location.latitude,
              lng: selectedCompany.location.longitude,
            }}
            onCloseClick={() => setSelectedCompany(null)}
          >
            <div className="w-64">
              <CompanyRecommendedCard company={selectedCompany} />
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
