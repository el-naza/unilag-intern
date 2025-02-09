'use client'

import sendCompanyOTP from '@/services/company/sendCompanyOTP'
import { authStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useSendCompanyOtpMtn() {
  return useMutation({
    mutationFn: async (email: string) => {
      try {
        console.log(email)
        let res = await sendCompanyOTP({ email })

        console.log('res', res)
        if (!res) {
          const errMsg = 'Network err; pls try again later'
          toast.error(errMsg)
          return errMsg
        }

        if (res.email) {
          authStore.setState((state) => {
            return {
              ...state,
              email: res.email!,
            }
          })

          return
        }

        return res.message
      } catch {
        const errMsg = 'An error occured; pls try again later'
        toast.error(errMsg)
        return errMsg
      }
    },
  })
}
