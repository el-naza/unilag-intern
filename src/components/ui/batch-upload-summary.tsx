import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const BatchUploadSummary = ({ uploadResult, setActiveTab, activeTab }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Batch Upload Summary</h2>
      <div className="flex gap-4">
        <Button
          variant={activeTab === 'success' ? 'default' : 'outline'}
          onClick={() => setActiveTab('success')}
        >
          Success ({uploadResult?.data?.successCount || 0})
        </Button>
        <Button
          variant={activeTab === 'skipped' ? 'default' : 'outline'}
          onClick={() => setActiveTab('skipped')}
        >
          Skipped ({uploadResult?.data?.skippedCount || 0})
        </Button>
        <Button
          variant={activeTab === 'errors' ? 'default' : 'outline'}
          onClick={() => setActiveTab('errors')}
        >
          Errors ({uploadResult?.data?.errorCount || 0})
        </Button>
      </div>

      <div className="mt-4">
        {activeTab === 'success' && (
          <>
            <h3 className="font-medium mb-2">Created Students</h3>
            <ul className="list-disc pl-6 text-sm text-green-700">
              {Array.isArray(uploadResult?.data?.createdStudents) &&
                uploadResult.data.createdStudents.map((email: string, idx: number) => (
                  <li key={idx}>{email}</li>
                ))}
            </ul>
          </>
        )}

        {activeTab === 'skipped' && (
          <>
            <h3 className="font-medium mb-2">Skipped Students</h3>
            <ul className="list-disc pl-6 text-sm text-yellow-700">
              {Array.isArray(uploadResult?.data?.skippedStudents) &&
                uploadResult.data.skippedStudents.map((student: any, idx: number) => (
                  <li key={idx}>
                    {student?.matricNo} – {student?.reason}
                  </li>
                ))}
            </ul>
          </>
        )}

        {activeTab === 'errors' && (
          <>
            <h3 className="font-medium mb-2">Errors</h3>
            <ul className="list-disc pl-6 text-sm text-red-700">
              {Array.isArray(uploadResult?.data?.errors) &&
                uploadResult.data.errors.map((error: any, idx: number) => (
                  <li key={idx}>
                    {/* Check if matricNo or email is defined before displaying */}
                    {error?.matricNo || error?.email
                      ? `${error?.matricNo || error?.email} – ${error?.error}`
                      : `Error: ${error?.error}`}
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
