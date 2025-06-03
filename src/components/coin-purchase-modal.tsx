'use client'

import { useMemo, useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import coinVector from '../app/(frontend)/assets/images/coin.svg'
import stackedCoinsVector from '../app/(frontend)/assets/images/pile-of-eight-golden-coins.svg'
// import PaystackPop from '@paystack/inline-js'
import { useSession } from 'next-auth/react'
import Spinner from './spinner'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import fetchMe from '@/services/fetchMe'
import { Student } from '@/payload-types'
import fetchCoinsAndApplicationsCount from '@/services/fetchCoinsAndApplicationsCount'
import { pricePerCoin } from '@/utilities'

// const paystackInstance = new PaystackPop()

interface CoinModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CoinModal({ open, onOpenChange }: CoinModalProps) {
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: async () => (await fetchMe('students'))?.user as Student | undefined,
  })
  const user = useMemo<any>(() => meQuery.data, [meQuery.data])

  const [coins, setCoins] = useState<number[]>([20])

  const coinsCount = useMemo<number>(() => (coins.length ? coins[0] : 0), [coins])

  const [loadingSess, setLoadingSess] = useState(false)
  if (!meQuery.data) return null

  async function startPaymentSession() {
    setLoadingSess(true)

    try {
      // // Get registration data from localStorage
      // const registrationData = getRegistrationData()

      // if (!registrationData || !isRegistrationComplete(registrationData)) {
      //   throw new Error('Missing registration information')
      // }

      // Initialize Paystack popup with basic configuration
      const PaystackPop = (await import('@paystack/inline-js')).default
      const popup = new PaystackPop()

      onOpenChange(false)

      popup.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        // phone: session?.user?.phone,
        amount: coinsCount * 100 * 100,
        onSuccess(transaction) {
          setLoadingSess(false)

          console.log('txn', transaction)
          return toast.success(`Succesful! Ref: ${transaction.reference}`)
        },

        metadata: {
          custom_fields: [
            {
              display_name: 'APPLICATION ID',
              variable_name: 'APP_ID',
              value: 'INTRNS',
            },
            {
              display_name: 'Student ID',
              variable_name: 'student_id',
              value: user?.id,
            },
            {
              display_name: 'First Name',
              variable_name: 'firstName',
              value: user?.firstName,
            },
            {
              display_name: 'Last Name',
              variable_name: 'lastName',
              value: user?.lastName,
            },
            {
              display_name: 'Email',
              variable_name: 'email',
              value: user?.email,
            },
            {
              display_name: 'Matriculation Number',
              variable_name: 'matriculation_number',
              value: user?.matricNo,
            },
          ],
        },

        currency: 'NGN',

        // // We'll capture data in localStorage and send to webhook on successful payment
        // onSuccess: (transaction) => {
        //   // Save paid flag and reference to localStorage
        //   localStorage.setItem("paid", "true");

        //   // Redirect to success page
        //   router.replace("/payment/successful");
        // },

        onCancel: () => {
          setLoadingSess(false)

          toast.error('Payment cancelled: You cancelled the payment process')
        },

        onError: (error) => {
          setLoadingSess(false)

          toast.error(
            'Payment failed: There was an error processing your payment. Please try again.',
          )
          console.error('Payment error:', error)
        },
      })
    } catch (error) {
      toast.error(
        'Payment failed: ' + (error instanceof Error)
          ? error.message
          : 'Please try again or contact support.',
      )

      setLoadingSess(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle hidden>Buy Coins</DialogTitle>
      <DialogContent className="sm:max-w-[1200px] p-0 z-[9999999]">
        <div className="grid sm:grid-cols-5 gap-4">
          <div className="col-span-5">
            <div className="bg-white text-black flex flex-wrap">
              <div className={'w-full p-8'}>
                <div className="text-center mb-5">
                  <div className="text-3xl font-bold text-[#0B7077] mb-4">
                    LAND MORE INTERNSHIPS OFFER
                  </div>
                  <div className="text-lg font-bold text-[#0B7077] mb-4">Power Up With Coin</div>
                  <div className="text-[#8E8E93]">
                    Start with free coins on us! Need more?
                    <br />
                    Purchase additional coins for extended access.
                  </div>
                </div>
                <div className="bg-[#EFEFEF] pb-8">
                  <div className="p-8">
                    <div className="mb-4 flex">
                      <Image src={stackedCoinsVector} alt="stacked-coins" className="me-2" />1 Coin
                      = ₦{pricePerCoin}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>Calculated Price</div>
                      <div className="p-2 border rounded-lg border-gray-300 text-center">
                        ₦{coinsCount * pricePerCoin}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FAFAFA] p-8">
                    <div className="grid grid-cols-12 gap-2 mb-5">
                      <div className="flex">
                        <Image src={coinVector} alt="coin" className="me-2" /> 0
                      </div>
                      <div className="col-span-10 flex">
                        <Slider value={coins} onValueChange={setCoins} max={100} step={1} />
                      </div>
                      <div className="ms-auto flex">
                        <Image src={coinVector} alt="coin" className="me-2" />
                        100
                      </div>
                    </div>
                    <div className="mx-4 mb-6">
                      <div className="grid grid-cols-7 gap-2">
                        <div
                          onClick={() => setCoins([10])}
                          className={`${coinsCount === 10 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          10 Coins
                        </div>
                        <div
                          onClick={() => setCoins([20])}
                          className={`${coinsCount === 20 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          20 Coins
                        </div>
                        <div
                          onClick={() => setCoins([30])}
                          className={`${coinsCount === 30 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          30 Coins
                        </div>
                        <div
                          onClick={() => setCoins([50])}
                          className={`${coinsCount === 50 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          50 Coins
                        </div>
                        <div
                          onClick={() => setCoins([70])}
                          className={`${coinsCount === 70 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          70 Coins
                        </div>
                        <div
                          onClick={() => setCoins([80])}
                          className={`${coinsCount === 80 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          80 Coins
                        </div>
                        <div
                          onClick={() => setCoins([100])}
                          className={`${coinsCount === 100 ? 'bg-[#195F7E] text-white' : 'text-[#195F7E]'} p-4 border rounded-lg border-gray text-center cursor-pointer`}
                        >
                          100 Coins
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        className="bg-primary text-white py-4 px-6 rounded-lg flex gap-4 mx-auto"
                        onClick={startPaymentSession}
                      >
                        Buy Now {loadingSess && <Spinner />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
