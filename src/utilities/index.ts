export { cn } from './cn'

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)[a-zA-Z0-9\W]+$/

export const randomString = (length: number) =>
  [...crypto.getRandomValues(new Uint8Array(length))]
    .map((n) => String.fromCharCode(33 + (n % 94)))
    .join('')

export const pricePerCoin = 500 // 500 naira per coin
