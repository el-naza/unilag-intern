'use client'

import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Form validation schema
const waitlistFormSchema = z.object({
  companyName: z.string().min(2, { message: 'Company name is required' }),
  companyEmail: z.string().email({ message: 'Invalid email address' }),
  companyRcNumber: z.string().min(1, { message: 'RC Number is required' }),
  companyCourseArea: z.string().min(1, { message: 'Course area is required' }),
  companyAddress: z.string().min(1, { message: 'Address is required' }),
})

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Initialize form
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: {
      companyName: '',
      companyEmail: '',
      companyRcNumber: '',
      companyCourseArea: '',
      companyAddress: '',
    },
  })

  // Form submission handler
  async function onSubmit(data: WaitlistFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    try {
      console.log('Form data:', data)
      // Here you would typically send the data to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push('/waitlist-signup-success')
      // form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error joining the waitlist. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Company Email" type="email" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyRcNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Company RC Number" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyCourseArea"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Company Course Area" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyAddress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Company Address" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="mt-10" />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Join the Waitlist'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
