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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import Pagination from '../../_components/pagination'

type Admin = {
  name: string
  department: string
  email: string
  phoneNumber: string
  numberOfStudents: number
  employedStudents: number
}

const defaultData: Admin[] = [
  {
    name: 'tanner',
    department: 'Management',
    email: 'test@mail.com',
    phoneNumber: '090283823823',
    numberOfStudents: 20,
    employedStudents: 10,
  },
]

export default function DepartmentalAdminsPage() {
  const config: IFIlterConfig = {
    page: 'Departmental Admins',
    showFilters: false,
    stats: [{ label: 'Total No of Admins', iconName: 'Shield', count: 100 }],
  }

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
        header: 'Admin Name',
        accessorKey: 'name',
      },
      {
        id: 'department',
        header: 'Department',
        accessorKey: 'department',
      },
      {
        id: 'email',
        header: 'Email',
        accessorKey: 'email',
      },
      {
        id: 'phoneNumber',
        header: 'Phone Number',
        accessorKey: 'phoneNumber',
      },
      {
        id: 'numberOfStudents',
        header: 'Number of Students',
        accessorKey: 'numberOfStudents',
      },
      {
        id: 'employedStudents',
        header: 'Employed Students',
        accessorKey: 'employedStudents',
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
        <div></div>
        <div className="flex gap-4 items-center">
          <Input placeholder="Search by name, matric no..." className="border-[1px]" />
          <Button>
            <Plus /> Add Admin
          </Button>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p>All Departmental Admins</p>

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
