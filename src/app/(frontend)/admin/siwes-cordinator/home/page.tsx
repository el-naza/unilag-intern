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
import { Edit2, EllipsisVertical, Eye, ListFilter, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'
import { toast } from 'sonner'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddStudent from '../students/add-student'
import Spinner from '@/components/spinner'

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

  const [chartData, setChartData] = useState<{ month: string; report: number }[]>([
    { month: 'January', report: 0 },
    { month: 'February', report: 0 },
    { month: 'March', report: 0 },
    { month: 'April', report: 0 },
    { month: 'May', report: 0 },
    { month: 'July', report: 0 },
    { month: 'August', report: 0 },
    { month: 'September', report: 0 },
    { month: 'October', report: 0 },
    { month: 'November', report: 0 },
    { month: 'December', report: 0 },
  ])

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
  const [chartsLoading, setChartsLoading] = useState<boolean>(true)
  const [recentEmploymentsLoading, setRecentEmploymentsLoading] = useState<boolean>(true)

  const [reportData, setReportData] = useState<Report[]>([])
  const [reportPage, setReportPage] = useState(0)
  const [reportPageSize, setReportPageSize] = useState(0)
  const [reportTotal, setReportTotal] = useState(0)
  const [reportHasNext, setReportHasNext] = useState(false)
  const [reportHasPrevious, setReportHasPrevious] = useState(false)
  const router = useRouter()
  const [openPopover, setOpenPopover] = useState(false)

  const [totalStudents, setTotalStudents] = useState(0)
  const [totalEmployments, setTotalEmployments] = useState(0)

  const fetchReports = useCallback(async (params?: any) => {
    setReportLoading(true)

    try {
      const res: any = await getAllReports('reports', params)
      const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
      setReportData(docs)
      setReportPage(page)
      setReportPageSize(totalPages)
      setReportTotal(totalDocs)
      setReportHasNext(hasNextPage)
      setReportHasPrevious(hasPrevPage)

      setReportLoading(false)
    } catch (error) {
      console.error('Error fetching reports:', error)
    }
  }, [])

  const fetchEmployments = useCallback(async () => {
    setRecentEmploymentsLoading(true)

    try {
      const query = new URLSearchParams({ sort: '-createdAt' }).toString()
      const res: any = await getEmployments('employments', query)
      const { docs, totalDocs } = res.data

      setEmployedData(docs)
      setTotalEmployments(totalDocs)

      setConfig((prev) => ({
        ...prev,
        stats: prev.stats.map((stat, index) =>
          index === 1 ? { ...stat, count: totalDocs } : stat,
        ),
      }))

      setRecentEmploymentsLoading(false)
    } catch (error) {
      console.error('Error fetching employments:', error)
    }
  }, [])

  const fetchCompanies = useCallback(async () => {
    try {
      const query = new URLSearchParams({ 'select[none]': 'true' }).toString()
      const res: any = await getAllCompanies('companies', query)
      const { totalDocs } = res.data
      setConfig((prev) => ({
        ...prev,
        stats: prev.stats.map((stat, index) =>
          index === 3 ? { ...stat, count: totalDocs } : stat,
        ),
      }))
    } catch (error) {
      console.error('Error fetching companies:', error)
    }
  }, [])

  const fetchStudents = useCallback(async () => {
    try {
      const query = new URLSearchParams({ 'select[none]': 'true' }).toString()
      const res: any = await getAllStudents('students', query)
      const { totalDocs } = res.data

      setTotalStudents(totalDocs)
      setConfig((prev) => ({
        ...prev,
        stats: prev.stats.map((stat, index) =>
          index === 0 ? { ...stat, count: totalDocs } : stat,
        ),
      }))
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }, [])

  // JAN CHARTS REPORT
  const fetchJanReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfJanuary = `${currentYear}-01-01T00:00:00.000Z`
      const endOfJanuary = `${currentYear}-01-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfJanuary,
        'where[createdAt][less_than]': endOfJanuary,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'January' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching Jan reports:', error)
    }
  }, [])

  // FEB CHARTS REPORT
  const fetchFebReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfFeburary = `${currentYear}-02-01T00:00:00.000Z`
      const endOfFeburary = `${currentYear}-02-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfFeburary,
        'where[createdAt][less_than]': endOfFeburary,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'Feburary' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching feb reports:', error)
    }
  }, [])

  // MAR CHARTS REPORT
  const fetchMarReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfMarch = `${currentYear}-03-01T00:00:00.000Z`
      const endOfMarch = `${currentYear}-03-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfMarch,
        'where[createdAt][less_than]': endOfMarch,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'March' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching march reports:', error)
    }
  }, [])

  // APR CHARTS REPORT
  const fetchAprilReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfApril = `${currentYear}-04-01T00:00:00.000Z`
      const endOfApril = `${currentYear}-04-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfApril,
        'where[createdAt][less_than]': endOfApril,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'April' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching april reports:', error)
    }
  }, [])

  // MAY CHARTS REPORT
  const fetchMayReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfMay = `${currentYear}-05-01T00:00:00.000Z`
      const endOfMay = `${currentYear}-05-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfMay,
        'where[createdAt][less_than]': endOfMay,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'May' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching may reports:', error)
    }
  }, [])

  // JUNE CHARTS REPORT
  const fetchJuneReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfJune = `${currentYear}-06-01T00:00:00.000Z`
      const endOfJune = `${currentYear}-06-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfJune,
        'where[createdAt][less_than]': endOfJune,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'June' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching june reports:', error)
    }
  }, [])

  // JULY CHARTS REPORT
  const fetchJulyReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfJuly = `${currentYear}-07-01T00:00:00.000Z`
      const endOfJuly = `${currentYear}-07-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfJuly,
        'where[createdAt][less_than]': endOfJuly,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'July' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching july reports:', error)
    }
  }, [])

  // AUG CHARTS REPORT
  const fetchAugReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfAug = `${currentYear}-08-01T00:00:00.000Z`
      const endOfAug = `${currentYear}-08-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfAug,
        'where[createdAt][less_than]': endOfAug,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'August' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching august reports:', error)
    }
  }, [])

  // SEPT CHARTS REPORT
  const fetchSeptReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfSept = `${currentYear}-09-01T00:00:00.000Z`
      const endOfSept = `${currentYear}-09-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfSept,
        'where[createdAt][less_than]': endOfSept,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'September' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching sept reports:', error)
    }
  }, [])

  // OCT CHARTS REPORT
  const fetchOctReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfOct = `${currentYear}-10-01T00:00:00.000Z`
      const endOfOct = `${currentYear}-10-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfOct,
        'where[createdAt][less_than]': endOfOct,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'October' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching october reports:', error)
    }
  }, [])

  // NOV CHARTS REPORT
  const fetchNovReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfNov = `${currentYear}-11-01T00:00:00.000Z`
      const endOfNov = `${currentYear}-11-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfNov,
        'where[createdAt][less_than]': endOfNov,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'November' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching nov reports:', error)
    }
  }, [])

  // DEC CHARTS REPORT
  const fetchDecReports = useCallback(async () => {
    try {
      const currentYear = new Date().getFullYear()

      const startOfDec = `${currentYear}-12-01T00:00:00.000Z`
      const endOfDec = `${currentYear}-12-31T23:59:59.999Z`

      const query = new URLSearchParams({
        'where[createdAt][greater_than]': startOfDec,
        'where[createdAt][less_than]': endOfDec,
      }).toString()

      const res: any = await getAllReports('reports', query)
      const { totalDocs } = res.data

      setChartData((prev) =>
        prev.map((data) => (data.month === 'December' ? { ...data, report: totalDocs } : data)),
      )
    } catch (error) {
      console.error('Error fetching dec reports:', error)
    }
  }, [])

  useEffect(() => {
    Promise.allSettled([
      fetchEmployments(),
      fetchStudents(),
      fetchReports(),
      fetchCompanies(),
    ]).then(() => {
      setConfig((prevConfig) => ({
        ...prevConfig,
        stats: prevConfig.stats.map((stat, index) =>
          index === 2 ? { ...stat, count: totalStudents - totalEmployments } : stat,
        ),
      }))
    })

    // CHARTs
    Promise.allSettled([
      fetchJanReports(),
      fetchFebReports(),
      fetchMarReports(),
      fetchAprilReports(),
      fetchMayReports(),
      fetchJuneReports(),
      fetchJulyReports(),
      fetchAugReports(),
      fetchSeptReports(),
      fetchOctReports(),
      fetchNovReports(),
      fetchDecReports(),
    ]).then((_) => {
      setChartsLoading(false)
    })
  }, [
    fetchReports,
    fetchEmployments,
    fetchCompanies,
    fetchStudents,
    totalEmployments,
    totalStudents,
    fetchJanReports,
    fetchFebReports,
    fetchMarReports,
    fetchAprilReports,
    fetchMayReports,
    fetchJuneReports,
    fetchJulyReports,
    fetchAugReports,
    fetchSeptReports,
    fetchOctReports,
    fetchNovReports,
    fetchDecReports,
  ])

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
        id: 'student',
        header: 'Student Name',
        accessorKey: 'student',
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
        cell: ({ data, row }) => {
          const rowData = row.original
          return `${rowData.student.firstName} ${rowData.student.lastName}`
        },
      },
      {
        id: 'department',
        header: 'Department',
        accessorKey: 'department',
        cell: ({ data, row }) => {
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

      <div className="grid grid-cols-12 gap-4 mt-8 items-start py-4">
        <div className="col-span-7 p-4 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-10">
            <p>Total Reports</p>

            {chartsLoading && (
              <Spinner className="border-t-primary border-r-primary border-b-primary" />
            )}

            {/* <Button variant="ghost" className="bg-gray-light-2">
              <ListFilter /> Month
            </Button> */}
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
              <Bar dataKey="report" fill="#195F7E" radius={2} />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="col-span-5 p-4 bg-white rounded-lg shadow-md max-h-[60vh] overflow-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p>Recently Added Student</p>
              {recentEmploymentsLoading && (
                <Spinner className="border-t-primary border-r-primary border-b-primary" />
              )}
            </div>

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

          {reportLoading && (
            <Spinner className="border-t-primary border-r-primary border-b-primary" />
          )}
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
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`students/${row.original?.student?.id}#report`)
                          }
                        >
                          <Eye />
                          <span>View Student Report</span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem onClick={() => console.log(row.original)}>
                          <Eye />
                          <span>View Company Report</span>
                        </DropdownMenuItem> */}
                        {/* <Popover open={openPopover} onOpenChange={setOpenPopover}>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" className="text-red-500 px-0 pl-[9px]">
                              <Trash />
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
                                  deleteReport(row)
                                  setOpenPopover(false)
                                }}
                              >
                                Continue
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover> */}
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
