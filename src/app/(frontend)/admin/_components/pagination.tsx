import React from 'react'

import { Button } from '@/components/ui/button'

interface IPaginationProps {
  page: number
  pageSize: number
  total: number,
  hasNext: boolean,
  hasPrevious: boolean,
  onEmitNextPage: (page: number) => void
  onEmitPreviousPage: (page: number) => void
}

const Pagination = ({ page, pageSize, total, hasNext, hasPrevious, onEmitNextPage, onEmitPreviousPage }: IPaginationProps) => {

  const previousPage = () => {
    const previousPage = page - 1
    onEmitPreviousPage(previousPage)
  }

  const nextPage = () => {
    const nextPage = page + 1
    onEmitNextPage(nextPage)
  }

  return (
    <div className="flex justify-between items-center mt-8 p-4">
      <div className="flex gap-8 items-center w-[20%]">
        <Button variant="outline" size="icon" className='w-full' onClick={() => previousPage()} disabled={!hasPrevious}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="icon"
          className='w-full'
          onClick={() => nextPage()}
          disabled={!hasNext}
        >
          Next
        </Button>
      </div>

      <p>
        Total: {total}{' '}
        <span className="text-accent-blue">
          {' '}
          - Page {page} of {pageSize}
        </span>
      </p>
    </div>
  )
}

export default Pagination
