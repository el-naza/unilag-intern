import React from 'react'

import { Button } from '@/components/ui/button'

interface IPaginationProps {
  page: number
  pageSize: number
  total: number,
  onEmitNextPage: () => void
  onEmitPreviousPage: () => void
}

const Pagination = ({ page, pageSize, total, onEmitNextPage, onEmitPreviousPage }: IPaginationProps) => {
  const totalPages = Math.ceil(total / pageSize)

  const previousPage = () => {
    onEmitPreviousPage()
  }

  const nextPage = () => {
    onEmitNextPage()
  }

  return (
    <div className="flex justify-between items-center mt-8 p-4">
      <div className="flex gap-8 items-center">
        <Button variant="outline" size="icon" onClick={() => previousPage()} disabled={page === 1}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => nextPage()}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>

      <p>
        Total: {total}{' '}
        <span className="text-accent-blue">
          {' '}
          - Page {page} of {totalPages}
        </span>
      </p>
    </div>
  )
}

export default Pagination
