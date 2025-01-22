'use client'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import PricingPackCard from '../../components/Cards/PricingPackCard'

export default function Page() {
  const plans = [
    {
      id: 1,
      name: 'Starter Pack',
      price: 'Free',
      description: 'Perfect for testing the platform',
      points: ['3 Points requests to companies', '3 Points invitations from companies'],
    },
    {
      id: 2,
      name: 'Pro Pack',
      price: '₦12,000',
      description: 'Expand your network and opportunities',
      points: [
        '10 Points extra requests to companies',
        '3 Points additional invitations from companies',
      ],
    },
    {
      id: 3,
      name: 'Unlimited Pack',
      price: '₦12,000',
      description: 'Unlock endless possibilities and maximize your chances of success',
      points: [
        'Unlimited request Points to companies',
        'Unlimited invitations Points from companies',
      ],
    },
  ]
  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          <div>
            <div className="flex justify-between my-3">
              <div>
                <h5 className="text-[#0B7077] text-xl">Take Control of Your Career Journey</h5>
              </div>
            </div>
            <div className="my-3">
              <p className="text-[#8E8E93]">
                Start with the base plan or upgrade to 10 points or unlimited points for greater
                flexibility.
              </p>
            </div>
            <div>
              <Carousel>
                <CarouselContent>
                  {plans.map((plan) => (
                    <CarouselItem key={plan.id}>
                      <PricingPackCard plan={plan} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
