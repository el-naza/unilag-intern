'use client'
import { Button } from '@/components/ui/button'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllReports } from '@/services/admin/reports'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, ListFilter, Plus, Share } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddStudent from '../students/add-student'

type Report = {
  companyName: string
  reportNumber: string
  studentName: string
  reportMessage: string
  reportDate: string
}

type EmployedStudent = {
  name: string
  role: string
}

export default function HomePage() {
  const config: IFIlterConfig = {
    page: 'Home',
    showFilters: true,
    stats: [
      { label: 'Total No of Siwes Students', iconName: 'GraduationCap', count: 100 },
      { label: 'Employed Siwes Student', iconName: 'CircleCheck', count: 20 },
      { label: 'Unemployed Siwes Student', iconName: 'CircleX', count: 10 },
      { label: 'Number of companies', iconName: 'Building2', count: 10 },
    ],
  }

  const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'July', desktop: 214 },
    { month: 'August', desktop: 394 },
    { month: 'September', desktop: 120 },
    { month: 'October', desktop: 201 },
    { month: 'November', desktop: 112 },
    { month: 'December', desktop: 200 },
  ]

  const chartConfig = {
    desktop: {
      label: 'Desktop',
      color: '#2563eb',
    },
    mobile: {
      label: 'Mobile',
      color: '#60a5fa',
    },
  } satisfies ChartConfig

  // Report Table Configurations
  const [reportLoading, setReportLoading] = useState<boolean>(true)
  const [reportData, setReportData] = useState<Report[]>([])
  const [reportPage, setReportPage] = useState(0)
  const [reportPageSize, setReportPageSize] = useState(0)
  const [reportTotal, setReportTotal] = useState(0)
  const [reportHasNext, setReportHasNext] = useState(false)
  const [reportHasPrevious, setReportHasPrevious] = useState(false)

  const fetchReports = async (params?: string) => {
    const res: any = await getAllReports('departmental-coordinators', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setReportData(docs)
    setReportPage(page)
    setReportPageSize(totalPages)
    setReportHasNext(hasNextPage)
    setReportHasPrevious(hasPrevPage)
    setReportTotal(totalDocs)

    setReportLoading(false)
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const reportColumns = useMemo(
    () => [
      {
        id: 'companyName',
        header: 'Company Name',
        accessorKey: 'companyName',
      },
      {
        id: 'reportNumber',
        header: 'Report Number',
        accessorKey: 'reportNumber',
      },
      {
        id: 'studentName',
        header: 'Student Name',
        accessorKey: 'studentName',
      },
      {
        id: 'reportMessage',
        header: 'Report Message',
        accessorKey: 'reportMessage',
      },
      {
        id: 'reportDate',
        header: 'Report Date',
        accessorKey: 'reportDate',
      },
    ],
    [],
  )

  const reportTable = useReactTable({
    columns: reportColumns,
    data: reportData,
    getCoreRowModel: getCoreRowModel(),
  })

  const reportPaginationProps = {
    page: reportPage,
    pageSize: reportPageSize,
    total: reportTotal,
    hasNext: reportHasNext,
    hasPrevious: reportHasPrevious,
  }

  const reportNextPage = (page: number) => {
    setReportLoading(true)
    fetchReports(`page=${page}`)
  }

  const reportPreviousPage = (page: number) => {
    setReportLoading(true)
    fetchReports(`page=${page}`)
  }

  // Employed  Table Configurations
  const [employedData, setEmployedData] = useState<EmployedStudent[]>([])

  const fetchEmployedStudent = async () => {
    const recentParams = new URLSearchParams({ sort: new Date().toISOString() }).toString()
    const res: any = await getAllReports('departmental-coordinators', recentParams)
    const { docs } = res.data
    setEmployedData(docs)
  }

  useEffect(() => {
    fetchEmployedStudent()
  }, [])

  const employedColumns = useMemo(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
      },
      {
        id: 'role',
        header: 'Role',
        accessorKey: 'role',
      },
    ],
    [],
  )

  const employedTable = useReactTable({
    columns: employedColumns,
    data: employedData,
    getCoreRowModel: getCoreRowModel(),
  })

  const filterStats = (date: Date) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const endDate = format(date, 'yyyy-MM-dd')

    const query = new URLSearchParams({
      'where[createdAt][greater_than]': endDate,
      'where[createdAt][less_than]': today,
    }).toString()

    fetchReports(query)
  }

  const filterStatsbyDate = (date: Date) => {
    const selectedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    const query = new URLSearchParams({
      'where[createdAt][greater_than_equal]': `${selectedDate}T00:00:00.000Z`,
      'where[createdAt][less_than]': `${selectedDate}T23:59:59.999Z`,
    }).toString()

    fetchReports(query)
  }

  const [studentOpenDialog, setStudentOpenDialog] = useState(false)
  const closeDialog = () => {
    setStudentOpenDialog(false)
  }

  return (
    <div className="p-8">
      <FIlterStats {...config} onEmitFilter={filterStats} onEmitDateFilter={filterStatsbyDate} />

      <div className="grid grid-cols-12 gap-4 mt-8">
        <div className="col-span-7 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-10">
            <p>Total Reports</p>

            <Button variant="ghost" className="bg-gray-light-2">
              <ListFilter /> Month
            </Button>
          </div>

          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent className="bg-white border-none" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="#195F7E" radius={2} />
              {/* <Bar dataKey="mobile" fill="#0B7077" radius={2} /> */}
            </BarChart>
          </ChartContainer>
        </div>

        <div className="col-span-5 p-4 bg-white rounded-lg shadow-md max-h-[54%] overflow-auto">
          <div className="flex justify-between items-center">
            <p>Recently Employed Student</p>

            <Dialog open={studentOpenDialog} onOpenChange={setStudentOpenDialog}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="bg-gray-light-2">
                  <Plus /> Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-screen-md overflow-auto bg-white">
                <AddStudent onCloseEmit={closeDialog} />
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              {employedTable?.getHeaderGroups()?.map((headerGroup) => (
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
              {employedTable?.getRowModel()?.rows.map((row) => (
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
                            <span>View Company</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
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
        </div>
      </div>

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <p>All Reports</p>

          {/* <Button>Export Data</Button> */}
        </div>

        <Table>
          <TableHeader>
            {reportTable?.getHeaderGroups()?.map((headerGroup) => (
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
            {reportTable?.getRowModel().rows?.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="float-right flex gap-3">
                  <Button variant="ghost">
                    <Edit2 className="text-primary" />
                  </Button>

                  <Button variant="ghost">
                    <Share className="text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          {...reportPaginationProps}
          onEmitNextPage={reportNextPage}
          onEmitPreviousPage={reportPreviousPage}
        />
      </div>
    </div>
  )
}
