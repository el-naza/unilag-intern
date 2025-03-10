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
import { Edit2, EllipsisVertical, Plus, Trash } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import FIlterStats, { IFIlterConfig } from '../../_components/filter-stats'
import Pagination from '../../_components/pagination'
import AddCompany from './add-company'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/custom-hooks/useDebounce'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type Company = {
  name: string
  cac: string
  email: string
  phone: string
  location: { latitude: number; longitude: number }
  createdAt: string
}

export default function CompaniesPage() {
  const [config, setConfig] = useState<IFIlterConfig>({
    page: 'Companies',
    showFilters: true,
    stats: [
      { label: 'Total No of Companies', iconName: 'Building2', count: 0 },
      { label: 'Assigned Companies', iconName: 'CircleCheck', count: 0 },
    ],
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [filter, setFilter] = React.useState<string>('all')
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const router = useRouter()

  const fetchCompanies = async (params?: string) => {
    const res: any = await getAllCompanies('companies', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setCompanies(docs)
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
    fetchCompanies(`page=${page}`)
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchCompanies(`page=${page}`)
  }

  const editCompany = (rowRecord: any) => {
    const companyId = rowRecord.original.id
    router.push(`/admin/siwes-cordinator/companies/${companyId}`)
  }

  const [query, setQuery] = useState('')
  const [searchFilter, setSearchFilter] = React.useState<'name' | 'cac' | 'email' | 'phone'>()
  const debouncedQuery = useDebounce(query)

  useEffect(() => {
    switch (searchFilter) {
      case 'name':
        fetchCompanies(new URLSearchParams({ 'where[name][like]': debouncedQuery }).toString())
        break
      case 'cac':
        fetchCompanies(new URLSearchParams({ 'where[cac][like]': debouncedQuery }).toString())
        break
      case 'email':
        fetchCompanies(new URLSearchParams({ 'where[email][like]': debouncedQuery }).toString())
        break
      case 'phone':
        fetchCompanies(new URLSearchParams({ 'where[phone][like]': debouncedQuery }).toString())
        break
    }
  }, [debouncedQuery])

  const filterStats = (date: Date) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const endDate = format(date, 'yyyy-MM-dd');

    const query = new URLSearchParams({
      'where[createdAt][greater_than]': endDate,
      'where[createdAt][less_than]': today,
    }).toString();

    fetchCompanies(query)
  }

  const filterStatsbyDate = (date: Date) => {
    const selectedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
    const query = new URLSearchParams({
      'where[createdAt][greater_than_equal]': `${selectedDate}T00:00:00.000Z`,
      'where[createdAt][less_than]': `${selectedDate}T23:59:59.999Z`,
    }).toString();
  
    fetchCompanies(query);
  };


    const [companyOpenDialog, setCompanyOpenDialog] = useState(false)
    const closeDialog = () => {
      setCompanyOpenDialog(false)
    }

  return (
    <div className="p-8">
      <FIlterStats {...config} onEmitFilter={filterStats} onEmitDateFilter={filterStatsbyDate} />

      <div className="flex flex-wrap gap-4 justify-between items-center mt-8">
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => setFilter(value)}
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
          <Select onValueChange={(value) => setSearchFilter(value as 'name' | 'cac' | 'email')}>
            <SelectTrigger className="border-[1px] border-gray-light-2 bg-white w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter By</SelectLabel>
                <SelectItem value="name">Company Name</SelectItem>
                <SelectItem value="cac">CAC Number</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone Number</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            className="border-[1px] border-gray-light-2 w-[full]"
            placeholder="Search by name, cac, email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Dialog open={companyOpenDialog} onOpenChange={setCompanyOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus /> Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-screen-md overflow-auto bg-white">
              <AddCompany onCloseEmit={closeDialog}/>
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
