'use client'

import { useState, useRef } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Upload, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { uploadFiles } from './actions'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function ApplicationPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    await handleFiles(Array.from(e.dataTransfer.files))
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = async (files: File[]) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append('files', file))

      const result = await uploadFiles(formData)

      toast({
        title: result.success ? 'Success' : 'Error',
        description: result.message,
        variant: result.success ? 'default' : 'destructive',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload files',
        variant: 'destructive',
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Main Content */}
      <div className="p-4 space-y-6">
        <h1 className="text-xl font-semibold">Apply Now</h1>

        {/* Company Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gray-200">
            <Image
              src="/crmLogo.svg"
              alt="CMR Shopping Mall"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold">CMR SHOPPING MALL</h2>
            <p className="text-sm text-muted-foreground">ID3886954394</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="space-y-4">
          <h3 className="font-medium">Write Your Applications</h3>
          <p className="text-sm text-muted-foreground">
            Lets us know why you would be a good fit for this our company
          </p>
          <Textarea placeholder="Write application" className="min-h-[200px] resize-none" />
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <h3 className="font-medium">Add Attachments</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center space-y-4 transition-colors
              ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}
              ${isUploading ? 'opacity-75' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 rounded-full">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                ) : (
                  <Upload className="h-6 w-6 text-blue-600" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm">Drag your file(s) to start uploading</p>
              <p className="text-sm text-muted-foreground">OR</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInput}
                className="hidden"
                multiple
                accept=".jpg,.jpeg,.png,.svg,.zip"
              />
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Browse files
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Only support .jpg, .png and .svg and zip files (2mb below)
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
