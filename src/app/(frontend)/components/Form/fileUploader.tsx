import Image from 'next/image'
import React, { useState } from 'react'
import upload from '../../assets/images/upload.png'
type FileUploaderProps = {
  id: string
  name: string
  accept?: string
  multiple?: boolean
  maxFileSize?: number // Maximum file size in MB (optional)
  onFileChange?: (files: File[]) => void // Callback to handle selected files
}

export default function FileUploader({
  id,
  name,
  accept = '.jpg,.png,.svg,.zip',
  multiple = false,
  maxFileSize = 2,
  onFileChange,
}: FileUploaderProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = files.filter((file) => file.size <= maxFileSize * 1024 * 1024) // Filter files by size
      setSelectedFiles(validFiles)
      onFileChange && onFileChange(validFiles)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files)
      const validFiles = files.filter((file) => file.size <= maxFileSize * 1024 * 1024) // Filter files by size
      setSelectedFiles(validFiles)
      onFileChange && onFileChange(validFiles)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const renderFileDetails = () => {
    return selectedFiles.map((file, index) => (
      <div key={index} className="mt-2">
        <p className="text-sm text-gray-600">
          {file.name} ({(file.size / 1024).toFixed(2)} KB)
        </p>
      </div>
    ))
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border border-dashed border-[#B3FAFF] w-full bg-white flex items-center justify-center flex-col p-[24px]"
      >
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor={id} className="w-full text-center cursor-pointer flex flex-col y-4 items-center">
         <Image src={upload.src} width={40} height={40} alt="image" objectFit="cover" className="" />
          <h4 className="mt-[12px] mb-[8px] font-[400] text-[12px] text-[#0B0B0B]">
            Drag your file(s) to start uploading
          </h4>
          <p className="font-[400] text-[#8E8E93]">OR</p>
          <button
            type="button"
            onClick={() => document.getElementById(id)?.click()}
            className="py-[8px] px-[12px] border-2 border-[#195F7E] text-[#195F7E] rounded-[10px] font-[600] mt-[8px]"
          >
            Browse files
          </button>
        </label>
        {renderFileDetails()}
      </div>
      <p className="font-[400] text-[12px] text-[#8E8E93] mt-[12px]">
        Only support {accept.replace(/,/g, ', ')} files ({maxFileSize}MB below)
      </p>
    </div>
  )
}
