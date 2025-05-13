'use client'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Papa from 'papaparse'
import { batchUploadStudents } from '@/services/admin/students'
import { Student } from '@/payload-types'
import { normalizeGender, normalizeInternshipType } from '@/app/(frontend)/utils/normalizer'

const AddStudent = () => {
  const [files, setFiles] = useState<File[]>([])
  const [previewData, setPreviewData] = useState<string[][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'success' | 'skipped' | 'errors' | null>(null)

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
    maxSize: 2 * 1024 * 1024, // 2MB
  })

  const handleBatchUpload = async () => {
    setIsUploading(true)

    const students: Student[] = previewData.slice(1).map((row) => ({
      id: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firstName: row[0],
      lastName: row[1],
      middleName: row[2],
      username: row[3],
      matricNo: row[4],
      dob: row[5],
      nationality: row[6],
      stateOfOrigin: row[7],
      homeAddress: row[8],
      gender: normalizeGender(row[9]),
      course: row[10],
      level: row[11],
      internshipType: normalizeInternshipType(row[12]),
      image: row[13],
      bankCode: row[14],
      bankName: row[15],
      accountNo: row[16],
      coins: parseFloat(row[17]) || 0,
      email: row[18],
    }))

    try {
      const result = await batchUploadStudents('students', students)
      console.log('Upload result:', result)
      setUploadResult(result)
      setActiveTab('success') // Default tab
    } catch (error) {
      console.error('Batch upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRestart = () => {
    setFiles([])
    setPreviewData([])
    setUploadResult(null)
    setCurrentPage(1)
    setActiveTab(null)
  }

  const totalPages = Math.ceil((previewData.length - 1) / rowsPerPage)
  const displayedData = previewData.slice(
    1 + (currentPage - 1) * rowsPerPage,
    1 + currentPage * rowsPerPage,
  )

  if (uploadResult) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Batch Upload Summary</h2>
        <div className="flex gap-4 justify-center mb-4">
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

        <div className="max-h-[300px] overflow-y-auto px-4">
          {activeTab === 'success' && (
            <ul className="list-disc pl-6 text-sm text-green-700">
              {uploadResult.data.createdStudents.map((email: string) => (
                <li key={email}>{email}</li>
              ))}
            </ul>
          )}
          {activeTab === 'skipped' && (
            <ul className="list-disc pl-6 text-sm text-yellow-700">
              {uploadResult.data.skippedStudents.map((s: any, idx: number) => (
                <li key={idx}>
                  {s.matricNo || s.email} – {s.reason}
                </li>
              ))}
            </ul>
          )}
          {activeTab === 'errors' && (
            <ul className="list-disc pl-6 text-sm text-red-700">
              {uploadResult.data.errors.map((e: any, idx: number) => (
                <li key={idx}>
                  {e.matricNo || e.email} – {e.error}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleRestart}>Start New Upload</Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-[2rem] font-bold text-center">Add Student</h1>
      <p className="text-neutral-500 text-center mb-8">
        Upload a CSV or Excel file with student information.
      </p>

      <div
        {...getRootProps()}
        className="border border-dashed border-primary rounded-lg py-8 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <Image
          src="/icons/upload.svg"
          width={50}
          height={40}
          alt="Upload Icon"
          className="mx-auto"
        />
        <p>Drag & drop your file here</p>
        <p className="text-neutral-500">or click to select</p>
        <p className="text-neutral-400 mt-2">Only .csv, .xls, .xlsx files (max 2MB)</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Uploaded File:</h3>
          <p>
            {files[0].name} ({(files[0].size / 1024).toFixed(2)} KB)
          </p>
        </div>
      )}

      {previewData.length > 1 && (
        <>
          <div className="mt-6 overflow-auto">
            <h3 className="font-semibold mb-2">Preview</h3>
            <table className="w-full border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">#</th>
                  {previewData[0].map((header, idx) => (
                    <th key={idx} className="border px-2 py-1">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">
                      {(currentPage - 1) * rowsPerPage + idx + 1}
                    </td>
                    {row.map((cell, i) => (
                      <td key={i} className="border px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleBatchUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Students'}
            </Button>
            <Button variant="outline" onClick={handleRestart}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default AddStudent
