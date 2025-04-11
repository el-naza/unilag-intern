'use client'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Papa from 'papaparse'
import { batchUploadStudents } from '@/services/admin/students'
import { Student } from '@/payload-types'
import { normalizeGender, normalizeInternshipType } from '@/app/(frontend)/utils/normalizer'

interface IStudentProp {
  onCloseEmit: () => void
}

const AddStudent = ({ onCloseEmit }: IStudentProp) => {
  const [files, setFiles] = useState<File[]>([])
  const [previewData, setPreviewData] = useState<string[][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 5
  const [isUploading, setIsUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<any>(null)
  const [showUploadArea, setShowUploadArea] = useState(true) // State to toggle the upload area visibility

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
              setPreviewData(result.data)
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
    maxSize: 2 * 1024 * 1024, // 2MB limit
  })

  const closeDialog = () => {
    setFiles([])
    setPreviewData([])
    setCurrentPage(1)
    onCloseEmit()
  }

  const handleBatchUpload = async () => {
    setIsUploading(true)
    const students: Student[] = previewData.slice(1).map((row) => ({
      id: '',
      createdAt: new Date().toISOString(), // Add createdAt date
      updatedAt: new Date().toISOString(), // Add updatedAt date
      firstName: row[0], // First Name
      lastName: row[1], // Last Name
      middleName: row[2], // Middle Name
      username: row[3], // Username
      matricNo: row[4], // Matriculation Number
      dob: row[5], // Date of Birth
      nationality: row[6], // Nationality
      stateOfOrigin: row[7], // State of Origin
      homeAddress: row[8], // Home Address
      gender: normalizeGender(row[9]), // Gender
      course: row[10], // Course
      level: row[11], // Level
      internshipType: normalizeInternshipType(row[12]), // Internship Type
      image: row[13], // Image (you might need additional handling here for URLs or paths)
      bankCode: row[14], // Bank Code
      bankName: row[15], // Bank Name
      accountNo: row[16], // Account Number
      coins: parseFloat(row[17]) || 0, // Coins (ensure it's a number, defaults to 0 if invalid)
      email: row[18],
    }))

    try {
      const result = await batchUploadStudents('students', students) // Assuming 'students' is your collection slug
      setUploadResult(result)
    } catch (error) {
      console.error('Error uploading batch:', error)
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
      <h1 className="text-[2rem] font-bold text-center">Add Student</h1>
      <p className="text-neutral-500 text-center mb-8">
        Upload a CSV or Excel file with student information.
      </p>

      {/* Button to toggle the visibility of the upload area */}
      {showUploadArea ? (
        <div>
          <div
            {...getRootProps()}
            className="border-[1px] border-dashed border-primary rounded-lg py-8 grid place-content-center text-center gap-4 cursor-pointer"
          >
            <input {...getInputProps()} />
            <Image
              src="/icons/upload.svg"
              width={50}
              height={40}
              alt="Upload Icon"
              className="mx-auto"
            />
            <p>Drag & drop your file(s) here</p>
            <p className="text-neutral-500">OR</p>
            <Button variant="outline">Browse Files</Button>
          </div>

          <p className="text-neutral-500 mt-2">
            Only supports .csv, .xls, and .xlsx files (2MB max).
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <Button onClick={() => setShowUploadArea(true)} variant="outline">
            Show Upload Area
          </Button>
        </div>
      )}

      {/* Toggle between file upload and preview */}
      {files.length > 0 && !showUploadArea && (
        <div className="mt-4">
          <h3 className="font-semibold">Uploaded File:</h3>
          <ul className="mt-2">
            {files.map((file) => (
              <li key={file.name} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </li>
            ))}
          </ul>
          <p className="mt-2 font-medium">Total Items Uploaded: {previewData.length - 1}</p>
        </div>
      )}

      {/* Preview Data */}
      {previewData.length > 1 && (
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
                <tr key={rowIndex} className="border">
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

      <div className="flex gap-4 mt-8">
        <Button onClick={handleBatchUpload} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Students'}
        </Button>
        <Button variant="outline" onClick={() => closeDialog()}>
          Cancel
        </Button>
      </div>

      {uploadResult && (
        <div className="mt-4">
          <h3 className="font-semibold">Upload Result</h3>
          <p>Success: {uploadResult?.data?.successCount}</p>
          <p>Skipped: {uploadResult?.data?.skippedCount}</p>
          <p>Errors: {uploadResult?.data?.errorCount}</p>
        </div>
      )}
    </div>
  )
}

export default AddStudent
