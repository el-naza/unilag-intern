import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllCompanies } from '@/services/admin/companies'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import Pagination from '../../../_components/pagination'
import { Company } from '../../../siwes-cordinator/companies/page'

const AssignCompany = ({ studentId }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [rowSelection, setRowSelection] = useState({})

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
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
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
          return `Lat: ${location.latitude}, Lng: ${location.longitude}`
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
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  })

  const selectedCompanies = table.getSelectedRowModel().rows.map((row) => row.original)
  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchCompanies({ page })
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchCompanies({ page })
  }

  const assignToCompany = () => {
    console.log('Selected Companies:', selectedCompanies)
    console.log('Student Id:', studentId)
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <p>All Companies</p>
        <Button
          disabled={selectedCompanies.length === 0}
          onClick={() => assignToCompany()}
        >
          Assign to Company
        </Button>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} selected={row.getIsSelected()}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
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
