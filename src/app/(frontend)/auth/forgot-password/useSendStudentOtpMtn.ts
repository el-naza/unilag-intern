'use client'

import sendStudentOTP from '@/services/sendStudentOTP'
import { authStore } from '@/store/authStore'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function useSendStudentOtpMtn() {
  return useMutation({
    mutationFn: async (matricNo: string) => {
      try {
        let res = await sendStudentOTP({ matricNo })

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
              matricNo,
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
