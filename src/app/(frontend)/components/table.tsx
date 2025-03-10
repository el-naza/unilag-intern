import React from 'react'

/** Props for the Table Component */
interface TableProps {
  headers: string[]
  rows: React.ReactNode[][]
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange?: (page: number) => void
  onRowClick?: (row: React.ReactNode[]) => void
  headerStyle?: string
  bodyStyle?: string
}

/** Props for the Pagination Component */
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

/** Pagination Component */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex justify-between items-center mt-4 gap-[12px]">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-[14px] py-[8px] bg-white text-[14px] text-[#195F7E] font-[400] rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-[14px] py-[8px] bg-white text-[14px] text-[#195F7E] font-[400] rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Total: {totalPages}{' '}
        <span className="text-[#007AFF]">
          - Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  )
}

const Table: React.FC<TableProps> = ({
  headers,
  rows,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  onRowClick,
  headerStyle,
  bodyStyle,
}) => {
  return (
    <div className="">
      <table className="w-full border-collapse">
        <thead className={headerStyle || 'text-left text-gray-700 font-bold'}>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="py-3 px-4 text-[#48484A] text-[13px] font-[400] ">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="cursor-pointer" onClick={() => onRowClick?.(row)}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="py-3 px-4 border-b border-white text-[12px] font-[400] text-[#0B0B0B]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center p-4 bg-gray-50 border-t">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </div>
  )
}

export default Table
