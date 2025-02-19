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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getAllCompanies } from '@/services/admin/companies'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { Edit2, EllipsisVertical, ListFilter, Plus, Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddCompany from './add-company'
import { useRouter } from 'next/navigation'

export type Company = {
  name: string
  cac: string
  email: string
  phone: string
  location: { latitude: number; longitude: number }
  createdAt: string
}

export default function CompaniesPage() {
  const config: IFIlterConfig = {
    page: 'Companies',
    showFilters: true,
    stats: [
      { label: 'Total No of Companies', iconName: 'Building2', count: 100 },
      { label: 'Assigned Companies', iconName: 'CircleCheck', count: 20 },
    ],
  }

  const [loading, setLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [filter, setFilter] = React.useState<string>('all')
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const router = useRouter()

  const fetchCompanies = async (params?: any) => {
    const res: any = await getAllCompanies('companies', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setCompanies(docs)
    setPerPage(page)
    setPageSize(totalPages)
    setHasNext(hasNextPage)
    setHasPrevious(hasPrevPage)
    setTotal(totalDocs)

    setLoading(false)
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  const columns = useMemo(
    () => [
      {
        id: 'name',
        header: 'Company Name',
        accessorKey: 'name',
      },
      {
        id: 'cac',
        header: 'CAC Number',
        accessorKey: 'cac',
      },
      {
        id: 'email',
        header: 'Email',
        accessorKey: 'email',
      },
      {
        id: 'phone',
        header: 'Phone Number',
        accessorKey: 'phone',
      },
      {
        id: 'location',
        header: 'Location',
        accessorKey: 'location',
        cell: ({ getValue }) => {
          const location = getValue()
          return `Lat :${location.latitude}, Lng: ${location.longitude}`
        },
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
    data: companies,
    getCoreRowModel: getCoreRowModel(),
  })

  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchCompanies({ page })
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchCompanies({ page })
  }

  const editCompany = (rowRecord: any) => {
    const companyId = rowRecord.original.id
    router.push(`/admin/siwes-cordinator/companies/${companyId}`)
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
                        <DropdownMenuItem onClick={() => editCompany(row)}>
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
