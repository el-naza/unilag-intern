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
import { User, Loader2, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import saveDoc from '@/services/saveDoc'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { randomString } from '@/utilities'
import { useEffect } from 'react'

// Course area options
const COURSE_AREAS = ['Mathematics', 'Science', 'Engineering', 'History', 'Arts']

// Form validation schema
const waitlistFormSchema = z.object({
  name: z.string().min(2, { message: 'Company name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  rcNumber: z.string().min(1, { message: 'RC Number is required' }),
  courseAreas: z.array(z.string()).min(1, { message: 'At least one course area is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  phone: z.string().min(1, { message: 'Phone number is required' }),
  location: z.object({
    longitude: z.number().or(z.string().transform((val) => Number(val) || 0)),
    latitude: z.number().or(z.string().transform((val) => Number(val) || 0)),
  }),
})

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>

// Geocoding function to convert address to coordinates
async function geocodeAddress(address: string): Promise<{ latitude: number; longitude: number }> {
  try {
    // Using Nominatim OpenStreetMap API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
    )

    if (!response.ok) {
      throw new Error('Geocoding request failed')
    }

    const data = await response.json()

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      }
    } else {
      console.warn('No geocoding results found for address:', address)
      return { latitude: 0, longitude: 0 }
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return { latitude: 0, longitude: 0 }
  }
}

export default function WaitlistForm() {
  const router = useRouter()

  // Initialize form
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      name: '',
      email: '',
      rcNumber: '',
      courseAreas: [],
      address: '',
      phone: '',
      location: {
        longitude: 0,
        latitude: 0,
      },
    },
  })

  // Watch the address field to update coordinates when it changes
  const address = form.watch('address')

  // Update coordinates when address changes
  useEffect(() => {
    // Don't make API call with empty or very short addresses
    if (address && address.length > 5) {
      const debounceTimeout = setTimeout(async () => {
        try {
          const coordinates = await geocodeAddress(address)

          // Update the form with the new coordinates
          form.setValue('location.latitude', coordinates.latitude)
          form.setValue('location.longitude', coordinates.longitude)

          // If coordinates were found, show a success message
          if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
            toast.success('Location coordinates updated', { id: 'geocode-success', duration: 2000 })
          }
        } catch (error) {
          console.error('Error updating coordinates:', error)
        }
      }, 1000) // Debounce for 1 second to avoid too many API calls while typing

      return () => clearTimeout(debounceTimeout)
    }
  }, [address, form])

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
      router.push('/waitlist-signup-success')
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
          <span className="text-xs text-gray-600">Only 100 Spots Available</span>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Sign up now to connect with top student talents and simplify your internship hiring
          process.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="text-sm text-gray-700">Company Name</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Enter company name"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px]"
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
                {/* <FormLabel className="text-sm text-gray-700">Email</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="company@example.com"
                    type="email"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px]"
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
                {/* <FormLabel className="text-sm text-gray-700">Phone Number</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Enter phone number"
                    type="tel"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px]"
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
                {/* <FormLabel className="text-sm text-gray-700">RC Number</FormLabel> */}
                <FormControl>
                  <Input
                    placeholder="Enter RC number"
                    {...field}
                    className="bg-white/40 backdrop-blur-[70px] border-[1px]"
                  />
                </FormControl>
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseAreas"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel className="text-sm text-gray-700">Course Area</FormLabel> */}
                <Select
                  onValueChange={(value) => field.onChange([value])}
                  defaultValue={field.value?.[0]}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white/40 backdrop-blur-[70px] border-[1px]">
                      <SelectValue placeholder="Select a course area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COURSE_AREAS.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                      placeholder="Enter full address"
                      {...field}
                      className="bg-white/40 backdrop-blur-[70px] border-[1px] pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                </FormControl>
                {/* <p className="text-xs text-gray-500 mt-1">
                  Location coordinates will be automatically generated
                </p> */}
                <FormMessage className="text-xs text-error" />
              </FormItem>
            )}
          />

          {/* Longitude and Latitude Fields (readonly) */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location.longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Longitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-generated"
                      type="number"
                      step="any"
                      {...field}
                      readOnly
                      className="bg-gray-100 backdrop-blur-[70px] border-[1px] cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">Latitude</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Auto-generated"
                      type="number"
                      step="any"
                      {...field}
                      readOnly
                      className="bg-gray-100 backdrop-blur-[70px] border-[1px] cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-error" />
                </FormItem>
              )}
            />
          </div> */}

          <div className="mt-10" />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={saveCompanyMutation.isPending}
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
