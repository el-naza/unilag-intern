'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Loader2, MapPin, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import saveDoc from '@/services/saveDoc'
import { randomString } from '@/utilities'
import { useEffect, useState, useRef } from 'react'
import industries from '@/utilities/industries'

// Form validation schema
const waitlistFormSchema = z.object({
  name: z.string().min(2, { message: 'Company name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  rcNumber: z.string().min(1, { message: 'RC Number is required' }),
  industry: z.array(z.string()).min(1, { message: 'Industry is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  location: z.object({
    longitude: z.number().or(z.string().transform((val) => Number(val) || 0)),
    latitude: z.number().or(z.string().transform((val) => Number(val) || 0)),
  }),
})

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>

// Load Google Maps API script dynamically
const loadGoogleMapsScript = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

  // Check if script is already loaded
  if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
    return Promise.resolve()
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (error) => reject(error)
    document.head.appendChild(script)
  })
}

// Geocoding function using Google Maps API
async function geocodeAddress(address: string): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    try {
      // Ensure Google Maps is loaded
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location
          resolve({
            latitude: location.lat(),
            longitude: location.lng(),
          })
        } else {
          console.warn(`Geocoding failed: ${status}`)
          resolve({ latitude: 0, longitude: 0 }) // Fallback with default values
        }
      })
    } catch (error) {
      console.error('Geocoding error:', error)
      reject(error)
    }
  })
}

