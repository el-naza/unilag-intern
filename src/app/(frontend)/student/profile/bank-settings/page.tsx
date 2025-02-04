'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import gtb from '../../../assets/images/gtb.svg'
import accessBank from '../../../assets/images/access-bank.svg'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function Page() {
  const [step, setStep] = useState<number>(1)
  const [selectedBank, setSelectedBank] = useState<any>(null)

  const incrementStep = () => {
    setStep(step + 1)
  }

  const banks = [
    {
      id: 1,
      name: 'GT Bank',
      accountNumber: '1234 5678 9012',
      accountName: 'Precious Fredrick',
      icon: gtb,
    },
    {
      id: 2,
      name: 'Access Bank',
      accountNumber: '1234 5678 9012',
      accountName: 'Precious Fredrick',
      icon: accessBank,
    },
  ]

  return (
    <div className="min-h-screen relative text-sm text-black">
      <div className="container">
        <main className="py-1 bg-white">
          <div>
            <div className="flex justify-between my-3">
              <div>
                <h5 className="text-black font-bold">Banking Info</h5>
              </div>
            </div>
            <div className="my-5">
              <h5 className="font-oleo text-lg">Connect your Bank Account</h5>
              <p className="text-[#8E8E93] mb-3">
                Securely connect your bank account to receive payments seamlessly.
              </p>
            </div>

            {step === 1 ? (
              <div className="grid grid-cols-2 gap-4 mb-16">
                <div className="col-span-2">
                  <h5 className="text-black mb-2">Bank Account Number</h5>
                  <input
                    className="w-full placeholder:text-[#ECECEC] p-2 border border-[#F1F1F1] rounded mb-2"
                    placeholder="0000 0000 0000"
                  />
                </div>
              </div>
            ) : step === 2 ? (
              <div className="mb-3">
                <h5 className="text-black font-medium mb-2">Select Bank</h5>
                <div className="grid gap-2">
                  {banks.map((bank, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedBank(bank)}
                      className={`flex items-center gap-2 ${bank.id === selectedBank?.id ? 'bg-[#B3FAFF]' : 'hover:bg-[#B3FAFF]'} rounded p-4 ps-2`}
                    >
                      <Image height={16} width={16} src={bank.icon} alt={bank.name} />
                      <span>{bank.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="my-5">
                  <h5 className="text-[#48484A]">Account Details</h5>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Image height={44} width={44} src={selectedBank.icon} alt="gtb-large" />
                        <div>
                          <h5 className="font-medium text-[#1A1A1A]">{selectedBank.accountName}</h5>
                          <span className="text-[#8E8E93]">{selectedBank.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span className="text-[#FF3B30] cursor-pointer">Remove</span>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white rounded-lg">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-[#FF3B30] text-start font-normal">
                            Remove Account Detail
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-[#B7B7B7] text-start">
                            Remove this bank information to stop receiving payments with this
                            account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="grid grid-cols-2 gap-2 items-center">
                          <AlertDialogCancel className="mt-0 text-[#48484A] border-0">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction className="text-white bg-[#FF3B30] hover:bg-[#FF3B30]">
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            )}

            {(step === 1 || (step === 2 && selectedBank)) && (
              <div className="my-5">
                <div className="grid grid-cols-3">
                  <button
                    onClick={incrementStep}
                    className="w-full rounded-lg p-3 bg-[#0B7077] text-white text-center"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
