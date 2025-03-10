'use client'
import * as React from 'react'
import { clsx } from '../utils/clsx'

interface DropdownProps {
  handleClose: () => void
  open: boolean // Control open state externally
  children: React.ReactNode | JSX.Element
  style?: React.CSSProperties
  popupStyles?: React.CSSProperties
  position?: 'left' | 'right' | 'center'
}

export default function AppPopover({
  handleClose,
  open,
  children,
  position = 'center',
}: DropdownProps) {
  return (
    <>
      {open ? (
        <>
          <div
            className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none"
            style={{ zIndex: '999' }}
          >
            <div
              className={clsx(
                'w-auto my-6 mx-auto max-w-[80%] right-0',
                position === 'left' && 'absolute left-0 top-0',
                position === 'right' && 'absolute right-0 top-0',
                position === 'center' && 'relative',
              )}
              style={{ zIndex: '1000' }}
            >
              {/* Content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {children}
              </div>
            </div>
            <div
              className="fixed inset-0"
              style={{ backgroundColor: 'rgba(198, 203, 214, 0.6)' }}
              onClick={handleClose}
            ></div>
          </div>
        </>
      ) : null}
    </>
  )
}
