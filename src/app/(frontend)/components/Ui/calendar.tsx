'use client'
import React, { useState } from 'react'
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns'

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-[16px]">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-gray-500 hover:text-black border rounded h-[28px] w-[28px]"
      >
        &#8249;
      </button>
      <h2 className="text-lg font-bold text-black">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-gray-500 hover:text-black border rounded h-[28px] w-[28px]"
      >
        &#8250;
      </button>
    </div>
  )

  const renderDays = () => {
    const days: React.ReactNode[] = []
    const dateFormat = 'EEE'

    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 })

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-xs font-medium text-center text-gray-700 h-[52px]">
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      )
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows: React.ReactNode[] = []
    let days: React.ReactNode[] = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const isToday = isSameDay(day, selectedDate)
        const isCurrentMonth = isSameMonth(day, monthStart)

        days.push(
          <div className="h-[52px]">
            <div
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`h-[32px] w-[32px] text-sm text-center cursor-pointer rounded-full  flex items-center justify-center ${
                isToday
                  ? 'bg-blue-500 text-white'
                  : isCurrentMonth
                    ? 'text-black hover:bg-gray-100'
                    : 'text-gray-400'
              }`}
            >
              {format(day, 'd')}
            </div>
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>,
      )
      days = []
    }

    return <div>{rows}</div>
  }

  return (
    <div className="w-[356px] bg-white rounded-lg p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default Calendar
