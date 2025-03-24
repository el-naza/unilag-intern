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
import { Edit2, EllipsisVertical, Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import { format } from 'date-fns'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Spinner from '@/components/spinner'
import ReactSelect from 'react-select'
import { useMutation } from '@tanstack/react-query'
import updateDoc from '@/services/updateDoc'
import { toast } from 'sonner'

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
  const [openDialog, setOpenDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [grade, setGrade] = useState('')
  const [reportId, seReportId] = useState('')

  const formattedReports = useMemo(
    () =>
      reports.map((report: any) => {
        return {
          ...report,
          reportDate: format(new Date(report.createdAt), 'MMM dd, yyyy'),
          companyName: report.employment?.company?.name,
          reportMessage: report.details,
          reportRemark: report.remark,
          studentName: `${report.student?.firstName} ${report.student?.lastName}`,
          status: report.status.charAt(0).toUpperCase() + report.status.slice(1),
        }
      }),
    [reports],
  )

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

  const launchGradeReport = (reportId: string) => {
    setOpenDialog(true)
    seReportId(reportId)
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
        id: 'studentName',
        header: 'Student Name',
        accessorKey: 'studentName',
      },
      {
        id: 'week',
        header: 'Week',
        accessorKey: 'week',
      },
      {
        id: 'reportMessage',
        header: 'Report Message',
        accessorKey: 'reportMessage',
      },
      {
        id: 'reportRemark',
        header: 'Report Remark',
        accessorKey: 'reportRemark',
      },
      {
        id: 'status',
        header: 'Report Status',
        accessorKey: 'status',
      },
      {
        id: 'grade',
        header: 'Report Grade',
        accessorKey: 'grade',
      },
      {
        id: 'reportDate',
        header: 'Report Date',
        accessorKey: 'reportDate',
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: formattedReports,
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

  const gradeReport = async () => {
    if (!grade) {
      toast.error('Please select a grade')
      return
    }
    setSubmitting(true)
    await updateReportMtn.mutateAsync()
  }

  const updateReportMtn = useMutation({
    mutationFn: async () => {
      try {
        const res = await updateDoc('reports', reportId, { grade })

        if (!res) {
          toast.error('Network error; please try again later')
          return
        }
        toast.success('Report updated')

        console.log('Response:', res)
        fetchReports()
        setOpenDialog(false)
        return res
      } catch (error) {
        console.error('Error updating report:', error)
        toast.error('An error occurred while updating; please try again later')
      } finally {
        setSubmitting(false)
      }
    },
  })

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
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => launchGradeReport(row.original.id)}
                        >
                          <Edit2 />
                          <span>Grade Report</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white rounded-lg gap-2">
            <DialogTitle className="text-[#0B7077] font-normal">Grade Report</DialogTitle>
            <DialogDescription className="text-[#8E8E93]">Select Grade</DialogDescription>
            <div className="grid gap-4 text-center">
              <Select onValueChange={(value) => setGrade(value)}>
                <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-full">
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter className="grid grid-cols-4 gap-1">
              <DialogClose className="col-start-2 text-xs bg-white text-[#48484A] border-0">
                Cancel
              </DialogClose>
              <button
                disabled={submitting}
                onClick={gradeReport}
                className="w-full flex disabled:opacity-50 items-center col-span-2 rounded p-2 text-xs bg-[#0B7077] text-white text-center"
              >
                <div className="flex m-auto">
                  <span>Submit</span> {submitting && <Spinner className="ms-1 h-4" />}
                </div>
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Pagination
          {...paginationProps}
          onEmitNextPage={nextPage}
          onEmitPreviousPage={previousPage}
        />
      </div>
    </div>
  )
}
