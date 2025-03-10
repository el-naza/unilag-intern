'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { format, subMonths, subWeeks, subYears } from 'date-fns'
import { CalendarDays, ListFilter, icons } from 'lucide-react'
import React from 'react'

export interface IFIlterConfig {
  page: string
  showFilters: boolean
  stats: { label: string; iconName: string; count: number }[]
  onEmitFilter?: (date: Date) => void
  onEmitDateFilter?: (date: Date) => void
}

const FilterStats = ({ page, showFilters, stats, onEmitFilter, onEmitDateFilter }: IFIlterConfig) => {
  const formattedDate = format(new Date(), 'EEEE do MMMM yyyy')

  const [date, setDate] = React.useState<Date>(new Date())
  const [filterValue, setFilterValue] = React.useState<string>('today')

  const [openPopover, setOpenPopover] = React.useState(false)
  const closePopover = () => {
    setOpenPopover(false)
  }

  const selectDate = (date: Date) => {
    setDate(date)
    onEmitDateFilter(date)
    closePopover()
  }

  const emitFilterTrigger = (value: string) => {    
    setFilterValue(value)

    switch (value) {
      case 'today': {
        onEmitFilter(new Date())
        break
      }
      case 'week': {
        const lastWeek = subWeeks(new Date(), 1);
        onEmitFilter(lastWeek)
        break
      }
      case 'month': {
        const lastMonth = subMonths(new Date(), 1);
        onEmitFilter(lastMonth)
        break
      }
      case 'year': {
        const lastYear = subYears(new Date(), 1);
        onEmitFilter(lastYear)
        break
      }
    }
  }

  return (
    <>
      <h1 className="font-semibold text-[1.5rem]">{page}</h1>
      <p>{formattedDate}</p>

      {showFilters && (
        <div className="flex items-center gap-4 mt-8">
          <ToggleGroup
            type="single"
            value={filterValue}
            onValueChange={(value) => emitFilterTrigger(value)}
          >
            <ToggleGroupItem
              value="today"
              aria-label="Toggle today"
              className={`${filterValue === 'today' ? 'bg-[#B3FAFF]' : 'bg-gray-light-5'}`}
            >
              Today
            </ToggleGroupItem>
            <ToggleGroupItem
              value="week"
              aria-label="Toggle week"
              className={`${filterValue === 'week' ? 'bg-[#B3FAFF]' : 'bg-gray-light-5'}`}
            >
              Week
            </ToggleGroupItem>
            <ToggleGroupItem
              value="month"
              aria-label="Toggle month"
              className={`${filterValue === 'month' ? 'bg-[#B3FAFF]' : 'bg-gray-light-5'}`}
            >
              Month
            </ToggleGroupItem>
            <ToggleGroupItem
              value="year"
              aria-label="Toggle year"
              className={`${filterValue === 'year' ? 'bg-[#B3FAFF]' : 'bg-gray-light-5'}`}
            >
              Year
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="flex gap-2">
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="bg-gray-light-5">
                  <CalendarDays /> Filter by Date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full bg-white border-none">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(day) => day && selectDate(day)}
                />
              </PopoverContent>
            </Popover>

            <Button variant="ghost" className="bg-gray-light-5">
              <ListFilter /> Filter by Batch
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mt-8">
        {stats.map((stat, index) => {
          const Icon = icons[stat.iconName]

          return (
            <div key={index} className="bg-gray-light-2 p-4 rounded-[10px]">
              <h2 className="font-medium text-[1.2rem]">{stat.label}</h2>
              <p className="text-primary text-[2.5rem] flex items-center gap-4 mt-4">
                {' '}
                {Icon && <Icon className="w-[40px] h-[40px]" />} {stat.count}
              </p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default FilterStats
