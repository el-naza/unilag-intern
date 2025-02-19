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
import { EllipsisVertical, Plus, Edit2, Trash, ListFilter } from 'lucide-react'
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
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import Pagination from '../../_components/pagination'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddCompany from './add-company'

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

export default function CompaniesPage() {
  const config: IFIlterConfig = {
    page: 'Companies',
    showFilters: true,
    stats: [
      { label: 'Total No of Companies', iconName: 'Building2', count: 100 },
      { label: 'Assigned Companies', iconName: 'CircleCheck', count: 20 },
    ],
  }

  const [filter, setFilter] = React.useState<string>('all')
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
    <div className="p-8">
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
            All Companies
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
          <div className="flex gap-2 items-center bg-white border-[1px] pr-3 rounded-md">
            <Input placeholder="Search by name, matric no..." />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ListFilter />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-none">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-[#B3FAFF] hover:rounded-md hover:px-2 transition-all cursor-pointer">
                    <span>Company Name</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-[#B3FAFF] hover:rounded-md hover:px-2 transition-all cursor-pointer">
                    <span>Location</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus /> Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md overflow-auto bg-white">
            <AddCompany />
          </DialogContent>
        </Dialog>
         
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p>All Companies</p>

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
