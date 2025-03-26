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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllCompanies } from '@/services/admin/companies'
import { getAllReports, getEmployments } from '@/services/admin/reports'
import { deleteStudent, getAllStudents } from '@/services/admin/students'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, ListFilter, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { toast } from 'sonner'
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
  const [config, setConfig] = useState<IFIlterConfig>({
    page: 'Home',
    showFilters: true,
    stats: [
      { label: 'Total No of Siwes Students', iconName: 'GraduationCap', count: 0 },
      { label: 'Employed Siwes Student', iconName: 'CircleCheck', count: 0 },
      { label: 'Unemployed Siwes Student', iconName: 'CircleX', count: 0 },
      { label: 'Number of companies', iconName: 'Building2', count: 0 },
    ],
  })

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
  const router = useRouter()
  const [openPopover, setOpenPopover] = useState(false)

  const fetchReports = async (params?: string) => {
    return getAllReports('reports', params).then((res: any) => {
      const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
      console.log('Reports: ', docs)

      setReportData(docs)
      setReportPage(page)
      setReportPageSize(totalPages)
      setReportHasNext(hasNextPage)
      setReportHasPrevious(hasPrevPage)
      setReportTotal(totalDocs)
    })
  }

  const fetchEmployments = async () => {
    const query = new URLSearchParams({ 'sort': '-createdAt' }).toString()
    return getEmployments('employments', query).then((res: any) => {
      const { docs } = res.data
      setEmployedData(docs)
    })
  }

  const fetchTotalStudents = () => {
    const query = new URLSearchParams({ 'select[none]': 'true' }).toString()
    return getAllStudents('students', query).then((res: any) => {
      const { totalDocs } = res.data

      setConfig((prevConfig) => ({
        ...prevConfig,
        stats: prevConfig.stats.map((stat, index) =>
          index === 0 ? { ...stat, count: totalDocs } : stat,
        ),
      }))
    })
  }

  const fetchTotalCompanies = () => {
    const query = new URLSearchParams({ 'select[none]': 'true' }).toString()
    return getAllCompanies('companies', query).then((res: any) => {
      const { totalDocs } = res.data

      setConfig((prevConfig) => ({
        ...prevConfig,
        stats: prevConfig.stats.map((stat, index) =>
          index === 3 ? { ...stat, count: totalDocs } : stat,
        ),
      }))
    })
  }

  useEffect(() => {
    Promise.allSettled([fetchTotalStudents(), fetchTotalCompanies()]).then(() =>
      console.log('Analytics data fetched'),
    )

    Promise.allSettled([fetchReports(), fetchEmployments()]).then(() =>
      console.log('Reports and employment data fetched'),
    )
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
  const employedColumns = useMemo(
    () => [
      {
        id: 'name',
        header: 'Name',
        accessorKey: 'name',
        cell: ({ _, row }) => {
          const rowData = row.original
          return `${rowData.student.firstName} ${rowData.student.lastName}`
        },
      },
      {
        id: 'department',
        header: 'Department',
        accessorKey: 'department',
        cell: ({ _, row }) => {
          const rowData = row.original
          return `${rowData.student.course}`
        },
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

  const viewCompany = (row: any) => {
    const companyId = row.original.company.id
    router.push(`/admin/siwes-cordinator/companies/${companyId}`)
  }

  const editStudent = (row: any) => {
    const studentId = row.original.student.id
    router.push(`/admin/department-cordinator/students/${studentId}`)
  }

  const deleteAStudent = async (row: any) => {
    const studentId = row.original.student.id
    const res = await deleteStudent('students', studentId)
    fetchEmployments()
    toast.success('Student deleted successfully')
  }

  return (
    <div className="p-8">
      <FIlterStats {...config} onEmitFilter={filterStats} onEmitDateFilter={filterStatsbyDate} />

      <div className="grid grid-cols-12 gap-4 mt-8 items-start h-[33rem] py-4">
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

        <div className="col-span-5 p-4 bg-white rounded-lg shadow-md h-full overflow-auto">
          <div className="flex justify-between items-center">
            <p>Recently Added Student</p>

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
                          <DropdownMenuItem onClick={() => viewCompany(row)}>
                            <span>View Company</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => editStudent(row)}>
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <Popover open={openPopover} onOpenChange={setOpenPopover}>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" className="text-red-500 px-0 pl-[9px]">
                                <span>Delete</span>
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <p className="text-neutral-400 mb-3">This action cannot be undone!</p>
                              <div className="flex gap-4 items-center w-full">
                                <Button
                                  variant="ghost"
                                  className="w-full"
                                  onClick={() => setOpenPopover(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  className="w-full"
                                  onClick={() => {
                                    deleteAStudent(row)
                                    setOpenPopover(false)
                                  }}
                                >
                                  Continue
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
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
          {...reportPaginationProps}
          onEmitNextPage={reportNextPage}
          onEmitPreviousPage={reportPreviousPage}
        />
      </div>
    </div>
  )
}
