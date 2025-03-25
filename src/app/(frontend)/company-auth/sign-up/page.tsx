'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { Companies } from '@/collections/Companies'
import { Company } from '@/payload-types'
import { Field, ValidationFieldError } from 'payload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Search, Loader2 } from 'lucide-react'
import ArrowIcon from '../../assets/icons/arrow'
import saveDoc from '@/services/saveDoc'
import { cn, randomString } from '@/utilities'
import signInUser, { signInUserClient } from '@/services/signinUser'
import { authStore } from '@/store/authStore'
import industries from '@/utilities/industries'
import Spinner from '@/components/spinner'
import { ValidationErrors } from '@/utilities/types'

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

function FieldError({ field }: { field: any }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <div className="text-[10px] leading-[16.5px] text-error -mt-[10.5px] mb-3">
          {field.state.meta.errors.join(',')}
        </div>
      ) : null}
    </>
  )
}

function FormError({ form }: { form: any }) {
  return (
    <>
      {form.state.errors.length ? (
        <div className="text-[10px] leading-[16.5px] text-error mt-2">
          {form.state.errors.join(',')}
        </div>
      ) : null}
    </>
  )
}

export default function SignUp() {
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

  const signUpCompanytMtn = useMutation({
    mutationFn: async (company: Company) => {
      try {
        const res = await saveDoc('companies', company)
        console.log('res', res)
        if (!res) return toast.error('Network err; pls try again later')
        return res
      } catch {
        toast.error('An error occurred while saving message; pls try again later')
      }
    },
  })

  const form = useForm<Company>({
    validators: {
      onSubmitAsync: async ({ value }) => {
        const emptyRequiredFields = Companies.fields.reduce<object>(
          (acc: ValidationFieldError, field: Field & { required: boolean; name: string }) => ({
            ...acc,
            ...(field?.required && !value[field.name] && { [field.name]: 'Required' }),
          }),
          {},
        )

        if (Object.keys(emptyRequiredFields).length) {
          return {
            form: 'Some required fields are missing. Please fill out all mandatory fields to proceed.',
            fields: emptyRequiredFields,
          }
        }

        const userCreationObj = { ...value, password: randomString(10) }
        console.log('email: ', userCreationObj.email)
        console.log('Generated Password: ', userCreationObj.password)

        const res = await signUpCompanytMtn.mutateAsync(userCreationObj)
        if ((res as ValidationErrors)?.errors?.[0]?.data?.errors?.length) {
          return {
            form: (res as ValidationErrors).errors[0].message,
            fields: (res as ValidationErrors).errors[0].data.errors.reduce<object>(
              (acc: ValidationFieldError, err) => ({
                ...acc,
                [err.path]: err.message,
              }),
              {},
            ),
          }
        }

        if (!(res as any)?.success) {
          toast.error('An error occurred while signing up; pls try again later')
          return {
            form: 'An error occurred while signing up; pls try again later',
          }
        }

        const signInRes = await signInUserClient({
          email: userCreationObj.email,
          password: userCreationObj.password,
          col: 'companies',
        })

        console.log('signInRes ' + signInRes)
        form.reset()

        if (signInRes?.token) {
          authStore.setState((state) => {
            return {
              ...state,
              signUpAuthToken: signInRes?.token!,
              signedUpUserId: signInRes?.user?.id!,
            }
          })
          router.push('/company-auth/sign-up/update-profile-image')
        } else {
          toast.success('Sign up successful')
        }

        return null
      },
    },
  })

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

  // Handle industry input change
  const handleIndustryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setIndustryQuery(query)

    if (query.trim() === '') {
      setFilteredIndustries(industries)
    } else {
      const filtered = industries.filter((industry) =>
        industry.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredIndustries(filtered)
    }

    setShowIndustryOptions(true)
  }

  // Handle industry selection
  const handleIndustrySelect = (industry: any) => {
    setIndustryQuery(industry)
    form.setFieldValue('industry', industry)
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
        form.setFieldValue('address', place.formatted_address || '')
        form.setFieldValue('location.latitude', latitude)
        form.setFieldValue('location.longitude', longitude)

        // Update map
        if (mapInstance && marker) {
          const position = { lat: latitude, lng: longitude }
          mapInstance.setCenter(position)
          mapInstance.setZoom(15)
          marker.setPosition(position)
        }
      }
    })
  }, [googleMapsLoaded, form, mapInstance, marker])

  return (
    <div className="py-10">
      <button
        onClick={() => router.back()}
        className="font-[400] text-[14px] flex items-center gap-3 text-[#0C0C0C]"
      >
        <ArrowIcon /> Back
      </button>
      <h2 className="font-[500] text-[24px] text-center mt-[40px]">Sign up as a Siwes Company</h2>
      <p className="text-center text-gray-dark-2 font-[400] text-[14px] mt-8 mb-[40px]">
        Enter your company information to proceed
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        {/* Existing name, email, and phone fields remain unchanged */}
        <form.Field
          name="name"
          children={(field) => {
            return (
              <>
                <Label>Company Name</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Company Name"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <Label>Email</Label>
                <Input
                  value={field.state.value || ''}
                  type="email"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter Email"
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />
        <form.Field
          name="phone"
          children={(field) => {
            return (
              <>
                <Label>Company phone No.</Label>
                <Input
                  value={field.state.value || ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter phone No."
                  className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2  border-[1px] mb-3 placeholder:text-[#969a9b]  ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                />
                <FieldError field={field} />
              </>
            )
          }}
        />

        {/* Updated Industry field with custom dropdown */}
        <form.Field
          name="industry"
          children={(field) => {
            return (
              <>
                <Label>Company Industry</Label>
                <div className="relative">
                  <Input
                    ref={industryInputRef}
                    placeholder="Select Industry"
                    value={industryQuery}
                    onChange={handleIndustryInputChange}
                    onFocus={() => setShowIndustryOptions(true)}
                    className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2 border-[1px] mb-3 placeholder:text-[#969a9b] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                </div>

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
                      <div className="px-4 py-2 text-xs text-error">No matching industries</div>
                    )}
                  </div>
                )}
                <FieldError field={field} />
              </>
            )
          }}
        />

        {/* Updated Address field with Google Maps Autocomplete */}
        <form.Field
          name="address"
          children={(field) => {
            return (
              <>
                <Label>Company Address</Label>
                <div className="relative">
                  <Input
                    id="company-address"
                    value={field.state.value || ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter Address"
                    className={`bg-white/40 backdrop-blur-[70px] text-gray-dark-2 pr-10 border-[1px] mb-3 placeholder:text-[#969a9b] ${field.state.meta.isTouched && field.state.meta.errors.length ? 'border-error' : ''}`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Start typing to see address suggestions
                </p>
                <FieldError field={field} />
              </>
            )
          }}
        />

        {/* Google Map */}
        <div
          ref={mapRef}
          className="w-full h-48 rounded-md mt-2 mb-4 border border-gray-300 overflow-hidden"
        />

        {/* Hidden Location Fields */}
        <form.Field
          name="location.longitude"
          children={(field) => (
            <Input
              type="hidden"
              value={field.state.value || ''}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          )}
        />
        <form.Field
          name="location.latitude"
          children={(field) => (
            <Input
              type="hidden"
              value={field.state.value || ''}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          )}
        />

        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
          {([canSubmit, isSubmitting]) => (
            <>
              <Button
                type="submit"
                disabled={!canSubmit}
                size="lg"
                className="w-full mt-5"
                variant="secondary"
              >
                Continue {isSubmitting && <Spinner />}
              </Button>
              <FormError form={form} />
            </>
          )}
        </form.Subscribe>
      </form>

      <p className="font-[400] text-[12px] text-gray-dark-2 leading-[16px] mt-[12px] text-cente r">
        Already have an account ?
        <span
          className="text-[#007AFF] cursor-pointer"
          onClick={() => router.push('/company-auth/login')}
        >
          {' '}
          login as a company
        </span>
      </p>
    </div>
  )
}
