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
import { getAllReports } from '@/services/admin/reports'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'

type Report = {
  companyName: string
  reportNumber: string
  studentName: string
  reportMessage: string
  reportDate: string
}

export default function ReportPage() {
  const [config, setConfig] = useState<IFIlterConfig>({
    page: 'Report',
    showFilters: false,
    stats: [{ label: 'Total No of Reports', iconName: 'FileText', count: 0 }],
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [reports, setReports] = useState<Report[]>([])
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchReports = async (params?: string) => {
    const res: any = await getAllReports('reports', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setReports(docs)
    setPerPage(page)
    setPageSize(totalPages)
    setHasNext(hasNextPage)
    setHasPrevious(hasPrevPage)
    setTotal(totalDocs)

    setConfig((prevConfig) => {
      if (prevConfig.stats[0].count === totalDocs) return prevConfig
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
    fetchReports()
  }, [])

  const columns = useMemo(
    () => [
      {
        id: 'companyName',
        header: 'Company Name',
        accessorKey: 'companyName',
      },
      {
        id: 'reportNumber',
        header: 'Report Week',
        accessorKey: 'reportNumber',
      },
      {
        id: 'studentName',
        header: 'Student Name',
        accessorKey: 'studentName',
        cell: ({ _, row }) => {
          const rowData = row.original
          return `${rowData.student.firstName} ${rowData.student.lastName}`
        },
      },
      {
        id: 'title',
        header: 'Report Message',
        accessorKey: 'title',
      },
      {
        id: 'createdAt',
        header: 'Report Date',
        accessorKey: 'createdAt',
        cell: ({ getValue }) => {
          const rawDate = getValue()
          return rawDate ? format(new Date(rawDate), 'MMM dd, yyyy') : 'N/A'
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: reports,
    getCoreRowModel: getCoreRowModel(),
  })

  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchReports(`page=${page}`)
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchReports(`page=${page}`)
  }

  const [query, setQuery] = useState('')
  const [searchFilter, setSearchFilter] = React.useState<'company' | 'report-number'>()
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    switch (searchFilter) {
      case 'company':
        fetchReports(new URLSearchParams({ 'where[name][like]': debouncedQuery }).toString())
        break
      case 'report-number':
        fetchReports(
          new URLSearchParams({ 'where[reportNumber][like]': debouncedQuery }).toString(),
        )
        break
    }
  }, [debouncedQuery, searchFilter])

  return (
    <div className="p-8">
      <FIlterStats {...config} />

      <div className="flex justify-between items-center mt-8">
        <div></div>

        <div className="flex gap-4 items-center">
          <Select onValueChange={(value) => setSearchFilter(value as 'company' | 'report-number')}>
            <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="company">Company Name</SelectItem>
                <SelectItem value="report-number">Report Number</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            className="border-[1px] border-gray-light-2 w-[full]"
            placeholder="Search by name, report no..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p>All Reports</p>

          {/* <Button>Export Data</Button> */}
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
