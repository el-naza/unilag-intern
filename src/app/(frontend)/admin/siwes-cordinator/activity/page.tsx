'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDebounce } from '@/custom-hooks/useDebounce'
import { getAllActivities } from '@/services/admin/activities'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Edit2, EllipsisVertical, Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import { format } from 'date-fns'

type Activity = {
  users: string
  activities: string
  message: string
  status: string
  timeDate: string
}

export default function ReportPage() {
  const [config, setConfig] = useState<IFIlterConfig>({
    page: 'Activity',
    showFilters: false,
    stats: [{ label: 'Total No of Activities', iconName: 'MessageCircleQuestion', count: 0 }],
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [activities, setActivities] = useState<Activity[]>([])
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchActivities = async (params?: string) => {
    const res: any = await getAllActivities('reports', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setActivities(docs)
    setPerPage(page)
    setPageSize(totalPages)
    setHasNext(hasNextPage)
    setHasPrevious(hasPrevPage)
    setTotal(totalDocs)

    setConfig((prevConfig) => {
      if (prevConfig.stats[0].count === totalDocs) return prevConfig // Prevent unnecessary re-renders
      return {
        ...prevConfig,
        stats: prevConfig.stats.map((stat, index) =>
          index === 0 ? { ...stat, count: totalDocs } : stat,
        ),
      }
    })

    setLoading(false)
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const columns = useMemo(
    () => [
      {
        id: 'users',
        header: 'Users',
        accessorKey: 'users',
      },
      {
        id: 'activities',
        header: 'Activities',
        accessorKey: 'activities',
      },
      {
        id: 'message',
        header: 'Messages',
        accessorKey: 'message',
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
      },
      {
        id: 'timeDate',
        header: 'Time & Date',
        accessorKey: 'timeDate',
        cell: ({ getValue, row }) => {
          const rowData = row.original
          return `${rowData.startDate ? format(new Date(getValue()), 'MMM dd, yyyy') : 'N/A'}`
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: activities,
    getCoreRowModel: getCoreRowModel(),
  })

  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchActivities(`page=${page}`)
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchActivities(`page=${page}`)
  }

  const [query, setQuery] = useState('')
  const [searchFilter, setSearchFilter] = React.useState<'user' | 'activity'>('user')
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    switch (searchFilter) {
      case 'user':
        fetchActivities(new URLSearchParams({ 'where[user][like]': debouncedQuery }).toString())
        break
      case 'activity':
        fetchActivities(new URLSearchParams({ 'where[activity][like]': debouncedQuery }).toString())
        break
    }
  }, [debouncedQuery, searchFilter])

  return (
    <div className="p-8">
      <FIlterStats config={config} />

      <div className="flex justify-between items-center mt-8">
        <div></div>
        <div className="flex gap-4 items-center">
          <Select
            value={searchFilter}
            onValueChange={(value) => setSearchFilter(value as 'user' | 'activity')}
          >
            <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="activity">Activity</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            className="border-[1px] border-gray-light-2 w-[full]"
            placeholder="Search by user, activity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p>All Reports</p>

          <Button>Export Data</Button>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
                <TableHead></TableHead>
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="float-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        <EllipsisVertical className="text-primary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white border-none">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Edit2 />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          {...paginationProps}
          onEmitNextPage={nextPage}
          onEmitPreviousPage={previousPage}
        />
      </div>
    </div>
  )
}
