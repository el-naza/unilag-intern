'use client'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { EllipsisVertical, Plus, Edit2, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Pagination from '../../_components/pagination'

type Student = {
  name: string
  matNumber: string
  course: string
  phoneNumber: string
  state: string
  status: string
  date: string
}

const defaultData: Student[] = [
  {
    name: 'tanner',
    matNumber: 'MP/2323/2323',
    course: 'Maths',
    phoneNumber: '090283823823',
    state: 'Lagos State',
    status: 'Scheduled',
    date: '02/03/2025',
  },
]

export default function StudentPage() {
  const config: IFIlterConfig = {
    page: 'Students',
    showFilters: true,
    stats: [
      { label: 'Total No of Siwes Students', iconName: 'GraduationCap', count: 100 },
      { label: 'Employed Siwes Student', iconName: 'CircleCheck', count: 20 },
      { label: 'Unemployed Siwes Student', iconName: 'CircleX', count: 10 },
    ],
  }

  const [filter, setFilter] = useState<string>('all')
  const [data, setData] = useState(() => defaultData)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo(
    () => [
      {
        id: 'name',
        header: 'Student Name',
        accessorKey: 'name',
      },
      {
        id: 'matNumber',
        header: 'Matric Number',
        accessorKey: 'matNumber',
      },
      {
        id: 'course',
        header: 'Course',
        accessorKey: 'course',
      },
      {
        id: 'phoneNumber',
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
      {
        id: 'state',
        header: 'State',
        accessorKey: 'state',
      },
      {
        id: 'status',
        header: 'Status',
        accessorKey: 'status',
      },
      {
        id: 'date',
        header: 'Date',
        accessorKey: 'date',
      },
    ],
    [],
  )

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  const paginationProps = { page, pageSize, total }

  const nextPage = () => {
    console.log('Next Page')
  }

  const previousPage = () => {
    console.log('Previous Page')
  }

  return (
    <div className='p-8'>
      <FIlterStats config={config} />

      <div className="flex justify-between items-center mt-8">
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
          <Input placeholder="Search by name, matric no..." className="border-[1px]" />
          <Button>
            <Plus /> Add Student
          </Button>
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
