import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { EllipsisVertical, Edit2, Trash } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import Pagination from '../../../_components/pagination'

type Company = {
  name: string
  cacNumber: string
  email: string
  phoneNumber: string
  location: string
  date: string
}

const defaultData: Company[] = [
  {
    name: 'tanner',
    cacNumber: 'MP/2323/2323',
    email: 'test@mail.com',
    phoneNumber: '090283823823',
    location: 'Lagos State',
    date: '02/03/2025',
  },
]

const AssignCompany = () => {
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
        header: 'Company Name',
        accessorKey: 'name',
      },
      {
        id: 'cacNumber',
        header: 'CAC Number',
        accessorKey: 'cacNumber',
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
        id: 'location',
        header: 'Location',
        accessorKey: 'location',
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
    <div className='mt-8'>
      <div className="flex justify-between items-center mb-4">
        <p>All Companies</p>

        <Button>Assign to Company</Button>
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
  )
}

export default AssignCompany