export default function WaitlistForm() {
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false)
  const [industryQuery, setIndustryQuery] = useState('')
  const [showIndustryOptions, setShowIndustryOptions] = useState(false)
  const [filteredIndustries, setFilteredIndustries] = useState(industries)
  const industryInputRef = useRef<HTMLInputElement>(null)
  const industryOptionsRef = useRef<HTMLDivElement>(null)

  // Initialize form
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: '',
      email: '',
      rcNumber: '',
      industry: [],
      address: '',
      phone: '',
      location: {
        longitude: 0,
        latitude: 0,
      },
    },
    mode: 'onChange', // Enable validation on change for isValid
  })

  // Check if all fields are filled
  const isFormComplete = form.formState.isValid && form.getValues('industry').length > 0

  // Watch the address field to update coordinates when it changes
  const address = form.watch('address')

  // Initialize industryQuery from form values if available
  useEffect(() => {
    const currentIndustry = form.getValues('industry')[0]
    if (currentIndustry) {
      setIndustryQuery(currentIndustry)
    }
  }, [form])

  // Handle industry input change
  const handleIndustryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setIndustryQuery(query)

    if (query.trim() === '') {
      setFilteredIndustries(industries)
      // Clear the form value when input is empty
      form.setValue('industry', [], { shouldValidate: true })
    } else {
      const filtered = industries.filter((industry) =>
        industry.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredIndustries(filtered)

      // If there's an exact match, update the form value
      const exactMatch = industries.find(
        (industry) => industry.toLowerCase() === query.toLowerCase(),
      )
      if (exactMatch) {
        form.setValue('industry', [exactMatch], { shouldValidate: true })
      }
    }

    // Always show options when typing
    setShowIndustryOptions(true)
  }

  // Handle industry selection
  const handleIndustrySelect = (industry: string) => {
    setIndustryQuery(industry)
    form.setValue('industry', [industry], { shouldValidate: true })
    setShowIndustryOptions(false)
  }

  // Handle click outside of industry options
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        industryOptionsRef.current &&
        industryInputRef.current &&
        !industryOptionsRef.current.contains(event.target as Node) &&
        !industryInputRef.current.contains(event.target as Node)
      ) {
        setShowIndustryOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Load Google Maps script on component mount
  useEffect(() => {
    loadGoogleMapsScript()
      .then(() => {
        setGoogleMapsLoaded(true)
      })
      .catch((error) => {
        console.error('Failed to load Google Maps script:', error)
        toast.error('Failed to load Google Maps. Please refresh the page.')
      })
  }, [])

  // Initialize map once Google Maps is loaded
  useEffect(() => {
    if (googleMapsLoaded && mapRef.current && !mapInstance) {
      // Default to a central position (adjust as needed)
      const defaultPosition = { lat: 6.5244, lng: 3.3792 } // Lagos, Nigeria (example)

      const map = new google.maps.Map(mapRef.current, {
        center: defaultPosition,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      })

      const newMarker = new google.maps.Marker({
        position: defaultPosition,
        map: map,
        title: 'Company Location',
      })

      setMapInstance(map)
      setMarker(newMarker)
    }
  }, [googleMapsLoaded, mapInstance])

  // Update coordinates and map when address changes
  useEffect(() => {
    if (!googleMapsLoaded || !address || address.length <= 5) return

    const debounceTimeout = setTimeout(async () => {
      try {
        const coordinates = await geocodeAddress(address)

        // Update the form with the new coordinates
        form.setValue('location.latitude', coordinates.latitude)
        form.setValue('location.longitude', coordinates.longitude)

        // Update map and marker if coordinates were found
        if (coordinates.latitude !== 0 && coordinates.longitude !== 0 && mapInstance && marker) {
          const position = {
            lat: coordinates.latitude,
            lng: coordinates.longitude,
          }

          mapInstance.setCenter(position)
          marker.setPosition(position)

          toast.success('Location found!', { id: 'geocode-success', duration: 2000 })
        }
      } catch (error) {
        console.error('Error updating coordinates:', error)
        toast.error('Could not find this location. Please try a different address.')
      }
    }, 1000) // Debounce for 1 second

    return () => clearTimeout(debounceTimeout)
  }, [address, form, googleMapsLoaded, mapInstance, marker])

  // Use mutation for API call
  const saveCompanyMutation = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      try {
        // Add password field to the data
        const dataWithPassword = {
          ...data,
          password: randomString(10), // Generate random password with 10 characters
        }

        console.log('Submitting data with password:', dataWithPassword)

        const response = await saveDoc('companies', dataWithPassword)
        if (!response) throw new Error('Network error')
        return response
      } catch (error) {
        console.error('Error saving company:', error)
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Successfully joined the waitlist!')
      form.reset()
      setIndustryQuery('')
      router.push('/waitinglist-signup-success')
    },
    onError: (error) => {
      console.error('Error submitting form:', error)
      toast.error('There was an error joining the waitlist. Please try again.')
    },
  })

  // Form submission handler
  function onSubmit(data: WaitlistFormValues) {
    console.log('Form data:', data)
    saveCompanyMutation.mutate(data)
  }

  // Setup autofill for address input
  useEffect(() => {
    if (!googleMapsLoaded) return

    const addressInput = document.getElementById('company-address') as HTMLInputElement
    if (!addressInput) return

    const autocomplete = new google.maps.places.Autocomplete(addressInput, {
      fields: ['formatted_address', 'geometry'],
    })

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      if (place.geometry && place.geometry.location) {
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()

        // Update form values
        form.setValue('address', place.formatted_address || '')
        form.setValue('location.latitude', latitude)
        form.setValue('location.longitude', longitude)

        // Update map
        if (mapInstance && marker) {
          const position = { lat: latitude, lng: longitude }
          mapInstance.setCenter(position)
          mapInstance.setZoom(15)
          marker.setPosition(position)
        }
      }
    })
  }, [googleMapsLoaded, form])

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join the Waitlist</h2>

        <div className="flex items-center justify-center mx-14 px-2 py-1 gap-1 mb-4 bg-gray-200 border border-gray-50 rounded-full">
          <div className="flex -space-x-2">
            <Avatar className="h-7 w-7 transition-transform duration-50 hover:h-8 hover:w-8">
              <AvatarImage src="/icons/waiting-icon1.png" alt="User1" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Avatar className="h-7 w-7 transition-transform duration-50 hover:h-8 hover:w-8">
              <AvatarImage src="/icons/waiting-icon2.png" alt="User2" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Avatar className=" h-7 w-7 transition-transform duration-50 hover:h-8 hover:w-8">
              <AvatarImage src="/icons/waiting-icon3.png" alt="User3" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs text-gray-600 box-shadow: 0px 1px 3px 0px rgba(99, 99, 99, 0.10), 0px 1px 2px 0px rgba(99, 99, 99, 0.06)">
            Only 100 Spots Available
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Sign up now to connect with top student talents and simplify your internship hiring
          process.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 font-inter">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Company name"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px] placeholder:text-[#8E8E93]"
                  />
                </FormControl>
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Company Email"
                    type="email"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px] placeholder:text-[#8E8E93]"
                  />
                </FormControl>
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Company phone number"
                    type="tel"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px] placeholder:text-[#8E8E93]"
                  />
                </FormControl>
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rcNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Company RC number"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px] placeholder:text-[#8E8E93]"
                  />
                </FormControl>
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          {/* Custom Industry Input with Autocomplete - Fixed version */}
          <FormField
            control={form.control}
            name="industry"
            render={() => (
              // Removed the unused field parameter
              <FormItem className="relative">
                <FormControl>
                  <div className="relative">
                    <Input
                      ref={industryInputRef}
                      placeholder="Company Industry"
                      value={industryQuery}
                      onChange={handleIndustryInputChange}
                      onFocus={() => setShowIndustryOptions(true)}
                      className="bg-white/40 backdrop-blur-[70px] border-[1px] placeholder:text-[#8E8E93]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Search className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </FormControl>

                {showIndustryOptions && (
                  <div
                    ref={industryOptionsRef}
                    className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg"
                  >
                    {filteredIndustries.length > 0 ? (
                      filteredIndustries.map((industry) => (
                        <div
                          key={industry}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                          onClick={() => handleIndustrySelect(industry)}
                        >
                          {industry}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No matching industries</div>
                    )}
                  </div>
                )}
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      id="company-address"
                      placeholder="Enter full address"
                      {...field}
                      className="bg-white/40 backdrop-blur-[90px] border-[1px] pr-10 placeholder:text-[#8E8E93]"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-1">
                  Start typing to see address suggestions
                </p>
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          {/* Google Map */}
          <div
            ref={mapRef}
            className="w-full h-48 rounded-md mt-2 mb-4 border border-gray-300 overflow-hidden"
          />

          <div className="mt-10" />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={saveCompanyMutation.isPending || !isFormComplete}
          >
            {saveCompanyMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Join the Waitlist'
            )}
          </Button>

          {form.formState.errors.root?.message && (
            <p className="text-xs text-error mt-2">{form.formState.errors.root.message}</p>
          )}
        </form>
      </Form>
    </div>
  )
}
