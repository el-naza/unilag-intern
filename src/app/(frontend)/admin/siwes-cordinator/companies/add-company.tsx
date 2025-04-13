'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Papa from 'papaparse'
import { batchUploadCompanies } from '@/services/admin/companies'
import { Company } from '@/payload-types'

interface ICompanyProp {
  onCloseEmit: () => void
}

const AddCompany = ({ onCloseEmit }: ICompanyProp) => {
  const [files, setFiles] = useState<File[]>([])
  const [previewData, setPreviewData] = useState<string[][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [showUploadArea, setShowUploadArea] = useState(true)
  const [activeTab, setActiveTab] = useState<'success' | 'skipped' | 'errors' | null>(null)

  const rowsPerPage = 5

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
    const file = acceptedFiles[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = ({ target }) => {
        if (target?.result) {
          const csv = target.result as string
          Papa.parse(csv, {
            complete: (result) => {
              const data = result.data as string[][]
              if (data.length > 1) {
                setPreviewData(data)
                setShowUploadArea(false)
              }
            },
          })
        }
      }
      reader.readAsText(file)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
    maxSize: 2 * 1024 * 1024,
  })

  const closeDialog = () => {
    setFiles([])
    setPreviewData([])
    setCurrentPage(1)
    setUploadResult(null)
    onCloseEmit()
  }

  const handleBatchUpload = async () => {
    setIsUploading(true)
    setShowUploadArea(false)

    const companies: Company[] = previewData.slice(1).map((row) => ({
      id: '',
      name: row[0],
      industry: row[1] as Company['industry'],
      address: row[2],
      email: row[3],
      phone: row[4],
      website: row[5],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      location: {
        longitude: parseFloat(row[6]), // From CSV
        latitude: parseFloat(row[7]), // From CSV
      },
      contactPerson: row[6], // You might want to add this to `description` or a custom field
      description: null,
      image: null,
      hasSetPassword: null,
      resetPasswordOtpHash: null,
      resetPasswordToken: null,
      resetPasswordExpiration: null,
      salt: null,
      hash: null,
      loginAttempts: null,
    }))

    try {
      const result = await batchUploadCompanies('companies', companies)
      setUploadResult(result)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const totalPages = Math.ceil((previewData.length - 1) / rowsPerPage)
  const displayedData = previewData.slice(
    1 + (currentPage - 1) * rowsPerPage,
    1 + currentPage * rowsPerPage,
  )

  return (
    <div>
      <h1 className="text-[2rem] font-bold text-center">Add Company</h1>
      <p className="text-neutral-500 text-center mb-8">
        Upload a CSV or Excel file with company information.
      </p>

      {/* Toggle View */}
      {previewData.length > 1 && (
        <div className="text-center mb-4">
          <Button onClick={() => setShowUploadArea((prev) => !prev)} variant="outline">
            {showUploadArea ? 'Show Preview' : 'Show Upload Area'}
          </Button>
        </div>
      )}

      {/* Upload Area */}
      {showUploadArea && (
        <div>
          <div
            {...getRootProps()}
            className="border-[1px] border-dashed border-primary rounded-lg py-8 grid place-content-center text-center gap-4 cursor-pointer"
          >
            <input {...getInputProps()} />
            <Image src="/icons/upload.svg" width={50} height={40} alt="Upload Icon" />
            <p>Drag & drop your file(s) here</p>
            <p className="text-neutral-500">OR</p>
            <Button variant="outline">Browse Files</Button>
          </div>

          <p className="text-neutral-500 mt-2">
            Only supports .csv, .xls, and .xlsx files (2MB max).
          </p>
        </div>
      )}

      {/* File Info */}
      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Uploaded File:</h3>
          <ul className="mt-2">
            {files.map((file) => (
              <li key={file.name} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
          <p className="mt-2 font-medium">Total Companies: {previewData.length - 1}</p>
        </div>
      )}

      {/* Preview Table */}
      {!showUploadArea && previewData.length > 1 && (
        <div className="mt-4 overflow-auto">
          <h3 className="font-semibold">Preview Data:</h3>
          <table className="w-full border border-gray-300 mt-2 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">#</th>
                {previewData[0].map((header, index) => (
                  <th key={index} className="border px-2 py-1">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="border px-2 py-1">
                    {(currentPage - 1) * rowsPerPage + rowIndex + 1}
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <Button onClick={handleBatchUpload} disabled={isUploading || previewData.length <= 1}>
          {isUploading ? 'Uploading...' : 'Update Company List'}
        </Button>
        <Button variant="outline" onClick={closeDialog}>
          Cancel
        </Button>
      </div>

      {/* Upload Result */}
      {uploadResult && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Batch Upload Summary</h2>
          <div className="flex gap-4">
            <Button
              variant={activeTab === 'success' ? 'default' : 'outline'}
              onClick={() => setActiveTab('success')}
            >
              Success ({uploadResult.data.successCount})
            </Button>
            <Button
              variant={activeTab === 'skipped' ? 'default' : 'outline'}
              onClick={() => setActiveTab('skipped')}
            >
              Skipped ({uploadResult.data.skippedCount})
            </Button>
            <Button
              variant={activeTab === 'errors' ? 'default' : 'outline'}
              onClick={() => setActiveTab('errors')}
            >
              Errors ({uploadResult.data.errorCount})
            </Button>
          </div>

          <div className="mt-4">
            {activeTab === 'success' && (
              <>
                <h3 className="font-medium mb-2">Created Companies</h3>
                <ul className="list-disc pl-6 text-sm text-green-700">
                  {uploadResult.data.createdCompanies.map((email: string) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'skipped' && (
              <>
                <h3 className="font-medium mb-2">Skipped Companies</h3>
                <ul className="list-disc pl-6 text-sm text-yellow-700">
                  {uploadResult.data.skippedCompanies.map((c: any, idx: number) => (
                    <li key={idx}>
                      {c.email} – {c.reason}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {activeTab === 'errors' && (
              <>
                <h3 className="font-medium mb-2">Errors</h3>
                <ul className="list-disc pl-6 text-sm text-red-700">
                  {uploadResult.data.errors.map((e: any, idx: number) => (
                    <li key={idx}>
                      {e.email} – {e.error}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCompany
