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
import { getAllStudents } from '@/services/admin/students'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddStudent from './add-student'

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
  const router = useRouter()

  const fetchStudents = async (params?: string) => {
    const res: any = await getAllStudents('departmental-coordinators', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
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
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const columns = useMemo(
    () => [
      {
        id: 'firstName',
        header: 'Student Name',
        accessorKey: 'firstName',
        cell: ({ getValue, row }) => {
          const rowData = row.original
          return `${getValue()} ${rowData.lastName}`
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
          return rawDate ? format(new Date(rawDate), 'MMM dd, yyyy') : 'N/A'
        },
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data: students,
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

  const [query, setQuery] = useState('')
  const [searchFilter, setSearchFilter] = React.useState<
    'student-name' | 'course' | 'matric-number'
  >('student-name')
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


  return (
    <div className="p-8">
      <FIlterStats config={config} />

      <div className="flex justify-between items-center mt-8 w-full">
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => {
            value && setFilter(value)
          }}
        >
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
          <Select value={searchFilter} onValueChange={(value) => setSearchFilter(value as 'student-name' | 'course' | 'matric-number')}>
            <SelectTrigger className='border-[1px] border-gray-light-2 bg-white w-[180px]'>
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
            className='border-[1px] border-gray-light-2 w-[full]'
            placeholder="Search by name, matric no..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-md overflow-auto bg-white">
              <AddStudent />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p>All Students</p>

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
                        <DropdownMenuItem onClick={() => editStudent(row)}>
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
