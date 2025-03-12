import { Store } from '@tanstack/react-store'

export const authStore = new Store({
  matricNo: '',
  email: '',
  passwordResetToken: '',
  signUpAuthToken: '',
  signedUpUserId: '',
})
