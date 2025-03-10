'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { getAllAdmins } from '@/services/admin/admins'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Edit2, EllipsisVertical, Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddAdmin from './add-admin'

type Admin = {
  name: string
  department: string
  email: string
  phoneNumber: string
  numberOfStudents: number
  employedStudents: number
}

export default function DepartmentalAdminsPage() {
  const [config, setConfig] = useState<IFIlterConfig>({
    page: 'Departmental Admins',
    showFilters: false,
    stats: [{ label: 'Total No of Admins', iconName: 'Shield', count: 0 }],
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [admins, setAdmins] = useState<Admin[]>([])
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const router = useRouter()

  const fetchAdmins = async (params?: string) => {
    const res: any = await getAllAdmins('admins', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    console.log('Admins: ', docs)

    setAdmins(docs)
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
    fetchAdmins()
  }, [])

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
    data: admins,
    getCoreRowModel: getCoreRowModel(),
  })

  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchAdmins(`page=${page}`)
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchAdmins(`page=${page}`)
  }

  const [query, setQuery] = useState('')
  const [searchFilter, setSearchFilter] = React.useState<
    'name' | 'department' | 'email' | 'phone'
  >()
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    switch (searchFilter) {
      case 'name':
        fetchAdmins(new URLSearchParams({ 'where[name][like]': debouncedQuery }).toString())
        break
      case 'department':
        fetchAdmins(new URLSearchParams({ 'where[department][like]': debouncedQuery }).toString())
        break
      case 'email':
        fetchAdmins(new URLSearchParams({ 'where[email][like]': debouncedQuery }).toString())
        break
      case 'phone':
        fetchAdmins(new URLSearchParams({ 'where[phone][like]': debouncedQuery }).toString())
        break
    }
  }, [debouncedQuery])

    const [adminOpenDialog, setAdminOpenDialog] = useState(false)
    const closeDialog = () => {
      setAdminOpenDialog(false)
    }

  return (
    <div className="p-8">
      <FIlterStats {...config} />

      <div className="flex justify-between items-center mt-8">
        <div></div>
        <div className="flex gap-4 items-center">
          <Select
            onValueChange={(value) =>
              setSearchFilter(value as 'name' | 'department' | 'email' | 'phone')
            }
          >
            <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="name">Admin Name</SelectItem>
                <SelectItem value="department">Department</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            className="border-[1px] border-gray-light-2 w-[full]"
            placeholder="Search by name, department, eamil..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Dialog open={adminOpenDialog} onOpenChange={setAdminOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-md bg-white">
              <DialogHeader>
                <DialogTitle>Departmental Admins</DialogTitle>
              </DialogHeader>

              <AddAdmin onCloseEmit={closeDialog} />
            </DialogContent>
          </Dialog>
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
