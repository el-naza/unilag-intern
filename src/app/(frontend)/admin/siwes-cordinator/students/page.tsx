'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useDebounce } from '@/custom-hooks/useDebounce'
import { deleteStudent, getAllStudents } from '@/services/admin/students'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddStudent from './add-student'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getEmployments } from '@/services/admin/reports'
import Spinner from '@/components/spinner'

export type Student = {
  id: string
  firstName: string
  matricNo: string
  course: string
  email: string
  stateOfOrigin: string
  status: string
  date: string
}

export default function StudentPage() {
  const [config, setConfig] = useState<IFIlterConfig>({
    page: 'Students',
    showFilters: true,
    stats: [
      { label: 'Total No of Siwes Students', iconName: 'GraduationCap', count: 0 },
      { label: 'Employed Siwes Student', iconName: 'CircleCheck', count: 0 },
      { label: 'Unemployed Siwes Student', iconName: 'CircleX', count: 0 },
    ],
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [students, setStudents] = useState<Student[]>([])
  const [filter, setFilter] = React.useState<string>('all')
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [openPopover, setOpenPopover] = useState(false)
  const router = useRouter()
  const [totalStudents, setTotalStudents] = useState(0)
  const [totalEmployments, setTotalEmployments] = useState(0)

  const fetchStudents = useCallback(async (params?: string) => {
    setLoading(true)

    const res: any = await getAllStudents('students', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setTotalStudents(totalDocs)

    setStudents(docs)
    setPerPage(page)
    setPageSize(totalPages)
    setHasNext(hasNextPage)
    setHasPrevious(hasPrevPage)
    setTotal(totalDocs)

    setConfig((prevConfig) => ({
      ...prevConfig,
      stats: prevConfig.stats.map((stat, index) =>
        index === 0 ? { ...stat, count: totalDocs } : stat,
      ),
    }))

    setLoading(false)
  }, [])

  const fetchEmployments = useCallback(async () => {
    try {
      const query = new URLSearchParams({ 'select[none]': 'true' }).toString()
      const res: any = await getEmployments('employments', query)
      const { totalDocs } = res.data

      setTotalEmployments(totalDocs)
      setConfig((prevConfig) => ({
        ...prevConfig,
        stats: prevConfig.stats.map((stat, index) =>
          index === 1 ? { ...stat, count: totalDocs } : stat,
        ),
      }))
    } catch (error) {
      console.error('Error fetching employments:', error)
    }
  }, [])

  useEffect(() => {
    Promise.allSettled([fetchEmployments(), fetchStudents()]).then(() => {
      setTimeout(() => {
        setConfig((prevConfig) => ({
          ...prevConfig,
          stats: prevConfig.stats.map((stat, index) =>
            index === 2 ? { ...stat, count: totalStudents - totalEmployments } : stat,
          ),
        }))
      }, 2000)
    })
  }, [fetchEmployments, fetchStudents])

  const columns = useMemo(
    () => [
      {
        id: 'firstName',
        header: 'Student Name',
        accessorKey: 'firstName',
        cell: ({ getValue, row }) => {
          const rowData = row.original
          return `${getValue() || ''} ${rowData?.lastName || ''}`
        },
      },
      {
        id: 'matricNo',
        header: 'Matric Number',
        accessorKey: 'matricNo',
      },
      {
        id: 'course',
        header: 'Course',
        accessorKey: 'course',
      },
      {
        id: 'email',
        header: 'Email',
        accessorKey: 'email',
      },
      {
        id: 'stateOfOrigin',
        header: 'State',
        accessorKey: 'stateOfOrigin',
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
      },
      {
        id: 'createdAt',
        header: 'Date',
        accessorKey: 'createdAt',
        cell: ({ getValue }) => {
          const rawDate = getValue()
          const parsedDate = new Date(rawDate)
          return rawDate && !isNaN(parsedDate.getTime())
            ? format(parsedDate, 'MMM dd, yyyy')
            : 'N/A'
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: Array.isArray(students) ? students : [],
    getCoreRowModel: getCoreRowModel(),
  })

  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchStudents(`page=${page}`)
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchStudents(`page=${page}`)
  }

  const editStudent = (rowRecord: any) => {
    const studentId = rowRecord.original.id
    router.push(`/admin/siwes-cordinator/students/${studentId}`)
  }

  const deleteAStudent = async (rowRecord: any) => {
    const studentId = rowRecord.original.id
    const res = await deleteStudent('students', studentId)
    fetchStudents()
    toast.success('Student deleted successfully')
  }

  const [query, setQuery] = useState('')
  const [searchFilter, setSearchFilter] = React.useState<
    'student-name' | 'course' | 'matric-number'
  >()
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    switch (searchFilter) {
      case 'student-name':
        fetchStudents(new URLSearchParams({ 'where[firstName][like]': debouncedQuery }).toString())
        break
      case 'course':
        fetchStudents(new URLSearchParams({ 'where[course][like]': debouncedQuery }).toString())
        break
      case 'matric-number':
        fetchStudents(new URLSearchParams({ 'where[matricNo][like]': debouncedQuery }).toString())
        break
    }
  }, [debouncedQuery])

  const filterStats = (date: Date) => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const endDate = format(date, 'yyyy-MM-dd')

    const query = new URLSearchParams({
      'where[createdAt][greater_than]': endDate,
      'where[createdAt][less_than]': today,
    }).toString()

    fetchStudents(query)
  }

  const filterStatsbyDate = (date: Date) => {
    const selectedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

    const query = new URLSearchParams({
      'where[createdAt][greater_than_equal]': `${selectedDate}T00:00:00.000Z`,
      'where[createdAt][less_than]': `${selectedDate}T23:59:59.999Z`,
    }).toString()

    fetchStudents(query)
  }

  const [studentOpenDialog, setStudentOpenDialog] = useState(false)
  const closeDialog = () => {
    setStudentOpenDialog(false)
  }

  return (
    <div className="p-8">
      <FIlterStats {...config} onEmitFilter={filterStats} onEmitDateFilter={filterStatsbyDate} />

      <div className="flex flex-wrap gap-4 justify-between items-center mt-8 w-full">
        <ToggleGroup type="single" value={filter} onValueChange={(value) => setFilter(value)}>
          <ToggleGroupItem
            value="all"
            aria-label="Toggle all"
            className={`${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-light-2'}`}
          >
            All Student
          </ToggleGroupItem>
          <ToggleGroupItem
            value="employed"
            aria-label="Toggle employed"
            className={`${filter === 'employed' ? 'bg-primary text-white' : 'bg-gray-light-2'}`}
          >
            Employed
          </ToggleGroupItem>
          <ToggleGroupItem
            value="unemployed"
            aria-label="Toggle unemployed"
            className={`${filter === 'unemployed' ? 'bg-primary text-white' : 'bg-gray-light-2'}`}
          >
            Unemployed
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex gap-4 items-center">
          <Select
            onValueChange={(value) =>
              setSearchFilter(value as 'student-name' | 'course' | 'matric-number')
            }
          >
            <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="student-name">Student Name</SelectItem>
                <SelectItem value="course">Course</SelectItem>
                <SelectItem value="matric-number">Matric Number</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            className="border-[1px] border-gray-light-2 w-[full]"
            placeholder="Search by name, matric no..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Dialog open={studentOpenDialog} onOpenChange={setStudentOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-md overflow-auto bg-white">
              <AddStudent onCloseEmit={closeDialog} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p>All Students</p>

          {loading && <Spinner className="border-t-primary border-r-primary border-b-primary" />}

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
                        <DropdownMenuItem onClick={() => editStudent(row)}>
                          <Edit2 />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <Popover open={openPopover} onOpenChange={setOpenPopover}>
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

        <Pagination
          {...paginationProps}
          onEmitNextPage={nextPage}
          onEmitPreviousPage={previousPage}
        />
      </div>
    </div>
  )
}
