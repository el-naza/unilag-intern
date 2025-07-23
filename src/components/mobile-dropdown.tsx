'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MobileDropdown({ isOpen, setIsOpen, header = undefined as any, children }) {
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    startY.current = e.touches[0].clientY
    currentY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current

    if (deltaY > 0) {
      setDragY(deltaY)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return

    setIsDragging(false)

    if (dragY > 100) {
      setIsOpen(false)
    }

    setDragY(0)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startY.current = e.clientY
    currentY.current = e.clientY
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return

    currentY.current = e.clientY
    const deltaY = currentY.current - startY.current

    if (deltaY > 0) {
      setDragY(deltaY)
    }
  }

  const handleMouseUp = () => {
    if (!isDragging) return

    setIsDragging(false)

    if (dragY > 100) {
      setIsOpen(false)
    }

    setDragY(0)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragY])

  return (
    <>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div
            ref={modalRef}
            className="w-full bg-white rounded-t-3xl max-h-[80vh] overflow-hidden transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${dragY}px)`,
              opacity: Math.max(0.3, 1 - dragY / 300),
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            {!!header && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">{header}</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            )}

            {children}
          </div>
        </div>
      )}
    </>
  )
}
