

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
  isBefore,
} from 'date-fns'

interface CalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const handleDateClick = (date: Date) => {
    if (!isBefore(date, new Date())) {
      onDateSelect(date) // Update selected date in parent component
    }
  }

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-gray-500 hover:text-black border rounded h-7 w-7 bg-white"
        type='button'
      >
        &#8249;
      </button>
      <h2 className="text-lg font-medium text-black">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-gray-500 hover:text-black border rounded h-7 w-7 bg-white"
        type='button'
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
        <div
          key={i}
          className="text-xs font-medium text-center text-gray-700 h-12 flex items-center justify-center"
        >
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      )
    }

    return <div className="grid grid-cols-7">{days}</div>
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
        const isToday = isSameDay(day, new Date()) // Today's date
        const isSelected = isSameDay(day, selectedDate) // Selected date
        const isCurrentMonth = isSameMonth(day, monthStart)
        const isPastDate = isBefore(day, new Date())

        days.push(
          <div key={day.getTime()} className="h-12 flex items-center justify-center">
            <div
              onClick={() => handleDateClick(day)}
              className={`h-8 w-8 text-sm text-center cursor-pointer rounded-full flex items-center justify-center transition-all 
                ${
                  isSelected
                    ? 'bg-[#0B7077] text-white' // Green color for selected date
                    : isToday
                      ? 'bg-[#0B7077] text-white' // Default highlight for today
                      : isPastDate
                        ? 'text-gray-300 cursor-not-allowed' // Grey out past dates
                        : isCurrentMonth
                          ? 'text-black hover:bg-gray-200' // Regular days
                          : 'text-gray-400'
                }
              `}
            >
              {format(day, 'd')}
            </div>
          </div>,
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.getTime()} className="grid grid-cols-7">
          {days}
        </div>,
      )
      days = []
    }

    return <div>{rows}</div>
  }

  return (
    <div className="w-full rounded-lg p-4">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export default Calendar
