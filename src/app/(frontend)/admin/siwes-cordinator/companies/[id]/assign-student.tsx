'use client'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getAllStudents } from '@/services/admin/students'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'
import Pagination from '../../../_components/pagination'
import { Student } from '../../students/page'
import { format } from 'date-fns'

const AssignStudent = ({ companyId }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [students, setStudents] = useState<Student[]>([])
  const [perPage, setPerPage] = useState(0)
  const [pageSize, setPageSize] = useState(0)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [rowSelection, setRowSelection] = useState({})

  const fetchStudents = async (params?: any) => {
    const res: any = await getAllStudents('students', params)
    const { docs, page, totalPages, totalDocs, hasNextPage, hasPrevPage } = res.data
    setStudents(docs)
    setPerPage(page)
    setPageSize(totalPages)
    setHasNext(hasNextPage)
    setHasPrevious(hasPrevPage)
    setTotal(totalDocs)
    setLoading(false)
  }

  useEffect(() => {
    fetchStudents()
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
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  })

  const selectedStudents = table.getSelectedRowModel().rows.map((row) => row.original)
  const paginationProps = { page: perPage, pageSize, total, hasNext, hasPrevious }

  const nextPage = (page: number) => {
    setLoading(true)
    fetchStudents({ page })
  }

  const previousPage = (page: number) => {
    setLoading(true)
    fetchStudents({ page })
  }

  const assignToStudent = () => {
    console.log('Selected Students:', selectedStudents)
    console.log('Company Id:', companyId)
  }


  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <p>All Students</p>

        <Button
        disabled={selectedStudents.length === 0}
        onClick={() => assignToStudent()}
        >
          Assign to Student</Button>
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

export default AssignStudent
