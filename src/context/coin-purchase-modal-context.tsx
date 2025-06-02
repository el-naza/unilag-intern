'use client'

import type React from 'react'

import { createContext, useContext, useState } from 'react'
import { CoinModal } from '@/components/coin-purchase-modal'

interface CoinPurchaseModalContextType {
  openCoinModal: () => void
  closeCoinModal: () => void
}

const CoinPurchaseModalContext = createContext<CoinPurchaseModalContextType>({
  openCoinModal: () => {},
  closeCoinModal: () => {},
})

export function CoinPurchaseModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  const openCoinModal = () => setOpen(true)
  const closeCoinModal = () => setOpen(false)

  return (
    <CoinPurchaseModalContext.Provider value={{ openCoinModal, closeCoinModal }}>
      {children}
      <CoinModal open={open} onOpenChange={setOpen} />
    </CoinPurchaseModalContext.Provider>
  )
}

export const useCoinPurchaseModal = () => useContext(CoinPurchaseModalContext)
